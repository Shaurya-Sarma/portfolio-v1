import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import ProjectList from "../components/ProjectList";
import ArtList from "../components/ArtList.tsx"; // Import the ArtList component
import ProjectFilterBar from "../components/ProjectFilterBar";
import { PROJECT_METADATA } from "../helpers/constants";
import { useState } from "react";

function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter the projects based on selected tag
  const filteredProjects = Object.values(PROJECT_METADATA).filter((project) => {
    return (
      selectedTag === null ||
      project.tags.some((tag) => tag.toLowerCase().includes(selectedTag))
    );
  });

  return (
    <div className="flex flex-row justify-center">
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col p-10 max-w-screen-xl mb-20">
        {/* Project Filter Bar */}
        <ProjectFilterBar
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />

        {/* Render either Project List or Art List based on selected tag*/}
        {selectedTag === "3d renders" ? (
          <ArtList />
        ) : (
          <ProjectList projects={filteredProjects} />
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
