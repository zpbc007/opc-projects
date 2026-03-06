import { Project } from '../../types/project';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="project-card">
      <h2 className="project-card-title">{project.name}</h2>
      <time className="project-card-date" dateTime={project.created_at}>
        {formatDate(project.created_at)}
      </time>

      <div className="project-card-section">
        <div className="project-card-label">描述</div>
        <p className="project-card-description">{project.description}</p>
      </div>

      <div className="project-card-section">
        <div className="project-card-label">洞察</div>
        <p className="project-card-insight">{project.insight}</p>
      </div>
    </article>
  );
}