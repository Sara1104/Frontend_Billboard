import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosconexion from "../config/Axios";
import "./RentalsTable.css";

const RentalTable = () => {
  const [rentals, setRentals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axiosconexion.get("/Rental");
        setRentals(response.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to load rentals.");
      }
    };

    fetchRentals();
  }, []);

  const handleDeleteRental = async (id) => {
    try {
      await axiosconexion.delete(`/Rental/${id}`);
      setRentals((prev) => prev.filter((rental) => rental.idRental !== id));
      setSuccessMessage("Rental deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to delete rental.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Rentals</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="table-wrapper">
        <table className="rentals-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Billboard ID</th>
              <th>Lessor ID</th>
              <th>Tenant ID</th>
              <th>Rental Start Date</th>
              <th>Rental End Date</th>
              <th>Payment Method</th>
              <th>Ad Content</th>
              <th>Contract Clauses</th>
              <th>Observations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.idRental}>
                <td>{rental.idRental}</td>
                <td>{rental.idBillboard}</td>
                <td>{rental.idLessor}</td>
                <td>{rental.idTenant}</td>
                <td>{new Date(rental.rentalStartDate).toLocaleDateString()}</td>
                <td>{new Date(rental.rentalEndDate).toLocaleDateString()}</td>
                <td>{rental.idPayMethods}</td>
                <td>{rental.adContent}</td>
                <td>{rental.contractClauses}</td>
                <td>{rental.observations}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit-rental/${rental.idRental}`)} // Use navigate for editing
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRental(rental.idRental)}
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

export default RentalTable;
