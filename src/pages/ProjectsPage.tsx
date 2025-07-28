import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import ProjectList from "../components/ProjectList";
import ArtList from "../components/ArtList.tsx"; // Import the ArtList component
import ProjectFilterBar from "../components/ProjectFilterBar";
import { PROJECT_METADATA } from "../helpers/constants";
import { useState } from "react";
import MinimalScrollbar from "../components/MinimalScrollbar.tsx";
import NavigationBar from "../components/NavigationBar.tsx";

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
      <NavigationBar />
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col p-8 max-w-screen-xl mt-12 sm:mt-14 sm:mb-20">
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

      {/* Minimal custom scrollbar */}
      <MinimalScrollbar
        right={12}
        trackVH={0.75}
        minThumb={36}
        hideWhenNoScroll={true}
      />
    </div>
  );
}

export default ProjectsPage;
