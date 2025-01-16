import { useNavigate } from "react-router-dom";
import { useCursorContext } from "../helpers/CursorContext";
import StarIcon from "./StarIcon";
import { PROJECT_FILTER_HEADERS } from "../helpers/constants";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ProjectFilterBarProps {
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
}

function ProjectFilterBar({
  setSelectedTag,
  selectedTag,
}: ProjectFilterBarProps) {
  const navigate = useNavigate();
  const { setCursorHover } = useCursorContext();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="flex flex-row justify-between items-center z-10">
      <div
        className="w-10 cursor-pointer"
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
        onClick={() => {
          navigate("/");
          setCursorHover(false);
        }}
      >
        <StarIcon color="#000" size={40} />
      </div>

      {/* Filter Dropdown for Smaller Screens */}
      {isTabletOrMobile && (
        <div className="relative">
          <span
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-xl uppercase font-medium cursor-pointer select-none text-black transition-all duration-500 p-2"
          >
            {selectedTag ? selectedTag + " ▾" : "categories ▾"}
          </span>
          {showDropdown && (
            <div className="absolute top-full right-2 min-w-56 bg-white border rounded-md shadow-md mt-2">
              <div className="grid grid-rows-3 gap-1 p-2">
                {PROJECT_FILTER_HEADERS.slice(0, 3).map((str, index) => {
                  const isActive = selectedTag === str.toLowerCase();
                  return (
                    <span
                      key={index}
                      className={`uppercase font-medium cursor-pointer select-none text-black transition-all duration-500 p-2 rounded ${
                        isActive ? "bg-[#F5B700]" : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(isActive ? null : str.toLowerCase());
                        setShowDropdown(false);
                      }}
                    >
                      {str}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Button Bar for Larger Screens */}
      {!isTabletOrMobile && (
        <div className="flex flex-row gap-2 md:gap-5">
          {PROJECT_FILTER_HEADERS.map((str, index) => {
            const isActive = selectedTag === str.toLowerCase();

            return (
              <h3
                key={index}
                className={`text-base md:text-xl uppercase font-medium cursor-pointer select-none text-black transition-all duration-500 p-2 ${
                  isActive ? "bg-[#F5B700]" : ""
                }`}
                onClick={() =>
                  setSelectedTag(isActive ? null : str.toLowerCase())
                }
              >
                {str}
              </h3>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectFilterBar;
