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
  const [usuarios, setUsuarios] = useState([]);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cantidad de elementos por página

  // Obtener datos paginados
  const paginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

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

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    if (activeSection === "solicitudes") fetchSolicitudes();
    if (activeSection === "usuarios") fetchUsuarios();
  }, [activeSection]);

  const totalPagesSolicitudes = Math.ceil(solicitudes.length / itemsPerPage);
  const totalPagesUsuarios = Math.ceil(usuarios.length / itemsPerPage);

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
        <a
          href="#"
          className="sidebar-item"
          onClick={() => setActiveSection("usuarios")}
        >
          <i className="fas fa-users"></i>
          <span className="text">Usuarios</span>
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
                {paginatedData(solicitudes).map((solicitud, index) => (
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
                      }).format(parseFloat(solicitud.montoCredito))}
                    </td>
                    <td>{solicitud.plazo} meses</td>
                    <td>{new Date(solicitud.fecha).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPagesSolicitudes }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {activeSection === "usuarios" && (
          <>
            <h1>Usuarios Registrados</h1>
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData(usuarios).map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{new Date(usuario.fechaRegistro).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPagesUsuarios }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dash;
