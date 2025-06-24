const choferService = require("../services/ChoferService");

const create = async (req, res) => {
  console.log("📥 [POST] /createChofer", req.body);
  const { dni, nombre, apellido, edad, id_empresa } = req.body;
  try {
    const chofer = await choferService.crearChofer({ dni, nombre, apellido, edad, id_empresa });
    res.status(201).json(chofer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log("📥 [GET] /getAllChoferes");
  try {
    const choferes = await choferService.obtenerTodos();
    res.status(200).json(choferes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getByDNI = async (req, res) => {
  const { dni } = req.params;
  console.log(`📥 [GET] /getChofer/${dni}`);
  try {
    const chofer = await choferService.obtenerPorDNI(dni);
    res.status(200).json(chofer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { dni } = req.params;
  const { nombre, apellido, edad } = req.body;
  console.log(`📥 [PUT] /updateChofer/${dni}`, req.body);
  try {
    const chofer = await choferService.actualizarChofer(dni, { nombre, apellido, edad });
    res.status(200).json(chofer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { dni } = req.params;
  console.log(`📥 [DELETE] /deleteChofer/${dni}`);
  try {
    const result = await choferService.eliminarChofer(dni);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getByDNI,
  update,
  remove,
};
