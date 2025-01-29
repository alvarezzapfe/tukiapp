const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Asegúrate de importar bien la conexión

const Solicitud = sequelize.define("Solicitud", {
  primerNombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundoNombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facturacion: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rfc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoSociedad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montoCredito: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  plazo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urgencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Solicitud;
