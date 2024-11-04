// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      
      <div className="content">
        <div className="login-page-left">
          <h1>Conecta con tu audiencia a lo grande. Tu mensaje, nuestra plataforma.</h1>
          <div className="features">
            <p><strong></strong> <br />              
            </p>
            <p><strong></strong> Máxima Exposición<br />
              "Ubicaciones estratégicas para garantizar que tu mensaje llegue a miles de personas cada día."
            </p>
            <p><strong></strong> <br />              
            </p>

            <p><strong></strong> Mantenimiento Impecable<br />
              "Nos encargamos de que cada valla esté en perfectas condiciones, siempre visible y atractiva."
            </p>
          </div>
        </div>
        <div className="login-page-right">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
