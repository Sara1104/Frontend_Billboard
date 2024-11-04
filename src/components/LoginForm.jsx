// src/components/LoginForm.jsx
import React, { useState } from "react";
import axiosconexion from "../config/Axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/User/login", {
        email: email,
        peoplePassword: password,
      });
      setErrorMessage("");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error en la respuesta:", error.response.data);
        setErrorMessage(error.response.data.errors?.[0]?.message || "Incorrect user, please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Get Started</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
