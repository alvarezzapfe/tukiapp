import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Asegúrate de que App.jsx esté en el mismo nivel
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import "./assets/css/index.css"; // Estilos personalizados

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
