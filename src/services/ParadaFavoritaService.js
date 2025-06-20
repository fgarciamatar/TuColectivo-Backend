const { Usuario, Parada } = require("../models");
const ParadaFavorita = require("../models/ParadaFavorita");

const agregarFavorito = async (dni, id_parada) => {
  if (!dni || !id_parada) {
    throw new Error("dni y id de parada son obligatorios");
  }

  // Validar que usuario y parada existan
  const usuario = await Usuario.findByPk(dni);
  const parada = await Parada.findByPk(id_parada);

  if (!usuario) throw new Error("Usuario no encontrado");
  if (!parada) throw new Error("Parada no encontrada");

  // Verificar si ya existe
  const existente = await ParadaFavorita.findOne({ where: { dni, id_parada } });
  if (existente) throw new Error("Ya está marcada como favorita");

  // Crear favorito
  await ParadaFavorita.create({ dni, id_parada });
  return { message: "Parada agregada como favorita" };
};

const eliminarFavorito = async (dni, id_parada) => {
  if (!dni || !id_parada) {
    throw new Error("dni y id de parada son obligatorios");
  }

  const favorito = await ParadaFavorita.findOne({ where: { dni, id_parada } });
  if (!favorito) throw new Error("La parada no está marcada como favorita");

  await favorito.destroy();
  return { message: "Parada eliminada de favoritos" };
};



const obtenerTodas = async (dni) => {

  const paradasFavoritas = await ParadaFavorita.findAll({
    where: { dni },
    include: {
      model: Parada,
      as: 'Parada', // Este alias debe coincidir con el definido en la relación belongsToMany
    },
  });

  return paradasFavoritas;
};


module.exports = {
  agregarFavorito,
  eliminarFavorito,
  obtenerTodas
};
