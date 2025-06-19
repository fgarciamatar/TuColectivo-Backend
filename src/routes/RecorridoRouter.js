const express = require("express");
const router = express.Router();
const recorridoController = require("../controllers/RecorridoController");

router.post("/createRecorrido", recorridoController.create);
router.get("/getAllRecorridos", recorridoController.getAll);
router.get("/getRecorrido/:id", recorridoController.getById);
router.put("/updateRecorrido/:id", recorridoController.update);
router.delete("/deleteRecorrido/:id", recorridoController.remove);

module.exports = router;
