import { useNavigate } from "react-router-dom";
import { useCursorContext } from "../helpers/CursorContext";
import StarIcon from "./StarIcon";
import { PROJECT_FILTER_HEADERS } from "../helpers/constants";

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
      <div className="flex flex-row">
        {PROJECT_FILTER_HEADERS.map((str, index) => {
          const isActive = selectedTag === str.toLowerCase();

          return (
            <h3
              key={index}
              className={`text-xl uppercase font-medium cursor-pointer select-none text-black transition-all duration-500 p-2 ${
                isActive ? "bg-[#F5B700] " : ""
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
    </div>
  );
}

export default ProjectFilterBar;
