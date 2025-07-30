import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import NavigationBar from "../components/NavigationBar.tsx";
import MinimalScrollbar from "../components/MinimalScrollbar.tsx";
import { CREATIVE_METADATA } from "../helpers/constants";
import { useState } from "react";
import ArtList from "../components/ArtList.tsx";
import FilterBar from "../components/FilterBar.tsx";
import Footer from "../components/Footer.tsx";

function CreativePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const creativeTags = [
    { full: "3D Renders", short: "3d", id: "3d" },
    { full: "Photography", short: "camera", id: "camera" },
  ];

  const filteredImages = CREATIVE_METADATA.filter((item) => {
    return (
      selectedTag === null ||
      item.tags.some((tag) => tag.toLowerCase().includes(selectedTag))
    );
  });

  return (
    <>
      <div className="flex flex-row justify-center">
        <NavigationBar />

        <div className="fixed h-full w-full -z-50">
          <Canvas>
            <Particles smallCount={8000} bigCount={30} />
          </Canvas>
        </div>

        <div className="w-full flex flex-col px-8 pt-8  max-w-screen-xl mt-12 sm:mt-14 mb-0 md:mb-8">
          {/* Art Filter Bar */}
          <FilterBar
            header="some cool stuff:"
            tags={creativeTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          <ArtList filteredImages={filteredImages} />
        </div>

        <MinimalScrollbar
          right={12}
          trackVH={0.75}
          minThumb={36}
          hideWhenNoScroll={true}
        />
      </div>
      <Footer />
    </>
  );
}

export default CreativePage;
