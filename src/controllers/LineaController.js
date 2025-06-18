const lineaService = require("../services/LineaService");

const create = async (req, res) => {
  console.log("📥 [POST] /createLinea", req.body);
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }
  try {
    const linea = await lineaService.crearLinea(nombre);
    res.status(201).json(linea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllLineas");
  try {
    const lineas = await lineaService.obtenerTodas();
    res.status(200).json(lineas);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  console.log(`📥 [GET] /getLinea/${id}`);
  try {
    const linea = await lineaService.obtenerPorId(id);
    res.status(200).json(linea);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  console.log(`📥 [PUT] /updateLinea/${id}`, req.body);
  try {
    const linea = await lineaService.actualizarLinea(id, nombre);
    res.status(200).json(linea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [DELETE] /deleteLinea/${id}`);
  try {
    const result = await lineaService.eliminarLinea(id);
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
