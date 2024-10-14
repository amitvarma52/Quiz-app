/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/startTest.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StartTest = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const topics = [
    "Math",
    "Science",
    "History",
    "Literature",
    "Geography",
    "IT",
    "Art",
  ];

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(topic)) {
        return prevSelected.filter((t) => t !== topic);
      }
      return [...prevSelected, topic];
    });
  };

  const startTest = async () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }

    const topicsString = selectedTopics.join(",");
    const quizToken = localStorage.getItem("quizToken");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/quiz/user/questions/${topicsString}`,
        {
          headers: {
            Authorization: `Bearer ${quizToken}`,
          },
        }
      );
      setQuestions(response.data.data);
      setTestStarted(true);
    } catch (error) {
      console.error("Error starting test:", error);
      alert("Failed to start test. Please try again.");
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const submitTest = async () => {
    let calculatedScore = 0;
    const feedbackData = [];

    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      const isCorrect = userAnswer === question.answer;
      feedbackData.push({
        question: question.question,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
      });
      if (isCorrect) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setFeedback(feedbackData);
    setShowFeedback(true);

    const quizToken = localStorage.getItem("quizToken");

    try {
      await axios.post(
        "http://localhost:8080/api/v1/quiz/user/add-score",
        {
          name: user.name,
          topic: selectedTopics.join(","),
          score: calculatedScore,
        },
        {
          headers: {
            Authorization: `Bearer ${quizToken}`,
          },
        }
      );
      console.log("Test submitted successfully");
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  const clearFeedback = () => {
    setShowFeedback(false);
    setSelectedTopics([]);
    setQuestions([]);
    setAnswers({});
    setTestStarted(false);
    setScore(0);
    setFeedback([]);
  };

  return (
    <div className="start-test-container">
      <h2 className="start-test-title">Start Test</h2>
      {!testStarted ? (
        <div>
          <h3>Select Topics:</h3>
          <div className="topic-selection">
            {topics.map((topic) => (
              <label key={topic} className="topic-option">
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                />
                {topic}
              </label>
            ))}
          </div>
          <button onClick={startTest} className="start-test-button">
            Start Test
          </button>
        </div>
      ) : (
        <div>
          {!showFeedback ? (
            <div>
              <h3>Answer the Questions:</h3>
              <div className="questions-list">
                {questions.map((question, index) => (
                  <div key={question._id} className="question-item">
                    <p>
                      {index + 1}. {question.question}
                    </p>
                    <div className="options-container">
                      {question.options.map((option) => (
                        <label key={option} className="option-label">
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            onChange={() =>
                              handleAnswerChange(question._id, option)
                            }
                            checked={answers[question._id] === option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={submitTest} className="submit-test-button">
                Submit Test
              </button>
            </div>
          ) : (
            <div className="feedback-container">
              <h3>Feedback</h3>
              {feedback.map((item, index) => (
                <div key={index} className="feedback-item">
                  <p>
                    <strong>Question:</strong> {item.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {item.userAnswer} (
                    {item.isCorrect ? "Correct" : "Incorrect"})
                  </p>
                  {!item.isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong> {item.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
              <div className="score-display">
                <p>Your Score: {score}</p>
              </div>
              <button onClick={clearFeedback} className="submit-test-button">
                Okay
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartTest;
