/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/LeaderBoard.css";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/quiz/user/scores"
        );
        setUsers(response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const topics = ["All", ...new Set(users.map((user) => user.topic))];

  const filteredUsers =
    selectedTopic === "All"
      ? users
      : users.filter((user) => user.topic === selectedTopic);

  const sortedUsers = filteredUsers.sort((a, b) => b.score - a.score);

  const getMedalIcon = (index) => {
    if (index === 0) return "💎";
    if (index === 1) return "🥇"; 
    if (index === 2) return "🥈"; 
    return `${index + 1}.`;
  };

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leader Board</h2>
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
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="leaderboard-item">
              <td className="leaderboard-rank">{getMedalIcon(index)}</td>
              <td className="leaderboard-name">{user.name}</td>
              <td className="leaderboard-topic">{user.topic}</td>
              <td className="leaderboard-score">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
