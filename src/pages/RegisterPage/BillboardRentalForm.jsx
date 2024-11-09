// src/components/BillboardRentalForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./BillboardRentalForm.css"; 

const BillboardRentalForm = () => {
  const [formData, setFormData] = useState({
    idBillboard: "",
    idLessor: "",
    idTenant: "",
    rentalStartDate: "",
    rentalEndDate: "",
    idPayMethods: "",
    adContent: "",
    contractClauses: "",
    observations: ""
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
      await axiosconexion.post("/Rental", formData);
      setSuccessMessage("Rental created successfully!");
      setErrorMessage("");

      setTimeout(() => {
        navigate("/home"); // Redirige a la página de inicio después del registro
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to create rental. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-page-background">
        <div className="register-person-form-container">
          <form onSubmit={handleSubmit} className="form-container">
            <h2>Billboard Rental Creation</h2>

            <div className="input-group">
              <label>Billboard ID:</label>
              <input
                name="idBillboard"
                type="number"
                value={formData.idBillboard}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Lessor ID:</label>
              <input
                name="idLessor"
                type="number"
                value={formData.idLessor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Tenant ID:</label>
              <input
                name="idTenant"
                type="number"
                value={formData.idTenant}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Rental Start Date:</label>
              <input
                name="rentalStartDate"
                type="datetime-local"
                value={formData.rentalStartDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Rental End Date:</label>
              <input
                name="rentalEndDate"
                type="datetime-local"
                value={formData.rentalEndDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Payment Method ID:</label>
              <input
                name="idPayMethods"
                type="number"
                value={formData.idPayMethods}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Add Content:</label>
              <textarea
                name="adContent"
                value={formData.adContent}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="input-group">
              <label>Contract Clauses:</label>
              <textarea
                name="contractClauses"
                value={formData.contractClauses}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="input-group">
              <label>Observations:</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit">Create Rental</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillboardRentalForm;