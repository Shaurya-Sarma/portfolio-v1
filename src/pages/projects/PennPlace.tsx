import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

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
          <img
            className="w-full my-3 rounded-sm shadow-md"
            alt="userflow animation"
            src="/images/penn-place/userflow.gif"
          />
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
          <img
            className="w-full my-3 rounded-sm shadow-md"
            alt="widget designs"
            src="/images/penn-place/editing_mode.png"
          />
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
          <h5 className="subheading">3D Voxel Canvas</h5>
          <h5 className="subheading">Backend Architecture</h5>
        </div>
      </main>
    </div>
  );
};

export default PennPlace;
