import css from './Feedback.module.css';

export default function Feedback({ reviews, totalFeedback, positive }) {
    const { good, neutral, bad } = reviews;

    return (
      <div className={css.result}>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {totalFeedback}</p>
        <p>Positive: {positive}%</p>
      </div>
    );
  }