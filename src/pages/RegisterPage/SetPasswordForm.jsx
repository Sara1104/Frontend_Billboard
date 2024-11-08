// src/components/SetPasswordForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./SetPasswordForm.css";

const SetPasswordForm = () => {
  const [peoplePassword, setPeoplePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Obtener `peopleId` desde `localStorage`
  const peopleId = localStorage.getItem("peopleId");

  useEffect(() => {
    if (!peopleId) {
      setErrorMessage("No person ID found. Please register again.");
    }
  }, [peopleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (peoplePassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosconexion.post("/User", {
        peopleId: parseInt(peopleId), // Asegúrate de que es numérico
        peoplePassword: peoplePassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password set successfully!");
        setErrorMessage("");

        // Redirige al login después de 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.response?.data || error.message);
      setErrorMessage("Failed to set password. Please try again.");
    }
  };

  return (
    <div className="set-password-form-container">
      <h2>Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password *</label>
        <input
          type="password"
          value={peoplePassword}
          onChange={(e) => setPeoplePassword(e.target.value)}
          required
        />
        <label>Confirm Password *</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default SetPasswordForm;
