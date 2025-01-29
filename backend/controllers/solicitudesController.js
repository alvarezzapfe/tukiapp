const Solicitud = require("../models/Solicitud");

exports.crearSolicitud = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const nuevaSolicitud = await Solicitud.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Solicitud creada exitosamente",
      data: nuevaSolicitud,
    });
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
