const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 🔹 Inicio de sesión
router.post("/login", async (req, res) => {
  console.log("Datos recibidos en login:", req.body);

  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ Usuario no encontrado:", email);
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Verificar que el rol coincida
    if (user.role !== role) {
      console.log("❌ El usuario tiene un rol diferente:", user.role);
      return res.status(403).json({ message: "No tienes permisos." });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
      expiresIn: "1h",
    });

    console.log(
      "✅ Usuario autenticado correctamente:",
      email,
      "Rol:",
      user.role
    );
    res.json({ token, user });
  } catch (error) {
    console.error("⚠️ Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

module.exports = router;
