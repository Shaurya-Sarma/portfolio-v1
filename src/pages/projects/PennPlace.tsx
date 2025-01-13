import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const PennPlace: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div>
      <ProjectHero project={project} />
    </div>
  );
};

export default PennPlace;
