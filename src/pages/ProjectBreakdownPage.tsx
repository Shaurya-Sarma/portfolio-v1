import { useParams } from "react-router-dom";
import PennPlace from "./projects/PennPlace";
import { PROJECT_METADATA } from "../helpers/constants";
import Storify from "./projects/Storify";
import ErrorPage from "../components/ErrorPage";
import Resurrection from "./projects/Resurrection";
import StudyHungry from "./projects/StudyHungry";
import Echo from "./projects/Echo";
import Capsule from "./projects/Capsule";
import LatticeConfigurator from "./projects/LatticeConfigurator";
import Chromesthesia from "./projects/Chromesthesia";
import RasterizerShaders from "./projects/RasterizerShaders";

//! react-router and r3f not very good together, canvas won't render in nested routes

function ProjectBreakdownPage() {
  const { slug } = useParams<{ slug?: string }>();

  const componentsMap: Record<string, JSX.Element> = {
    "penn-place": <PennPlace project={PROJECT_METADATA.penn_place} />,
    storify: <Storify project={PROJECT_METADATA.storify} />,
    resurrection: <Resurrection project={PROJECT_METADATA.resurrection} />,
    studyhungry: <StudyHungry project={PROJECT_METADATA.studyhungry} />,
    echo: <Echo project={PROJECT_METADATA.echo} />,
    capsule: <Capsule project={PROJECT_METADATA.capsule} />,
    "lattice-configurator": (
      <LatticeConfigurator project={PROJECT_METADATA.lattice_configurator} />
    ),
    chromesthesia: <Chromesthesia project={PROJECT_METADATA.chromesthesia} />,
    "rasterizer-shaders": (
      <RasterizerShaders project={PROJECT_METADATA.rasterizer_shaders} />
    ),
  };

  return slug && componentsMap[slug] ? (
    <>{componentsMap[slug]}</>
  ) : (
    <ErrorPage message={"Project not found."} />
  );
}

export default ProjectBreakdownPage;
