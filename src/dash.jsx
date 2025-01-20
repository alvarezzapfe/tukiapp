import React, { useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
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

  const creditos = [
    {
      monto: "$500,000",
      tasa: "10%",
      intereses: "$50,000",
      fechaPagoIntereses: "2025-02-01",
      fechaInicio: "2024-01-01",
      fechaFin: "2026-01-01",
      bullet: "No",
    },
    {
      monto: "$1,000,000",
      tasa: "12%",
      intereses: "$120,000",
      fechaPagoIntereses: "2025-03-01",
      fechaInicio: "2024-06-01",
      fechaFin: "2027-06-01",
      bullet: "Sí",
    },
  ];

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
          onClick={() => setActiveSection("creditos")}
        >
          <i className="fas fa-money-check-alt"></i>
          <span className="text">Créditos</span>
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

        {activeSection === "creditos" && (
          <>
            <h1>Créditos Otorgados</h1>
            <table className="creditos-table">
              <thead>
                <tr>
                  <th>Monto</th>
                  <th>Tasa</th>
                  <th>Intereses</th>
                  <th>Fecha de Pago de Intereses</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Bullet</th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((credito, index) => (
                  <tr key={index}>
                    <td>{credito.monto}</td>
                    <td>{credito.tasa}</td>
                    <td>{credito.intereses}</td>
                    <td>{credito.fechaPagoIntereses}</td>
                    <td>{credito.fechaInicio}</td>
                    <td>{credito.fechaFin}</td>
                    <td>{credito.bullet}</td>
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
