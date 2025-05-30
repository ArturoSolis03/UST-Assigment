import { useState } from 'react';
import { Project } from './Projects';
import PropTypes from 'prop-types';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../ProjectForm';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects}: ProjectListProps) {

  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
     setProjectBeingEdited(project);
   };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  return (
      <div className="row">
     {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm onCancel={cancelEditing} project={project}/>
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );

}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
 };

export default ProjectList;