const { sequelize } = require("../models/database");
const Usuario = require("./Usuario");
const Parada = require("./Parada");
const Linea = require("./Linea");
const Horario = require("./Horario");
const Colectivo = require("./Colectivo");
const Chofer = require("./Chofer");
const Empresa = require("./Empresa");
const Punto = require("./Punto");
const ParadaFavorita = require("./ParadaFavorita");

// Empresa - Chofer
Empresa.hasMany(Chofer, { foreignKey: "id_empresa" });
Chofer.belongsTo(Empresa, { foreignKey: "id_empresa" });

// Colectivo - Empresa
Empresa.hasMany(Colectivo, { foreignKey: "id_empresa" });
Colectivo.belongsTo(Empresa, { foreignKey: "id_empresa" });

// Colectivo - Linea
Colectivo.belongsTo(Linea, {
  // Un colectivo pertenece a una línea
  foreignKey: "id_linea",
});
Linea.hasMany(Colectivo, {
  // Una línea tiene muchos colectivos
  foreignKey: "id_linea",
});

//Linea - Punto
Linea.hasMany(Punto, { foreignKey: "id_linea" });
Punto.belongsTo(Linea, { foreignKey: "id_linea" });

// Linea - Horario
Linea.hasMany(Horario, { foreignKey: "id_linea" });
Horario.belongsTo(Linea, { foreignKey: "id_linea" });

// Parada - Horario
Parada.hasMany(Horario, { foreignKey: "id_parada" });
Horario.belongsTo(Parada, { foreignKey: "id_parada" });

// Usuario - Parada (muchos a muchos)

Usuario.belongsToMany(Parada, {
  through: ParadaFavorita,
  foreignKey: "dni", // clave que coincide con PK de Usuario
  otherKey: "id", // clave que coincide con PK de Parada
});

Parada.belongsToMany(Usuario, {
  through: ParadaFavorita,
  foreignKey: "id", // clave que coincide con PK de Parada
  otherKey: "dni", // clave que coincide con PK de Usuario
});

ParadaFavorita.belongsTo(Parada, { foreignKey: "id_parada", as: "Parada" });
ParadaFavorita.belongsTo(Usuario, { foreignKey: "id", as: "Usuario" });


module.exports = {
  Usuario,
  Parada,
  Linea,
  Horario,
  Colectivo,
  Chofer,
  Empresa,
  Punto,
  sequelize,
};
