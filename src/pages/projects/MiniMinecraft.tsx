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
            an icy tundra due to their wide temperature differences. It was
            easily to add new biomes by simply defining their climate and height
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
            For grassland terrain, a custom Voronoi-based hill function inspired
            by Worley noise is used. By tracking the two nearest feature points
            per cell and combining their distances, this produces rolling hills
            with ridge-like transitions. This Voronoi noise is also blended with
            FBM to give more variation.
          </p>
          <p>
            Mountain terrain uses higher-frequency FBM with a power curve
            applied to the noise magnitude, producing sharper peaks and deeper
            valleys while maintaining smooth transitions across the landscape.
          </p>

          <h6>Climate-Based Biome Blending</h6>
          <p>
            Each position samples a procedural climate model with three noise
            maps: Temperature (smooth), Moisture (medium), and Erosion
            (high-frequency). Biome influence is computed using Gaussian falloff
            in 3D climate space, producing smooth transitions.
          </p>

          <h6>Height Computation & Cave Generation</h6>
          <ul>
            <li>
              Biome heights blended using normalized weights to ensure smooth
              elevation changes.
            </li>
            <li>
              Caves generated using 3D fractal noise, carving tunnels and
              caverns organically.
            </li>
          </ul>

          <h6>Vegetation Density</h6>
          <p>
            Additional Perlin noise drives vegetation placement, producing
            natural scatter for grass and other vegetation.
          </p>

          {/* Post-Processing & Fluids */}
          <h5>Post-Processing Pipeline & Water/Lava Shaders (Shaurya Sarma)</h5>
          <p>
            I implemented a full-screen post-processing pipeline for
            screen-space effects, including water and lava immersion. The scene
            is rendered to an off-screen framebuffer and composited using a
            custom post-process shader.
          </p>

          <h6>Framebuffer-Based Rendering Pipeline</h6>
          <ul>
            <li>
              <strong>Scene Pass:</strong> Terrain, entities, lighting, shadows,
              and sky rendered to a framebuffer.
            </li>
            <li>
              <strong>Post-Process Pass:</strong> Framebuffer color texture
              rendered to a screen-aligned quad with environment-specific
              effects.
            </li>
          </ul>

          <h6>Player Physics Inside Fluids</h6>
          <ul>
            <li>Lateral movement and gravity reduced to 2/3 normal speed.</li>
            <li>
              Player can swim upward at a constant rate by holding spacebar.
            </li>
          </ul>

          <h6>Screen-Space Water and Lava Effects</h6>
          <ul>
            <li>
              <strong>Ripple Distortion:</strong> Radial sine-based ripple
              combined with animated Perlin noise for dynamic fluid motion.
            </li>
            <li>
              <strong>Color Tinting:</strong> Water = blue-green, Lava =
              red-orange. Scene blended smoothly with tint.
            </li>
          </ul>

          {/* Pokémon Models */}
          <h5>Pokémon Model Rendering & Texturing (Shaurya Sarma)</h5>
          <p>
            I implemented a custom system for loading, parsing, and rendering
            Pokémon models from the <strong>Cobblemon</strong> repository. These
            models are hierarchical cube rigs, not triangle meshes.
          </p>

          <h6>Loader Pipeline</h6>
          <p>
            Geometry and texture files (.json) are parsed at runtime to
            dynamically construct bone hierarchies and procedural meshes.
            Supports 1000+ Pokémon assets without code changes.
          </p>

          <h6>Modular, Data-Driven Design</h6>
          <p>
            Geometry parsed from JSON, bone hierarchies built dynamically,
            meshes generated procedurally, and textures applied per model.
          </p>
          <div className="code">
            <SyntaxHighlighter language={"cpp"} style={oneDark}>
              {`void Pokemon::loadPokemon(const QString &fileName) {
    m_geometry = LoadPokemonGeometryFromFile(fileName);
    m_mesh = GenerateMesh(m_geometry);
}`}
            </SyntaxHighlighter>
          </div>

          <h6>Bone Hierarchy Parsing & Transformations</h6>
          <ul>
            <li>
              Bones define pivot, parent, local rotations, and visual cubes.
            </li>
            <li>
              Transformations applied: pivot translation → rotation → back
              translation → parent transform multiplication.
            </li>
          </ul>

          <h6>Procedural Cube Mesh Generation</h6>
          <ul>
            <li>
              Each cube generates 24 vertices, 36 indices, per-face normals, and
              UVs.
            </li>
            <li>
              Vertex positions transformed by bone and cube transforms, appended
              to interleaved VBO.
            </li>
          </ul>

          <h6>Custom UV Mapping</h6>
          <p>
            Pokémon cubes use a folded cardboard UV layout. Per-face UVs
            computed dynamically based on cube dimensions and model texture
            resolution.
          </p>

          <h6>Rendering & GPU Upload</h6>
          <p>
            Indexed VBO with interleaved position, normal, color, and UV data.
            Standard OpenGL 2D texture bound at render time.
          </p>
          <div className="code">
            <SyntaxHighlighter language={"cpp"} style={oneDark}>
              {`glBindTexture(GL_TEXTURE_2D, m_texture);`}
            </SyntaxHighlighter>
          </div>

          <h6>Limitations & Future Work</h6>
          <ul>
            <li>Flat-plane transparency artifacts (wings, fins, etc.).</li>
            <li>
              Skeletal animation support: experimental JSON parser for animation
              keyframes requires refinement.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MiniMinecraft;
