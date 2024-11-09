// src/components/BillboardRegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./BillboardRegisterForm.css"; // Asegúrate de que el archivo de estilo esté bien enlazado

const BillboardRegisterForm = () => {
  const [formData, setFormData] = useState({
    idLessor: "",
    imageUrl: "",
    fee: "",
    idBillboardState: "",
    latitudeAndLongitude: "",
    idBillboardType: "",
    state: false,
    measures: "",
    floorDistance: "",
    illumination: false,
    installationDate: "",
    simultaneousAds: "",
    observations: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosconexion.post("/Billboard", formData);
      setSuccessMessage("Billboard registered successfully!");
      setErrorMessage("");

      setTimeout(() => {
        navigate("/home"); // Redirige a la página de inicio después del registro
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to register billboard. Please try again.");
    }
  };

  return (
    <div className="register-page">

      <div className="register-page-background">
        <div className="register-person-form-container">
          <form onSubmit={handleSubmit} className="form-container">
            <h2>Billboard Registration</h2>

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
              <label>Image URL:</label>
              <input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Fee:</label>
              <input
                name="fee"
                type="number"
                value={formData.fee}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Billboard State ID:</label>
              <input
                name="idBillboardState"
                type="number"
                value={formData.idBillboardState}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Latitude and Longitude:</label>
              <input
                name="latitudeAndLongitude"
                type="text"
                value={formData.latitudeAndLongitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Billboard Type ID:</label>
              <input
                name="idBillboardType"
                type="number"
                value={formData.idBillboardType}
                onChange={handleChange}
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
                type="text"
                value={formData.measures}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Floor Distance:</label>
              <input
                name="floorDistance"
                type="number"
                value={formData.floorDistance}
                onChange={handleChange}
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
                type="date"
                value={formData.installationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Simultaneous Ads:</label>
              <input
                name="simultaneousAds"
                type="number"
                value={formData.simultaneousAds}
                onChange={handleChange}
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

            <button type="submit">Register Billboard</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillboardRegisterForm;
