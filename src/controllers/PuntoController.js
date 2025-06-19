const puntoService = require("../services/PuntoService");

const create = async (req, res) => {
  console.log("📥 [POST] /createPunto", req.body);
  const { inicio, fin, posicion } = req.body;
  if (!inicio || !fin || !posicion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const punto = await puntoService.crearPunto({ inicio, fin, posicion });
    res.status(201).json(punto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllPuntos");
  try {
    const puntos = await puntoService.obtenerTodos();
    res.status(200).json(puntos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  console.log(`📥 [GET] /getPunto/${id}`);
  try {
    const punto = await puntoService.obtenerPorId(id);
    res.status(200).json(punto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { inicio, fin, posicion } = req.body;
  if (!id || !inicio || !fin || !posicion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  console.log(`📥 [PUT] /updatePunto/${id}`, req.body);
  try {
    const punto = await puntoService.actualizarPunto(id, { inicio, fin, posicion });
    res.status(200).json(punto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [DELETE] /deletePunto/${id}`);
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  try {
    const result = await puntoService.eliminarPunto(id);
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
