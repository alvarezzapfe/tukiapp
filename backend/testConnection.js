const { Sequelize } = require("sequelize");

// Configuración de conexión
const sequelize = new Sequelize("tuki_db", "root", "Wuicha90$", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Opcional: evita logs extensos
});

(async () => {
  try {
    // Autenticar conexión
    await sequelize.authenticate();
    console.log("Conexión a MySQL exitosa.");
  } catch (error) {
    // Mostrar error detallado
    console.error("No se pudo conectar a MySQL:", error.message);
  } finally {
    try {
      // Cerrar conexión
      await sequelize.close();
      console.log("Conexión cerrada.");
    } catch (closeError) {
      console.error("Error al cerrar la conexión:", closeError.message);
    }
  }
})();
