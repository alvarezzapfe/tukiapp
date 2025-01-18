import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/solicitud.css";
import logo from "./assets/images/logo1.png"; // Asegúrate de que la ruta sea correcta

const Solicitud = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rfc: "",
    facturacion: "",
    razonSocial: "",
    tipoSociedad: "",
    montoCredito: "",
    plazo: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formato con comas para números
    if (name === "facturacion" || name === "montoCredito") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de carga
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 3000);
  };

  const closePopup = () => {
    setShowPopup(false);
    setStep(1);
    setFormData({
      nombre: "",
      apellido: "",
      rfc: "",
      facturacion: "",
      razonSocial: "",
      tipoSociedad: "",
      montoCredito: "",
      plazo: "",
    });
  };

  return (
    <div className="solicitud-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            <img src={logo} alt="Logotipo" className="logo-small" />
          </a>
          <button className="menu-toggle" type="button" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <div className={`navbar-menu ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-menu">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/solicitud">Solicitud</Link>
              </li>
              <li>
                <Link to="/login" className="btn btn-outline-light ms-3">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Solicitud Section */}
      <div className="solicitud-section d-flex justify-content-center align-items-center">
        <div className="solicitud-card">
          <h2>Solicitud de Crédito</h2>
          <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
            {step === 1 && (
              <>
                <div className="form-group">
                  <label>Nombre del Representante Legal</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Escribe tu nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    placeholder="Escribe tu apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>RFC de la Empresa</label>
                  <input
                    type="text"
                    name="rfc"
                    className="form-control"
                    placeholder="RFC"
                    value={formData.rfc}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label>Nivel de Facturación (último año)</label>
                  <input
                    type="text"
                    name="facturacion"
                    className="form-control"
                    placeholder="Ejemplo: 1,000,000"
                    value={formData.facturacion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Razón Social</label>
                  <input
                    type="text"
                    name="razonSocial"
                    className="form-control"
                    placeholder="Razón Social"
                    value={formData.razonSocial}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Sociedad</label>
                  <select
                    name="tipoSociedad"
                    className="form-select"
                    value={formData.tipoSociedad}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="SAPI">SAPI</option>
                    <option value="SA de CV">SA de CV</option>
                  </select>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-group">
                  <label>Monto del Crédito Deseado</label>
                  <input
                    type="text"
                    name="montoCredito"
                    className="form-control"
                    placeholder="Máximo: 2,000,000"
                    value={formData.montoCredito}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Plazo Deseado (meses)</label>
                  <select
                    name="plazo"
                    className="form-select"
                    value={formData.plazo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="18">18 meses</option>
                    <option value="24">24 meses</option>
                  </select>
                </div>
              </>
            )}
            <div className="form-group text-center">
              {!loading ? (
                <button type="submit" className="btn-submit">
                  {step === 3 ? "Enviar Solicitud" : "Siguiente"}
                </button>
              ) : (
                <div className="loading-circle">
                  <div className="circle"></div>
                  <p>Cargando...</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup">
            <h3>Solicitud Enviada</h3>
            <p>
              Gracias por tu interés. Revisaremos tu solicitud y te
              contactaremos pronto.
            </p>
            <button className="btn-submit" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-section text-dark">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-4 text-center">
              <img src={logo} alt="Logotipo" className="logo-small" />
            </div>
          </div>
          <div className="footer-bottom text-center mt-4">
            <hr className="footer-line" />
          </div>
          <div className="row mt-4">
            <div className="col text-center">
              <p className="small">
                Infraestructura en Finanzas AI, Sociedad Anónima Promotora de
                Inversión de Capital Variable, ("Tuki"), para su constitución y
                operación con tal carácter, no requiere de autorización de la
                Secretaría de Hacienda y Crédito Público. Tuki ©. Todos los
                derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Solicitud;
