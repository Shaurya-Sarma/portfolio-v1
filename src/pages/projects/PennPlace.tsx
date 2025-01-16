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
        <div className="pb-10">
          <h4 className="heading">Breakdown</h4>
          <h5 className="subheading">Design</h5>
          <p className="text">
            We analyzed Reddit's r/place UI design and tools like three.js's
            editor to create a streamlined and accessible experience. Our
            primary focus was to minimize interactions required to place a
            block, while ensuring smooth usability across devices. We
            prioritized laptop -&gt; mobile -&gt; desktop devices as we expected
            these devices would be the most frequented among our targeted
            userbase.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PennPlace;
