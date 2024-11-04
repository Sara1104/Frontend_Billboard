// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../config/Axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/User/login", {
        email: email,
        peoplePassword: password,
      });
      const token = response.data.token;
      
      // Guarda el token en localStorage
      localStorage.setItem("token", token);

      setErrorMessage("");
      // Redirige a HomePage
      navigate("/home");
    } catch (error) {
      setErrorMessage("Incorrect user, please try again.");
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
