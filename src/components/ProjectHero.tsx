import { useState } from "react";
import { useCursorContext } from "../helpers/CursorContext";
import { ProjectHeroProps } from "../helpers/constants";

function ProjectHero({ project }: ProjectHeroProps) {
  const { setCursorHover } = useCursorContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {project.thumbnail && (
        <div
          className="relative w-full mb-10 select-none cursor-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={
              isHovered && project.animated_thumbnail
                ? project.animated_thumbnail
                : project.thumbnail
            }
            alt={`${project.title} Thumbnail`}
            className="w-full object-cover rounded-md shadow-xl"
            style={{
              transform: isHovered ? "scale(1)" : "scale(1)",
              transition: "transform 1s ease",
            }}
          />
          <div className="absolute text-center inset-0 flex items-center rounded-md justify-center bg-black  bg-opacity-50 transition-opacity hover:opacity-0 duration-1000 ">
            <h2 className="text-8xl uppercase font-bold text-white">
              {project.title}
            </h2>
          </div>
        </div>
      )}

      {/* Description Text Box */}
      <div className="mb-5">
        <div className="flex flex-row justify-between mb-3">
          <h4 className="text-lg uppercase font-semibold">Description</h4>
          <span className="flex flex-row">
            <h4 className="text-lg uppercase font-semibold text-black bg-[#F5B700] px-1 mr-2">
              {project.type}
            </h4>
            {project.demo_link && (
              <h4
                className="text-lg uppercase font-semibold border-l-2 border-black pl-2 cursor-pointer select-none z-10"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play Demo
                </a>
              </h4>
            )}
          </span>
        </div>
        <p className="text-lg font-medium">{project.description}</p>
      </div>

      {/* Skills and Roles Text Box */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-5">
          <h4 className="text-lg uppercase font-semibold mb-3">Skills</h4>
          <p className="text-lg font-medium">{project.skills}</p>
        </div>
        {project.roles && (
          <div className="mb-5 ml-0 md:ml-5">
            <h4 className="text-lg uppercase font-semibold mb-3">Roles</h4>
            <p className="text-lg font-medium">{project.roles}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectHero;
