const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Chofer = sequelize.define("Chofer", {
 dni:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
    nombre: {
    type: DataTypes.STRING,
      allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Chofer;

