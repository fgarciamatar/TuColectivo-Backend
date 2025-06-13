const { Router } = require("express");
const UserRouter = require("./UserRouter");
const authMiddleware = require("../middlewares/authMiddleware");


const router = Router();

router.use("/",UserRouter);

module.exports = router;
