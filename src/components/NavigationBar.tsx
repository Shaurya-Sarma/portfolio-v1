import { Link, useLocation } from "react-router-dom";
import { useCursorContext } from "../helpers/CursorContext";

function NavigationBar() {
  const location = useLocation();
  const { setCursorHover } = useCursorContext();

  return (
    <div className="absolute top-0 left-0 w-full flex flex-row justify-evenly py-12 z-10 select-none">
      {location.pathname === "/projects" ? (
        <Link
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          onClick={() => setCursorHover(false)}
          to="/"
          className="link uppercase text-xl"
        >
          Home
        </Link>
      ) : (
        <Link
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          onClick={() => setCursorHover(false)}
          to="/projects"
          className="uppercase text-xl"
        >
          My Work
        </Link>
      )}
      <Link
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
        onClick={() => setCursorHover(false)}
        to="/contact"
        className="uppercase text-xl"
      >
        Contact Me
      </Link>
    </div>
  );
}

export default NavigationBar;
