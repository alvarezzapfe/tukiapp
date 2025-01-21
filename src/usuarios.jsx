import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./assets/css/usuarios.css";

const Usuarios = () => {
  const [activeSection, setActiveSection] = useState("perfil");
  const [perfilData, setPerfilData] = useState({});
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchPerfilData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/usuario");
        setPerfilData(response.data);
      } catch (error) {
        console.error("Error al obtener perfil del usuario:", error);
      }
    };

    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/usuario/solicitudes"
        );
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error al obtener solicitudes del usuario:", error);
      }
    };

    if (activeSection === "perfil") fetchPerfilData();
    if (activeSection === "solicitudes") fetchSolicitudes();
  }, [activeSection]);

  return (
    <div className="usuarios-page">
      {/* Barra lateral */}
      <div className="sidebar">
        <a
          href="#"
          className={`sidebar-item ${
            activeSection === "perfil" ? "active" : ""
          }`}
          onClick={() => setActiveSection("perfil")}
        >
          <i className="fas fa-user-circle"></i>
          <span className="text">Perfil</span>
        </a>
        <a
          href="#"
          className={`sidebar-item ${
            activeSection === "solicitudes" ? "active" : ""
          }`}
          onClick={() => setActiveSection("solicitudes")}
        >
          <i className="fas fa-file-alt"></i>
          <span className="text">Solicitudes</span>
        </a>
        <Link to="/" className="sidebar-item logout">
          <i className="fas fa-sign-out-alt"></i>
          <span className="text">Salir</span>
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="content">
        {activeSection === "perfil" && (
          <>
            <h1 className="content-title">Mi Perfil</h1>
            <div className="perfil-container">
              <div className="perfil-box">
                <h2>Nombre Completo</h2>
                <p>
                  {perfilData.primerNombre} {perfilData.apellidoPaterno}{" "}
                  {perfilData.apellidoMaterno}
                </p>
              </div>
              <div className="perfil-box">
                <h2>Correo Electrónico</h2>
                <p>{perfilData.correo}</p>
              </div>
              <div className="perfil-box">
                <h2>Teléfono</h2>
                <p>{perfilData.celular}</p>
              </div>
              <div className="perfil-box">
                <h2>Fecha de Registro</h2>
                <p>
                  {perfilData.fechaRegistro &&
                    new Date(perfilData.fechaRegistro).toLocaleDateString()}
                </p>
              </div>
            </div>
          </>
        )}

        {activeSection === "solicitudes" && (
          <>
            <h1 className="content-title">Mis Solicitudes</h1>
            <table className="solicitudes-table">
              <thead>
                <tr>
                  <th>Monto</th>
                  <th>Plazo</th>
                  <th>Estado</th>
                  <th>Industria</th>
                  <th>RFC</th>
                  <th>Fecha</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud, index) => (
                  <tr key={index}>
                    <td>
                      {new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                      }).format(parseFloat(solicitud.montoCredito))}
                    </td>
                    <td>{solicitud.plazo} meses</td>
                    <td>{solicitud.estado}</td>
                    <td>{solicitud.industria}</td>
                    <td>{solicitud.rfc}</td>
                    <td>{new Date(solicitud.fecha).toLocaleDateString()}</td>
                    <td
                      className={
                        solicitud.estatus === "En revisión"
                          ? "status-revision"
                          : solicitud.estatus === "Aprobada"
                          ? "status-aprobada"
                          : "status-rechazada"
                      }
                    >
                      {solicitud.estatus}
                    </td>
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

export default Usuarios;
