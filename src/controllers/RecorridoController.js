const recorridoService = require("../services/RecorridoService");

const create = async (req, res) => {
  console.log("📥 [POST] /createRecorrido", req.body);
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
    }
  try {
    const recorrido = await recorridoService.crearRecorrido({ nombre });
    res.status(201).json(recorrido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllRecorridos");
  try {
    const recorridos = await recorridoService.obtenerTodos();
    res.status(200).json(recorridos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  console.log(`📥 [GET] /getRecorrido/${id}`);
  try {
    const recorrido = await recorridoService.obtenerPorId(id);
    res.status(200).json(recorrido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!id || !nombre) {
    return res.status(400).json({ error: "El ID y el nombre son obligatorios" });
  }
  console.log(`📥 [PUT] /updateRecorrido/${id}`, req.body);
  try {
    const recorrido = await recorridoService.actualizarRecorrido(id, { nombre });
    res.status(200).json(recorrido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [DELETE] /deleteRecorrido/${id}`);
  try {
    const result = await recorridoService.eliminarRecorrido(id);
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
