import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import { PROJECT_FILTER_HEADERS } from "../helpers/constants";
import { useNavigate } from "react-router-dom";
import StarIcon from "../components/StarIcon";
import { useCursorContext } from "../helpers/CursorContext";
import ProjectList from "../components/ProjectList";

function ProjectsPage() {
  const navigate = useNavigate();
  const { setCursorHover } = useCursorContext();

  return (
    <div className="flex flex-row justify-center">
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col p-10 max-w-screen-xl ">
        {/* Project Filter Bar */}
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
        <ProjectList />
      </div>
    </div>
  );
}

export default ProjectsPage;
