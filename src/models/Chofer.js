const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Chofer = sequelize.define(
  "Chofer",
  {
    dni: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Empresa",
        key: "id",
      },
    },
  },
  {
    tableName: "Chofer", // 👈 evita que Sequelize pluralice
  }
);

module.exports = Chofer;
