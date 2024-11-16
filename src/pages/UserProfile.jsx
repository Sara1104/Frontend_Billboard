import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <h2>View Options</h2>
        <div className="profile-buttons">
          <button onClick={() => navigate("/billboards")} className="profile-button">
            View Billboards
          </button>
          <button onClick={() => navigate("/rentals")} className="profile-button">
            View Rentals
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
