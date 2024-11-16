// src/components/CompanyLoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../config/Axios";
import { useUser } from "../context/UserContext"; // Importar el contexto de usuario
import "./LoginForm.css"; // Reutilizamos los mismos estilos de LoginForm
import { Link } from "react-router-dom";

const CompanyLoginForm = () => {
  const { login } = useUser(); // Obtener la función login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/Company/loginCompany", {
        Corporate_Email: email,
        Password: password,
      });

      // Verifica que la respuesta tenga la información necesaria
      if (response.data && response.data.company) {
        const companyData = {
          id: response.data.company.idCompany,
          token: response.data.token,
          accountType: "company", // Especificar el tipo de cuenta como compañía
        };

        // Llamar a la función login del contexto para guardar los datos de la compañía
        login(companyData);

        setErrorMessage("");
        // Redirige a HomePage
        navigate("/home");
      } else {
        setErrorMessage("Unexpected response format. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Incorrect company credentials, please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Company Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Corporate Email *</label>
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

export default CompanyLoginForm;
