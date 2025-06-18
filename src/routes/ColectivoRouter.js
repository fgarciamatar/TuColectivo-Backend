const express = require("express");
const router = express.Router();
const colectivoController = require("../controllers/ColectivoController");

router.post("/createColectivo", colectivoController.create);
router.get("/getAllColectivos", colectivoController.getAll);
router.get("/getColectivo/:patente", colectivoController.getByPatente);
router.put("/updateColectivo/:patente", colectivoController.update);
router.delete("/deleteColectivo/:patente", colectivoController.remove);

module.exports = router;
