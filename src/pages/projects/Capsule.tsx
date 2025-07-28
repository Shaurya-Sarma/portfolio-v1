import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const Capsule: React.FC<{ project: Project }> = ({ project }) => {
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
            Leading a team of eight developers/designers, I built Capsule, a web
            application that allows users to create and share interactive 3D
            capsules. These capsules can contain various media types, including
            images and videos. A key focus was on the visual aesthetic,
            experimenting how 3D design can transform the traditional web
            development process.
          </p>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/VcS-ikD9YmM?si=yw62p3ji-Qiqam_j"
            title="Capsule Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <h5>Design</h5>
          <p>
            We were inspired by Japanese gachapon machines which provided the
            core of our design philosophy.
          </p>
          <ul>
            <li>
              <strong>Gachapon Theme</strong>: Memories are stored in capsules,
              similar to how gachapon capsules store toys. Meanwhile, the
              machines themselves represented individual time capsules that can
              be opened to reveal the contents inside.
            </li>
            <li>
              <strong>Playful Color Palette</strong>: Bright, clay-like colors
              enhanced the light-hearted aspect of the design, making it
              visually appealing and engaging for users.
            </li>
            <li>
              <strong>3D Animations</strong>: Combining Blender and Spline,
              allowed us to create bouncy, immersive animations that showcased
              the actions of the user: uploading a memory was inserting a
              capsule into the machine while opening the time capsule was like
              dispensing a toy from a gachapon machine.
            </li>
          </ul>
          <figure>
            <img
              className="rounded-sm shadow-md"
              alt="widget designs"
              src="/images/capsule/gachapon_reference.png"
            />
            <figcaption>
              The iterative design process of our main 3D gachapon machine model
            </figcaption>
          </figure>
          <p>
            We also experimented with customization by allowing users to change
            the colors/styling of each capsule with several preset themes.
          </p>
          <div className="callout">
            We wanted to expand this feature with an interface to allow users to
            personalize their capsules by adding stickers and other widgets
            directly on the 3D model itself but were not able to given the time
            constraint.
          </div>
          <h5>Implementation</h5>
          <p>
            Powered by React Three Fiber, 3D elements are blended in with the
            web UI elements. Users go through a simple login/register process
            and then brought to the main dashboard where they can execute
            several functions: creating time capsules, joining/inviting others
            to a capsule, editing the name or opening date of a capsule,
            uploading files, or triggering the opening of a capsule.
          </p>
          <p>
            Once opened, the memories are displayed in an interactive 3D scene
            where thumbnail images float in a grid-like, parallax space and
            users can click on them to view memories closer.
          </p>
          <p>
            Our backend was largely designed with the intention of storing large
            media files submitted by users. This was achieved by storing these
            files inside a AWS S3 bucket, alongside important metadata. Once a
            capsule was opened, fast retrieval was necessary to display all the
            media files for the interactive 3D experience without forcing the
            user to wait past the animation of the capsule opening. Lastly, all
            user data and timecapsule as stored in a MongoDB database so that
            relevant information for the dashboard could be loaded on sign-in.
          </p>
          <iframe
            className="w-full h-[64vh] my-5 rounded-sm shadow-md"
            src="/documents/capsule_presentation.pdf"
            title="Capsule Presentation"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <h5>Conclusion</h5>
          <p>
            This project was both a technical and creative exploration: blending
            {""}
            <strong> React Three Fiber</strong>, <strong>Blender</strong>, and
            <strong> Spline</strong> to deliver a seamless, engaging experience.
            Our work highlighted the potential of 3D web experiences to
            transform how people create, share, and revisit moments online.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Capsule;
