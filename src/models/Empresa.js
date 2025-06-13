const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Empresa = sequelize.define("Empresa", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    ciudad: {
    type: DataTypes.STRING,
      allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Empresa;



