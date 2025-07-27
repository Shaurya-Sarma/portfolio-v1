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
        <div className="pb-10"></div>
      </main>
    </div>
  );
};

export default Capsule;
