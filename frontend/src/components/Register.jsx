/** @format */

import React, { useRef } from "react";
import axios from "axios";
import "../style/register.css"; 
import { Link, useNavigate } from "react-router-dom"; 

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/quiz/user/register",
        userData
      );
      console.log("Registration Successful", response.data);

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";

      navigate("/");
    } catch (error) {
      console.error("Registration Failed", error.response.data);
      
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameRef} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="register-prompt">
        Already have an account?
        <Link to="/" className="register-link">
          Login!
        </Link>
      </p>
    </div>
  );
};

export default Register;
