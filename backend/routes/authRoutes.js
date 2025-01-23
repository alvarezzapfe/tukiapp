const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const router = express.Router();

// Helper para validar correo
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Middleware para verificar la conexión a MongoDB
const ensureDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error(
      "Base de datos desconectada. Estado:",
      mongoose.connection.readyState
    );
    return res.status(503).json({
      error: "La base de datos no está conectada. Intenta más tarde.",
    });
  }
  next();
};

// Ruta para registrar un usuario
router.post("/register", ensureDbConnection, async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son obligatorios." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Formato de correo inválido." });
  }

  if (role && !["user", "admin", "client"].includes(role)) {
    return res.status(400).json({ message: "Rol no válido." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
});

// Ruta para iniciar sesión
router.post("/login", ensureDbConnection, async (req, res) => {
  console.log("Datos recibidos para login:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son obligatorios." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Usuario no encontrado para email: ${email}`);
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.status(200).json({
      token,
      role: user.role,
      userId: user._id,
      message: "Inicio de sesión exitoso.",
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
});

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.error("Error al verificar token:", error.message);
      return res.status(401).json({ message: "Token inválido o expirado." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  router, // Exporta las rutas
  verifyToken, // Exporta la función verifyToken
};

router.get("/test-db", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ["Desconectado", "Conectando", "Conectado", "Desconectando"];
  res.status(200).json({
    estado: states[dbState],
    readyState: dbState,
    message: "Prueba de conexión a MongoDB exitosa",
  });
});
