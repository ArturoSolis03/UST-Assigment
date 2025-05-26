import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProjectsPage from './ProjectsPage';
import { MOCK_PROJECTS } from './components/MockProjects';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router';
import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';
import CreateProjectPage from './CreateProjectPage';

function App() {

  return (
    <BrowserRouter>
    <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/"  className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
        <NavLink to="/projects/create" className="button rounded">
          Create Project
        </NavLink>
      </header>
      <div className="container">
        <Routes>
         <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/projects/create" element={<CreateProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
