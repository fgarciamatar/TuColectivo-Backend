const express = require("express");
const router = express.Router();
const lineaController = require("../controllers/LineaController");

router.post("/createLinea", lineaController.create);
router.get("/getAllLineas", lineaController.getAll);
router.get("/getLinea/:id", lineaController.getById);
router.put("/updateLinea/:id", lineaController.update);
router.delete("/deleteLinea/:id", lineaController.remove);

module.exports = router;
