import { useState } from "react";
import { Project } from "./components/Projects";
import { Link } from "react-router";
import { projectAPI } from "./projects/ProjectAPI";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete?: () => void;
}

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit, onDelete } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${project.name}"`
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("accessToken");

        await projectAPI.delete(project.id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (onDelete) {
          onDelete();
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting a project", error);
        alert("Failed to delete project. Please make sure you're signed in.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProject({
      ...editedProject,
      [name]: name === "budget" ? parseFloat(value) : value,
      isNew: editedProject.isNew,
    });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await projectAPI.update(editedProject.id, editedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
      setIsEditing(false);
      onEdit(editedProject);
    } catch (error) {
      console.error("Error updating project", error);
      alert("Failed to update project. Please make sure you're signed in.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProject(project);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        {!isEditing ? (
          <>
            <Link to={`/projects/${project.id}`}>
              <h5 className="strong">
                <strong>{project.name}</strong>
              </h5>
              <p>{formatDescription(project.description)}</p>
              <p>Budget : {project.budget.toLocaleString()}</p>
            </Link>
            <button
              type="button"
              className="bordered"
              onClick={() => setIsEditing(true)}
            >
              <span className="icon-edit "></span>
              Edit
            </button>
            <button
              type="button"
              className="bordered"
              onClick={handleDeleteClick}
              style={{ marginLeft: "0.5rem", color: "red" }}
            >
              <span
                className="fas fa-trash"
                style={{ marginRight: "8px" }}
              ></span>{" "}
              Delete
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={editedProject.name}
              onChange={handleInputChange}
              placeholder="Project Name"
            />
            <textarea
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
            />
            <input
              type="number"
              name="budget"
              value={editedProject.budget}
              onChange={handleInputChange}
              placeholder="Budget"
            />
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={handleSaveClick} className="bordered">
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bordered"
                style={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default ProjectCard;
