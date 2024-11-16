import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axiosconexion from "../config/Axios";
import "./BillboardsTable.css";

const BillboardTable = () => {
  const navigate = useNavigate(); // Inicializa navigate
  const [billboards, setBillboards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await axiosconexion.get("/Billboard");
        setBillboards(response.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to load billboards.");
      }
    };

    fetchBillboards();
  }, []);

  const handleDeleteBillboard = async (id) => {
    try {
      await axiosconexion.delete(`/Billboard/${id}`);
      setBillboards((prev) => prev.filter((billboard) => billboard.idBillboard !== id));
      setSuccessMessage("Billboard deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to delete billboard.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Billboards</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="table-wrapper">
        <table className="billboards-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Fee</th>
              <th>Location (Lat/Long)</th>
              <th>Type</th>
              <th>Measures</th>
              <th>Floor Distance</th>
              <th>Illumination</th>
              <th>Installation Date</th>
              <th>Simultaneous Ads</th>
              <th>Observations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {billboards.map((billboard) => (
              <tr key={billboard.idBillboard}>
                <td>{billboard.idBillboard}</td>
                <td>
                  <img src={billboard.imageUrl} alt="Billboard" className="billboard-image" />
                </td>
                <td>{billboard.fee}</td>
                <td>{billboard.latitudeAndLongitude}</td>
                <td>{billboard.idBillboardType}</td>
                <td>{billboard.measures}</td>
                <td>{billboard.floorDistance}</td>
                <td>{billboard.illumination ? "Yes" : "No"}</td>
                <td>{new Date(billboard.installationDate).toLocaleDateString()}</td>
                <td>{billboard.simultaneousAds}</td>
                <td>{billboard.observations}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit-billboard/${billboard.idBillboard}`)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBillboard(billboard.idBillboard)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillboardTable;
