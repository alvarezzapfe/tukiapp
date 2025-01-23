const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  primerNombre: { type: String, required: true },
  segundoNombre: { type: String },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  correo: { type: String, required: true },
  celular: { type: String, required: true },
  facturacion: { type: Number, required: true },
  rfc: { type: String, required: true },
  razonSocial: { type: String, required: true },
  tipoSociedad: { type: String, required: true },
  industria: { type: String, required: true },
  estado: { type: String, required: true },
  montoCredito: { type: Number, required: true },
  plazo: { type: Number, required: true },
  institucion: { type: String, required: true },
  urgencia: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Relación con el usuario
});

module.exports = mongoose.model("Solicitud", solicitudSchema);
