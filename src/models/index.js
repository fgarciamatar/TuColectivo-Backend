const { sequelize } = require("../models/database");
const Usuario = require("./Usuario");
const Parada = require("./Parada");
const Recorrido = require("./Recorrido");
const Linea = require("./Linea");
const Horario = require("./Horario");
const Colectivo = require("./Colectivo");
const Chofer = require("./Chofer");
const Empresa = require("./Empresa");
const Punto = require("./Punto");


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
  // Linea - Horario
  Linea.hasMany(Horario, { foreignKey: "id_horario" });
  Horario.belongsTo(Linea, { foreignKey: "id_horario" });

  // Recorrido - Linea
  Recorrido.belongsTo(Linea, { foreignKey: "id_linea" });
  Linea.hasOne(Recorrido, { foreignKey: "id_linea" });

  // Parada - Recorrido
  Parada.belongsTo(Recorrido, { foreignKey: "id_recorrido" });
  Recorrido.hasMany(Parada, { foreignKey: "id_recorrido" });

  // Usuario - Parada (muchos a muchos)
  Usuario.belongsToMany(Parada, {
    through: "ParadaFav",
    foreignKey: "id_usuario", // este campo estará en ParadaFav
    otherKey: "id_parada", // este campo también estará en ParadaFav
  });

  Parada.belongsToMany(Usuario, {
    through: "ParadaFav",
    foreignKey: "id_parada",
    otherKey: "id_usuario",
  });


module.exports = {
  Usuario,
  Parada,
  Recorrido,
  Linea,
  Horario,
  Colectivo,
  Chofer,
  Empresa,
  Punto,
  sequelize
};






