// src/pages/RegisterPage/PersonRegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./RegisterPersonForm.css";

const PersonRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    idDocumentType: "",
    documentNumb: "",
    occupation: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    idUserType: "",
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
      const response = await axiosconexion.post("/Person", formData);
      console.log("Full Response:", response); // Agrega esto para ver la respuesta completa
      const { idPeople } = response.data; // data tenga el idPeople
  
      if (idPeople) {
        setSuccessMessage("Person successfully registered.");
        setErrorMessage("");
        
        localStorage.setItem("peopleId", idPeople);
  
        setTimeout(() => {
          navigate(`/set-password`);
        }, 2000);
      } else {
        throw new Error("Failed to retrieve person ID.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage("Failed to register the person. Please try again.");
      setSuccessMessage("");
    }
  };
  
  

  return (
    <div className="register-page-background">
      {/* Registration Form */}
      <div className="register-person-form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Person Registration</h2>
          
          <div className="input-group">
            <label>First Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label>Last Name:</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label>Document Type:</label>
            <input name="idDocumentType" value={formData.idDocumentType} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label>Document Number:</label>
            <input name="documentNumb" value={formData.documentNumb} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label>Occupation:</label>
            <input name="occupation" value={formData.occupation} onChange={handleChange} />
          </div>
          
          <div className="input-group">
            <label>Birth Date:</label>
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <label>Phone Number:</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          
          <div className="input-group">
            <label>User Type:</label>
            <input name="idUserType" value={formData.idUserType} onChange={handleChange} required />
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Register Person</button>
        </form>
      </div>
    </div>
  );
};

export default PersonRegisterForm;
