import { Project } from './Projects';
import ProjectCard from '../ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
}

export default ProjectList;