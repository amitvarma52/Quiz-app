/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/myScore.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyScore = () => {
  const [testRecords, setTestRecords] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [minScore, setMinScore] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const quizToken = localStorage.getItem("quizToken");
    if (!user) {
      navigate("/");
    }
    const fetchTestRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/quiz/user/get-score/${user.name}`,
          {
            headers: {
              Authorization: `Bearer ${quizToken}`, 
            },
          }
        );
        setTestRecords(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test records:", err);
        setError("Failed to fetch test records");
        setLoading(false);
      }
    };

    fetchTestRecords();
  }, [user, navigate]);

  const topics = ["All", ...new Set(testRecords.map((record) => record.topic))];

  const filteredRecords = testRecords.filter((record) => {
    const topicMatch =
      selectedTopic === "All" || record.topic === selectedTopic;
    const scoreMatch = minScore ? record.score >= minScore : true;
    const dateMatch = dateFilter
      ? new Date(record.date).toISOString().split("T")[0] === dateFilter
      : true;

    return topicMatch && scoreMatch && dateMatch;
  });

  if (loading) {
    return <div>Loading test records...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-score-container">
      <h2 className="my-score-title">My Test Records</h2>
      <div className="filter-container">
        <label htmlFor="topic-select">Filter by Topic: </label>
        <select
          id="topic-select"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <label htmlFor="min-score">Min Score: </label>
        <input
          type="number"
          id="min-score"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />

        <label htmlFor="date-filter">Filter by Date: </label>
        <input
          type="date"
          id="date-filter"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <table className="my-score-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index} className="my-score-item">
              <td className="my-score-number">{index + 1}</td>
              <td className="my-score-topic">{record.topic}</td>
              <td className="my-score-score">{record.score}</td>
              <td className="my-score-date">
                {new Date(record.date).toLocaleDateString()}{" "}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyScore;
