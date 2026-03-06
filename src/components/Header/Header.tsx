import { ChangeEvent } from 'react';
import './Header.css';

interface HeaderProps {
  searchQuery: string;
  sortBy: 'date' | 'name';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (query: string) => void;
  onSortByChange: (sortBy: 'date' | 'name') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export function Header({
  searchQuery,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
}: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">OPC Projects - 一人公司项目列表</h1>
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
            onChange={(e) => onSortByChange(e.target.value as 'date' | 'name')}
          >
            <option value="date">按日期排序</option>
            <option value="name">按名称排序</option>
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