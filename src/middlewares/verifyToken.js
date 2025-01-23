const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar datos decodificados al objeto `req`
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};

module.exports = verifyToken;
