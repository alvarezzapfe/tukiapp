const Solicitud = require("../models/Solicitud");

// ✅ Crear una solicitud (ya lo tienes)
const crearSolicitud = async (req, res) => {
  try {
    console.log("📩 Datos recibidos en el backend:", req.body);
    const nuevaSolicitud = await Solicitud.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Solicitud creada exitosamente",
        data: nuevaSolicitud,
      });
  } catch (error) {
    console.error("❌ Error al crear la solicitud:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al crear la solicitud" });
  }
};

// ✅ Obtener todas las solicitudes
const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll();
    res.json(solicitudes);
  } catch (error) {
    console.error("❌ Error al obtener las solicitudes:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener solicitudes" });
  }
};

module.exports = { crearSolicitud, obtenerSolicitudes };
