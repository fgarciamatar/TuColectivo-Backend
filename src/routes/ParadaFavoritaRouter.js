const express = require("express");
const router = express.Router();
const controller = require("../controllers/ParadaFavoritaController");

router.post("/agregarParadaFavorita", controller.agregar);
router.delete("/eliminarParadaFavorita", controller.eliminar);
router.get("/traerParadas/:dni", controller.traerParadasFavoritas);

module.exports = router;
