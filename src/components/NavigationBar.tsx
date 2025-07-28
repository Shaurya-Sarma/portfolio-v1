import { Link, useLocation } from "react-router-dom";
import { useCursorContext } from "../helpers/CursorContext";

function NavigationBar() {
  const location = useLocation();
  const { setCursorHover } = useCursorContext();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/creative", label: "Creative" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-10 select-none">
      <div className="text-md md:text-lg font-bold uppercase">
        SHAURYA SARMA
      </div>
      <div className="flex gap-4 md:gap-6 ">
        {navLinks.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              onClick={() => setCursorHover(false)}
              className={`uppercase font-medium text-md md:text-lg transition duration-300 ${
                isActive
                  ? "underline underline-offset-4 decoration-2 decoration-[#F5B700]"
                  : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationBar;
