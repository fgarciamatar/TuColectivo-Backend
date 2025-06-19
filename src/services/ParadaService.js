const { Parada } = require("../models");

const crearParada = async ({ nombre, direccion, latitud, longitud }) => {
  if (!nombre || !direccion || !latitud || !longitud) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existente = await Parada.findOne({ where: { nombre } });
  if (existente) throw new Error("Ya existe una parada con ese nombre");

  return await Parada.create({ nombre, direccion, latitud, longitud });
};



const obtenerTodas = async () => {
  const paradas = await Parada.findAll();
  if (!paradas.length) throw new Error("No hay paradas registradas");
  return paradas;
};

const obtenerPorId = async (id) => {
  if (!id) throw new Error("El ID es obligatorio");

  const parada = await Parada.findByPk(id);
  if (!parada) throw new Error("Parada no encontrada");

  return parada;
};

const actualizarParada = async (id, data) => {
  const parada = await Parada.findByPk(id);
  if (!parada) throw new Error("Parada no encontrada");

  const { nombre, direccion, latitud, longitud } = data;
  if (!nombre || !direccion || !latitud || !longitud) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await parada.update({ nombre, direccion, latitud, longitud });
};

const eliminarParada = async (id) => {
  const parada = await Parada.findByPk(id);
  if (!parada) throw new Error("Parada no encontrada");

  await parada.destroy();
  return { message: "Parada eliminada correctamente" };
};

module.exports = {
  crearParada,
  obtenerTodas,
  obtenerPorId,
  actualizarParada,
  eliminarParada,
};
