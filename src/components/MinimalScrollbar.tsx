import { useEffect, useState, useRef } from "react";

interface MinimalScrollbarProps {
  right?: number;
  trackVH?: number;
  minThumb?: number;
  hideWhenNoScroll?: boolean;
}

export default function MinimalScrollbar({
  right = 24,
  trackVH = 0.75,
  minThumb = 40,
  hideWhenNoScroll = true,
}: MinimalScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // SCROLL STATE
  const [progress, setProgress] = useState(0);
  const [thumbH, setThumbH] = useState(minThumb);
  const [trackH, setTrackH] = useState(0);
  const [visible, setVisible] = useState(true);
  const [adjustedRight, setAdjustedRight] = useState(right);

  // DRAG STATE
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ y: number; thumbTop: number }>({
    y: 0,
    thumbTop: 0,
  });

  const recalc = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;

    const p = scrollable > 0 ? window.scrollY / scrollable : 0;
    setProgress(Math.min(1, Math.max(0, p)));

    const tH = Math.floor(window.innerHeight * trackVH);
    setTrackH(tH);

    const h = Math.max(minThumb, (window.innerHeight / doc.scrollHeight) * tH);
    setThumbH(h);

    if (hideWhenNoScroll) setVisible(scrollable > 4);
  };

  useEffect(() => {
    const handleResize = () => {
      recalc();
      setAdjustedRight(window.innerWidth < 768 ? right - 4 : right); // change threshold if needed
    };

    handleResize(); // initial run
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging || !trackRef.current) return;

      const usable = trackH - thumbH;
      if (usable <= 0) return;

      const delta = e.clientY - dragStart.current.y;
      const newTop = Math.min(
        usable,
        Math.max(0, dragStart.current.thumbTop + delta)
      );
      const pct = newTop / usable;

      const doc = document.documentElement;
      const target = pct * (doc.scrollHeight - window.innerHeight);
      window.scrollTo({ top: target });
    };

    const onUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }
  }, [dragging, trackH, thumbH]);

  const onTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top - thumbH / 2;
    const usable = rect.height - thumbH;
    const pct = Math.min(1, Math.max(0, y / usable));
    const doc = document.documentElement;
    const target = pct * (doc.scrollHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onThumbPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    e.preventDefault();
    const usable = trackH - thumbH;
    const currentThumbTop = usable * progress;
    dragStart.current = {
      y: e.clientY,
      thumbTop: currentThumbTop,
    };
    setDragging(true);
  };

  if (!visible) return null;

  const usable = trackH - thumbH;
  const top = usable * progress;

  return (
    <div
      style={{ right: adjustedRight }}
      className="fixed top-1/2 -translate-y-1/2 z-50 select-none"
    >
      <div
        ref={trackRef}
        onClick={onTrackClick}
        style={{ height: trackH }}
        className="relative w-[8px] transition-colors rounded-full cursor-pointer"
      >
        <div
          onPointerDown={onThumbPointerDown}
          style={{ height: thumbH, transform: `translateY(${top}px)` }}
          className={`absolute left-0 w-full bg-[#584d2b4b] rounded-full ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        />
      </div>
    </div>
  );
}
