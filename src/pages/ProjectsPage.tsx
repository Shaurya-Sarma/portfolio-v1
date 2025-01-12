import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import { PROJECT_FILTER_HEADERS, PROJECT_INFO, ProjectKey } from "../constants";
import ProjectTile from "../components/ProjectTile";
import { useNavigate } from "react-router-dom";
import StarIcon from "../components/StarIcon";
import { useCursorContext } from "../helpers/CursorContext";

function ProjectsPage() {
  const navigate = useNavigate();
  const { setCursorHover } = useCursorContext();

  return (
    <div className="w-screen h-screen">
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col justify-center h-full m-auto px-5 py-12 max-w-screen-lg ">
        {/* Project Filter Bar */}
        <div className="flex flex-row justify-between mb-5 items-center">
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
        {/* Project Carousel */}
        <div className="flex flex-row w-screen gap-10">
          {Object.keys(PROJECT_INFO).map((item) => {
            const key = item as ProjectKey;
            return <ProjectTile key={key} project={PROJECT_INFO[key]} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
