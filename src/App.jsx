import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/navbar.css";
import "./assets/css/index.css";
import "./assets/css/login.css";
import "./assets/css/solicitud.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Solicitud from "./solicitud"; // Si no existe, crea el componente
import Login from "./login";
import Simulador from "./simulador";

// Importar la imagen
import logo from "./assets/images/logo1.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    AOS.init({
      duration: 600, // Duración de animaciones
      easing: "ease-out-cubic",
      once: true, // Animar solo una vez
    });
  }, []);

  // Rayo electríco que baja

  const [activeCard, setActiveCard] = useState(-1); // Caja activa

  const handleScroll = () => {
    const sections = document.querySelectorAll(".column-card-container");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2
      ) {
        setActiveCard(index); // Actualiza la caja activa
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
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
                <a href="#hero">Inicio</a>
              </li>
              <li>
                <a href="#about">Acerca de</a>
              </li>

              <li>
                <a href="#columns">Productos</a>
              </li>
              <li>
                <a href="#modelo">Modelo</a>
              </li>
              <li>
                <a href="/Simulador">Simulador</a>
              </li>
              <li>
                <a href="/solicitud">Solicitud</a>
              </li>
              <li>
                <a href="/login" className="btn btn-outline-light ms-3">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header
        id="hero"
        className="hero_area text-center text-white"
        data-aos="fade-up"
      >
        {/* Partículas decorativas */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="container py-5">
          <h1 className="display-4">Bienvenido a TukiApp</h1>
          <p className="lead">
            Acceso fácil a crédito justo para la Pequeña Empresa en México.
          </p>
          <button className="btn btn-light btn-lg mt-3">Conócenos</button>
        </div>
      </header>

      {/* Sección 1:  About Section */}
      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4" data-aos="fade-up">
            Acerca de Nosotros
          </h2>
          <div className="text-muted" data-aos="fade-up">
            <p>
              Tuki es una plataforma que utilza un modelo propio e Inteligencia
              Artificial para facilitar acceso a crédito simple.
            </p>
            <p></p>
          </div>

          <img src={logo} alt="Logotipo" className="logo-small" />
        </div>
      </section>
      {/* Sección 2 */}

      {/* Contact Section en otro view */}

      {/* Sección 3: Columnas */}
      {/* Sección 3: Columnas */}
      <section id="columns" className="py-5 text-center" data-aos="fade-up">
        <div className="container expanded-section position-relative">
          <h2 className="mb-5">Explora Más</h2>
          <h3 className="mb-5">Nuestro proceso es simple</h3>

          {/* Rayo eléctrico */}
          <div className="arrow-electric"></div>

          <div className="columns-container">
            {[
              {
                title: "Registro",
                icon: "fas fa-briefcase",
                details: "Llena el formulario y haz tu cuenta de Empresa.",
              },
              {
                title: "Análisis y Preoferta",
                icon: "fas fa-chart-line",
                details: "Obtén preoferta en minutos.",
              },
              {
                title: "Due Diligence",
                icon: "fas fa-users",
                details: "Optimizamos procesos para darte una oferta formal.",
              },
              {
                title: "Fondeo",
                icon: "fas fa-wallet",
                details: "Conseguimos el crédito en menos de 4 semanas.",
              },
              {
                title: "Escala",
                icon: "fas fa-globe",
                details: "Utiliza el crédito para crecer tu negocio.",
              },
            ].map((item, index) => (
              <div
                className={`row my-5 ${
                  index % 2 === 0
                    ? "justify-content-start"
                    : "justify-content-end"
                }`}
                key={index}
              >
                <div className="col-md-6 column-card-container">
                  <div
                    className={`column-card p-5 ${
                      activeCard === index ? "highlight" : ""
                    }`}
                  >
                    <div className="circle-enumeration">{index + 1}</div>
                    <i className={`${item.icon} fa-3x mb-3`}></i>
                    <h5 className="card-title">{item.title}</h5>
                    <div className="expanded-content">
                      <p>{item.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: Modelo */}
      {/* Modelo Section */}
      {/* Modelo Section */}
      <section id="modelo" className="py-5 text-center modelo-section">
        <div className="container">
          <h1 className="mb-4">Nuestro Modelo</h1>
          <p className="lead mb-5">
            Analizamos 4 variables para otorgar crédito inmediato a la pequeña
            empresa.
          </p>
          <div className="row">
            {[
              {
                title: "Situación de Empresa",
                details: "Alta RFC y situación fiscal",
                icon: "fas fa-building",
              },
              {
                title: "Buró de Crédito",
                details: "Consulta y análisis detallado",
                icon: "fas fa-credit-card",
              },
              {
                title: "Modelo Financiero",
                details: "A través de nuestro algoritmo de scoring",
                icon: "fas fa-chart-line",
              },
              {
                title: "Capacidad de Pago",
                details: "EBITDA / Intereses Anuales",
                icon: "fas fa-wallet",
              },
            ].map((item, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card modelo-card">
                  <div className="card-body text-center">
                    <i className={`${item.icon} icono`}></i>
                    <h5 className="card-title mt-3">{item.title}</h5>
                    <p className="card-text">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section text-dark">
        <div className="container">
          {/* Logotipo */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-4 text-center">
              <img src={logo} alt="Logotipo" className="logo-small" />
            </div>
          </div>

          {/* Información Principal */}
          <div className="row">
            {/* Contacto */}
            <div className="col-md-3">
              <h5>Contacto</h5>
              <p>Tel: +52 123 456 7890</p>
              <p>Email: contacto@mxccapital.com.mx</p>
              <p>Dirección:</p>
              <p>
                Torre Esmeralda III, Ferrocarril de Cuernavaca, Ciudad de
                México.
              </p>
              <i class="fas fa-globe"></i>
            </div>

            {/* Enlaces */}
            <div className="col-md-3">
              <h5>Enlaces</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#pimx" className="footer-link">
                    Acerca de PiMX
                  </a>
                </li>
                <li>
                  <a href="#equipo" className="footer-link">
                    Equipo
                  </a>
                </li>
                <li>
                  <a href="#track" className="footer-link">
                    Track Record
                  </a>
                </li>
              </ul>
            </div>

            {/* Alianzas */}
            <div className="col-md-3">
              <h5>Alianzas</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://www.pimx.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    PiMX Fondo de Deuda
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.crowdlink.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Crowdlink
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.soporteimpulsa.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Soporte Impulsa
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.vepormas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    VePorMás
                  </a>
                </li>
              </ul>
            </div>

            {/* Síguenos */}
            <div className="col-md-3">
              <h5>Síguenos</h5>
              <a href="#" className="footer-link me-3">
                <i className="fab fa-reddit"></i>
              </a>
              <a href="#" className="footer-link me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="footer-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitud" element={<Solicitud />} />
      </Routes>
    </Router>
  );
};

export default App;
