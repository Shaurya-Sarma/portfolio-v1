import { useParams } from "react-router-dom";
import { PROJECT_METADATA } from "../helpers/constants";
import * as ProjectComponents from "./projects"; // Import all project components

const ProjectBreakdownPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Check if the project exists in both components and metadata
  const ProjectComponent =
    ProjectComponents[slug as keyof typeof ProjectComponents];
  const projectMetadata =
    PROJECT_METADATA[slug as keyof typeof PROJECT_METADATA];

  let projectComponent;
  console.log(projectComponent);
  if (ProjectComponent && projectMetadata) {
    // Render the component with the associated metadata
    projectComponent = <ProjectComponent project={projectMetadata} />;
  } else {
    // Show NotFound component if slug doesn't match
    projectComponent = <NotFound />;
  }

  return <div>{projectComponent}</div>;
};

const NotFound = () => <div>Project Not Found</div>;

export default ProjectBreakdownPage;
