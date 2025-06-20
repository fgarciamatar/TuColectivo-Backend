const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Linea = sequelize.define("Linea", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Linea" // 👈 evita que Sequelize pluralice
});

module.exports = Linea;




