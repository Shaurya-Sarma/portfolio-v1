import { ProjectTileProps } from "../constants";
import { useCursorContext } from "../helpers/CursorContext";

function ProjectTile({ project }: ProjectTileProps) {
  const { setCursorHover } = useCursorContext();

  return (
    <>
      {/* Image/GIF with overlay */}
      {project.thumbnail && (
        <div className="relative w-full mb-10">
          <img
            src={project.thumbnail}
            alt={`${project.title} Thumbnail`}
            className="w-full h-auto max-h-[55vh] rounded-lg object-cover "
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <h2 className="text-8xl uppercase font-bold text-white text-center">
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
            <h4 className="text-lg uppercase font-semibold text-white bg-[#F5B700] px-1 mr-2">
              {project.type}
            </h4>
            {project.demo_link && (
              <h4
                className="text-lg uppercase font-semibold border-l-2 border-black pl-2 cursor-pointer select-none"
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
      {/* Skills Text Box */}
      <div className="mb-5">
        <h4 className="text-lg uppercase font-semibold mb-3">Skills</h4>
        <p className="text-lg font-medium">{project.skills}</p>
      </div>
    </>
  );
}

export default ProjectTile;
