// src/components/RegisterCompanyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./RegisterCompanyForm.css";

const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    company_Name: "",
    idIndustry: "",
    nit: "",
    owner_Name: "",
    company_Direction: "",
    idCity: "",
    phone_Number: "",
    corporate_Email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/Company", formData);
      setSuccessMessage("Company registered successfully!");
      setErrorMessage("");
      
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to register company. Please try again.");
    }
  };

  return (
    <div className="register-page-background">
      <div className="register-company-form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Register Company</h2>
          
          <div className="input-group">
            <label>Company Name:</label>
            <input name="company_Name" value={formData.company_Name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Industry ID:</label>
            <input name="idIndustry" value={formData.idIndustry} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>NIT:</label>
            <input name="nit" value={formData.nit} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Owner Name:</label>
            <input name="owner_Name" value={formData.owner_Name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Company Address:</label>
            <input name="company_Direction" value={formData.company_Direction} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>City ID:</label>
            <input name="idCity" value={formData.idCity} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input name="phone_Number" value={formData.phone_Number} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Corporate Email:</label>
            <input type="email" name="corporate_Email" value={formData.corporate_Email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Register Company</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyForm;
