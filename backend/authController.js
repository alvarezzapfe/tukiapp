const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Crear el usuario
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    // Verificar la contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "clave_secreta", {
      expiresIn: "1h", // Expira en 1 hora
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

module.exports = { register, login };
