import { useEffect, useState } from "react";
import "../styles/App.css";
import Options from "./Options.jsx";
import Feedback from "./Feedback.jsx";
import Notification from "./Notification.jsx";

export default function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("saved-reviews");
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
    localStorage.setItem("saved-reviews", JSON.stringify(reviews));
  }, [reviews]);

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const updateFeedback = (feedbackType) => {
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
    <>
      <div className="app">
        <div>
          <h1>Sip Happens Café</h1>
          <p>
            Please leave your feedback about our service by selecting one of the
            options below.
          </p>
        </div>
        <Options
          updateFeedback={updateFeedback}
          resetFeedback={resetFeedback}
          totalFeedback={totalFeedback}
        />
        {totalFeedback > 0 ? (
          <Feedback reviews={reviews} totalFeedback={totalFeedback} />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}
