const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Horario = sequelize.define("Horario", {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
    dia: {
    type: DataTypes.INTEGER,
      allowNull: false,
  },
  hora: {
    type: DataTypes.INTEGER,
      allowNull: false
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Horario;



