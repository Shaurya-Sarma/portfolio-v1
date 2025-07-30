import { useEffect, useState, useRef } from "react";

interface MinimalScrollbarHorizontalProps {
  bottom?: number;
  trackVW?: number;
  minThumb?: number;
  hideWhenNoScroll?: boolean;
}

export default function MinimalScrollbarHorizontal({
  bottom = 12,
  trackVW = 0.75,
  minThumb = 40,
  hideWhenNoScroll = true,
}: MinimalScrollbarHorizontalProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [thumbW, setThumbW] = useState(minThumb);
  const [trackW, setTrackW] = useState(0);
  const [visible, setVisible] = useState(true);

  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; thumbLeft: number }>({
    x: 0,
    thumbLeft: 0,
  });

  const recalc = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollWidth - window.innerWidth;

    const p = scrollable > 0 ? window.scrollX / scrollable : 0;
    setProgress(Math.min(1, Math.max(0, p)));

    const tW = Math.floor(window.innerWidth * trackVW);
    setTrackW(tW);

    const w = Math.max(minThumb, (window.innerWidth / doc.scrollWidth) * tW);
    setThumbW(w);

    if (hideWhenNoScroll) setVisible(scrollable > 4);
  };

  useEffect(() => {
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging || !trackRef.current) return;

      const usable = trackW - thumbW;
      if (usable <= 0) return;

      const delta = e.clientX - dragStart.current.x;
      const newLeft = Math.min(
        usable,
        Math.max(0, dragStart.current.thumbLeft + delta)
      );
      const pct = newLeft / usable;

      const doc = document.documentElement;
      const target = pct * (doc.scrollWidth - window.innerWidth);
      window.scrollTo({ left: target });
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
  }, [dragging, trackW, thumbW]);

  const onTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - thumbW / 2;
    const usable = rect.width - thumbW;
    const pct = Math.min(1, Math.max(0, x / usable));
    const doc = document.documentElement;
    const target = pct * (doc.scrollWidth - window.innerWidth);
    window.scrollTo({ left: target, behavior: "smooth" });
  };

  const onThumbPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    e.preventDefault();
    const usable = trackW - thumbW;
    const currentThumbLeft = usable * progress;
    dragStart.current = {
      x: e.clientX,
      thumbLeft: currentThumbLeft,
    };
    setDragging(true);
  };

  if (!visible) return null;

  const usable = trackW - thumbW;
  const left = usable * progress;

  return (
    <div
      style={{ bottom }}
      className="fixed left-1/2 -translate-x-1/2 z-50 select-none"
    >
      <div
        ref={trackRef}
        onClick={onTrackClick}
        style={{ width: trackW }}
        className="relative h-[4px] sm:h-[8px] transition-colors rounded-full cursor-pointer"
      >
        <div
          onPointerDown={onThumbPointerDown}
          style={{ width: thumbW, transform: `translateX(${left}px)` }}
          className={`absolute top-0 h-full bg-[#584d2b4b] rounded-full ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        />
      </div>
    </div>
  );
}
