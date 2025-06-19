const express = require("express");
const router = express.Router();
const paradaController = require("../controllers/ParadaController");

router.post("/createParada", paradaController.create);
router.get("/getAllParadas", paradaController.getAll);
router.get("/getParada/:id", paradaController.getById);
router.put("/updateParada/:id", paradaController.update);
router.delete("/deleteParada/:id", paradaController.remove);

module.exports = router;
