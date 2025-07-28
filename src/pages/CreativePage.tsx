import { Canvas } from "@react-three/fiber";
import Particles from "../components/Particles";
import MinimalScrollbar from "../components/MinimalScrollbar.tsx";
import NavigationBar from "../components/NavigationBar.tsx";

function CreativePage() {
  return (
    <div className="flex flex-row justify-center">
      <NavigationBar />
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>

      <div className="flex flex-col p-10 max-w-screen-xl mt-8 sm:mt-12 mb-20"></div>

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

export default CreativePage;
