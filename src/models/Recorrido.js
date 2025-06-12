const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Recorrido = sequelize.define("Recorrido", {
  id_recorrido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Recorrido;
