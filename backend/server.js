const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const solicitudesRoutes = require("./routes/solicitudesRoutes");

dotenv.config();

const app = express(); // ✅ Inicializamos Express

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Ya maneja JSON, no se necesita `bodyParser.json()`

// ✅ Definir rutas
app.use("/api/auth", authRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

// ✅ Sincronizar modelos con la base de datos
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida correctamente.");

    await sequelize.sync({ alter: true }); // 🔹 Mantiene los cambios sin borrar datos
    console.log("✅ Modelos sincronizados con la base de datos.");

    // Configuración del puerto
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(1); // Si hay un error, detiene la ejecución
  }
};

// ✅ Iniciar el servidor
iniciarServidor();
