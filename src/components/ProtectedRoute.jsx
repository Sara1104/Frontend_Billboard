// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Verifica si el token existe en el localStorage
  const isAuthenticated = localStorage.getItem("token") !== null;

  // Si no está autenticado, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
