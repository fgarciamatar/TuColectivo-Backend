const horarioService = require("../services/HorarioService");

const create = async (req, res) => {
  console.log("📥 [POST] /createHorario", req.body);
  const { dia, hora, turno } = req.body;
  if (!dia || !hora || !turno) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const horario = await horarioService.crearHorario({ dia, hora, turno });
    res.status(201).json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllHorarios");
  try {
    const horarios = await horarioService.obtenerTodos();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(`📥 [GET] /getHorario/${id}`);
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  try {
    const horario = await horarioService.obtenerPorId(id);
    res.status(200).json(horario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { dia, hora, turno } = req.body;
  if (!id || !dia || !hora || !turno) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  console.log(`📥 [PUT] /updateHorario/${id}`, req.body);
  try {
    const horario = await horarioService.actualizarHorario(id, { dia, hora, turno });
    res.status(200).json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio" });
  }
  console.log(`📥 [DELETE] /deleteHorario/${id}`);
  try {
    const result = await horarioService.eliminarHorario(id);
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
