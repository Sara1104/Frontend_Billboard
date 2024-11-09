import React from "react";
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
          <a key={index} href={service.link} className="service-card">
            {service.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Services;
