import { useCursorContext } from "../helpers/CursorContext";
import { ProjectHeroProps } from "../helpers/constants";
import MinimalScrollbar from "./MinimalScrollbar";

function ProjectHero({ project }: ProjectHeroProps) {
  const { setCursorHover } = useCursorContext();

  return (
    <>
      {/* Project Title */}
      <div className="flex justify-between text-xl md:text-2xl lowercase font-semibold mb-3 sm:mb-6 ">
        <span className="text-left">{project.title}</span>
        {/* <span className="text-right">{project.date}</span> */}
      </div>

      {/* Project Thumbnail */}
      {project.animated_thumbnail && (
        <video
          className="w-full object-cover rounded-md shadow-xl mb-10"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.thumbnail} // optional fallback image
        >
          <source src={project.animated_thumbnail} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
                  Demo
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

      {/* Minimal custom scrollbar */}
      <MinimalScrollbar
        right={12}
        trackVH={0.75}
        minThumb={36}
        hideWhenNoScroll={true}
      />
    </>
  );
}

export default ProjectHero;
