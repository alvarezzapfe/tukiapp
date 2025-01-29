const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token)
    return res
      .status(401)
      .json({ message: "No autorizado. Token no proporcionado." });

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded; // Añade los datos del usuario al request
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;
