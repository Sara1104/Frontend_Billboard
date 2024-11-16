// src/components/EditRentalForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosconexion from "../config/Axios";
import "./EditRentalForm.css";

const EditRentalForm = () => {
  const { idRental } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idRental: 0,
    idBillboard: 0,
    idLessor: 0,
    idTenant: 0,
    rentalStartDate: "",
    rentalEndDate: "",
    idPayMethods: 0,
    adContent: "",
    contractClauses: "",
    observations: "",
    stateDelete: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch rental data
  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axiosconexion.get(`/Rental/${idRental}`);
        setFormData(response.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to load rental data.");
      }
    };

    fetchRental();
  }, [idRental]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosconexion.put(`/Rental/${idRental}`, formData);
      setSuccessMessage("Rental updated successfully.");
      setErrorMessage("");
      navigate("/rentals");
    } catch (error) {
      setErrorMessage("Failed to update rental.");
    }
  };

  return (
    <div className="edit-rental-page">
      <div className="edit-form-container">
        <h3>Edit Rental</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Rental ID:</label>
            <input
              name="idRental"
              value={formData.idRental}
              onChange={handleChange}
              type="number"
              disabled
            />
          </div>
          <div className="input-group">
            <label>Billboard ID:</label>
            <input
              name="idBillboard"
              value={formData.idBillboard}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Lessor ID:</label>
            <input
              name="idLessor"
              value={formData.idLessor}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Tenant ID:</label>
            <input
              name="idTenant"
              value={formData.idTenant}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Rental Start Date:</label>
            <input
              name="rentalStartDate"
              value={formData.rentalStartDate.split("T")[0]}
              onChange={handleChange}
              type="date"
              required
            />
          </div>
          <div className="input-group">
            <label>Rental End Date:</label>
            <input
              name="rentalEndDate"
              value={formData.rentalEndDate.split("T")[0]}
              onChange={handleChange}
              type="date"
              required
            />
          </div>
          <div className="input-group">
            <label>Payment Method ID:</label>
            <input
              name="idPayMethods"
              value={formData.idPayMethods}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Ad Content:</label>
            <textarea
              name="adContent"
              value={formData.adContent}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="input-group">
            <label>Contract Clauses:</label>
            <textarea
              name="contractClauses"
              value={formData.contractClauses}
              onChange={handleChange}
              rows="3"
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
          <div className="input-group">
            <label>State Delete:</label>
            <input
              name="stateDelete"
              type="checkbox"
              checked={formData.stateDelete}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={() => navigate("/rentals")}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRentalForm;
