const { Punto } = require("../models");

const crearPunto = async ({ inicio, fin, posicion, id_linea }) => {
  if (!inicio || !fin || !posicion || !id_linea) {
    throw new Error("Todos los campos son obligatorios");
  }

  const puntoExistente = await Punto.findOne({
    where: { inicio, fin },
  });
  console.log(puntoExistente);
  if (puntoExistente) {
    throw new Error("El punto ya existe");
  }
  const punto = await Punto.create({ inicio, fin, posicion, id_linea });
  return punto;
};

const obtenerTodos = async () => {
  const puntos = await Punto.findAll();
  if (!puntos.length) throw new Error("No hay puntos registrados");
  return puntos;
};

const obtenerPorId = async (id) => {
  if (!id) throw new Error("El ID es obligatorio");

  const punto = await Punto.findByPk(id);
  if (!punto) throw new Error("Punto no encontrado");

  return punto;
};

const actualizarPunto = async (id, data) => {
  const punto = await Punto.findByPk(id);
  if (!punto) throw new Error("Punto no encontrado");

  const { inicio, fin } = data;
  if (!inicio || !fin) throw new Error("Todos los campos son obligatorios");

  return await punto.update({ inicio, fin });
};

const eliminarPunto = async (id) => {
  const punto = await Punto.findByPk(id);
  if (!punto) throw new Error("Punto no encontrado");

  await punto.destroy();
  return { message: "Punto eliminado correctamente" };
};

module.exports = {
  crearPunto,
  obtenerTodos,
  obtenerPorId,
  actualizarPunto,
  eliminarPunto,
};
