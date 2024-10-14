/** @format */

import React, { useState } from "react";
import "../style/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  userActions } from "../store/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("quizDetail");
    localStorage.removeItem("quizToken");
    dispatch(userActions.delete());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">Quiz Game</div>
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul>
          {user && (
            <li>
              <Link to="/start-test">Start Test</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/my-score">My Score</Link>
            </li>
          )}
          <li>
            <Link to="/leader-board">Leaderboard</Link>
          </li>
        </ul>
        {!user ? (
          <button className="login-btn">
            <Link to="/" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </button>
        ) : (
          <button
            className="login-btn"
            style={{ backgroundColor: "red" }}
            onClick={handleLogout}
          >
            <Link style={{ textDecoration: "none" }}>Log-out</Link>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
