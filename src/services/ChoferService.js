const { Chofer, Colectivo, Linea, Empresa } = require("../models");

const crearChofer = async ({
  dni,
  nombre,
  apellido,
  edad,
  id_empresa,
  id_colectivo,
}) => {
  if (!dni || !nombre || !apellido || !edad || !id_empresa || !id_colectivo) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existente = await Chofer.findByPk(dni);
  if (existente) throw new Error("Ya existe un chofer con ese DNI");

  return await Chofer.create({
    dni,
    nombre,
    apellido,
    edad,
    id_empresa,
    id_colectivo,
  });
};

const { Chofer } = require("../models/Chofer");
const { Colectivo } = require("../models/Colectivo");

const obtenerTodos = async () => {
  const choferes = await Chofer.findAll({
    include: {
      model: Colectivo,
      attributes: ["patente", "capacidad", "modelo"],
      include: [
        {
          model: Empresa,
          attributes: ["id", "nombre"], // o los campos que quieras
        },
        {
          model: Linea,
          attributes: ["id", "numero", "nombre"], // o los campos que quieras
        },
      ],
    },
  });

  if (!choferes.length) throw new Error("No hay choferes registrados");

  return choferes;
};

const obtenerPorDNI = async (dni) => {
  if (!dni) throw new Error("El DNI es obligatorio");

  const chofer = await Chofer.findByPk(dni);
  if (!chofer) throw new Error("Chofer no encontrado");

  return chofer;
};

const actualizarChofer = async (dni, data) => {
  const { nombre, apellido, edad } = data;
  if (!nombre || !apellido || !edad) {
    throw new Error("Nombre, apellido y edad son obligatorios para actualizar");
  }

  const chofer = await Chofer.findByPk(dni);
  if (!chofer) throw new Error("Chofer no encontrado");

  return await chofer.update({ nombre, apellido, edad });
};

const eliminarChofer = async (dni) => {
  const chofer = await Chofer.findByPk(dni);
  if (!chofer) throw new Error("Chofer no encontrado");

  await chofer.destroy();
  return { message: "Chofer eliminado correctamente" };
};

module.exports = {
  crearChofer,
  obtenerTodos,
  obtenerPorDNI,
  actualizarChofer,
  eliminarChofer,
};
