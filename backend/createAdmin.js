const bcrypt = require("bcryptjs");
const User = require("./models/User");

(async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin", // Asegúrate de que "role" esté definido en tu modelo User
    });
    console.log("Admin creado correctamente:", admin);
  } catch (err) {
    console.error("Error al crear el admin:", err.message);
  }
})();
