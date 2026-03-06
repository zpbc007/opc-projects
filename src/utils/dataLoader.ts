import { Project } from '../types/project';
import dbData from '../data/db.json';

export function loadAllProjects(): Project[] {
  return dbData.sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function filterProjects(projects: Project[], query: string): Project[] {
  if (!query.trim()) return projects;

  const lowerQuery = query.toLowerCase();
  return projects.filter(project =>
    project.name.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.insight.toLowerCase().includes(lowerQuery)
  );
}

export function sortProjects(
  projects: Project[],
  sortBy: 'date' | 'name' | 'rating',
  order: 'asc' | 'desc'
): Project[] {
  return [...projects].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name, 'zh-CN');
    } else if (sortBy === 'rating') {
      const aRating = a.final_score ?? a.rating ?? 0;
      const bRating = b.final_score ?? b.rating ?? 0;
      comparison = aRating - bRating;
    }

    return order === 'asc' ? comparison : -comparison;
  });
}