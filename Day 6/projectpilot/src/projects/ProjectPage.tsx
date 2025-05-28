
import { useEffect, useState } from 'react';
import { projectAPI } from './ProjectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from '../components/Projects';
import { useParams } from 'react-router-dom'; 
 
function ProjectPage() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ id: string }>(); 
 
 
  const id = params.id;
 
  useEffect(() => {
    if (!id) return; 
 
    setLoading(true);
    setError(null);

    projectAPI
      .find(id) 
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('Error fetching project:', e);
        setError('Failed to load project');
        setLoading(false);
      });
  }, [id]);
 
  return (
<div>
<h1>Project Detail</h1>
 
      {loading && (
<div className="center-page">
<span className="spinner primary"></span>
<p>Loading...</p>
</div>
      )}
 
      {error && (
<div className="card large error">
<section>
<p>
<span className="icon-alert inverse"></span> {error}
</p>
</section>
</div>
      )}
 
      {/* Mostrar el detalle solo si project NO es null */}
      {project && <ProjectDetail key={project.id} project={project} />}
</div>
  );
}
 
export default ProjectPage;