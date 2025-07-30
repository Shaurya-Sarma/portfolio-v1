import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useCursorContext } from "../helpers/CursorContext";

function StickyCursor() {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const { cursorHover } = useCursorContext();
  const [hidden, setHidden] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const cursorSize = cursorHover ? 60 : 16;

  // const handleMouseMove = (e: { clientX: number; clientY: number }) => {
  //   mouse.x.set(e.clientX - cursorSize / 2);
  //   mouse.y.set(e.clientY - cursorSize / 2);
  // };

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
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize(); // initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) return;

    const HIDE_SELECTOR = "img, video, iframe, [data-hide-cursor]"; // add data-hide-cursor selector to the properties of any elements that should hide the cursor

    const onPointerMove = (e: PointerEvent) => {
      // Update position
      mouse.x.set(e.clientX - cursorSize / 2);
      mouse.y.set(e.clientY - cursorSize / 2);

      // Check if hovering over media elements
      const el = e.target as HTMLElement | null;
      if (el && (el.matches(HIDE_SELECTOR) || el.closest(HIDE_SELECTOR))) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [cursorSize, isSmallScreen]);

  if (isSmallScreen) return null;

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
        opacity: hidden ? 0 : 1,
      }}
      transition={{ opacity: { duration: 0.15 } }}
    />
  );
}

export default StickyCursor;
