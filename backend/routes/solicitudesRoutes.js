const express = require("express");
const { crearSolicitud } = require("../controllers/solicitudesController");

const router = express.Router();

// Ruta para crear una solicitud de crédito
router.post("/", crearSolicitud);

module.exports = router;
