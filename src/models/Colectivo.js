const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Colectivo = sequelize.define("Colectivo", {
 patente:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
    capacidad: {
    type: DataTypes.INTEGER
  },
  modelo: {
    type: DataTypes.STRING
  },
});

module.exports = Colectivo;



