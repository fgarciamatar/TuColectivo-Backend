const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Colectivo = sequelize.define("Colectivo", {
 patente:{
    type: DataTypes.STRING,
    primaryKey: true,
  },
    capacidad: {
    type: DataTypes.INTEGER
  },
  modelo: {
    type: DataTypes.INTEGER
  },
});

module.exports = Colectivo;



