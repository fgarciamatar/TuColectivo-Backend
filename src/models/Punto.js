const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Punto = sequelize.define("Punto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  posicion:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Punto;
