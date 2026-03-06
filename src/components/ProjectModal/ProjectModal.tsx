import { Project } from '../../types/project';
import { StarRating } from '../StarRating/StarRating';
import { formatDate } from '../../utils/format';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scoreDimensions = [
    { key: 'product_score', brief: 'product_brief', label: '产品' },
    { key: 'dev_score', brief: 'dev_brief', label: '开发' },
    { key: 'marketing_score', brief: 'marketing_brief', label: '市场' },
    { key: 'ops_score', brief: 'ops_brief', label: '运营' },
    { key: 'optimist_score', brief: 'optimist_brief', label: '乐观' },
    { key: 'pessimist_score', brief: 'pessimist_brief', label: '悲观' },
  ] as const;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="project-modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="project-modal-content">
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>

        <header className="project-modal-header">
          <h2 id="project-modal-title">{project.name}</h2>
          <div className="project-modal-meta">
            <time dateTime={project.created_at}>
              创建于 {formatDate(project.created_at)}
            </time>
            {project.scored_at && (
              <span className="project-modal-scored">
                评分于 {formatDate(project.scored_at)}
              </span>
            )}
          </div>
        </header>

        <div className="project-modal-body">
          <section className="project-modal-section">
            <h3>描述</h3>
            <p>{project.description}</p>
          </section>

          <section className="project-modal-section">
            <h3>洞察</h3>
            <p className="project-modal-insight">{project.insight}</p>
          </section>

          {project.final_score !== undefined && (
            <section className="project-modal-section project-modal-final">
              <h3>综合评分</h3>
              <div className="project-modal-final-score">
                <StarRating score={project.final_score} size="lg" showValue />
              </div>
            </section>
          )}

          <section className="project-modal-section">
            <h3>维度评分</h3>
            <div className="project-modal-scores">
              {scoreDimensions.map(({ key, brief, label }) => {
                const score = project[key] as number | undefined;
                const briefText = project[brief] as string | undefined;
                if (score === undefined) return null;
                return (
                  <div key={key} className="project-modal-score-item">
                    <div className="project-modal-score-header">
                      <span className="project-modal-score-label">{label}</span>
                      <StarRating score={score} size="sm" showValue />
                    </div>
                    {briefText && (
                      <p className="project-modal-score-brief">{briefText}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}