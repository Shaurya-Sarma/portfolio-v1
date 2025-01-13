import { useNavigate } from "react-router-dom";
import { useCursorContext } from "../helpers/CursorContext";
import StarIcon from "./StarIcon";
import { PROJECT_FILTER_HEADERS } from "../helpers/constants";

function ProjectFilterBar() {
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
      <div className="flex flex-row gap-5">
        {PROJECT_FILTER_HEADERS.map((str, index) => {
          return (
            <h3
              key={index}
              className="text-xl text-black uppercase font-medium"
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
