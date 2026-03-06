import { Project } from '../../types/project';
import { StarRating } from '../StarRating/StarRating';
import { formatDate } from '../../utils/format';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const truncateDescription = (text: string, maxLen = 50) => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + '...';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const displayScore = project.final_score ?? project.rating;

  return (
    <article
      className="project-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="project-card-header">
        <h2 className="project-card-title">{project.name}</h2>
        <StarRating score={displayScore} size="sm" />
      </div>
      <time className="project-card-date" dateTime={project.created_at}>
        {formatDate(project.created_at)}
      </time>

      <p className="project-card-preview">
        {truncateDescription(project.description, 50)}
      </p>
    </article>
  );
}