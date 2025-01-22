require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const readline = require("readline");
const User = require("./models/User");

// Configuración de la consola para ingresar datos dinámicamente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");

    // Solicitar correo y contraseña al usuario
    rl.question("Ingresa el correo del administrador: ", async (email) => {
      rl.question(
        "Ingresa la contraseña del administrador: ",
        async (password) => {
          try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el administrador
            const admin = new User({
              email,
              password: hashedPassword,
              role: "admin",
            });
            await admin.save();

            console.log("Administrador creado exitosamente.");
          } catch (error) {
            console.error("Error al crear el administrador:", error);
          } finally {
            mongoose.connection.close();
            rl.close();
          }
        }
      );
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    rl.close();
  });
