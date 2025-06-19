const { Recorrido } = require("../models");

const crearRecorrido = async ({ nombre }) => {
  if (!nombre) throw new Error("El nombre es obligatorio");

  const existente = await Recorrido.findOne({ where: { nombre } });
  if (existente) throw new Error("El recorrido ya existe");

  return await Recorrido.create({ nombre });
};

const obtenerTodos = async () => {
  const recorridos = await Recorrido.findAll();
  if (!recorridos.length) throw new Error("No hay recorridos registrados");
  return recorridos;
};

const obtenerPorId = async (id) => {
  const recorrido = await Recorrido.findByPk(id);
  if (!recorrido) throw new Error("Recorrido no encontrado");
  return recorrido;
};

const actualizarRecorrido = async (id, { nombre }) => {
  if (!nombre) throw new Error("El nombre es obligatorio");

  const recorrido = await Recorrido.findByPk(id);
  if (!recorrido) throw new Error("Recorrido no encontrado");

  return await recorrido.update({ nombre });
};

const eliminarRecorrido = async (id) => {
  const recorrido = await Recorrido.findByPk(id);
  if (!recorrido) throw new Error("Recorrido no encontrado");

  await recorrido.destroy();
  return { message: "Recorrido eliminado correctamente" };
};

module.exports = {
  crearRecorrido,
  obtenerTodos,
  obtenerPorId,
  actualizarRecorrido,
  eliminarRecorrido,
};
