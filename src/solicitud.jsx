import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./assets/css/solicitud.css";
import logo from "./assets/images/logo1.png";

const Solicitud = () => {
  const [step, setStep] = useState(0);
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Manejar checkboxes con "checked"
      setFormData({ ...formData, [name]: checked });
    } else if (name === "contraseña" || name === "confirmarContraseña") {
      // Limitar la longitud de la contraseña a 20 caracteres
      if (value.length > 20) return;
      setFormData({ ...formData, [name]: value });
    } else if (name === "celular") {
      // Validar que solo permita números y máximo 10 dígitos
      if (!/^\d*$/.test(value) || value.length > 10) return;
      setFormData({ ...formData, [name]: value });
    } else if (name === "montoCredito" || name === "facturacion") {
      // Permitir solo números y formatear como moneda mexicana
      const numericValue = value.replace(/[^0-9]/g, ""); // Eliminar caracteres no numéricos
      if (parseInt(numericValue, 10) > 1000000000) return; // Límite de 1 mil millones
      const formattedValue = new Intl.NumberFormat("es-MX").format(
        numericValue
      );
      setFormData({ ...formData, [name]: formattedValue });
    } else if (
      [
        "primerNombre",
        "segundoNombre",
        "apellidoPaterno",
        "apellidoMaterno",
        "razonSocial",
      ].includes(name)
    ) {
      // Validar que solo permita letras, espacios y limitar a 50 caracteres
      if (!/^[a-zA-Z\s]*$/.test(value) || value.length > 50) return;
      setFormData({ ...formData, [name]: value });
    } // Manejar inputs tipo select
    else if (
      [
        "tipoSociedad",
        "industria",
        "estado",
        "plazo",
        "institucion",
        "urgencia",
      ].includes(name)
    ) {
      setFormData({ ...formData, [name]: value });
    } else if (name === "correo") {
      // Permitir que el usuario escriba parcialmente un correo electrónico
      setFormData({ ...formData, [name]: value });
    } else if (name === "rfc") {
      // Validar RFC (13 caracteres alfanuméricos)
      if (!/^[A-Za-z0-9]{0,13}$/.test(value)) {
        alert(
          "El RFC debe contener solo letras y números, y no más de 13 caracteres."
        );
        return;
      }
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatMonto = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-MX", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Limpiamos los valores de montoCredito y facturacion
    const montoCreditoParsed = parseFloat(
      formData.montoCredito.replace(/,/g, "")
    );
    const facturacionParsed = parseFloat(
      formData.facturacion.replace(/,/g, "")
    );

    // Construimos el objeto con la data a enviar
    const dataToSend = {
      ...formData,
      montoCredito: montoCreditoParsed,
      facturacion: facturacionParsed,
    };

    console.log("Enviando datos al backend:", dataToSend);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/solicitudes",
        dataToSend
      );

      console.log("Respuesta del backend:", response.data);

      if (response.status === 200 || response.status === 201) {
        console.log("Solicitud enviada correctamente.");
        setStep(5); // Pasamos al paso 5 solo si se envió correctamente
      } else {
        console.error("Error en la respuesta del backend:", response);
        alert("Error al enviar la solicitud. Revisa los datos.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.response || error);
      alert("No se pudo enviar la solicitud. Intenta nuevamente.");
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
      case 0:
        return (
          <div className="start-box">
            <h2>Bienvenido</h2>
            <p>Haz clic en el botón para iniciar tu solicitud de crédito.</p>
            <button
              className="start-button"
              onClick={() => setStep(1)}
              style={{
                backgroundColor: "#00FF00",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Iniciar Solicitud
            </button>
          </div>
        );

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
            <button type="button" className="btn-next" onClick={handleNextStep}>
              Siguiente
            </button>
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
            <button type="button" className="btn-next" onClick={handleNextStep}>
              Siguiente
            </button>
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
            <button type="button" className="btn-next" onClick={handleNextStep}>
              Siguiente
            </button>
          </>
        );

      case 4:
        return (
          <div className="confirmacion-container">
            <h3 className="form-title">Revisa tu Solicitud</h3>
            <p className="form-description">
              Presiona "Enviar Solicitud" para finalizar tu proceso.
            </p>
            <button
              type="button"
              className="btn-submit"
              onClick={handleSubmit} // Llamamos a handleSubmit antes de avanzar al paso 5
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar y Enviar"}
            </button>
          </div>
        );

      case 5:
        const monto = parseFloat(formData.montoCredito.replace(/,/g, ""));
        const plazo = parseInt(formData.plazo);
        const tasas = [
          { nombre: "Mejor Tasa", tasa: 0.19, color: "#16c79a" }, // Verde
          { nombre: "Tasa Mediana", tasa: 0.235, color: "#ffcc00" }, // Amarillo
          { nombre: "Tasa Más Alta", tasa: 0.35, color: "#ff4d4d" }, // Rojo
        ];

        return (
          <div className="preoferta-container">
            <h3 className="preoferta-title">🏦 Tu Preoferta de Crédito</h3>
            <div className="preoferta-grid">
              {tasas.map((opcion, index) => {
                const interesTotal = monto * opcion.tasa;
                const pagoMensual = (monto + interesTotal) / plazo;
                return (
                  <div
                    key={index}
                    className="preoferta-item"
                    style={{ borderColor: opcion.color }}
                  >
                    <h4 style={{ color: opcion.color }}>{opcion.nombre}</h4>
                    <p
                      className="tasa-label"
                      style={{ background: opcion.color }}
                    >
                      Tasa: <strong>{(opcion.tasa * 100).toFixed(2)}%</strong>
                    </p>
                    <p>
                      Monto Total:{" "}
                      <strong>
                        $
                        {Math.round(monto + interesTotal).toLocaleString(
                          "es-MX"
                        )}
                      </strong>
                    </p>
                    <p>
                      Pago Mensual:{" "}
                      <strong>
                        ${Math.round(pagoMensual).toLocaleString("es-MX")}
                      </strong>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="snake-line"></div>
          </div>
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
          <form onSubmit={step === 4 ? handleSubmit : handleNextStep}>
            {renderStep()}
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

      {/* Footer */}
      <footer className="footer-section text-dark">
        <div className="container">
          {/* Logotipo */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-4 text-center">
              <img src={logo} alt="Logotipo" className="logo-small" />
            </div>
          </div>

          {/* Línea Separadora */}
          <div className="footer-bottom text-center mt-4">
            <hr className="footer-line" />
          </div>

          {/* Leyenda y Créditos */}
          <div className="row mt-4">
            <div className="col text-center">
              <p className="small">
                Infraestructura en Finanzas AI, Sociedad Anónima Promotora de
                Inversión de Capital Variable, ("Tuki"), para su constitución y
                operación con tal carácter, no requiere de autorización de la
                Secretaría de Hacienda y Crédito Público. Tuki ©. Todos los
                derechos reservados. Prohibida la reproducción total o parcial
                del contenido de este sitio. * Todo el análisis es generado con
                herramientas y desarrollo interno.
              </p>
            </div>
          </div>

          {/* Créditos Finales */}
          <div className="row mt-4">
            <div className="col text-center">
              <p className="footer-credits small">
                Desarrollado por{" "}
                <a
                  href="https://www.linkedin.com/in/luis-armando-alvarez-zapfe-201217137/?originalSubdomain=mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Luis Armando Alvarez Zapfe
                </a>{" "}
                con{" "}
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  React.js
                </a>{" "}
                <i className="fab fa-react footer-icon"></i>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Solicitud;
