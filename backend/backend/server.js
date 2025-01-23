require("dotenv").config({ path: "../../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const { router: authRoutes } = require("../routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// --------------------------- Conexión a MongoDB ---------------------------
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "tuki_db",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
    });
    console.log("Conexión inicial a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    setTimeout(connectToMongoDB, 5000); // Reintentar conexión cada 5 segundos
  }
};

// Eventos de conexión y reconexión
mongoose.connection.on("connected", () => {
  console.log("Conexión a MongoDB exitosa.");
});

mongoose.connection.on("disconnected", () => {
  console.error("Conexión a MongoDB perdida. Intentando reconectar...");
  connectToMongoDB();
});

mongoose.connection.on("error", (err) => {
  console.error("Error en MongoDB:", err.message);
});

mongoose.connection.on("close", () => {
  console.error("La conexión con MongoDB se cerró inesperadamente.");
});

// Inicia la conexión
connectToMongoDB();

// --------------------------- Middleware ---------------------------
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// --------------------------- Límite de solicitudes ---------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 solicitudes por IP
  message: "Demasiadas solicitudes. Inténtalo más tarde.",
});
app.use(limiter);

// Middleware para verificar conexión activa
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error(
      "Base de datos no conectada. Estado:",
      mongoose.connection.readyState
    );
    return res
      .status(503)
      .json({ error: "La base de datos no está conectada." });
  }
  next();
});

// --------------------------- Rutas ---------------------------
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// --------------------------- Iniciar el servidor ---------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
