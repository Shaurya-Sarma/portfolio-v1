import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const PublicMusicQueue: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full ">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        {/* Custom Content */}
        <div className="pb-10 breakdown">
          <h5>Demo</h5>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/VTWXVHBlRgg?si=KJABtfpKdybM28LZ"
            title="Public Music Queue Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>
    </div>
  );
};

export default PublicMusicQueue;
