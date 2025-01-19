import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo1.png"; // Ruta correcta
import "../assets/css/navbar.css"; // Ruta correcta

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logotipo" className="logo-small" />
        </Link>
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`navbar-menu ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/">Inicio</a>
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
            <Link to="/simulador">Simulador</Link>
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
    </nav>
  );
};

export default Navbar;
