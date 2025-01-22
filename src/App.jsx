import React, { useState, useEffect } from "react"; // Agregado useState y useEffect
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/navbar.css";
import "./assets/css/index.css";
import "./assets/css/login.css";
import "./assets/css/solicitud.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Solicitud from "./solicitud";
import Login from "./login";
import Simulador from "./simulador";
import Navbar from "./components/Navbar"; // Componente Navbar
import logo from "./assets/images/logo1.png";
import crowdlinkImg from "./assets/images/crowdlink.png";
import pimxImg from "./assets/images/pimx.png";
import Dash from "./dash";
import Usuarios from "./usuarios";
import "@fontsource/poppins"; // Estilo normal
import "@fontsource/poppins/600.css"; // Estilo bold
import ProtectedRoute from "./ProtectedRoute"; // Ajusta la ruta según dónde creaste el archivo

const Home = () => {
  const [activeCard, setActiveCard] = useState(-1); // Caja activa para animaciones

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const handleScroll = () => {
    const sections = document.querySelectorAll(".column-card-container");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2
      ) {
        setActiveCard(index);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar />
      <header
        id="hero"
        className="hero_area text-center text-white"
        data-aos="fade-up"
      >
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="container py-5">
          <h1 className="display-4">Bienvenido a Weik</h1>
          <p className="lead">
            Acceso fácil a crédito justo para la Pequeña & Mediana Empresa en
            México.
          </p>
          <button className="btn btn-light btn-lg mt-3">Conócenos</button>
        </div>
      </header>
      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4" data-aos="fade-up">
            Acerca de Nosotros
          </h2>
          <p className="text-muted" data-aos="fade-up">
            Tuki es una plataforma que utiliza un modelo propio e Inteligencia
            Artificial para facilitar acceso a crédito simple.
          </p>
          <img src={logo} alt="Logotipo" className="logo-small mt-4" />
        </div>
      </section>
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
                details: "La Empresa Promovida Obtiene los recursos.",
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

      {/*  Modelo de Negocio Sección   */}
      <section id="modelo" className="py-5 text-center modelo-section">
        <div className="container">
          {/* Título y descripción */}
          <h1 className="mb-4">Nuestro Modelo</h1>
          <p className="lead mb-5">
            Analizamos 4 variables para otorgar crédito inmediato a la pequeña
            empresa.
          </p>

          {/* Cuatro cajas principales */}
          <div className="row">
            {[
              {
                title: "Situación de Empresa",
                details: ["Alta RFC", "Situación fiscal"],
                icon: "fas fa-building",
              },
              {
                title: "Buró de Crédito",
                details: ["Consulta detallada", "Análisis completo"],
                icon: "fas fa-credit-card",
              },
              {
                title: "Modelo Financiero",
                details: ["Algoritmo de scoring", "Proyecciones avanzadas"],
                icon: "fas fa-chart-line",
              },
              {
                title: "Capacidad de Pago",
                details: ["EBITDA", "Intereses Anuales"],
                icon: "fas fa-wallet",
              },
            ].map((item, index) => (
              <div className="col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card modelo-card">
                  <div className="card-body text-center">
                    <i className={`${item.icon} icono`}></i>
                    <h5 className="card-title mt-3">{item.title}</h5>
                    <ul className="card-text">
                      {item.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtítulo */}
          <h2 className="mt-5 mb-4 subtitulo">
            Empresas con las que trabajamos:
          </h2>

          {/* Dos cajas adicionales */}
          <div className="row">
            {[
              {
                title: "Crowdlink",
                content: [
                  "Líder en Crowd Equity & Crowdlending para Pymes.",
                  "Fintech Regulada por CNBV: PorCuanto S.A. de C.V., IFC.",
                ],
                imgSrc: crowdlinkImg, // Imagen local importada
              },
              {
                title: "Pimx",
                content: [
                  "Fondo Privado de Deuda para la Mediana Empresa en México.",
                  "Créditos con garantías Reales de $10MM hasta $250MM.",
                ],
                imgSrc: pimxImg, // Imagen local importada
              },
            ].map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card empresa-card">
                  <div className="card-body text-center">
                    <img
                      src={item.imgSrc}
                      alt={`Logotipo de ${item.title}`}
                      className={`empresa-img mb-3 ${
                        item.title === "Crowdlink" ? "zoom-out" : ""
                      }`}
                    />
                    <h5 className="empresa-title">
                      {item.title} <span className="blinking-dot"></span>
                    </h5>
                    <ul className="empresa-content">
                      {item.content.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
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
              <p>Tel: +52 55 5551609091</p>
              <p>Email: contacto@[AQUI VA NOMBRE NUEVO].com.mx</p>
              <p>Dirección:</p>
              <p>
                Tiburcio Montiel 89, Colonia San Miguel Chapultepec, Miguel
                Hidalgo, C.P. 11850, Ciudad de México, México.
              </p>
              <i className="fas fa-globe"></i>
            </div>

            {/* Enlaces */}
            <div className="col-md-3">
              <h5>Enlaces</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#inicio" className="footer-link">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#acerca" className="footer-link">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#modelo" className="footer-link">
                    Modelo
                  </a>
                </li>
                <li>
                  <a href="/simulador" className="footer-link">
                    Simulador
                  </a>
                </li>
                <li>
                  <a href="/solicitud" className="footer-link">
                    Solicitud
                  </a>
                </li>
                <li>
                  <a href="/login" className="footer-link">
                    Login
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
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitud" element={<Solicitud />} />

        {/* Rutas protegidas */}
        <Route
          path="/dash"
          element={
            <ProtectedRoute>
              <Dash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
