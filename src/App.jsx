import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SetPasswordForm from "./pages/RegisterPage/SetPasswordForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/set-password/:userId" element={<SetPasswordForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
