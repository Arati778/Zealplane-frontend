import React, { useEffect, useState } from 'react';
import DetailsPage from './DetailsPage/DetailsPage';
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data, loading, error } = useFetch(`${apiBaseUrl}/projects/${projectId}`);

  useEffect(() => {
    if (data) {
      setProjectData(data);
    }
  }, [data]);

  return (
    <div>
      {loading && <p>Loading project details...</p>}
      {error && <p>Error: {error.message}</p>}
      {projectData && (
        <>
          <DetailsPage project={projectData} />
        </>
      )}
    </div>
  );
}

export default ProjectPage;
