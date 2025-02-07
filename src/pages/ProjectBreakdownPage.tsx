import { useParams } from "react-router-dom";
import PennPlace from "./projects/PennPlace";
import { PROJECT_METADATA } from "../helpers/constants";
import Storify from "./projects/Storify";
import ErrorPage from "../components/ErrorPage";
import Resurrection from "./projects/Resurrection";
import TravelingSalespersonProblem from "./projects/TravelingSalespersonProblem";
import StudyHungry from "./projects/StudyHungry";
import Echo from "./projects/Echo";

//! react-router and r3f not very good together, canvas won't render in nested routes

function ProjectBreakdownPage() {
  const { slug } = useParams<{ slug?: string }>();

  const componentsMap: Record<string, JSX.Element> = {
    "penn-place": <PennPlace project={PROJECT_METADATA.penn_place} />,
    storify: <Storify project={PROJECT_METADATA.storify} />,
    resurrection: <Resurrection project={PROJECT_METADATA.resurrection} />,
    "traveling-salesperson-visualization": (
      <TravelingSalespersonProblem project={PROJECT_METADATA.tsp_problem} />
    ),
    studyhungry: <StudyHungry project={PROJECT_METADATA.studyhungry} />,
    echo: <Echo project={PROJECT_METADATA.echo} />,
  };

  return slug && componentsMap[slug] ? (
    <>{componentsMap[slug]}</>
  ) : (
    <ErrorPage message={"Project not found."} />
  );
}

export default ProjectBreakdownPage;
