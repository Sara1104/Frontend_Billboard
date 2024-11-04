// src/components/Carousel/Carousel.jsx
import React, { useState, useEffect } from "react";
import "./Carousel.css";

// Importación de las imágenes
import image1 from "../../assets/images/imagenecarrusel1.jpg";
import image2 from "../../assets/images/imagenecarrusel2.png";
import image3 from "../../assets/images/imagenecarrusel3.png";

const images = [image1, image2, image3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="carousel-image" key={index}>
            <img src={image} alt={`Carrusel ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
