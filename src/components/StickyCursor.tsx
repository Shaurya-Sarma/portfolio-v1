import { animate, transform } from "motion";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLDivElement>;
}

interface TransformProps {
  rotate: string;
  scaleX: number;
  scaleY: number;
}

function StickyCursor({ stickyElement }: StickyCursorProps) {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const cursorRef = useRef<any>();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cursorSize = isHovered ? 60 : 16;

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });
  };

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    const rect = stickyElement.current?.getBoundingClientRect();

    if (rect) {
      const { left, top, width, height } = rect;
      const center = { x: left + width / 2, y: top + height / 2 }; // center of the sticky element
      const distance = { x: e.clientX - center.x, y: e.clientY - center.y }; // distance between custom cursor and mouse cursor

      if (isHovered) {
        // rotate cursor towards mouse
        rotate(distance);

        // stretch cursor based on absolute distance
        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        // fix position of custom cursor to the center of the sticky element
        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.2);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.2);
      } else {
        mouse.x.set(e.clientX - cursorSize / 2);
        mouse.y.set(e.clientY - cursorSize / 2);
      }
    }
  };

  const handleMouseClick = (e: { clientX: any; clientY: any }) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // create a new ring element
    const ring = document.createElement("div");
    ring.classList.add("cursor-ring");

    // Position the ring at the center of the cursor
    ring.style.top = `${cursorY - 16}px`; // Adjust for ring size (radius)
    ring.style.left = `${cursorX - 16}px`;

    // Add the ring to the body
    document.body.appendChild(ring);

    // Remove the ring after animation completes
    ring.addEventListener("animationend", () => {
      ring.remove();
    });
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    animate(cursorRef.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 });
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    stickyElement.current?.addEventListener("mouseover", handleMouseOver);
    stickyElement.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      stickyElement.current?.removeEventListener("mousemove", handleMouseOver);
      stickyElement.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  });

  const template = ({ rotate, scaleX, scaleY }: TransformProps) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <motion.div
      transformTemplate={template}
      ref={cursorRef}
      className="fixed w-4 h-4 rounded-full bg-[#F5B700] pointer-events-none select-none -z-10 "
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      animate={{ width: cursorSize, height: cursorSize }}
    ></motion.div>
  );
}

export default StickyCursor;
