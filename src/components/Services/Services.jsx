import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const services = [
  { title: "Creación Vallas Publicitarias", link: "/create-billboard" },
  { title: "Renta Vallas Publicitarias", link: "/create-billboard-rental" },
  
];

const Services = () => {
  return (
    <div className="services">
      <h2>Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link key={index} to={service.link} className="service-card">
            {service.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
