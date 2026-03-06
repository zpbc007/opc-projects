import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProjectList } from './components/ProjectList/ProjectList';
import { loadAllProjects, filterProjects, sortProjects } from './utils/dataLoader';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const allProjects = useMemo(() => loadAllProjects(), []);
  const theme = useTheme();

  // Screenshot mode: hide header and force light theme
  const isScreenshotMode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('screenshot') === '1';
  }, []);

  // Force light theme in screenshot mode
  useEffect(() => {
    if (isScreenshotMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isScreenshotMode]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const displayedProjects = useMemo(() => {
    let result = filterProjects(allProjects, searchQuery);
    result = sortProjects(result, sortBy, sortOrder);
    return result;
  }, [allProjects, searchQuery, sortBy, sortOrder]);

  return (
    <div className="app">
      {!isScreenshotMode && (
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
        <ProjectList projects={displayedProjects} />
      </main>
    </div>
  );
}

export default App;