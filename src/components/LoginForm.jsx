// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../config/Axios";
import { useUser } from "../context/UserContext";
import "./LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/User/login", {
        email,
        peoplePassword: password,
      });

      if (response.data && response.data.user) {
        const userData = {
          id: response.data.user.idUser || response.data.user.idCompany,
          idPeople: response.data.user.idPeople || null,
          token: response.data.token,
          accountType: response.data.user.idUser ? "user" : "company"
        };

        login(userData); // Guarda los datos de usuario en el contexto
        setErrorMessage("");
        navigate("/home");
      } else {
        setErrorMessage("Unexpected response format. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Incorrect user, please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">User Login</h2>
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
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
