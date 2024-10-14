/** @format */

import React, { useRef } from "react";
import axios from "axios";
import "../style/adminLogin.css"; 
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate=useNavigate()
  const handleLogin = async () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    if (!name || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/quiz/admin/login",
        {
          adminName: name,
          adminPass: password,
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("adminToken", response.data); 
      alert("Login successful! You are now logged in as an admin.");
      navigate('/add-question')
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      <div className="admin-login-form">
        <input
          ref={nameRef}
          type="text"
          placeholder="Admin Name"
          className="admin-login-input"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="admin-login-input"
        />
        <button onClick={handleLogin} className="admin-login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
