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
      <video
        key={props.project.slug}
        className="w-[100%] aspect-[2/1.2] object-cover cursor-pointer shadow-md transition-all duration-500 hover:scale-125"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={props.project.thumbnail} // optional
        role="img"
        aria-label={`Thumbnail for ${props.number}`}
        onClick={() => {
          navigate(`/projects/${props.project.slug}`);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <source src={props.project.animated_thumbnail} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
