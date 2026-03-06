import { Project } from '../../types/project';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { ProjectTable } from '../ProjectTable/ProjectTable';
import { EmptyState } from '../EmptyState/EmptyState';
import { ViewMode } from '../../types/view-mode';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  viewMode?: ViewMode;
}

export function ProjectList({ projects, onProjectClick, viewMode = 'card' }: ProjectListProps) {
  // Table mode: use ProjectTable component
  if (viewMode === 'table') {
    return <ProjectTable projects={projects} />;
  }

  // Card mode
  if (projects.length === 0) {
    return (
      <div className="project-list">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="project-list">
      {viewMode === 'card' && (
        <div className="project-count">
          共 {projects.length} 个项目
        </div>
      )}
      <div className="project-list-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        ))}
      </div>
    </div>
  );
}