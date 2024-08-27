import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const QUESTIONS_URL = '/questions.json';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch(QUESTIONS_URL)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (showResults) {
    return (
      <div className="container results">
        <h1>Quiz Results</h1>
        <p>Your score: {calculateScore()} / {questions.length}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="container">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div>
        <h2>{currentQuestion.question}</h2>
        <ul>
          {currentQuestion.answers.map((answer, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
//are you a psycopath
//are you handsome
//is your girlfriend cheating on you
//are you a spender or a saver
