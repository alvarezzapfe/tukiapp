import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/dash.css";

const Dash = () => {
  return (
    <div className="dash-page">
      {/* Barra lateral */}
      <div className="sidebar">
        <a href="#" className="sidebar-item">
          <i className="fas fa-chart-line"></i>
          <span className="text">Dashboard</span>
        </a>
        <a href="#" className="sidebar-item">
          <i className="fas fa-user"></i>
          <span className="text">Usuario</span>
        </a>
        <Link to="/" className="sidebar-item logout">
          <i className="fas fa-sign-out-alt"></i>
          <span className="text">Salir</span>
        </Link>
      </div>

      {/* Contenido principal (vacío por ahora) */}
      <div className="content">
        <h1>Bienvenido</h1>
        <p>El contenido se añadirá aquí.</p>
      </div>
    </div>
  );
};

export default Dash;
