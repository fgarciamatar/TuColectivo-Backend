const { Router } = require("express");
const UserRouter = require("./UserRouter");
const EmpresaRouter = require("./EmpresaRouter");
const ColectivoRouter = require("./ColectivoRouter");
const LineaRouter = require("./LineaRouter");



const router = Router();

router.use("/",UserRouter);
router.use("/",EmpresaRouter)
router.use("/", ColectivoRouter)
router.use("/", LineaRouter)

module.exports = router;
