import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import { PROJECT_FILTER_HEADERS, PROJECT_INFO, ProjectKey } from "../constants";
import ProjectTile from "../components/ProjectTile";

function ProjectsPage() {
  return (
    <div className="w-screen h-screen">
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col h-full m-auto px-5 pt-12 max-w-screen-lg">
        {/* Project Filter Bar */}
        <div className="flex flex-row justify-evenly mb-10">
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
        {/* Project Tile */}
        {Object.keys(PROJECT_INFO).map((item) => {
          const key = item as ProjectKey;
          return <ProjectTile key={key} project={PROJECT_INFO[key]} />;
        })}
      </div>
    </div>
  );
}

export default ProjectsPage;
