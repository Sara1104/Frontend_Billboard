// src/pages/LoginPage.jsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import CompanyLoginForm from "../components/CompanyLoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("usuario");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleKeyDown = (e, tab) => {
    if (e.key === "Enter" || e.key === " ") { // Detecta 'Enter' o 'Espacio'
      setActiveTab(tab);
    }
  };

  return (
    <div className="login-page">
      <div className="content">
        <div className="login-page-left">
          <h1>Conecta con tu audiencia a lo grande. Tu mensaje, nuestra plataforma.</h1>
          <div className="features">
            <p><strong></strong><br /></p>
            <p><strong></strong>Máxima Exposición<br />
              "Ubicaciones estratégicas para garantizar que tu mensaje llegue a miles de personas cada día."
            </p>
            <p><strong></strong><br /></p>
            <p><strong></strong>Mantenimiento Impecable<br />
              "Nos encargamos de que cada valla esté en perfectas condiciones, siempre visible y atractiva."
            </p>
          </div>
        </div>
        
        <div className="login-page-right">
          <div className="tab-selector">
            <button
              className={`tab ${activeTab === "usuario" ? "active" : ""}`}
              onClick={() => handleTabChange("usuario")}
              onKeyDown={(e) => handleKeyDown(e, "usuario")}
              tabIndex={0} // Permite seleccionar con tab
            >
              User
            </button>
            <button
              className={`tab ${activeTab === "compania" ? "active" : ""}`}
              onClick={() => handleTabChange("compania")}
              onKeyDown={(e) => handleKeyDown(e, "compania")}
              tabIndex={0} // Permite seleccionar con tab
            >
              Company
            </button>
          </div>
          
          {activeTab === "usuario" ? <LoginForm /> : <CompanyLoginForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
