import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" />;
  }

  // Decodificar el token para obtener el rol del usuario
  const userRole = JSON.parse(atob(token.split(".")[1])).role;

  // Si el rol del usuario no está permitido, redirigir a una página de acceso denegado
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/access-denied" />;
  }

  return children; // Si el usuario tiene acceso, renderizar el contenido
};

export default ProtectedRoute;
