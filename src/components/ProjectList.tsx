import { Project } from "../helpers/constants";
import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

interface ProjectListProps {
  projects: Project[];
}

function ProjectList(props: ProjectListProps) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    updateColumns(); // update the number of columns based on screen size
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const updateColumns = () => {
    if (window.innerWidth >= 1024) {
      setColumns(3); // for large screens
    } else if (window.innerWidth >= 768) {
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
    <div className="flex flex-row justify-center mt-6 mb-20">
      <ul
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-20 lg:gap-y-30 gap-x-20 `}
      >
        {props.projects.map((p, index) => {
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
              <ProjectItem project={p} number={formattedIndex} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectList;
