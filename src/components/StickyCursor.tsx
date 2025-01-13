import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useCursorContext } from "../helpers/CursorContext";

function StickyCursor() {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const { cursorHover } = useCursorContext();

  const cursorSize = cursorHover ? 60 : 16;

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    mouse.x.set(e.clientX - cursorSize / 2);
    mouse.y.set(e.clientY - cursorSize / 2);
  };

  const handleMouseClick = (e: { clientX: any; clientY: any }) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // create a new ring element
    const ring = document.createElement("div");
    ring.classList.add("cursor-ring");

    // position the ring at the center of the cursor
    ring.style.top = `${cursorY - 16}px`;
    ring.style.left = `${cursorX - 16}px`;

    // add the ring to the body
    document.body.appendChild(ring);

    // remove the ring after animation completes
    ring.addEventListener("animationend", () => {
      ring.remove();
    });
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return (
    <motion.div
      className="custom-cursor fixed w-4 h-4 rounded-full bg-[#F5B700] pointer-events-none select-none z-10"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      animate={{ width: cursorSize, height: cursorSize }}
    ></motion.div>
  );
}

export default StickyCursor;
