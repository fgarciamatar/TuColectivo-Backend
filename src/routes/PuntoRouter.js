const express = require("express");
const router = express.Router();
const puntoController = require("../controllers/PuntoController");

router.post("/createPunto", puntoController.create);
router.get("/getAllPuntos", puntoController.getAll);
router.get("/getPunto/:id", puntoController.getById);
router.put("/updatePunto/:id", puntoController.update);
router.delete("/deletePunto/:id", puntoController.remove);

module.exports = router;
