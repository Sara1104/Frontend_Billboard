// src/components/EditBillboardForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosconexion from "../config/Axios";
import "./EditBillboardForm.css";

const EditBillboardForm = () => {
  const { idBillboard } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idBillboard: 0,
    idLessor: 0,
    imageUrl: "",
    fee: 0,
    idBillboardState: 0,
    latitudeAndLongitude: "",
    idBillboardType: 0,
    state: true,
    measures: "",
    floorDistance: 0,
    illumination: true,
    installationDate: "",
    simultaneousAds: 0,
    observations: "",
    stateDelete: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch billboard data
  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const response = await axiosconexion.get(`/Billboard/${idBillboard}`);
        setFormData(response.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to load billboard data.");
      }
    };

    fetchBillboard();
  }, [idBillboard]);

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
      await axiosconexion.put(`/Billboard/${idBillboard}`, formData);
      setSuccessMessage("Billboard updated successfully.");
      setErrorMessage("");
      navigate("/billboards");
    } catch (error) {
      setErrorMessage("Failed to update billboard.");
    }
  };

  return (
    <div className="edit-billboard-page">
      <div className="edit-form-container">
        <h3>Edit Billboard</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Billboard ID:</label>
            <input
              name="idBillboard"
              value={formData.idBillboard}
              onChange={handleChange}
              type="number"
              disabled
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
            <label>Image URL:</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label>Fee:</label>
            <input
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Billboard State ID:</label>
            <input
              name="idBillboardState"
              value={formData.idBillboardState}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Latitude and Longitude:</label>
            <input
              name="latitudeAndLongitude"
              value={formData.latitudeAndLongitude}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label>Billboard Type ID:</label>
            <input
              name="idBillboardType"
              value={formData.idBillboardType}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>State:</label>
            <input
              name="state"
              type="checkbox"
              checked={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Measures:</label>
            <input
              name="measures"
              value={formData.measures}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label>Floor Distance:</label>
            <input
              name="floorDistance"
              value={formData.floorDistance}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="input-group">
            <label>Illumination:</label>
            <input
              name="illumination"
              type="checkbox"
              checked={formData.illumination}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Installation Date:</label>
            <input
              name="installationDate"
              value={formData.installationDate.split("T")[0]}
              onChange={handleChange}
              type="date"
              required
            />
          </div>
          <div className="input-group">
            <label>Simultaneous Ads:</label>
            <input
              name="simultaneousAds"
              value={formData.simultaneousAds}
              onChange={handleChange}
              type="number"
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
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={() => navigate("/billboards")}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBillboardForm;
