import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProjectList } from './components/ProjectList/ProjectList';
import { ProjectModal } from './components/ProjectModal/ProjectModal';
import { loadAllProjects, filterProjects, sortProjects } from './utils/dataLoader';
import { useTheme } from './hooks/useTheme';
import { useViewMode } from './hooks/useViewMode';
import { Project } from './types/project';
import './App.css';

function App() {
  const allProjects = useMemo(() => loadAllProjects(), []);
  const theme = useTheme();
  const viewMode = useViewMode();

  // Force light theme in detail mode (for screenshots)
  useEffect(() => {
    if (viewMode.forceLightTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [viewMode.forceLightTheme]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayedProjects = useMemo(() => {
    let result = filterProjects(allProjects, searchQuery);
    result = sortProjects(result, sortBy, sortOrder);
    return result;
  }, [allProjects, searchQuery, sortBy, sortOrder]);

  return (
    <div className="app">
      {viewMode.showHeader && (
        <Header
          searchQuery={searchQuery}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchChange={setSearchQuery}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          theme={theme}
        />
      )}
      <main className="main-content">
        <ProjectList
          projects={displayedProjects}
          onProjectClick={setSelectedProject}
          viewMode={viewMode.mode}
        />
      </main>
      {viewMode.mode !== 'table' && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;