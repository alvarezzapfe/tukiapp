import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo1.png";
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logotipo" className="navbar-logo-image" />
          <span className="navbar-logo-text">MiEmpresa</span>
        </Link>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScroll("about")}
            >
              Acerca de
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScroll("columns")}
            >
              Productos
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScroll("modelo")}
            >
              Modelo
            </button>
          </li>
          <li>
            <Link to="/simulador" onClick={() => setMenuOpen(false)}>
              Simulador
            </Link>
          </li>
          <li>
            <Link to="/solicitud" onClick={() => setMenuOpen(false)}>
              Solicitud
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="btn btn-outline-light ms-3"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
