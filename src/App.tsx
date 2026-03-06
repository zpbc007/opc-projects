import { useState, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { ProjectList } from './components/ProjectList/ProjectList';
import { loadAllProjects, filterProjects, sortProjects } from './utils/dataLoader';
import './App.css';

function App() {
  const allProjects = useMemo(() => loadAllProjects(), []);

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
      <Header
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={setSearchQuery}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />
      <main className="main-content">
        <ProjectList projects={displayedProjects} />
      </main>
    </div>
  );
}

export default App;