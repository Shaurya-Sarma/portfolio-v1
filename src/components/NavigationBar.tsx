import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = forwardRef<HTMLDivElement>(function NavigationBar(
  props,
  ref
) {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-full flex flex-row justify-evenly py-12 ">
      {location.pathname === "/projects" ? (
        <Link to="/" className="uppercase text-xl">
          Home
        </Link>
      ) : (
        <Link to="/projects" className="link uppercase text-xl">
          My Work
          <div ref={ref} className="bounds" />
        </Link>
      )}
      <Link to="/contact" className="uppercase text-xl">
        Contact Me
      </Link>
    </div>
  );
});

export default NavigationBar;
