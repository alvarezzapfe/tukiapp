import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/simulador.css";
import logo from "./assets/images/logo1.png";
import Navbar from "./components/Navbar";

const Simulador = () => {
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState(6);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const formatMonto = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMontoChange = (e) => {
    const formattedMonto = formatMonto(e.target.value);
    setMonto(formattedMonto);
  };

  const calcularIntereses = () => {
    setLoading(true);
    setResultado(null);
    setTimeout(() => {
      const tasas = [0.19, 0.35]; // Tasas de interés
      const montoNumerico = parseInt(monto.replace(/,/g, ""), 10);
      const resultados = tasas.map(
        (tasa) => (montoNumerico * (1 + tasa)) / plazo
      );
      setResultado(resultados);
      setLoading(false);
    }, 3000); // Simulación de carga de 3 segundos
  };

  return (
    <div className="simulador-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            <img src={logo} alt="Logotipo" className="logo-small" />
          </a>
          <div className="navbar-menu">
            <ul className="navbar-menu">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/simulador">Simulador</Link>
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

      {/* Simulador Section */}
      <div className="simulador-section d-flex justify-content-center align-items-center">
        {!resultado ? (
          <div className="simulador-form">
            <h2>Simulador de Crédito</h2>
            <div className="form-group">
              <label>Monto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el monto"
                value={monto}
                onChange={handleMontoChange}
              />
            </div>
            <div className="form-group">
              <label>Plazo</label>
              <input
                type="range"
                className="form-range"
                min="6"
                max="24"
                step="6"
                value={plazo}
                onChange={(e) => setPlazo(parseInt(e.target.value))}
              />
              <p>{plazo} meses</p>
            </div>
            <div className="loading-wrapper">
              <button
                className={`btn-submit ${loading ? "hidden" : ""}`}
                onClick={calcularIntereses}
              >
                Calcular
              </button>
              <div className={`loading-circle ${loading ? "visible" : ""}`}>
                <div className="circle"></div>
                <p>Cargando...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="resultado-box">
            <h3>Tu Pago Mensual</h3>
            <p>Tu pago de intereses puede variar entre:</p>
            <table className="resultado-tabla">
              <thead>
                <tr>
                  <th>Tasa</th>
                  <th>Pago Mensual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>19%</td>
                  <td>${resultado[0].toLocaleString()} MXN</td>
                </tr>
                <tr>
                  <td>35%</td>
                  <td>${resultado[1].toLocaleString()} MXN</td>
                </tr>
              </tbody>
            </table>
            <button className="btn-reset" onClick={() => setResultado(null)}>
              Realizar Otro Cálculo
            </button>
          </div>
        )}
      </div>

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

export default Simulador;
