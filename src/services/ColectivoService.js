const { Colectivo } = require("../models");

const crearColectivo = async ({ patente, capacidad, modelo }) => {
  if (!patente || !capacidad || !modelo) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existente = await Colectivo.findByPk(patente);
  if (existente) {
    throw new Error("Ya existe un colectivo con esa patente");
  }

  return await Colectivo.create({ patente, capacidad, modelo });
};

const obtenerTodos = async () => {
  const colectivos = await Colectivo.findAll();
  if (colectivos.length === 0) {
    throw new Error("No hay colectivos registrados");
  }
  return colectivos;
};

const obtenerPorPatente = async (patente) => {
  if (!patente) throw new Error("La patente es obligatoria");

  const colectivo = await Colectivo.findByPk(patente);
  if (!colectivo) throw new Error("Colectivo no encontrado");

  return colectivo;
};

const actualizarColectivo = async (patente, data) => {
  const colectivo = await Colectivo.findByPk(patente);
  if (!colectivo) throw new Error("Colectivo no encontrado");

  const { capacidad, modelo } = data;
  if (!capacidad || !modelo) {
    throw new Error("Capacidad y modelo son obligatorios para actualizar");
  }

  return await colectivo.update({ capacidad, modelo });
};

const eliminarColectivo = async (patente) => {
  const colectivo = await Colectivo.findByPk(patente);
  if (!colectivo) throw new Error("Colectivo no encontrado");

  await colectivo.destroy();
  return { message: "Colectivo eliminado correctamente" };
};

module.exports = {
  crearColectivo,
  obtenerTodos,
  obtenerPorPatente,
  actualizarColectivo,
  eliminarColectivo,
};
