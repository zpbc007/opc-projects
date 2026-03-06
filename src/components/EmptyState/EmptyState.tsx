import './EmptyState.css';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = '没有找到项目',
  message = '尝试调整搜索条件'
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}