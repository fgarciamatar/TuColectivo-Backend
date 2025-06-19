const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/HorarioController");

router.post("/createHorario", horarioController.create);
router.get("/getAllHorarios", horarioController.getAll);
router.get("/getHorario/:id", horarioController.getById);
router.put("/updateHorario/:id", horarioController.update);
router.delete("/deleteHorario/:id", horarioController.remove);

module.exports = router;
