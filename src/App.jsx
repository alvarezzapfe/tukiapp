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
import AccessDenied from "./AccessDenied"; // Ajusta la ruta según la estructura de tu proyecto

const Home = () => {
  const [activeCard, setActiveCard] = useState(-1); // Caja activa para animaciones

  const [faqOpen, setFaqOpen] = useState(null);

  // Inicializar AOS
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
      {/* Sección Hero */}
      <header
        id="hero"
        className="hero_area text-center text-white"
        data-aos="fade-up"
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3" data-aos="fade-down">
            Bienvenido a <span className="text-gradient">Finsentia</span>
          </h1>
          <p className="lead mb-4" data-aos="fade-right">
            Impulsando el acceso a crédito justo y transparente para las PYMEs
            en México.
          </p>
          <div className="cta-buttons" data-aos="fade-up">
            <button className="btn btn-primary btn-lg mx-2">Conócenos</button>
          </div>
        </div>

        {/* Contenedor de gráficos y dashboard */}
        <div className="hero-visuals">
          <img src={logo} alt="Logotipo" className="logo-small" />
          <div className="neon-effects"></div>
        </div>
      </header>

      {/* Sección Acerca de */}
      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4" data-aos="fade-up">
            Transformamos el Futuro Financiero
          </h2>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4" data-aos="fade-right">
              <p className="text-muted">
                Nuestra misión es revolucionar el acceso a crédito con
                soluciones simples, personalizadas y transparentes para pequeñas
                y medianas empresas. Ofrecemos estructuras de créditos desde 1
                hasta 100 millones de pesos MXN.
              </p>
              <button className="btn btn-primary mt-3">Descubre Más</button>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img
                src={logo}
                alt="Logotipo"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Productos */}
      {/* Sección Productos */}
      <section id="productos">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Nuestros Productos
          </h2>
          <div className="product-container">
            {[
              {
                title: "Crédito Simple",
                details: [
                  "Financiamiento flexible para empresas.",
                  "Respaldado con garantías reales.",
                ],
              },
              {
                title: "Arrendamiento Puro",
                details: [
                  "Ideal para adquisición de activos.",
                  "Beneficios fiscales atractivos.",
                ],
              },
              {
                title: "Deuda Convertible",
                details: [
                  "Alternativa de financiamiento híbrida.",
                  "Opción de convertir deuda en capital.",
                ],
              },
            ].map((producto, index) => (
              <div className="product-card" key={index}>
                <h4 className="product-title">{producto.title}</h4>
                <ul className="product-list">
                  {producto.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="columns" className="py-5 text-center" data-aos="fade-up">
        <div className="container expanded-section position-relative">
          <h2 className="mb-5">Nuestra Propuesta de Valor</h2>
          <h3 className="mb-5">
            Eliminar fricciones en el proceso de Crédito tradicional
          </h3>
          {/* Rayo eléctrico */}
          <div className="arrow-electric"></div>

          <div className="columns-container">
            {[
              {
                title: "Registro",
                icon: "fas fa-briefcase",
                details: "Envía tu solicitud.",
              },
              {
                title: "Análisis y Preoferta",
                icon: "fas fa-chart-line",
                details: "Revisa preoferta en segundos.",
              },
              {
                title: "Due Diligence",
                icon: "fas fa-users",
                details: "Completa tu documentación y obtén oferta formal.",
              },
              {
                title: "Fondeo",
                icon: "fas fa-wallet",
                details: "Tu Empresa recibe la línea de crédito.",
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

      {/* Sección Modelo de Negocio */}
      {/*  Modelo de Negocio Sección   */}
      <section id="modelo" className="py-5 text-center modelo-section">
        <div className="container">
          {/* Título y descripción */}
          <h1 className="mb-4"></h1>
          <p className="lead mb-5">
            Nuestro Modelo analiza 4 variables para agilizar oferta de crédito a
            la pequeña y mediana empresa.
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
        </div>
      </section>

      {/* Sección FAQ Mejorada */}
      <section id="faq" className="faq-section text-center">
        <div className="container">
          <h2 className="mb-4">Preguntas Frecuentes</h2>
          <div className="faq-container">
            {[
              {
                question: "¿Cómo funciona el crédito?",
                answer:
                  "Nuestro proceso es 100% digital. Regístrate, llena tu solicitud y recibe una preoferta en minutos.",
              },
              {
                question: "¿Cuánto tarda la aprobación?",
                answer:
                  "El análisis inicial es inmediato. La aprobación final depende de la validación de documentos.",
              },
              {
                question: "¿Cuáles son los requisitos?",
                answer:
                  "RFC, estados financieros recientes y un historial crediticio saludable.",
              },
              {
                question: "¿Qué tasas de interés manejan?",
                answer:
                  "Depende del perfil de riesgo, pero ofrecemos tasas desde el 12% anual.",
              },
              {
                question: "¿Cómo se paga el crédito?",
                answer:
                  "Las mensualidades se depositan directament a nosotros para pago de intereses y/o amortizaciones.",
              },
              {
                question: "¿Puedo solicitar un monto mayor?",
                answer:
                  "Sí, con base en tu historial de pagos y análisis financiero, puedes acceder a montos mayores.",
              },
              {
                question: "¿Tienen restricciones por industria?",
                answer:
                  "No financiamos empresas relacionadas con financiamiento, criptomonedas o armas.",
              },
              {
                question: "¿Qué pasa si no puedo pagar?",
                answer:
                  "Contamos con programas de reestructuración de pagos. Contáctanos para evaluar opciones.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`faq-box ${faqOpen === index ? "open" : ""}`}
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                <div className="faq-question">
                  <h5>{item.question}</h5>
                  <i
                    className={`fas ${
                      faqOpen === index ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                </div>
                <div
                  className={`faq-answer ${faqOpen === index ? "show" : ""}`}
                >
                  <p>{item.answer}</p>
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
              <p>Email: contacto@i2.com.mx</p>
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
                    PiMX
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
                Inversión de Capital Variable, (""), para su constitución y
                operación con tal carácter, no requiere de autorización de la
                Secretaría de Hacienda y Crédito Público.©. Todos los derechos
                reservados. Prohibida la reproducción total o parcial del
                contenido de este sitio. * Todo el análisis es generado con
                herramientas y desarrollo interno.
              </p>
            </div>
          </div>

          {/* Créditos Finales */}
          {/* Créditos Finales */}
          <div className="row mt-4">
            <div className="col text-center">
              <p className="footer-credits small">
                Desarrollado{" "}
                <a
                  href="https://www.linkedin.com/in/luis-armando-alvarez-zapfe-201217137/?originalSubdomain=mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  internamente
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
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Rutas protegidas */}
        <Route
          path="/dash"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Usuarios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
