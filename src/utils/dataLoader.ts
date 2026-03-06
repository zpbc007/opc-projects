import { Project } from '../types/project';

const dataModules = import.meta.glob<{ default: Project[] }>(
  '../data/*.json',
  { eager: true }
);

export function loadAllProjects(): Project[] {
  const allProjects: Project[] = [];

  for (const path in dataModules) {
    const module = dataModules[path];
    if (module?.default) {
      allProjects.push(...module.default);
    }
  }

  // 按创建时间降序排列
  return allProjects.sort((a, b) =>
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
  sortBy: 'date' | 'name',
  order: 'asc' | 'desc'
): Project[] {
  return [...projects].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else {
      comparison = a.name.localeCompare(b.name, 'zh-CN');
    }

    return order === 'asc' ? comparison : -comparison;
  });
}