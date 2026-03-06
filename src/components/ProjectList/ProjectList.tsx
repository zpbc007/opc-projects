import { Project } from '../../types/project';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="project-list">
        <div className="project-list-empty">
          <h3>没有找到项目</h3>
          <p>尝试调整搜索条件</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-list">
      <div className="project-count">
        共 {projects.length} 个项目
      </div>
      <div className="project-list-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}