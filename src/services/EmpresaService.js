
const { Empresa } = require("../models/index");

const createEmpresa = async ({ nombre, ciudad }) => {
  if (!nombre || !ciudad) {
    throw new Error("Todos los campos son obligatorios");
  }
  // Validar que la empresa no exista
  const existingEmpresa = await Empresa.findOne({ where: { nombre } });
  if (existingEmpresa) {
    throw new Error("La empresa ya existe");
  }
  return await Empresa.create({ nombre, ciudad });
};
const getEmpresaById = async (id) => {
  if (!id) {
    throw new Error("ID es obligatorio");
  }
  // Validar que la empresa exista
  const empresa = await Empresa.findByPk(id);
  if (!empresa) {
    throw new Error("Empresa no encontrada");
  }
  // Si la empresa existe, devolverla
  return empresa;
};

const getAllEmpresas = async () => {
  const empresas = await Empresa.findAll();
  if (!empresas || empresas.length === 0) {
    throw new Error("No se encontraron empresas");
    
  }
  console.log("🔍 Empresas encontradas:", empresas);
  return empresas;
};


const updateEmpresa = async (id, data) => {
  if (!id) throw new Error("ID es obligatorio");
  if (!data || !data.nombre || !data.ciudad) {
    throw new Error("Todos los campos son obligatorios");
  }
  const empresa = await Empresa.findByPk(id);
  if (!empresa) throw new Error("Empresa no encontrada");
  return await empresa.update(data);
};

const deleteEmpresa = async (id) => {
  const empresa = await Empresa.findByPk(id);
  if (!empresa) throw new Error("Empresa no encontrada");
  await empresa.destroy();
  return { message: "Empresa eliminada correctamente" };
};

module.exports = {
  createEmpresa,
  getEmpresaById,
  getAllEmpresas,
  updateEmpresa,
  deleteEmpresa,
};
