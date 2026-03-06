import { ChangeEvent } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './Header.css';

interface HeaderProps {
  searchQuery: string;
  sortBy: 'date' | 'name' | 'rating';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (query: string) => void;
  onSortByChange: (sortBy: 'date' | 'name' | 'rating') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  theme: ReturnType<typeof useTheme>;
}

export function Header({
  searchQuery,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
  theme,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">OPC Projects - 一人公司项目列表</h1>
        <div className="theme-controls">
          <button
            className="theme-btn"
            onClick={() => theme.setTheme('system')}
            title="跟随系统"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </button>
          <button
            className={`theme-btn ${theme.theme === 'light' ? 'active' : ''}`}
            onClick={() => theme.setTheme('light')}
            title="浅色模式"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
          <button
            className={`theme-btn ${theme.theme === 'dark' ? 'active' : ''}`}
            onClick={() => theme.setTheme('dark')}
            title="深色模式"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="header-controls">
        <input
          type="text"
          className="search-input"
          placeholder="搜索项目名称、描述或洞察..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
        <div className="select-group">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'date' | 'name' | 'rating')}
          >
            <option value="date">按日期排序</option>
            <option value="name">按名称排序</option>
            <option value="rating">按评分排序</option>
          </select>
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
          >
            <option value="desc">降序</option>
            <option value="asc">升序</option>
          </select>
        </div>
      </div>
    </header>
  );
}