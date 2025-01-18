import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/login.css";
import logo from "./assets/images/logo1.png"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="login-page">
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

      {/* Login Section */}
      <div className="login-section">
        <div className="login-form">
          <h2>Portal en Desarrollo</h2>
          <p>Lanzamiento Junio 2025</p>
        </div>
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

export default Login;
