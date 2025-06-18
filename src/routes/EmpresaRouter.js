const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/EmpresaController");

router.post("/createEmpresa", empresaController.create);
router.get("/traerEmpresaPorId/:id", empresaController.getById);
router.get("/getAll", empresaController.getAll);
router.put("/actualizarEmpresa/:id", empresaController.update);
router.delete("/eliminarEmpresa/:id", empresaController.remove);

module.exports = router;
