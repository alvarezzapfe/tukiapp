const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Verificar la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
    process.exit(1); // Detiene el proceso si la conexión falla
  }
})();

module.exports = sequelize;
