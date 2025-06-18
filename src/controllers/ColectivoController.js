const colectivoService = require("../services/ColectivoService");

const create = async (req, res) => {
  const { patente, capacidad, modelo } = req.body;
  if (!patente || !capacidad || !modelo) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const colectivo = await colectivoService.crearColectivo({ patente, capacidad, modelo });
    res.status(201).json(colectivo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const colectivos = await colectivoService.obtenerTodos();
    res.status(200).json(colectivos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getByPatente = async (req, res) => {
  const { patente } = req.params;
  if (!patente) {
    return res.status(400).json({ error: "La patente es obligatoria" });
  }
  try {
    const colectivo = await colectivoService.obtenerPorPatente(patente);
    res.status(200).json(colectivo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { patente } = req.params;
  const { capacidad, modelo } = req.body;
  if (!capacidad || !modelo) {
    return res.status(400).json({ error: "Capacidad y modelo son obligatorios para actualizar" });
  }
  if (!patente) {
    return res.status(400).json({ error: "La patente es obligatoria para actualizar un colectivo" });
  }
  try {
    const colectivo = await colectivoService.actualizarColectivo(patente, { capacidad, modelo });
    res.status(200).json(colectivo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { patente } = req.params;
  if (!patente) {
    return res.status(400).json({ error: "La patente es obligatoria para eliminar un colectivo" });
  }
  try {
    const result = await colectivoService.eliminarColectivo(patente);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getByPatente,
  update,
  remove,
};
