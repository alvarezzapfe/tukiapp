import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./assets/css/solicitud.css";
import logo from "./assets/images/logo1.png";

const Solicitud = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    celular: "",
    facturacion: "",
    rfc: "",
    razonSocial: "",
    tipoSociedad: "",
    industria: "",
    estado: "",
    montoCredito: "",
    plazo: "",
    institucion: "",
    urgencia: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const estadosMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "celular" && (isNaN(value) || value.length > 10)) return;
    if (name === "montoCredito") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/solicitudes",
        formData
      );
      console.log(response.data.message);
      setShowPopup(true);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setStep(1);
    setFormData({
      primerNombre: "",
      segundoNombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      celular: "",
      facturacion: "",
      rfc: "",
      razonSocial: "",
      tipoSociedad: "",
      industria: "",
      estado: "",
      montoCredito: "",
      plazo: "",
      institucion: "",
      urgencia: "",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-row">
              <div className="form-column">
                <label>Primer Nombre</label>
                <input
                  type="text"
                  name="primerNombre"
                  className="form-control"
                  value={formData.primerNombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>Segundo Nombre (opcional)</label>
                <input
                  type="text"
                  name="segundoNombre"
                  className="form-control"
                  value={formData.segundoNombre}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Apellido Paterno</label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  className="form-control"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>Apellido Materno</label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  className="form-control"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>Celular</label>
                <input
                  type="text"
                  name="celular"
                  className="form-control"
                  placeholder="10 dígitos"
                  value={formData.celular}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-row">
              <div className="form-column">
                <label>Nivel de Facturación (último año)</label>
                <input
                  type="text"
                  name="facturacion"
                  className="form-control"
                  value={formData.facturacion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>RFC</label>
                <input
                  type="text"
                  name="rfc"
                  className="form-control"
                  value={formData.rfc}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Razón Social</label>
                <input
                  type="text"
                  name="razonSocial"
                  className="form-control"
                  value={formData.razonSocial}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>Tipo de Sociedad</label>
                <select
                  name="tipoSociedad"
                  className="form-select"
                  value={formData.tipoSociedad}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="SAPI DE CV">SAPI DE CV</option>
                  <option value="SA DE CV">SA DE CV</option>
                  <option value="OTRA">OTRA</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Tipo de Industria</label>
                <select
                  name="industria"
                  className="form-select"
                  value={formData.industria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Agricultura">Agricultura</option>
                  <option value="Manufactura">Manufactura</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Comercio">Comercio</option>
                  <option value="Salud">Salud</option>
                  <option value="Educación">Educación</option>
                  <option value="Construcción">Construcción</option>
                  <option value="Energía">Energía</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </div>
              <div className="form-column">
                <label>Estado donde opera</label>
                <select
                  name="estado"
                  className="form-select"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona</option>
                  {estadosMexico.map((estado, index) => (
                    <option key={index} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="form-row">
              <div className="form-column">
                <label>Monto del Crédito Deseado (MXN)</label>
                <input
                  type="text"
                  name="montoCredito"
                  className="form-control"
                  value={formData.montoCredito}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <label>Plazo (meses)</label>
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
                  <option value="36">36 meses</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Preferencia de Institución</label>
                <select
                  name="institucion"
                  className="form-select"
                  value={formData.institucion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Fondo Deuda PiMX">Fondo Deuda PiMX</option>
                  <option value="Crowdlink">Crowdlink</option>
                </select>
              </div>
              <div className="form-column">
                <label>Urgencia de los recursos</label>
                <select
                  name="urgencia"
                  className="form-select"
                  value={formData.urgencia}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="solicitud-page">
      <Navbar />
      <div className="solicitud-section">
        <div className="solicitud-card">
          <h2>Solicitud de Crédito</h2>
          <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
            {renderStep()}
            <button type="submit" className="btn-submit">
              {step === 3 ? "Enviar Solicitud" : "Siguiente"}
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup">
            <h3>Solicitud Enviada</h3>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}

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
