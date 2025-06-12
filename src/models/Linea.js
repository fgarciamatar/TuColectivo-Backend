const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Linea = sequelize.define("Linea", {
 id_linea:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Linea;


// PARADA_HORARIO
// --------------
// id (PK)
// parada_id (FK → PARADA)
// linea_id (FK → LINEA)
// horario (TIME)
// dia (opcional, por si varían los días)
// turno (opcional: mañana, tarde, noche)


