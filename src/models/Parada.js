const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Parada = sequelize.define("Parada", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitud: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Parada;

