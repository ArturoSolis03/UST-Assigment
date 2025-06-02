import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';
import ProjectsPage from './ProjectsPage';
import ProjectPage from './projects/ProjectPage';
import CreateProjectPage from './CreateProjectPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { useEffect, useState } from 'react';

 
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
 
  // Este useEffect solo debe correr una vez al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };
 
  return (
<BrowserRouter>
<header className="sticky top-0 bg-white shadow-md flex justify-between items-center p-4 z-50">
<div className="flex items-center gap-4">
<img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          {isAuthenticated ? (
<>
<NavLink to="/projects" className="button rounded">
                Projects
</NavLink>
<NavLink to="/projects/create" className="button rounded">
                Create New Project
</NavLink>
<button
                onClick={handleLogout}
                className="logout-button"
>
                Logout
</button>
</>
          ) : (
<>
<NavLink to="/" className="button rounded">
                Home
</NavLink>
</>
          )}
</div>
</header>
 
      <div className="container p-4">
<Routes>
<Route
            path="/"
            element={<HomePage onAuthChange={() => setIsAuthenticated(true)} />}
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