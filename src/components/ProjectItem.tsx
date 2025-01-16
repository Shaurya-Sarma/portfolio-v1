import { useNavigate } from "react-router-dom";
import { Project } from "../helpers/constants";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectTileProps {
  number: string;
  project: Project;
}

function ProjectItem(props: ProjectTileProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const states = {
    initial: { y: 0, opacity: 1 },
    hoverDown: { y: 10, opacity: 0 },
    hoverUp: { y: -10, opacity: 0 },
  };

  return (
    <>
      <motion.span
        className="text-xl font-medium uppercase -mb-1 text-left -z-10"
        variants={states}
        initial="initial"
        animate={isHovered ? "hoverDown" : "initial"}
        transition={{ duration: 0.25 }}
      >
        {props.number}
      </motion.span>
      <img
        src={props.project.thumbnail}
        alt={`Thumbnail for ${props.number}`}
        className="w-[100%] h-40 object-cover cursor-pointer shadow-md transition-all duration-500 hover:scale-125"
        onClick={() => {
          navigate(`/projects/${props.project.slug}`);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <motion.span
        className="text-xl font-medium lowercase text-left -z-10"
        variants={states}
        initial="initial"
        animate={isHovered ? "hoverUp" : "initial"}
        transition={{ duration: 0.25 }}
      >
        {props.project.title}
      </motion.span>
    </>
  );
}

export default ProjectItem;
