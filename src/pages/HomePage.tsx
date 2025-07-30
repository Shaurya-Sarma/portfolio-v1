import RamenModel from "../components/RamenModel";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import Particles from "../components/Particles";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import {
  Bloom,
  EffectComposer,
  Noise,
  Pixelation,
  ToneMapping,
} from "@react-three/postprocessing";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";

function HomePage() {
  const [canvasSize, setCanvasSize] = useState({ size: 0 });
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // update canvas size based on screen width and media query
  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(
        window.innerWidth * (isDesktopOrMobile ? 0.7 : 0.4),
        isDesktopOrMobile ? 1000 : 700 // limit the size to a maximum
      );
      setCanvasSize({ size });
    };

    updateSize(); // Initialize size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isDesktopOrMobile]);

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

        <main className="flex flex-col w-full h-full items-center justify-center">
          <div className="flex flex-col-reverse justify-center gap-2 items-center h-full m-auto max-w-screen-xl md:flex-row md:gap-0 lg:gap-5">
            {/* Hero Text Content */}
            <div className="flex flex-col gap-4 text-center md:text-left justify-center w-[80%] px-0 md:px-8 md:w-[55%] md:mt-0 lg:gap-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold ">
                Hey, I'm Shaurya
              </h1>
              <h2 className="text-md sm:text-lg md:text-xl font-normal">
                I'm a student at the University of Pennsylvania, where I study{" "}
                <a
                  href="https://cg.cis.upenn.edu/dmd.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e99518] font-medium hover:underline"
                >
                  computer graphics
                </a>{" "}
                and computer science. I'm into all things related to animation,
                graphics, XR, AI, 3D web dev, and interactive experiences.
              </h2>
              <h2 className="text-md sm:text-lg md:text-xl font-normal">
                Please feel free to check out my work and get in touch!
              </h2>
              <span className="text-md sm:text-lg md:text-xl font-normal">
                Let's Connect:{" "}
                <a
                  href="mailto:shaux@upenn.edu"
                  className="text-[#e99518] font-medium hover:underline"
                >
                  shaux@upenn.edu
                </a>{" "}
                |{" "}
                <a
                  href="https://www.linkedin.com/in/shaurya-sarma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e99518] font-medium hover:underline"
                >
                  LinkedIn
                </a>
              </span>
            </div>

            {/* 3D Model Demo */}
            <div className="mb-2 sm:mb-0">
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
          </div>
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}

export default HomePage;
