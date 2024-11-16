// src/components/RegisterCompanyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosconexion from "../../config/Axios";
import "./RegisterCompanyForm.css";

const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    company_Name: "",
    idIndustry: "",
    nit: "",
    owner_Name: "",
    company_Direction: "",
    idCity: "",
    phone_Number: "",
    corporate_Email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPolicyChecked, setIsPolicyChecked] = useState(false); // Estado para la casilla de verificación
  const [showPolicyModal, setShowPolicyModal] = useState(false); // Estado para el modal de políticas

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosconexion.post("/Company", formData);
      setSuccessMessage("Company registered successfully!");
      setErrorMessage("");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to register company. Please try again.");
    }
  };

  // Manejar el cambio de la casilla de verificación
  const handlePolicyCheck = (e) => {
    setIsPolicyChecked(e.target.checked);
  };

  return (
    <div className="register-page-background">
      <div className="register-company-form-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Register Company</h2>
          
          <div className="input-group">
            <label>Company Name:</label>
            <input name="company_Name" value={formData.company_Name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Industry ID:</label>
            <input name="idIndustry" value={formData.idIndustry} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>NIT:</label>
            <input name="nit" value={formData.nit} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Owner Name:</label>
            <input name="owner_Name" value={formData.owner_Name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Company Address:</label>
            <input name="company_Direction" value={formData.company_Direction} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>City ID:</label>
            <input name="idCity" value={formData.idCity} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input name="phone_Number" value={formData.phone_Number} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Corporate Email:</label>
            <input type="email" name="corporate_Email" value={formData.corporate_Email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Casilla de verificación de políticas de tratamiento de datos */}
          <div className="policy-check">
            <input type="checkbox" id="policyCheck" checked={isPolicyChecked} onChange={handlePolicyCheck} />
            <label htmlFor="policyCheck">
              I agree to the <span onClick={() => setShowPolicyModal(true)} className="policy-link">data treatment policies</span>.
            </label>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* El botón se deshabilita si no está marcada la casilla de políticas */}
          <button type="submit" disabled={!isPolicyChecked}>Register Company</button>
        </form>
      </div>

      {/* Modal de políticas de tratamiento de datos */}
      {showPolicyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Data Treatment Policies</h3>
            <p>
                1. Protección de Datos Personales
                Los datos sensibles y personales serán tratados exclusivamente para el arrendamiento y mantenimiento de vallas publicitarias.
                Se requiere el consentimiento explícito de los titulares para la recopilación y uso de su información.
                2. Control de Acceso
                El acceso al sistema estará limitado a personal autorizado mediante contraseñas robustas y autenticación multifactor.
                Se aplicará el principio de "mínimo privilegio" para asignar permisos.
                3. Cifrado y Almacenamiento Seguro
                La información será cifrada en reposo y en tránsito para proteger su confidencialidad.
                Se realizarán respaldos automáticos periódicos y se almacenarán en ubicaciones seguras.
                4. Gestión de Incidentes
                Los incidentes de seguridad serán reportados de inmediato al Responsable de Seguridad.
                El sistema implementará un plan de respuesta para mitigar riesgos y notificar a los afectados.
                5. Derechos de los Titulares
                Los titulares podrán acceder, rectificar, eliminar o limitar el uso de sus datos personales.
                Cualquier solicitud será procesada en un plazo máximo de 10 días hábiles.
                6. Auditorías y Revisión
                Las políticas de seguridad se revisarán cada seis meses o cuando se detecten vulnerabilidades significativas.
                7. Cumplimiento Legal
                El sistema cumple con las leyes locales de protección de datos y los estándares de la ISO 27001.
                Nota: El incumplimiento de estas políticas será gestionado conforme a las normativas internas y legales aplicables.
              {/* Puedes agregar más contenido o estructurar el texto como lo necesites */}
            </p>
            <button onClick={() => setShowPolicyModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterCompanyForm;
