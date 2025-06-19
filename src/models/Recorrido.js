const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Recorrido = sequelize.define("Recorrido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Recorrido;
