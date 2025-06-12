const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Empresa = sequelize.define("Empresa", {
 id_empresa:{
    type: DataTypes.INTEGER,
    primaryKey: true,
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



