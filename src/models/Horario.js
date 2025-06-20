const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Horario = sequelize.define("Horario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   id_linea: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: "Linea",
    key: "id"
  }
},
 id_parada: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: "Parada",
    key: "id"
  }
}
}, {
  tableName: "Horario" // 👈 evita que Sequelize pluralice
});

module.exports = Horario;
