const { Horario } = require("../models");

const crearHorario = async ({ dia, hora, turno, id_linea, id_parada }) => {
  if (!dia || !hora || !turno || !id_linea || !id_parada) {
    throw new Error("Todos los campos son obligatorios");
  }
  const existeHorario = await Horario.findOne({ where: { dia, hora, turno } });
  if (existeHorario) {
    throw new Error("Ya existe un horario con estos datos");
  }

  const horario = await Horario.create({ dia, hora, turno, id_linea, id_parada });
  return horario;
};

const obtenerTodos = async () => {
  const horarios = await Horario.findAll();
  if (!horarios.length) throw new Error("No hay horarios registrados");
  return horarios;
};

const obtenerPorId = async (id) => {
  if (!id) throw new Error("El ID es obligatorio");
  const horario = await Horario.findByPk(id);
  if (!horario) throw new Error("Horario no encontrado");
  return horario;
};

const actualizarHorario = async (id, data) => {
  const horario = await Horario.findByPk(id);
  if (!horario) throw new Error("Horario no encontrado");

  const { dia, hora, turno } = data;
  if (!dia || !hora || !turno) {
    throw new Error("Todos los campos son obligatorios");
  }

  return await horario.update({ dia, hora, turno });
};

const eliminarHorario = async (id) => {
  const horario = await Horario.findByPk(id);
  if (!horario) throw new Error("Horario no encontrado");
  await horario.destroy();
  return { message: "Horario eliminado correctamente" };
};

module.exports = {
  crearHorario,
  obtenerTodos,
  obtenerPorId,
  actualizarHorario,
  eliminarHorario,
};
