import { Project } from '../../types/project';
import { EmptyState } from '../EmptyState/EmptyState';
import './ProjectTable.css';

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  if (projects.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="project-table-wrapper">
      <table className="project-table">
        <thead>
          <tr>
            <th className="col-name">名称</th>
            <th className="col-score">评分</th>
            <th className="col-description">描述</th>
            <th className="col-insight">洞察</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="project-row">
              <td className="col-name">{project.name}</td>
              <td className="col-score">{project.final_score ?? '-'}</td>
              <td className="col-description">{project.description}</td>
              <td className="col-insight">{project.insight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}