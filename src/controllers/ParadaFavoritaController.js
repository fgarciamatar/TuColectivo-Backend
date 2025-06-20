const service = require("../services/ParadaFavoritaService");

const agregar = async (req, res) => {
  const { dni, id_parada } = req.body;
  if (!dni || !id_parada) {
    return res.status(400).json({ error: "dni y id de parada son obligatorios" });
  }
  try {
    const result = await service.agregarFavorito(dni, id_parada);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminar = async (req, res) => {
  const { dni, id_parada } = req.body;
  if (!dni || !id_parada) {
    return res.status(400).json({ error: "dni y id de parada son obligatorios" });
  }
  try {
    const result = await service.eliminarFavorito(dni, id_parada);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const traerParadasFavoritas = async (req, res) => {
  const { dni } = req.params;
  if (!dni) { 
    return res.status(400).json({ error: "DNI es obligatorio" });
  }
    try {
      const paradas = await service.obtenerTodas(dni);
      res.status(200).json(paradas);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
}
  

module.exports = {
  agregar,
  eliminar,
  traerParadasFavoritas
};
