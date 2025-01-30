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
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/solicitudes"
        );
        setSolicitudes(response.data);
      } catch (error) {
        console.error("❌ Error al obtener solicitudes:", error);
      }
    };

    if (activeSection === "solicitudes") fetchSolicitudes();
  }, [activeSection]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo: localStorage.removeItem("userToken");
  };

  // Filtrar solicitudes según la búsqueda y filtros individuales
  const filteredSolicitudes = solicitudes
    .filter((sol) =>
      Object.values(sol).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter((sol) =>
      Object.entries(filters).every(
        ([key, value]) => value === "" || sol[key] === value
      )
    );

  // Manejar filtro por columna
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="dash-page">
      {/* Sidebar */}
      <div className="sidebar">
        <a
          onClick={() => setActiveSection("dashboard")}
          className="sidebar-item"
        >
          <i className="fas fa-chart-line"></i>
          <span className="text">Dashboard</span>
        </a>
        <a
          onClick={() => setActiveSection("solicitudes")}
          className="sidebar-item"
        >
          <i className="fas fa-money-check-alt"></i>
          <span className="text">Solicitudes</span>
        </a>
        <Link to="/" className="sidebar-item logout">
          <i className="fas fa-sign-out-alt"></i>
          <span className="text">Salir</span>
        </Link>
      </div>

      <div className="menu-hamburguesa">
        <i className="fas fa-bars" onClick={() => setMenuOpen(!menuOpen)}></i>
        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          </div>
        )}
      </div>

      {/* Contenido Principal */}
      <div className="content">
        {activeSection === "dashboard" && (
          <>
            <div className="dashboard-header">
              <h1>
                <i className="fas fa-tachometer-alt"></i> Panel de Control -
                Resumen General
              </h1>
            </div>

            {/* 🔹 Sección de métricas clave (tarjetas KPI) en 3x2 */}
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-list"></i> Total de Solicitudes
                </h3>
                <p>{solicitudes.length}</p>
              </div>
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-dollar-sign"></i> Monto Total Solicitado
                </h3>
                <p>
                  $
                  {solicitudes
                    .reduce((sum, sol) => sum + sol.montoCredito, 0)
                    .toLocaleString("es-MX")}
                </p>
              </div>
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-chart-line"></i> Promedio por Solicitud
                </h3>
                <p>
                  $
                  {(
                    solicitudes.reduce(
                      (sum, sol) => sum + sol.montoCredito,
                      0
                    ) / solicitudes.length || 0
                  ).toLocaleString("es-MX")}
                </p>
              </div>
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-map-marker-alt"></i> Estados con más
                  solicitudes
                </h3>
                <p>
                  {solicitudes.length > 0
                    ? [...new Set(solicitudes.map((s) => s.estado))]
                        .slice(0, 3)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-calendar-alt"></i> Solicitudes en los
                  Últimos 6 Meses
                </h3>
                <Line
                  data={{
                    labels: ["Ago", "Sep", "Oct", "Nov", "Dic", "Ene"],
                    datasets: [
                      {
                        label: "Solicitudes",
                        data: [8, 15, 10, 22, 30, 18],
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        borderColor: "#007bff",
                        borderWidth: 2,
                      },
                    ],
                  }}
                />
              </div>
              <div className="dashboard-card">
                <h3>
                  <i className="fas fa-exclamation-triangle"></i> Índice de
                  Morosidad
                </h3>
                <p>
                  {solicitudes.length > 0
                    ? (
                        (solicitudes.filter((s) => s.diasMora > 90).length /
                          solicitudes.length) *
                        100
                      ).toFixed(2) + "%"
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* 🔹 Footer */}
            <footer className="dashboard-footer">
              <p>
                🚀 <strong>[ ]</strong> - Dashboard de Análisis.
              </p>
            </footer>
          </>
        )}

        {activeSection === "solicitudes" && (
          <>
            <h1>Solicitudes Recibidas</h1>
            <div className="filter-section">
              <input
                type="text"
                placeholder="Buscar solicitud..."
                className="search-box"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Tabla con filtros */}
            <div className="table-container">
              <table className="creditos-table">
                <thead>
                  <tr>
                    {[
                      "Primer Nombre",
                      "Segundo Nombre",
                      "Apellido Paterno",
                      "Apellido Materno",
                      "Correo",
                      "Celular",
                      "Facturación",
                      "RFC",
                      "Razón Social",
                      "Tipo Sociedad",
                      "Industria",
                      "Estado",
                      "Monto Crédito",
                      "Plazo",
                      "Institución",
                      "Urgencia",
                    ].map((column) => (
                      <th key={column}>
                        {column} <button className="filter-btn">🔽</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentSolicitudes.map((solicitud, index) => (
                    <tr key={index}>
                      <td>{solicitud.primerNombre}</td>
                      <td>{solicitud.segundoNombre || "-"}</td>
                      <td>{solicitud.apellidoPaterno}</td>
                      <td>{solicitud.apellidoMaterno}</td>
                      <td>{solicitud.correo}</td>
                      <td>{solicitud.celular}</td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-MX").format(
                          solicitud.facturacion
                        )}
                      </td>
                      <td>{solicitud.rfc}</td>
                      <td>{solicitud.razonSocial}</td>
                      <td>{solicitud.tipoSociedad}</td>
                      <td>{solicitud.industria}</td>
                      <td>{solicitud.estado}</td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-MX").format(
                          solicitud.montoCredito
                        )}
                      </td>
                      <td>{solicitud.plazo} meses</td>
                      <td>{solicitud.institucion}</td>
                      <td>{solicitud.urgencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="pagination">
              {Array.from(
                {
                  length: Math.ceil(filteredSolicitudes.length / itemsPerPage),
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dash;
