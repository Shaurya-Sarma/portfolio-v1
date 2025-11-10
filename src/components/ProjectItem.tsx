import { useNavigate } from "react-router-dom";
import { Project } from "../helpers/constants";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface ProjectTileProps {
  number: string;
  project: Project;
}

function ProjectItem({ number, project }: ProjectTileProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // load only once
    rootMargin: "200px", // start loading before it scrolls into view
  });

  const states = {
    initial: { y: 0, opacity: 1 },
    hoverDown: { y: 10, opacity: 0 },
    hoverUp: { y: -10, opacity: 0 },
  };

  return (
    <div ref={ref} className="flex flex-col items-start">
      {/* Top label */}
      <motion.span
        className="text-xl font-medium uppercase -mb-1 text-left -z-10"
        variants={states}
        initial="initial"
        animate={isHovered ? "hoverDown" : "initial"}
        transition={{ duration: 0.25 }}
      >
        {number}
      </motion.span>

      {/* Lazy-loaded video */}
      {inView ? (
        <video
          key={project.slug}
          className="w-full aspect-[2/1.2] object-cover cursor-pointer shadow-md transition-all duration-500 hover:scale-125"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={project.thumbnail}
          role="img"
          aria-label={`Thumbnail for ${number}`}
          onClick={() => navigate(`/projects/${project.slug}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <source src={project.animated_thumbnail} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback thumbnail before the video loads
        <img
          src={project.thumbnail}
          alt={`Thumbnail for ${number}`}
          className="w-full aspect-[2/1.2] object-cover cursor-pointer shadow-md transition-all duration-500 hover:scale-125"
          onClick={() => navigate(`/projects/${project.slug}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      )}

      {/* Bottom label */}
      <motion.span
        className="text-xl font-medium lowercase text-left -z-10"
        variants={states}
        initial="initial"
        animate={isHovered ? "hoverUp" : "initial"}
        transition={{ duration: 0.25 }}
      >
        {project.title}
      </motion.span>
    </div>
  );
}

export default ProjectItem;
