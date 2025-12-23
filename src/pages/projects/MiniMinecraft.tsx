import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MiniMinecraft: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        <div className="pb-10 breakdown">
          <h5>Overview</h5>
          <p>
            This project was developed collaboratively as part of a 3-member
            team for a computer graphics course. While we implemented several of
            Minecraft's core features, we added our own bonus features like the
            Pokémon. Below are some of the key technical highlights from my
            contributions.
          </p>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/pefYkcOqT2c?si=XAJEzgA18RgtveTb"
            title="Mini Minecraft Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {/* Procedural Terrain */}
          <h5>Procedurally Generated Terrain</h5>
          <p>
            The terrain system is generated entirely procedurally using layered
            noise functions and a climate-driven biome{" "}
            <a
              href="https://youtu.be/tndcs3sCQxA?si=pniktNsecZGIHNd1"
              target="_blank"
              rel="noopener noreferrer"
            >
              blending approach
            </a>
            , similar to actual Minecraft. The terrain blends multiple biomes
            smoothly based on temperature, moisture, and erosion values sampled
            from large-scale noise maps.
          </p>
          <div className="callout">
            This approach ensures that biomes are placed in correct and natural
            locations. For example, a desert will never be directly adjacent to
            an icy tundra due to their wide temperature differences. It was easy
            to add new biomes by simply defining their climate and height
            functions.
          </div>
          <p>
            First, I designed a modular noise utility that implements{" "}
            <strong>fractal brownian motion (FBM)</strong> using Perlin noise in
            both 2D and 3D. FBM is used to generate terrain height variation,
            climate maps, and volumetric cave noise. Noise values are
            normalized, smoothed, and altered to control terrain features.
          </p>
          <p>
            For grassland terrain, I used a <em>Voronoi-based hill function</em>
            , based off this{" "}
            <a
              href="https://web.mit.edu/cesium/Public/terrain.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              research paper
            </a>
            . By tracking the two nearest feature points per cell and combining
            their distances, this produces rolling hills with ridge-like
            transitions. This Voronoi noise is also blended with FBM to give
            more variation.
          </p>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="voronoi hills"
              src="/images/mini-minecraft/grassland-hills.png"
            />
            <figcaption>
              A top-down view of the grasslands biome showing the Voronoi hills
              noise function.
            </figcaption>
          </figure>
          <p>
            Mountain terrain uses higher-frequency FBM with a exponential curve
            applied to the noise magnitude, producing sharper peaks and deeper
            valleys while maintaining smooth transitions across the landscape.
          </p>
          <p>
            Cave systems are generated using 3D fractal noise below a certain
            y-level. Blocks are carved out where the noise exceeds a threshold,
            producing organic tunnels and caverns with varying density and
            scale. We also use a smaller secondary perlin noise function, to
            overlay grass in patches within the grasslands biome.
          </p>
          <h6>Climate-Based Biome Blending</h6>
          <p>
            Each world position samples a procedural climate model consisting of
            three independent noise maps:
          </p>
          <ul>
            <li>Temperature - large, smooth regions</li>
            <li>Moisture - medium-scale variation</li>
            <li>Erosion - higher-frequency, more discontinuous regions</li>
          </ul>
          <p>
            Each biome defines ideal climate values and a tolerance range. Biome
            influence is computed using a Gaussian falloff in our 3-dimensional
            climate space, producing smooth biome transitions without hard
            borders. For each (x, z) position, the terrain height is computed as
            a weighted blend of the top contributing biomes rather than a single
            biome.
          </p>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="biome noise maps"
              src="/images/mini-minecraft/noise-maps.png"
            />
            <figcaption>
              Quantitized version of the climate noise maps scaled at x10 for
              better visibility.
            </figcaption>
          </figure>
          {/* Post-Processing & Fluids */}
          <h5>Post-Processing Pipeline</h5>
          <p>
            I implemented a full-screen post-processing pipeline to support
            screen-space visual effects, such as being submerged in water and
            lava. Rather than rendering directly to the default framebuffer, the
            entire 3D scene is first rendered into an off-screen framebuffer and
            then composited onto the screen using a custom post-process shader.
          </p>
          <p>The rendering pipeline is split into three main passes:</p>
          <ol>
            <li>
              <strong>Shadow Map Pass:</strong> The scene is rendered from the
              light's point of view into a depth texture. We can use the depth
              information to determine shadowed fragments during lighting.
            </li>
            <li>
              <strong>Scene Pass:</strong> Terrain, entities, lighting, and the
              sky are rendered from the camera's perspective into an offscreen
              framebuffer. The shadow map generated in the first pass is sampled
              to apply dynamic shadows that move based on the light source.
            </li>
            <li>
              <strong>Post-Process Pass:</strong> The framebuffer color texture
              is rendered to a screen-aligned quad with environment-specific
              effects applied (i.e. water/lava distortion).
            </li>
          </ol>

          <h6>Water/Lava Shaders</h6>
          <p>
            The post-process fragment shader receives boolean uniforms
            indicating whether the player camera is currently inside a water or
            lava block. Then, a distortion effect is applied to simulate a
            ripple-like flowly effect. Lastly, theres a subtle tinting to the
            active scene based on the fluid type by just supressing blue/red
            values respectively.
          </p>
          <SyntaxHighlighter
            language={"glsl"}
            style={oneDark}
            showLineNumbers={true}
            wrapLines={true}
          >
            {`void main() {
  vec2 uv = fs_UV;
  vec2 center = vec2(0.5, 0.5);
  vec2 delta = uv - center;
  float dist = length(delta);

  // Create ripple effect
  float wave = sin(dist * 50.0 - u_Time * 0.0015);
  vec2 rippleUV = uv + normalize(delta) * wave * rippleIntensity;

  // Add drifting water effect
  vec2 driftingWater = vec2(
      perlinNoise2D(uv * 10.0 + vec2(u_Time * 0.00002, 0.0)),
      perlinNoise2D(uv * 10.0 + vec2(0.0, u_Time * 0.00002))
  );
  rippleUV += driftingWater * 0.01;

  // Sample the rendered texture
  vec3 fragColor = texture(u_RenderedTexture, rippleUV).rgb;
  
  // Apply tint based on fluid type
  // ...`}
          </SyntaxHighlighter>
          <p></p>
          {/* Pokémon Models */}
          <h5>Pokémon Loader Pipeline</h5>
          <p>
            I implemented a custom system for loading, parsing, and rendering
            Pokémon models from the{" "}
            <a
              href="https://gitlab.com/cable-mc/cobblemon-assets"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cobblemon
            </a>{" "}
            repository. Cobblemon is a popular Minecraft mod that adds Pokémon
            to the game. Each Pokémon model is defined using a JSON files that
            specify a hierarchical bone structure, cube-based geometry, and
            texture mappings.
          </p>
          <div className="callout">
            Because the loader takes these geometry and texture files as input.
            As a result, any Cobblemon Pokémon JSON can be loaded without code
            changes. This means the system supports{" "}
            <strong>1000+ Pokémon across all 9 generations</strong> by simply
            swapping asset files.
          </div>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="pokemon data"
              src="/images/mini-minecraft/pokemon-data.png"
            />
            <figcaption>
              An example of the JSON data structure for the Pokémon geometry and
              also PNG texture file for Bulbasaur.
            </figcaption>
          </figure>
          <p>
            Unlike terrain blocks, which are uniform cubes sampled from a shared
            texture atlas, Pokémon models are composed of cubes with arbitrary
            dimensions. Each Pokémon is therefore treated as a{" "}
            <strong>custom cube-based</strong> mesh rather than a collection of
            standard Minecraft blocks, mesh rather than a collection of standard
            Minecraft blocks, requiring a completely{" "}
            <em>separate geometry and UV generation pipeline</em> from the
            terrain system.
          </p>

          <p>
            <strong>Bone Hierachy Parsing:</strong> Each Pokémon model defines a
            skeleton made of named bones, each with:
          </p>
          <ul>
            <li>A pivot point</li>
            <li>Optional parent bone</li>
            <li>Local rotations</li>
            <li>One or more visual cube</li>
          </ul>

          <p>
            I parse all bones into a name-to-bone map, then construct the
            hierarchy by recursively traversing from the root bone to the rest
            of the skeleton. The most important thing is to apply
            transformations in the correct order to ensure that child bones
            inherit their parent's previous transformations.
          </p>
          <p>
            <strong>Mesh Generation: </strong> Each visual cube is generated as
            a mesh with per-face normals and UVs. Vertex positions are
            transformed by both cube and bone transforms, then appended into a
            single <strong>interleaved vertex buffer</strong>. This avoids
            static mesh storage and allows models to be regenerated or animated
            dynamically.
          </p>
          <SyntaxHighlighter
            language={"cpp"}
            style={oneDark}
            showLineNumbers={true}
            wrapLines={true}
          >
            {`static void ProcessBone(const PokemonGeometry &geometry,
                        const std::string &boneName,
                        const glm::mat4 &parentTransform,
                        PokemonMesh &mesh)
{
    auto result = geometry.bones.find(boneName);
    if(result == geometry.bones.end()) return; // bone not found in map
    const Bone &bone = result->second;

    // construct bone's transformation matrix
    glm::mat4 transform = glm::mat4(1.f);
    transform = glm::translate(transform, bone.pivot); // move pivot BEFORE transforms
    transform = glm::rotate(transform, glm::radians(bone.rotation.z), glm::vec3(0, 0, 1));
    transform = glm::rotate(transform, glm::radians(bone.rotation.y), glm::vec3(0, 1, 0));
    transform = glm::rotate(transform, glm::radians(bone.rotation.x), glm::vec3(1, 0, 0));
    transform = glm::translate(transform, -bone.pivot); // move pivot BACK to original


    transform = parentTransform * transform; // apply all previous transforms to current

    // render visuals (cubes)
    for (const PokeCube &c : bone.cubes) {
        DrawCube(c, transform, geometry.textureWidth, geometry.textureHeight, mesh);
    }

    // recurse on children
    for(const std::string &child : bone.children) {
        ProcessBone(geometry, child, transform, mesh);
    }
}`}
          </SyntaxHighlighter>

          <p></p>
          <p>
            <strong>UV Texture Mapping: </strong> Pokémon models use{" "}
            <em>custom UV</em> mapping that differs from terrain texturing.
            Instead of sampling a mapping that differs from terrain texturing.
            Instead of sampling a shared atlas, each cube face maps to a unique
            region of the texture using a <em>folded cardboard</em> layout. The
            JSON file provides UV offsets for each face, which I use to compute
            correct UV coordinates during mesh generation.
          </p>
          <h6>Limitations & Future Work</h6>
          <p>
            Some of the Pokémon models included flat planes for features like
            wings fins, ears, tails, and facial expressions. Because the
            renderer generates all six cube faces, this can create black boxes
            or depth artifacts around thin geometry. Future work could involve
            adding a conditional check to skip rendering faces for those flat
            planes.
          </p>

          <p>
            Lastly, Cobblemon provides animation JSON files with bone rotations,
            keyframes, and ordered transform channels. I designed the pipeline
            to handle animated bones but did not have time to fully implement
            the animation system.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MiniMinecraft;
