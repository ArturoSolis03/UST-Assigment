import React, { useEffect, useState } from "react";
import api from "./api/axios";
import ProjectList from "./components/ProjectList";
import { Project } from "./components/Projects";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        setFilteredProjects(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsPending(false);
        setIsFetching(false);
      }
    };

    fetchProjects();
  }, [page]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project: Project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  return (
    <>
      <h1>Projects</h1>

      <div className="search-bar-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-button"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

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

          <ProjectList projects={filteredProjects} />

          {filteredProjects.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>
              No projects found.
            </p>
          )}

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
                    if (projects.length === 12) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={projects.length !== 12}
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
