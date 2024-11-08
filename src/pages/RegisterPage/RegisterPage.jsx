// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import PersonRegisterForm from "../RegisterPage/RegisterPersonForm";
import CompanyRegisterForm from "../RegisterPage/RegisterCompanyForm";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("persona");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="register-page">
      <div className="tab-selector">
        <button
          className={`tab ${activeTab === "persona" ? "active" : ""}`}
          onClick={() => handleTabChange("persona")}
        >
          Register as User
        </button>
        <button
          className={`tab ${activeTab === "compania" ? "active" : ""}`}
          onClick={() => handleTabChange("compania")}
        >
          Register as Company
        </button>
      </div>

      {activeTab === "persona" ? <PersonRegisterForm /> : <CompanyRegisterForm />}
    </div>
  );
};

export default RegisterPage;
