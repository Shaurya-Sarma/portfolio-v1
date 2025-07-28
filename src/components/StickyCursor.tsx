import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useCursorContext } from "../helpers/CursorContext";

function StickyCursor() {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const { cursorHover } = useCursorContext();
  const [hidden, setHidden] = useState(false);

  const cursorSize = cursorHover ? 60 : 16;

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    mouse.x.set(e.clientX - cursorSize / 2);
    mouse.y.set(e.clientY - cursorSize / 2);
  };

  const handleMouseClick = (e: { clientX: number; clientY: number }) => {
    const ring = document.createElement("div");
    ring.classList.add("cursor-ring");
    ring.style.top = `${e.clientY - 16}px`;
    ring.style.left = `${e.clientX - 16}px`;
    document.body.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove());
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    const HIDE_SELECTOR = "img, video, iframe"; // extend with [data-hide-cursor] to mark specific elements inside of all img/video/iframe tags
    const onPointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.matches(HIDE_SELECTOR) || el.closest(HIDE_SELECTOR))) {
        setHidden(true);
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      const el = e.relatedTarget as HTMLElement | null;
      // If we left to another media element, keep it hidden
      const stillOverMedia =
        el && (el.matches(HIDE_SELECTOR) || el.closest(HIDE_SELECTOR));
      setHidden(!!stillOverMedia);
      if (!el) setHidden(false); // left the window
    };

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
    };
  }, [cursorSize]);

  return (
    <motion.div
      className="custom-cursor fixed w-4 h-4 rounded-full bg-[#F5B700] pointer-events-none select-none z-10"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
        opacity: hidden ? 0 : 1, // hide when over img/video
      }}
      transition={{ opacity: { duration: 0.15 } }}
    />
  );
}

export default StickyCursor;
