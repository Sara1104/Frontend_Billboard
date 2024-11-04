import React from "react";
import "./Services.css";

const services = [
  { title: "Vallas con Tecnología LED", link: "/service1" },
  { title: "Vallas con Movimiento", link: "/service2" },
  { title: "Vallas en 3D", link: "/service3" },
];

const Services = () => {
  return (
    <div className="services">
      <h2>Servicios</h2>
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
