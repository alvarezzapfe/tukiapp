const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");

dotenv.config();

const app = express(); // ✅ Primero definimos `app`

// Middleware
app.use(express.json()); // ✅ Ahora sí podemos usarlo
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/solicitudes", require("./routes/solicitudesRoutes"));

// Sincronizar los modelos con la base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error("⚠️ Error al sincronizar modelos:", error);
  }
})();

// Configuración del puerto
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
