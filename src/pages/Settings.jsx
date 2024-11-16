// src/pages/Settings.jsx

import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axiosconexion from "../config/Axios";
import "./Settings.css"; // Importa el archivo CSS


const Settings = () => {
  const { user, logout } = useUser();
  const [formData, setFormData] = useState({
    // Campos para persona y compañía
    idPeople: 0,
    name: "",
    lastName: "",
    idDocumentType: 0,
    documentNumb: "",
    occupation: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    idUserType: 0,
    stateDelete: false,
    // Campos específicos para compañía
    companyName: "",
    idCompany: 0,
    idIndustry: 0,
    nit: "",
    ownerName: "",
    companyAddress: "",
    idCity: 0,
    corporateEmail: "",
    password: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user.accountType === "user") {
          const response = await axiosconexion.get(`/Person/${user.id}`);
          const userData = response.data;
          setFormData({
            ...formData,
            idPeople: userData.idPeople,
            name: userData.name,
            lastName: userData.lastName,
            idDocumentType: userData.idDocumentType,
            documentNumb: userData.documentNumb,
            occupation: userData.occupation,
            birthDate: userData.birthDate ? userData.birthDate.split("T")[0] : "",
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            idUserType: userData.idUserType,
            stateDelete: userData.stateDelete
          });
        } else if (user.accountType === "company") {
          const response = await axiosconexion.get(`/Company/${user.id}`);
          const companyData = response.data;
          setFormData({
            ...formData,
            idCompany: companyData.idCompany,
            companyName: companyData.company_Name,
            idIndustry: companyData.idIndustry,
            nit: companyData.nit,
            ownerName: companyData.owner_Name,
            companyAddress: companyData.company_Direction,
            idCity: companyData.idCity,
            phoneNumber: companyData.phone_Number,
            corporateEmail: companyData.corporate_Email,
            password: companyData.password // La contraseña ya se carga en el formulario
          });
        }
        setSuccessMessage("");
      } catch (error) {
        setErrorMessage("Error loading user data.");
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.accountType === "user") {
        const userData = {
          ...formData,
          birthDate: new Date(formData.birthDate).toISOString(), // Convertir la fecha en el formato correcto
        };
        await axiosconexion.put(`/Person/${user.id}`, userData);
      } else if (user.accountType === "company") {
        const companyData = {
          company_Name: formData.companyName,
          idIndustry: formData.idIndustry,
          nit: formData.nit,
          owner_Name: formData.ownerName,
          company_Direction: formData.companyAddress,
          idCity: formData.idCity,
          phone_Number: formData.phoneNumber,
          corporate_Email: formData.corporateEmail,
          password: formData.password // La contraseña se envía en el mismo PUT para compañías
        };
        await axiosconexion.put(`/Company/${user.id}`, companyData);
      }
      setSuccessMessage("Data updated successfully.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error updating data.");
      setSuccessMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (user.accountType === "user") {
        await axiosconexion.delete(`/Person/${user.id}`);
      } else if (user.accountType === "company") {
        await axiosconexion.delete(`/Company/${id}`);
      }
      logout();
    } catch (error) {
      setErrorMessage("Error deleting the account.");
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {user.accountType === "user" ? (
          <>
            <div className="input-group">
              <label>First Name:</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Document Type ID:</label>
              <input name="idDocumentType" value={formData.idDocumentType} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Document Number:</label>
              <input name="documentNumb" value={formData.documentNumb} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Occupation:</label>
              <input name="occupation" value={formData.occupation} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Birth Date:</label>
              <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Phone Number:</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>Company Name:</label>
              <input name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Industry ID:</label>
              <input name="idIndustry" value={formData.idIndustry} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>NIT:</label>
              <input name="nit" value={formData.nit} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Owner Name:</label>
              <input name="ownerName" value={formData.ownerName} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Company Address:</label>
              <input name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>City ID:</label>
              <input name="idCity" value={formData.idCity} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Phone Number:</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Corporate Email:</label>
              <input name="corporateEmail" type="email" value={formData.corporateEmail} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>
          </>
        )}
        <button type="submit">Update</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>

      
    </div>
  );
};

export default Settings;
