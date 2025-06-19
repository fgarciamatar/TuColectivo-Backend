const express = require("express");
const router = express.Router();
const choferController = require("../controllers/ChoferController");

router.post("/createChofer", choferController.create);
router.get("/getAllChoferes", choferController.getAll);
router.get("/getChofer/:dni", choferController.getByDNI);
router.put("/updateChofer/:dni", choferController.update);
router.delete("/deleteChofer/:dni", choferController.remove);

module.exports = router;
