import RamenModel from "../components/RamenModel";
import { Canvas } from "@react-three/fiber";
import AmbientLightWithHelper from "../helpers/AmbientLightWithHelper";
import { Float } from "@react-three/drei";
import Particles from "../components/Particles";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import {
  Bloom,
  EffectComposer,
  Noise,
  Pixelation,
  Scanline,
  ToneMapping,
} from "@react-three/postprocessing";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function HomePage() {
  const [canvasSize, setCanvasSize] = useState({ size: 0 });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // update canvas size based on screen width and media query
  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(
        window.innerWidth * (isTabletOrMobile ? 0.8 : 0.4),
        isTabletOrMobile ? 1200 : 800 // limit the size to a maximum
      );
      setCanvasSize({ size });
    };

    updateSize(); // Initialize size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isTabletOrMobile]);

  return (
    <>
      <NavigationBar />
      <div className="w-screen h-screen">
        {/* Animated Particle Background */}
        <div className="fixed h-full w-full -z-50">
          <Canvas>
            <Particles smallCount={10000} bigCount={50} />
          </Canvas>
        </div>

        <main className="flex flex-col-reverse justify-center gap-2 items-center h-full m-auto max-w-screen-2xl md:flex-row md:gap-0 lg:gap-5">
          {/* Hero Text Content */}
          <div className="flex flex-col gap-4 text-left justify-center w-[80%] px-0  md:px-8 md:w-[55%] md:mt-0 lg:gap-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold ">
              Hey, I'm Shaurya Sarma
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal leading-7">
              I'm a student at the University of Pennsylvania, where I study
              computer graphics and computer science.
            </h2>
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal leading-7">
              Creative coding meets immersive digital experiences — that's my
              sweet spot. I'm passionate about combining technology and art,
              exploring areas like mixed reality, 3D graphics, and interactive
              experiences.
            </h2>
          </div>

          {/* 3D Model Demo */}
          <div className="mb-2 md:mb-0">
            <Canvas
              style={{
                width: canvasSize.size,
                height: canvasSize.size,
                position: "relative",
              }}
            >
              {/* Post Processing Effect */}
              <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                {/* <Scanline
                blendFunction={BlendFunction.OVERLAY} 
                density={1} 
              /> */}
                <Bloom
                  intensity={0.25}
                  luminanceThreshold={1}
                  luminanceSmoothing={0.33}
                />
                <Pixelation
                  granularity={2} // 5 has a cool pixel effect
                />

                <Noise
                  premultiply
                  opacity={0.45}
                  blendFunction={BlendFunction.SCREEN}
                />
              </EffectComposer>

              {/* Floating Animation */}
              <Float
                speed={1.25}
                rotationIntensity={1.6}
                floatIntensity={0.9}
                floatingRange={[-0.25, 0.25]}
              >
                <RamenModel />
              </Float>
              <ambientLight intensity={4.0} />
            </Canvas>
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
