const { Linea } = require("../models");

const crearLinea = async (nombre) => {
  if (!nombre) throw new Error("El nombre es obligatorio");

  const existente = await Linea.findOne({ where: { nombre } });
  if (existente) throw new Error("Ya existe una línea con ese nombre");

  return await Linea.create({ nombre });
};

const obtenerTodas = async () => {
  const lineas = await Linea.findAll();
  if (!lineas.length) throw new Error("No hay líneas registradas");
  return lineas;
};

const obtenerPorId = async (id) => {
  if (!id) throw new Error("El ID es obligatorio");
  const linea = await Linea.findByPk(id);
  if (!linea) throw new Error("Línea no encontrada");
  return linea;
};

const actualizarLinea = async (id, nombre) => {
  if (!id || !nombre) throw new Error("ID y nombre son obligatorios");
  const linea = await Linea.findByPk(id);
  if (!linea) throw new Error("Línea no encontrada");
  return await linea.update({ nombre });
};

const eliminarLinea = async (id) => {
  const linea = await Linea.findByPk(id);
  if (!linea) throw new Error("Línea no encontrada");
  await linea.destroy();
  return { message: "Línea eliminada correctamente" };
};

module.exports = {
  crearLinea,
  obtenerTodas,
  obtenerPorId,
  actualizarLinea,
  eliminarLinea,
};
