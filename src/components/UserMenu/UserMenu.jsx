// src/components/UserMenu/UserMenu.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="user-menu">
      <button onClick={toggleMenu} className="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.3a3.3 3.3 0 1 1 3.3-3.3A3.3 3.3 0 0 1 12 10.3zM4 21.5v-1.4c0-2.5 2-4.5 4.5-4.5h7c2.5 0 4.5 2 4.5 4.5v1.4z"/>
        </svg>
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li onClick={() => navigate("/home")}>Home</li> {/* Nueva opción para ir a Home */}
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={onLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
