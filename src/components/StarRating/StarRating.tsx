import './StarRating.css';

interface StarRatingProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export function StarRating({
  score,
  maxScore = 10,
  size = 'md',
  showValue = false
}: StarRatingProps) {
  const maxStars = 5;
  const filledStars = Math.round((score / maxScore) * maxStars);

  return (
    <div className={`star-rating star-rating--${size}`}>
      <div className="star-rating__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star-rating__star ${star <= filledStars ? 'star-rating__star--filled' : ''}`}
          >
            ★
          </span>
        ))}
        {showValue && (
          <span className="star-rating__value">{score}</span>
        )}
      </div>
    </div>
  );
}