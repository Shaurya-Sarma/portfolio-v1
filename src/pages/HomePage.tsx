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

function HomePage() {
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

        <div className="flex flex-row h-full m-auto max-w-[1600px]">
          {/* Hero Text Content */}
          <div className="flex flex-col gap-8 text-left justify-center w-[55%] px-16">
            <h1 className="text-5xl font-semibold">Hey, I'm Shaurya Sarma</h1>
            <h2 className="text-2xl font-normal leading-7">
              I'm a student at the University of Pennsylvania, where I study
              computer graphics and computer science.
            </h2>
            <h2 className="text-2xl font-normal leading-7">
              Creative coding meets immersive digital experiences — that's my
              sweet spot. I'm passionate about combining technology and art,
              exploring areas like mixed reality, 3D graphics, and interactive
              experiences.
            </h2>
          </div>

          {/* 3D Model Demo */}
          <div className="w-[45%] -z-40">
            <Canvas>
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
              <AmbientLightWithHelper />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
