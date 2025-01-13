import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const PennPlace: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div>
      <ProjectHero project={project} />
      <div className="mb-5">
        <h4 className="text-lg uppercase font-semibold mb-3">Breakdown</h4>
        <p className="text-lg font-medium">Lorem ipsum</p>
      </div>
    </div>
  );
};

export default PennPlace;
