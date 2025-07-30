import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const Resurrection: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        {/* Custom Content */}
        <div className="breakdown pb-10">
          <h5>Full Gameplay</h5>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/lGARJIEoGco?si=KeRuQmbAJqpim_JQ"
            title="Resurrection Gameplay"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>
    </div>
  );
};

export default Resurrection;
