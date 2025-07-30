import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const TravelingSalespersonProblem: React.FC<{ project: Project }> = ({
  project,
}) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-20 px-8 relative">
        <ProjectHero project={project} />

        {/* Custom Content */}
        <div className="pb-10"></div>
      </main>
    </div>
  );
};

export default TravelingSalespersonProblem;
