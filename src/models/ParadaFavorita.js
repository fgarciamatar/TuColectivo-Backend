// models/ParadaFavorita.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const ParadaFavorita = sequelize.define("ParadaFavorita", {
  dni: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Usuario", // el nombre real de la tabla
      key: "dni",
    },
  },
  id_parada: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Parada",
      key: "id",
    },
  },
}, {
  tableName: "ParadaFavorita",
  timestamps: false,
});


module.exports = ParadaFavorita;

