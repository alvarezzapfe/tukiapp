const express = require("express");
const {
  crearSolicitud,
  obtenerSolicitudes,
} = require("../controllers/solicitudesController");

const router = express.Router();

// Ruta para crear una solicitud de crédito
router.post("/", crearSolicitud);

// Ruta para obtener todas las solicitudes
router.get("/", obtenerSolicitudes);

module.exports = router;
