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
   id_empresa: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: "Empresa",
    key: "id"
  }
},
 id_linea: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: "Linea",
    key: "id"
  }
}
}, {
  tableName: "Colectivo" // 👈 evita que Sequelize pluralice
});

module.exports = Colectivo;



