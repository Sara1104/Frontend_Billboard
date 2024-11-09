import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/home")}> {/* Logo que redirige a Home */}
        Rent-A-Valla
      </div>
      <UserMenu onLogout={handleLogout} />
    </header>
  );
};

export default Header;
