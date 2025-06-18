const empresaService = require("../services/EmpresaService");

const create = async (req, res) => {
  const { nombre, ciudad} = req.body;
  if (!nombre || !ciudad ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const empresa = await empresaService.createEmpresa({ nombre, ciudad });
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID es obligatorio" });
  }
  try {
    const empresa = await empresaService.getEmpresaById(id);
    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
   res.status(201).json(empresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAll = async (req, res) => {
  try {
    const empresas = await empresaService.getAllEmpresas();
    console.log("📦 Enviando respuesta:", empresas);
    res.status(201).json(empresas);
  } catch (error) {
    console.error("❌ Error en getAll:", error);
    res.status(500).json({ error: error.message });
  }
};



const update = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID es obligatorio" });
  }
  const { nombre, ciudad } = req.body;
  if (!nombre || !ciudad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const empresa = await empresaService.updateEmpresa( id, { nombre, ciudad });
   res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID es obligatorio" });
  }
  try {
    const result = await empresaService.deleteEmpresa(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove
};
