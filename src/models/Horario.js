const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Horario = sequelize.define("Horario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Horario;
