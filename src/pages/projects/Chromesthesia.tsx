import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chromesthesia: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        <div className="pb-10 breakdown">
          {/* Description */}
          <h5>Inspiration</h5>
          <p>
            The objective of this project was to explore how we can leverage
            virtual reality to create an immersive experience that simulates a
            unique perceptual phenomenon.{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4286234/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chromesthesia
            </a>{" "}
            is a type of neurological condition where individuals involuntarily
            perceive colors in response to sounds. These colors manifest in
            different ways for different people, but I specifically drew
            inspiration from descriptions of projective chromesthesia, where
            colors are perceived externally in the environment.
          </p>
          <div className="callout">
            "I have projective chromesthesia. I see every sound from quiet to
            loud, musical or not... The timbre of the sound forms the shape I
            see. Volume is opacity and size... Positionally, I see things more
            or less where the sound is coming from... I thought it was normal
            until I was a tween. I still have a hard time understanding how
            someone couldn't see sound. Super weird to think about. I can't even
            think about a sound without seeing it. It is the same thing." -
            u/s-multicellular (reddit user from r/Synesthesia)
          </div>
          <p>
            The goal was to create a system that translates sounds generated
            from physical interactions in a VR environment into vibrant, dynamic
            ripple effects on surfaces, simulating the experience of
            chromesthesia.
          </p>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="chromesthesia chart"
              src="/images/chromesthesia-vr/chromesthesia-chart.png"
            />
            <figcaption>
              An anecdotal example of chromesthesia color associations from
              individual found on Reddit. Note that this exact color mapping
              wasn't used but can be explored in future iterations.
            </figcaption>
          </figure>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/XjzxdBby3Lo?si=xOToDbiqEEKMnChv"
            title="Chromesthesia VR Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {/* System Overview */}
          <h5>System Overview</h5>
          <p>
            The system is structured around three tightly integrated yet
            independently optimized modules:
          </p>
          <p>
            <strong>Physics Interpreter:</strong> Acts as the primary event
            handler for all physical interactions in the virtual environment. It
            listens to Unity's physics engine for collision events and
            calculates the <em>impact energy</em> of each interaction using
            object velocity, mass, and contact impulse data. To ensure
            performance, it checks for the following before processing:
          </p>
          <ul>
            <li>
              <strong>Energy Filtering:</strong> Only collisions with sufficient
              kinetic energy are processed, preventing gentle touches or
              background noise from triggering unnecessary responses.
            </li>
            <li>
              <strong>Duplicate Collision Prevention:</strong> When two objects
              collide, only one ripple event is generated, avoiding redundant
              visuals and maintaining consistent GPU load.
            </li>
            <li>
              <strong>Spatial Prioritization:</strong> Distant or off-screen
              collisions are deprioritized, conserving resources for visible
              interactions.
            </li>
          </ul>
          <p>
            <strong>Interaction Interpreter:</strong> It receives and parses the
            raw collision data. It communicates with an{" "}
            <strong>Audio Manager</strong> to select and play impact sounds
            based on material properties, layering multiple sound clips with
            dynamic pitch and varying volume based on energy and distance.
            Additionally, based on the type of impact (soft or hard) and the
            material of the objects a <em>RippleEvent</em> containing all visual
            parameters is sent to the Sound-to-Color Manager. For example, two
            pillows colliding would generate a soft, smooth ripple while a glass
            vase breaking would produce a sharp, high-frequency ripple.
          </p>

          <p>
            {" "}
            <strong>Sound-to-Color Manager:</strong> Bridges the CPU and GPU by
            sending ripple data to the <strong>Ripple Shader</strong> for
            visualization. Rather than issuing many draw calls, it writes each
            ripple's parameters into compact{" "}
            <strong>1D floating-point textures</strong>, minimizing CPU-GPU
            communication overhead. Each texel stores:
          </p>
          <ul>
            <li>
              <strong>RippleDataTex:</strong> Position (x, y, z) and speed.
            </li>
            <li>
              <strong>RippleTimeTex:</strong> Start time, maximum radius, fade
              width, and timbre.
            </li>
            <li>
              <strong>RippleColorTex:</strong> RGB color data.
            </li>
          </ul>
          <p>
            By updating these textures and skipping expired ripples, the system
            maintains stable memory usage and supports simultaneous ripple
            events in real time.
          </p>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="pipeline diagram"
              src="/images/chromesthesia-vr/pipeline-diagram.jpg"
            />
            <figcaption>
              A visual diagram of the overall system architecture, showing the
              flow from physics events to audio generation to ripple rendering.
            </figcaption>
          </figure>
          {/* Ripple Generation */}
          <h5>Ripple Generation</h5>
          <p>
            Each ripple is generated from the physics data passed through the
            system, with every parameter (speed, size, color, fade width, and
            texture noise) interpolated from the collision's impact energy,
            distance, and material properties. This ensures that each visual
            response reflects the nature of the physical interaction.
          </p>
          <ul>
            <li>
              <strong>Ripple Speed:</strong> Interpolated between minimum and
              maximum values based on normalized impact energy, defining how
              fast the surface wave propagates outward.
            </li>
            <li>
              <strong>Ripple Size:</strong> Determined by the collision's energy
              magnitude so stronger impacts produce larger ripples.
            </li>
            <li>
              <strong>Ripple Color:</strong> Mapped from the material's sound
              frequency, where higher frequencies yield cooler tones
              (blue/purple) and lower ones lean toward warmer colors
              (orange/red).
            </li>
            <li>
              <strong>Fade Width:</strong> Controls the softness of each
              ripple's edge, blending over time to create a fade out effect.
            </li>
            <li>
              <strong>Timbre Noise:</strong> Influenced by material roughness.
              Hitting glass or metal surfaeces produces sharper, more defined
              ripples, while softer materials like fabric yield more watery,
              less noisy waves. This is effectively controlling noise scale that
              is the input for the shader.
            </li>
          </ul>
          {/* Shader Implementations */}
          <h5>Shader Implementations</h5>
          <p>
            Ripples are rendered via a{" "}
            <strong>custom HLSL shader script</strong> that uses{" "}
            <strong>
              <a
                href="https://iquilezles.org/articles/warp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                domain warping
              </a>{" "}
            </strong>{" "}
            to produce watercolor-like boundaries. By applying noise and spatial
            distortions to distance fields, ripples gain organic, fluid edges
            rather than hard circular borders.
          </p>
          <div className="code">
            <SyntaxHighlighter
              language={"glsl"}
              style={oneDark}
              showLineNumbers={true}
              wrapLines={true}
            >{`// Domain warping w/ 2d fbm function using Perlin noise
float warpyNoise(float2 p, float time)
{
    float2 q = float2(
        fbm(p + float2(0.0, 0.0) + time * 0.05),
        fbm(p + float2(5.2, 1.3) + time * 0.05)
    );
    
    float2 r = float2(
        fbm(p + 1.2*q + float2(1.7, 9.2)),
        fbm(p + 1.2*q + float2(8.3, 2.8))
    );
    
    return fbm(p + 0.8*r);
}`}</SyntaxHighlighter>
          </div>

          <p>
            Additionally, I implemented a post-process{" "}
            <strong>outline shader</strong>. This shader detects normal and
            color differences between neighboring pixels and offsets them
            slightly to create subtle object and ripple outlines, enhancing
            depth perception and visual clarity.
          </p>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="outline shadergraph"
              src="/images/chromesthesia-vr/outline-shader.png"
            />
            <figcaption>
              An snapshot of the outline post-process shader graph in Unity,
              showing the normal pixel offset calculations for which pixels
              should have outlines or not.
            </figcaption>
          </figure>

          <h5>Procedural Noise Baking (Performance Optimization)</h5>
          <p>
            Early iterations of the ripple system evaluated{" "}
            <strong>domain warping per ripple</strong> directly in the shader.
            While the ripples looked visually intricate, this approach took too
            many resources and caused significant frame drops, especially with
            interactions like{" "}
            <strong>projectile impacts and object shattering</strong>, where a
            single event could generate dozens of overlapping ripples.
          </p>

          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="domain warped noise texture"
              src="/images/chromesthesia-vr/domain-warped-noise-texture.png"
            />
            <figcaption>
              The pre-baked domain-warped noise texture used to perturb ripple's
              edges in the shader, significantly improving performance.
            </figcaption>
          </figure>

          <p>
            To address this, I transitioned from fully procedural noise
            evaluation to a <strong>baked domain warp texture</strong>. The
            domain-warped noise field is precomputed beforehand and stored as a
            seamless texture. At runtime, the shader simply samples this texture
            to apply the warping effect and reduces the computational load
            significally. This greatly expanded the number of simultaneous
            ripples to be generated with a decent frame rate.
          </p>

          <div className="code">
            <SyntaxHighlighter
              language={"glsl"}
              style={oneDark}
              showLineNumbers={true}
              wrapLines={true}
            >{`float2 noiseUV = frac(worldPos.xz * noiseScale * 0.05);

// sample pre-baked domain warp texture
float n = SAMPLE_TEXTURE2D_LOD(
    DoubleWarpNoise,
    SamplerDoubleWarpNoise,
    noiseUV,
    0).r;

// modulate ripple radius using baked noise
float perturbedRadius = radius + (n - 0.5) * noiseStrength;

// calculate fade based on distance from ripple center
float fade = 1.0 - smoothstep(
    perturbedRadius,
    perturbedRadius + fadeWidth * 0.5,
    dist
);`}</SyntaxHighlighter>
          </div>

          {/* Future Work */}
          <h5>Future Work</h5>
          <p>
            Chromesthesia remains a work-in-progress with multiple directions
            for potential expansion:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Introduce continuous and ambient sound sources (e.g., rolling
              objects, wind) producing pulsing wave ripples.
            </li>
            <li>
              Expand VR interactions for more immersive experiences,
              movement-based ripple/sound generation (i.e. footsteps), expanded
              environment size/complexity, etc.
            </li>
            <li>
              Enhance the procedural sound system with more material types,
              variation, better sounding effects.
            </li>
            <li>
              Explore different sound-to-color mappings based on user
              preferences or established chromesthesia studies. Could
              investigate research on prospective chromesthesia studies for
              inspiration.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Chromesthesia;
