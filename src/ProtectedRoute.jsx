import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Leer token del localStorage

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // Si hay token, renderiza el componente hijo
};

export default ProtectedRoute;
