import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import axios from "axios";
import "./assets/css/dash.css";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dash = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [solicitudes, setSolicitudes] = useState([]);

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
                <Line
                  data={{
                    labels: ["Enero", "Febrero", "Marzo", "Abril"],
                    datasets: [
                      {
                        label: "Ventas",
                        data: [10, 20, 30, 40],
                        backgroundColor: "rgba(22, 199, 154, 0.2)",
                        borderColor: "#16c79a",
                        borderWidth: 3,
                      },
                    ],
                  }}
                />
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
                  <th>Primer Nombre</th>
                  <th>Apellido Paterno</th>
                  <th>Correo</th>
                  <th>Celular</th>
                  <th>RFC</th>
                  <th>Razón Social</th>
                  <th>Estado</th>
                  <th>Monto Crédito</th>
                  <th>Plazo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud, index) => (
                  <tr key={index}>
                    <td>{solicitud.primerNombre}</td>
                    <td>{solicitud.apellidoPaterno}</td>
                    <td>{solicitud.correo}</td>
                    <td>{solicitud.celular}</td>
                    <td>{solicitud.rfc}</td>
                    <td>{solicitud.razonSocial}</td>
                    <td>{solicitud.estado}</td>
                    <td>
                      {new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                        minimumFractionDigits: 2,
                      }).format(parseFloat(solicitud.montoCredito))}
                    </td>

                    <td>{solicitud.plazo} meses</td>
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
