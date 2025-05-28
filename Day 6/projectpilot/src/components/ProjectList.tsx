import { useState } from 'react';
import { Project } from './Projects';
import PropTypes from 'prop-types';
import ProjectCard from '../ProjectCard';
import ProjectForm from '../ProjectForm';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects}: ProjectListProps) {

  const [projectBeingEdited, setProjectBeingEdited] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
     setProjectBeingEdited(project);
   };

  const cancelEditing = () => {
    setProjectBeingEdited(null);
  };


  return (
      <div className="project-list">
  {projects.map(project => (
<ProjectCard
      key={project.id}
      project={project}
      onEdit={handleEdit}
    />
  ))}
</div>
  );

}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired
 };

export default ProjectList;