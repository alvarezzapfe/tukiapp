require("dotenv").config({ path: "../../.env" }); // Cargar variables de entorno
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet"); // Para mejorar la seguridad
const rateLimit = require("express-rate-limit"); // Para limitar el número de solicitudes
const mongoose = require("mongoose"); // Para conectarse a MongoDB

// Importar rutas
const authRoutes = require("../routes/authRoutes"); // Rutas de autenticación

const app = express();
const PORT = process.env.PORT || 5001;

// --------------------------- Conexión a MongoDB ---------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// --------------------------- Middleware ---------------------------
app.use(helmet()); // Seguridad básica (cabeceras HTTP seguras)
app.use(bodyParser.json()); // Parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS para solicitudes desde otros dominios

// --------------------------- Límite de solicitudes por IP ---------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP. Inténtalo de nuevo más tarde.",
});
app.use(limiter); // Aplicar el límite

// --------------------------- Rutas de autenticación ---------------------------
app.use("/api/auth", authRoutes); // Usar rutas para autenticación

// --------------------------- Simulación de base de datos en memoria ---------------------------
const solicitudes = []; // Base de datos simulada para solicitudes

// Ruta para guardar solicitudes
app.post("/api/solicitudes", (req, res) => {
  const {
    primerNombre,
    segundoNombre,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    celular,
    facturacion,
    rfc,
    razonSocial,
    tipoSociedad,
    industria,
    estado,
    montoCredito,
    plazo,
    institucion,
    urgencia,
  } = req.body;

  // Validación básica de campos obligatorios
  if (
    !primerNombre ||
    !apellidoPaterno ||
    !apellidoMaterno ||
    !correo ||
    !celular ||
    !facturacion ||
    !rfc ||
    !razonSocial ||
    !tipoSociedad ||
    !industria ||
    !estado ||
    !montoCredito ||
    !plazo ||
    !institucion ||
    !urgencia
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  // Validación adicional
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }

  if (isNaN(celular) || celular.length !== 10) {
    return res
      .status(400)
      .json({ error: "El celular debe contener exactamente 10 dígitos." });
  }

  if (isNaN(parseFloat(facturacion)) || isNaN(parseFloat(montoCredito))) {
    return res
      .status(400)
      .json({ error: "Facturación y monto de crédito deben ser números." });
  }

  // Crear nueva solicitud
  const nuevaSolicitud = {
    primerNombre,
    segundoNombre,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    celular,
    facturacion: parseFloat(facturacion),
    rfc,
    razonSocial,
    tipoSociedad,
    industria,
    estado,
    montoCredito: parseFloat(montoCredito),
    plazo: parseInt(plazo, 10),
    institucion,
    urgencia,
    fecha: new Date(),
  };

  solicitudes.push(nuevaSolicitud);
  res.status(201).json({ message: "Solicitud guardada con éxito." });
});

// Ruta para obtener todas las solicitudes
app.get("/api/solicitudes", (req, res) => {
  res.json(solicitudes);
});

// --------------------------- Ruta de prueba ---------------------------
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// --------------------------- Iniciar el servidor ---------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
