import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  const { id, prompt, answers, correctIndex } = question;

  // Countdown timer
  useEffect(() => {
    if (timeRemaining === 0) {
      // Time ran out
      onAnswered(false);
      setTimeRemaining(10); // reset for next question
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Cleanup timeout on unmount or next effect
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset timer
    onAnswered(isCorrect);
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
