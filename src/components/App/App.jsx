import css from './App.module.css';
import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';
import Feedback from '../Feedback/Feedback';

export default function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = window.localStorage.getItem('saved-reviews');
    if (savedReviews !== null) {
      return JSON.parse(savedReviews);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem('saved-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const updateFeedback = feedbackType => {
    setReviews({
      ...reviews,
      [feedbackType]: reviews[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setReviews({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.wrap}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback reviews={reviews} totalFeedback={totalFeedback}></Feedback>
      ) : (
        <Notification />
      )}
    </div>
  )
}
