import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

const ProjectBreakdownPage = () => {
  const { slug } = useParams();

  try {
    const ProjectBreakdown = React.lazy(
      () => import(`../pages/projects/${slug}/index.tsx`)
    );

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectBreakdown />
      </Suspense>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ProjectBreakdownPage;
