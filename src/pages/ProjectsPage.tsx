import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import ProjectList from "../components/ProjectList";
import ProjectFilterBar from "../components/ProjectFilterBar";

function ProjectsPage() {
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
        <ProjectFilterBar />
        {/* Project List */}
        <ProjectList />
      </div>
    </div>
  );
}

export default ProjectsPage;
