import React, { useEffect, useState } from 'react';
import api from './api/axios'; // Asegúrate de tener este archivo configurado
import ProjectList from './components/ProjectList';
 
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchProjects = async () => {
      setIsPending(true);
      setIsFetching(true);
      setError(null);
      try {
        const response = await api.get(`/projects?page=${page}`);
        setProjects(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsPending(false);
        setIsFetching(false);
      }
    };
 
    fetchProjects();
  }, [page]);
 
  return (
<>
<h1>Projects</h1>
 
      {isPending ? (
<div className="center-page">
<span className="spinner primary"></span>
<p>Loading...</p>
</div>
      ) : error ? (
<div className="row">
<div className="card large error">
<section>
<p>
<span className="icon-alert inverse "></span>
                {error}
</p>
</section>
</div>
</div>
      ) : (
<>
          {isFetching && !isPending && (
<span className="toast">Refreshing...</span>
          )}
<ProjectList projects={projects} />
<div className="row">
<div className="col-sm-4">Current page: {page + 1}</div>
<div className="col-sm-4">
<div className="button-group right">
<button
                  className="button"
                  onClick={() => setPage((old) => old - 1)}
                  disabled={page === 0}
>
                  Previous
</button>
<button
                  className="button"
                  onClick={() => {
                    if (projects.length === 10) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={projects.length !== 10}
>
                  Next
</button>
</div>
</div>
</div>
</>
      )}
</>
  );
}
 
export default ProjectsPage;