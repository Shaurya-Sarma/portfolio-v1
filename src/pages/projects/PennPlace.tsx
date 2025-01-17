import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PennPlace: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-32 px-8 relative">
        <ProjectHero project={project} />

        {/* Custom Content */}
        <div className="pb-10 breakdown">
          <h5>Breakdown</h5>
          <p>
            After running Penn Place for approximately 2 weeks we had
            <strong> 370 unique users</strong> with over{" "}
            <strong>850+ page views</strong>. We had{" "}
            <strong>32,905 blocks </strong>
            placed throughout the duration of the event. I was happy with how
            creative people got, but left curious how much further this idea
            could have been taken given a wider or different, more niche
            audience.
          </p>
          <p>
            Near the end, our system seemed to have some rendering lag issues
            due to the number of voxels placed, but I hypothesize it was a
            front-end optimization issue rather than back-end data storage.
          </p>
          <h5>Design</h5>
          <p>
            We analyzed Reddit's r/place UI design and tools like{" "}
            <a href="https://threejs.org/editor/">three.js's editor</a> to
            create a streamlined and accessible experience.
          </p>
          <div className="callout">
            Our design philosophy was to <i>minimize</i> the number of
            interactions to place a block
          </div>
          <figure>
            <img
              className="w-full my-3 rounded-sm shadow-md"
              alt="userflow animation"
              src="/images/penn-place/userflow.gif"
            />
            <figcaption>
              An old iteration of the workflow where placing the block took
              multiple clicks. This got simplified to a single click.
            </figcaption>
          </figure>
          <h6>User experience</h6>
          <p>
            This is evident in the user experience within the website and the
            relevant UI components. With minimalism and incorporating popular UI
            trends like glassmorphism, we established a clean aesthetic while
            using up little screen space. Key features included:
          </p>
          <ul>
            <li>
              <strong>Toolbar</strong>: For quick access to essential actions.
            </li>
            <li>
              <strong>Mode Slider</strong>: To toggle between building and
              moving.
            </li>
            <li>
              <strong>Quick Guide</strong>: Simple onboarding for first-time
              users.
            </li>
            <li>
              <strong>Color Palette</strong>: Easy color selection for voxel
              placement.
            </li>
            <li>
              <strong>Feedback Button</strong>: To collect user suggestions.
            </li>
            <li>
              <strong>Rate Limiting</strong>: Prevent spam placing/deleting by
              tracking CPS.
            </li>
          </ul>
          <figure>
            <img
              className="w-full my-3 rounded-sm shadow-md"
              alt="widget designs"
              src="/images/penn-place/editing_mode.png"
            />
            <figcaption>
              An early example of the desktop UI, prioritizing on being
              functional and minimal
            </figcaption>
          </figure>
          <h6>Device Management</h6>
          <p>
            We also considered how the user experience might differ from device
            to device (screen space, input devices) as moving through a 3D
            viewport varies depending on a device-basis. However, it was halfway
            through development that we realized our target audience, mainly
            college students, would likely interact with the website via their
            phones first (and hopefully check it out on their laptops
            afterwards).
          </p>
          <p>
            Despite this, we also acknowledged that developing an interactive 3D
            experience is inherently limited on mobile screens due to touch
            controls. We resorted to prioritizing the devices in the following
            order:
          </p>
          <ol>
            <li>
              <strong>Laptops with Trackpads</strong>: Optimized two-finger
              panning and zoom.
            </li>
            <li>
              <strong>Mobile/Tablet</strong>: Basic compatibility for first-time
              interactions.
            </li>
            <li>
              <strong>Desktops</strong>: Tailored for most convienent experience
              due to mouse input
            </li>
          </ol>
          <h5 className="heading">Implementation</h5>
          <p>
            The origination of Penn Place came from extending{" "}
            <a href="https://www.reddit.com/r/place/">r/place</a> from
            2-dimensions to 3-dimensions. This would require the addition of a{" "}
            <i>z-axis</i> and converting pixels into <i>voxels</i>.
          </p>
          <h6>Voxel Placement</h6>
          <p>
            I started off by subdiving a 2D plane mesh where a voxel could be
            placed in each cell. By raycasting the mouse position and flooring
            the coordinates according to the grid's cell dimensions, we created
            a snapping mechanism with the mouse cursor.
          </p>
          <pre>
            <SyntaxHighlighter
              language={"typescript"}
              style={oneDark}
              showLineNumbers={true}
              wrapLines={true}
            >{`// Math to determine where voxel should be on the grid
if (intersect.face) {
  voxel.position.copy(intersect.point).add(intersect.face.normal);
  voxel.position
    .divideScalar(VOXEL_SIZE)
    .floor()
    .multiplyScalar(VOXEL_SIZE)
    .addScalar(VOXEL_SIZE / 2);
}`}</SyntaxHighlighter>
          </pre>
          <p>
            To extend this into 3-dimensions, we decided to implement block
            placement similar to <i>Minecraft</i>. Blocks can be placed anywhere
            on the 2D "ground" plane but to build vertically, a voxel must be
            originally connected to an adjacent voxel. This meant we had to
            adjust our voxel placement algorithm to use the normals of other
            voxel meshes. By summing the normal face vector, we were able to
            calculate a new voxel position that extended into the z-axis.
          </p>
          <p>
            <i>Aside:</i> The{" "}
            <a href="https://www.nature.com/articles/s41598-020-70427-x">
              moiré effect
            </a>{" "}
            was an problem we encountered with the visual aspect of the plane.
            It created a harsh intersection of lines from faraway distances and
            to minimize this we grayed out the lines (reducing the opacity) to
            make the plane more visually pleasing. We experimented with the idea
            of extending our plane to an infinite width/length and using shaders
            to blur/fade out the lines at far distances.
          </p>
          <div className="callout">
            We chose not to follow this approach. An infinite canvas would have
            created issues for the backend (more below).
          </div>
          <h6>Backend Architecture</h6>
          <p>
            WebSockets were integral to building the real-time functionality of
            Penn Place. If user 1 placed a block, then user 2 should be able to
            see this update to the canvas instantaneously. This was essential to
            the collaborative nature of the experiment we wanted to run.
          </p>
          <p>
            But for this to sync between all users we needed to store all the
            data in an effective, compact manner. Reddit's{" "}
            <a href="https://redditinc.com/blog/how-we-built-rplace">
              blog post
            </a>{" "}
            was integral in designing our version of Penn Place's backend. We
            spoke with one of the backend devs on Reddit's r/place to gain a
            better understanding of the backend architecture so that we could
            implement a similar scalable structure for Penn Place. We were then
            able to identify two key differences:
          </p>
          <ol>
            <li>
              We were going have a significantly smaller number of users than
              Reddit
            </li>
            <li>
              We had 1,097,152 additional "pixel" locations due to 3 dimensions
              (128 x 128 x 128 grid)
            </li>
          </ol>
          <p>
            {" "}
            Nevertheless, we wanted to design the backend so it could be scaled
            if needed in the future. We utilized MongoDB as a{" "}
            <i>long-term persistent database</i> and Redis as a{" "}
            <i>distributed cache system</i> to serve users the canvas state with
            low load times.
          </p>
          <div className="callout">
            Storing the metadata of every voxel placement (i.e. coordinates,
            color, time placed) allow us to reconstruct a timelapse locally by
            iterating through all data objects. Also, it provided a backup copy
            of the data.
          </div>
          <p>
            We leveraged{" "}
            <a href="https://redis.io/docs/latest/develop/data-types/bitfields/">
              Redis's bitfields
            </a>{" "}
            which meant we had to store our entire canvas state within one
            binary sequence. We let a 4-bit integer represent the color of each
            voxel location (16 colors). So we had 128 x 128 x 128 x 4 integer
            long binary sequence that stored our voxel color data. Then, we
            implicitly stored the (x,y,z) data based on a 4-bit integer's
            location in the binary string via an offset function:{" "}
            <SyntaxHighlighter
              language={"typescript"}
              style={oneDark}
              showLineNumbers={false}
              wrapLines={true}
            >{`// helper function to calculate the offset for a voxel
const getOffset = (x, y, z) => {
  return x + BOARD_SIZE * z + BOARD_SIZE * BOARD_SIZE * y;
};`}</SyntaxHighlighter>{" "}
            This allowed us to flatten our 3D canvas into a 1D binary sequence.
            With the offset function and some binary manipulation, I was able to
            write a deserializer to extract the data from its binary
            representation:
          </p>
          <SyntaxHighlighter
            language={"typescript"}
            style={oneDark}
            showLineNumbers={false}
            wrapLines={true}
          >{`// take bit representation of board and return array of voxels
export const deserializeVoxels = (binaryVoxels) => {
  const voxelData = [];

  // loop through the binary string in increments of 4-bits
  for (let offset = 0; offset < binaryVoxels.length; offset += 4) {
    const colorBinary = binaryVoxels.slice(offset, offset + 4);

    // skip since voxel is "transparent" so doesn't exist
    if (colorBinary === "1111") {
      continue;
    }

    const linearIndex = offset / 4;
    const y = Math.floor(linearIndex / (BOARD_SIZE * BOARD_SIZE));
    const remainingAfterY = linearIndex % (BOARD_SIZE * BOARD_SIZE);
    const z = Math.floor(remainingAfterY / BOARD_SIZE);
    const x = remainingAfterY % BOARD_SIZE;

    const color = binToColors[colorBinary];

    // Push the voxel object to the voxelData array
    voxelData.push({ x, y, z, color });
  }

  return voxelData;
};`}</SyntaxHighlighter>{" "}
          <p>
            The combination of MongoDB and Redis allowed us to deploy Penn Place
            and handle multiple websocket connections despite using a
            single-server backend. However, this was designed to allow for a
            multiple-server backend to be created easily in the future.
          </p>
          <h5>Conclusion</h5>
          <p>
            This idea came about as a way to combine interactive 3D art with
            Penn's campus culture, letting students collectively shape a unique
            visual experience. It was exciting to see how three.js could be used
            on the web
          </p>
        </div>
      </main>
    </div>
  );
};

export default PennPlace;
