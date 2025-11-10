import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const RasterizerShaders: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        <div className="pb-10 breakdown">
          {/* Rasterizer Pipeline */}
          <h5>Rasterizer Pipeline</h5>
          <p>
            The rasterizer module serves as a foundation for understanding how
            3D geometry is transformed into pixels on a screen. Key features
            include:
          </p>
          <ul>
            <li>
              <strong>Perspective Projection Camera:</strong> Converts
              world-space vertices into screen-space coordinates, enabling
              realistic 3D rendering.
            </li>
            <li>
              <strong>3D Triangle Rasterization:</strong> Each triangle is
              processed with row-wise scanning and barycentric interpolation to
              determine which pixels belong to the triangle.
            </li>
            <li>
              <strong>Z-buffering:</strong> Ensures correct occlusion by storing
              depth information for each pixel and updating only if a new
              triangle fragment is closer to the camera.
            </li>
            <li>
              <strong>Color and UV Interpolation:</strong> Computes per-pixel
              attributes like color and texture coordinates using barycentric
              weights.
            </li>
          </ul>
          <p>
            I gained a solid understanding of the fundamentals of rasterization,
            one of the core building blocks of 3D graphics rendering. I also
            implemented anti-aliasing by sampling at a higher resolution and
            averaging pixel colors when downscaling.
          </p>

          {/* OpenGL Shaders */}
          <h5>OpenGL Shader Pipeline</h5>
          <p>
            After establishing the rasterizer, the project moves onto OpenGL for
            working with CPU VBOs and GPU shaders. I was able to implement
            vertex and fragment shaders that control lighting, texturing, and
            vertex deformation.
          </p>
          <ul>
            <li>
              <strong>Lambertian Lighting:</strong> Implements diffuse
              reflection on surfaces by calculating the dot product of surface
              normals and light vectors.
            </li>
            <li>
              <strong>Matcap Texture Mapping:</strong> Maps 2D material capture
              textures to model surfaces to simulate complex material
              appearances without computing expensive lighting in real-time.
            </li>
            <li>
              <strong>Vertex Deformation Shader:</strong> Animates the surface
              geometry using math functions to create dynamic effects such as
              wobbling/melting.
            </li>
          </ul>

          {/* Pixelation Post-Process Shader */}
          <h5>Pixelation Post-Process Shader</h5>
          <p>
            The post-processing stage uses fragment shaders to manipulate the
            final image. One notable shader implemented is a pixelation/mosaic
            effect using Worley noise sampling, where each cell of the UV grid
            is sampled and color values are interpolated over time to create a
            dynamic, pulsating pixel look.
          </p>
          <div className="code">
            <SyntaxHighlighter
              language={"glsl"}
              style={oneDark}
              showLineNumbers={false}
              wrapLines={true}
            >{`#version 330 core

uniform ivec2 u_Dimensions;
uniform float u_Time;

in vec2 fs_UV;

out vec3 color;

uniform sampler2D u_Texture;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)),
                 dot(p, vec2(269.5,183.3))))
                 * 43758.5453);
}

void main()
{
    // For the mosaic effect, the image's color was sampled at each
    // fragment's Worley cell center then used to fill the cell it fell within.
    int dim = 96;

    vec2 gridUV = fs_UV * dim; // grid scaled from 1x1 -> dim x dim
    vec2 uvInt = floor(gridUV);
    vec2 uvFract = fract(gridUV);

    vec2 gridPointOffset = random2(uvInt);
    vec2 baseTexturePoint = (uvInt + gridPointOffset) / dim; 

    // sample the color at this grid cell so all 
    // pixels within this UV cell get same color
    vec3 baseGridColor = texture(u_Texture, baseTexturePoint).rgb; 
                                                                   
    vec2 pulsingOffset = gridPointOffset + 0.25f * sin(uvInt.xy + u_Time * 0.1f);
    vec2 shiftedTexturePoint = (uvInt + pulsingOffset) / dim; 
    vec3 shiftedGridColor = texture(u_Texture, shiftedTexturePoint).rgb;

    color = mix(baseGridColor, shiftedGridColor, 0.6f);
}`}</SyntaxHighlighter>
          </div>

          <p>
            This shader demonstrates how post-processing can transform a
            standard render into a stylized, visually engaging effect. Similar
            shaders were implemented for Gaussian blur and Sobel edge detection.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RasterizerShaders;
