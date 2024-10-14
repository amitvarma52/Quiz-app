/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/AddQuestion.css";

const AddQuestion = () => {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const navigate = useNavigate();

  const topics = [
    "Math",
    "Science",
    "History",
    "Literature",
    "Geography",
    "IT",
    "Art",
  ];
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin-login");
    }
  });
  const handleAddQuestion = async () => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      alert("You must be logged in as an admin to add a question.");
      return;
    }

    const optionsArray = options.split(",").map((opt) => opt.trim());

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/quiz/admin/add-question",
        {
          topic,
          question,
          options: optionsArray,
          answer: correctOption,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log("Question added successfully:", response.data);
      alert("Question added successfully!");

      setTopic("");
      setQuestion("");
      setOptions("");
      setCorrectOption("");
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin-login");
  };

  return (
    <div className="add-question-container">
      <h2 className="add-question-title">Add Question</h2>
      <div className="add-question-form">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="add-question-select"
        >
          <option value="" disabled>
            Select Topic
          </option>
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="add-question-textarea"
        />
        <input
          type="text"
          placeholder="Options (comma-separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          className="add-question-input"
        />
        <input
          type="text"
          placeholder="Correct Option"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          className="add-question-input"
        />
        <button onClick={handleAddQuestion} className="add-question-btn">
          Add Question
        </button>
      </div>

      <div className="admin-logout-container">
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
