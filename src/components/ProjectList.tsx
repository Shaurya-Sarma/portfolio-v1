import { PROJECT_METADATA, ProjectKey } from "../helpers/constants";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

function ProjectList() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    updateColumns(); // update the number of columns based on screen size
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const updateColumns = () => {
    if (window.innerWidth >= 768) {
      setColumns(3); // for large screens
    } else if (window.innerWidth >= 640) {
      setColumns(2); // for medium screens
    } else {
      setColumns(1); // for small screens
    }
  };

  const calcOffset = (index: number) => {
    let offset = 0;
    if (columns === 1) {
      offset = 0;
    } else if (columns === 2) {
      // Adjust offsets for 2 columns
      offset = index % 2 === 0 ? 0 : 50;
    } else if (columns === 3) {
      // Adjust offsets for 3 columns
      offset = index % 3 === 0 ? 0 : index % 3 === 1 ? 75 : 75 * 2;
    }
    return offset;
  };

  return (
    <div className="flex flex-row justify-center mt-10 mb-20">
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-y-20 md:gap-y-32 gap-x-20 `}
      >
        {Object.keys(PROJECT_METADATA).map((item, index) => {
          const key = item as ProjectKey;
          const formattedIndex = (index + 1).toString().padStart(3, "0");

          return (
            <li
              className="project-item flex flex-col justify-center select-none"
              key={index}
              style={{
                transform: `translateY(${calcOffset(index)}px)`,
                transition: "transform 0.3s ease",
              }}
            >
              <ProjectItem
                project={PROJECT_METADATA[key]}
                number={formattedIndex}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectList;
