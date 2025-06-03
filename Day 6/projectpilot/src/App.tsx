import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./home/HomePage";
import ProjectsPage from "./ProjectsPage";
import ProjectPage from "./projects/ProjectPage";
import CreateProjectPage from "./CreateProjectPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-left">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          {isAuthenticated && (
            <>
              <NavLink
                to="/projects"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/projects/create"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Create New Project
              </NavLink>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className="navbar-right">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="container p-4">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAuthChange={() => setIsAuthenticated(true)}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/create"
            element={
              <ProtectedRoute>
                <CreateProjectPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
