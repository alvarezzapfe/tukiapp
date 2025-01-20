require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet"); // Para mejorar la seguridad
const rateLimit = require("express-rate-limit"); // Para limitar el número de solicitudes

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Seguridad básica (cabeceras HTTP seguras)
app.use(bodyParser.json());
app.use(cors());

// Límite de solicitudes por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP. Inténtalo de nuevo más tarde.",
});
app.use(limiter);

// Simulación de base de datos en memoria
const solicitudes = [];

// Ruta para guardar solicitudes
app.post("/api/solicitudes", (req, res) => {
  const {
    nombre,
    apellido,
    rfc,
    facturacion,
    razonSocial,
    tipoSociedad,
    montoCredito,
    plazo,
  } = req.body;

  // Validación básica de campos obligatorios
  if (
    !nombre ||
    !apellido ||
    !rfc ||
    !facturacion ||
    !razonSocial ||
    !tipoSociedad ||
    !montoCredito ||
    !plazo
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  // Validación adicional (por ejemplo, formatos específicos)
  if (isNaN(parseFloat(facturacion)) || isNaN(parseFloat(montoCredito))) {
    return res
      .status(400)
      .json({ error: "Facturación y monto de crédito deben ser números." });
  }

  // Crear nueva solicitud
  const nuevaSolicitud = {
    nombre,
    apellido,
    rfc,
    facturacion: parseFloat(facturacion),
    razonSocial,
    tipoSociedad,
    montoCredito: parseFloat(montoCredito),
    plazo: parseInt(plazo, 10),
    fecha: new Date(),
  };

  solicitudes.push(nuevaSolicitud);
  res.status(201).json({ message: "Solicitud guardada con éxito." });
});

// Ruta para obtener todas las solicitudes
app.get("/api/solicitudes", (req, res) => {
  res.json(solicitudes);
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
