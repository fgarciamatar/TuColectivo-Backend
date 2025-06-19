const paradaService = require("../services/ParadaService");

const create = async (req, res) => {
  console.log("📥 [POST] /createParada", req.body);
  const { nombre, direccion, latitud, longitud } = req.body;
  try {
    const parada = await paradaService.crearParada({
      nombre,
      direccion,
      latitud,
      longitud,
    });
    res.status(201).json(parada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllParadas");
  try {
    const paradas = await paradaService.obtenerTodas();
    res.status(200).json(paradas);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [GET] /getParada/${id}`);
  try {
    const parada = await paradaService.obtenerPorId(id);
    res.status(200).json(parada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, latitud, longitud } = req.body;
  console.log(`📥 [PUT] /updateParada/${id}`, req.body);
  try {
    const parada = await paradaService.actualizarParada(id, {
      nombre,
      direccion,
      latitud,
      longitud,
    });
    res.status(200).json(parada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [DELETE] /deleteParada/${id}`);
  try {
    const result = await paradaService.eliminarParada(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
