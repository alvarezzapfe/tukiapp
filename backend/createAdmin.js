const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config(); // Cargar variables de entorno

(async () => {
  try {
    const admins = [
      {
        username: "Admin Principal",
        email: process.env.ADMIN_1_EMAIL,
        password: process.env.ADMIN_1_PASSWORD,
        role: "admin",
      },
      {
        username: "Luis Crowdlink",
        email: process.env.ADMIN_2_EMAIL,
        password: process.env.ADMIN_2_PASSWORD,
        role: "admin",
      },
    ];

    for (let admin of admins) {
      if (!admin.email || !admin.password) {
        console.log(
          `⚠️ Skipping admin: ${admin.username} (missing email/password)`
        );
        continue;
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({
        where: { email: admin.email },
      });
      if (existingUser) {
        console.log(`🔹 Admin ya existente: ${admin.email}, no se recrea.`);
        continue;
      }

      // Encriptar la contraseña
      admin.password = await bcrypt.hash(admin.password, 10);

      // Crear el usuario admin en la base de datos
      const createdAdmin = await User.create(admin);
      console.log(`✅ Admin creado correctamente: ${createdAdmin.username}`);
    }
  } catch (err) {
    console.error("❌ Error al crear los admins:", err.message);
  }
})();
