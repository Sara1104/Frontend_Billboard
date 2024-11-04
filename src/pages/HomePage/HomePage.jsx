import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Services from "../../components/Services/Services";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>¡Bienvenido a Rent-A-Valla!</h1>
        <p>Conecta con tu audiencia de manera impactante.</p>
      </div>
      <Carousel />
      <Services />
    </div>
  );
};

export default HomePage;
