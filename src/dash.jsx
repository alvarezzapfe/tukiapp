import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import axios from "axios";
import "./assets/css/dash.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);

const Dash = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [solicitudes, setSolicitudes] = useState([]);

  // Datos para gráficas
  const lineData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Crecimiento en Ventas",
        data: [10, 20, 30, 50, 70, 90, 120, 150, 180, 210, 250, 300],
        borderColor: "#16c79a",
        backgroundColor: "rgba(22, 199, 154, 0.2)",
        borderWidth: 3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Activo", "Pasivo", "Capital"],
    datasets: [
      {
        data: [1000, 400, 600],
        backgroundColor: ["#1b1f3b", "#ff4d4f", "#16c79a"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Corto Plazo", "Mediano Plazo", "Largo Plazo"],
    datasets: [
      {
        label: "Perfil de la Deuda",
        data: [30, 50, 20],
        backgroundColor: ["#16c79a", "#1b1f3b", "#8faac2"],
        borderWidth: 1,
      },
    ],
  };

  // Cargar solicitudes desde el backend
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/solicitudes"
        );
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      }
    };

    if (activeSection === "solicitudes") {
      fetchSolicitudes();
    }
  }, [activeSection]);

  return (
    <div className="dash-page">
      {/* Barra lateral */}
      <div className="sidebar">
        <a
          href="#"
          className="sidebar-item"
          onClick={() => setActiveSection("dashboard")}
        >
          <i className="fas fa-chart-line"></i>
          <span className="text">Dashboard</span>
        </a>
        <a
          href="#"
          className="sidebar-item"
          onClick={() => setActiveSection("solicitudes")}
        >
          <i className="fas fa-money-check-alt"></i>
          <span className="text">Solicitudes</span>
        </a>
        <Link to="/" className="sidebar-item logout">
          <i className="fas fa-sign-out-alt"></i>
          <span className="text">Salir</span>
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="content">
        {activeSection === "dashboard" && (
          <>
            <h1>Dashboard</h1>
            <div className="graphs-container">
              <div className="graph-box">
                <h3>Crecimiento Mensual</h3>
                <Line data={lineData} />
              </div>
              <div className="graph-box">
                <h3>Estructura Financiera</h3>
                <Doughnut data={doughnutData} />
                <p className="dashboard-caption">Capital = Activo - Pasivo</p>
              </div>
              <div className="graph-box">
                <h3>Perfil de la Deuda</h3>
                <Bar data={barData} />
              </div>
            </div>
          </>
        )}

        {activeSection === "solicitudes" && (
          <>
            <h1>Solicitudes Recibidas</h1>
            <table className="creditos-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>RFC</th>
                  <th>Facturación</th>
                  <th>Razón Social</th>
                  <th>Tipo de Sociedad</th>
                  <th>Monto Crédito</th>
                  <th>Plazo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud, index) => (
                  <tr key={index}>
                    <td>{solicitud.nombre}</td>
                    <td>{solicitud.apellido}</td>
                    <td>{solicitud.rfc}</td>
                    <td>{solicitud.facturacion}</td>
                    <td>{solicitud.razonSocial}</td>
                    <td>{solicitud.tipoSociedad}</td>
                    <td>{solicitud.montoCredito}</td>
                    <td>{solicitud.plazo}</td>
                    <td>{new Date(solicitud.fecha).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Dash;
