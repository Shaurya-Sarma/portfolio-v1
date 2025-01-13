import { useNavigate } from "react-router-dom";
import { Project } from "../helpers/constants";

interface ProjectTileProps {
  number: string;
  project: Project;
}

function ProjectItem(props: ProjectTileProps) {
  const navigate = useNavigate();
  return (
    <>
      <span className="text-xl font-medium uppercase -mb-1 text-left -z-10">
        {props.number}
      </span>
      <img
        src={props.project.thumbnail}
        alt={`Thumbnail for ${props.number}`}
        className="w-[100%] h-40 object-cover cursor-pointer shadow-md transition-all duration-500 hover:scale-125"
        onClick={() => {
          navigate(`/projects/${props.project.slug}`);
        }}
      />
      <span className="text-xl font-medium lowercase text-left">
        {props.project.title}
      </span>
    </>
  );
}

export default ProjectItem;
