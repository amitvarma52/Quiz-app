/** @format */

import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "../style/login.css";
import { userActions } from "../store/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/quiz/user/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("quizDetail", JSON.stringify(response.data.user));
      localStorage.setItem("quizToken", response.data.token);
      dispatch(userActions.initial(response.data.user));
      
      navigate("/start-test");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
      </div>
      <p className="register-prompt">
        Don't have an account?
        <Link to="/register" className="register-link">
          Register!
        </Link>
      </p>
    </div>
  );
};

export default Login;
