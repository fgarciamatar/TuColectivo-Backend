const { Router } = require("express");
const UserRouter = require("./UserRouter");
const EmpresaRouter = require("./EmpresaRouter");
const ColectivoRouter = require("./ColectivoRouter");
const LineaRouter = require("./LineaRouter");
const ChoferRouter = require("./ChoferRouter");
const ParadaRouter = require("./ParadaRouter");
const HorarioRouter = require("./HorarioRouter");
const PuntoRouter = require("./PuntoRouter");
const RecorridoRouter = require("./RecorridoRouter");



const router = Router();

router.use("/",ChoferRouter)
router.use("/",UserRouter);
router.use("/",EmpresaRouter)
router.use("/", ColectivoRouter)
router.use("/", LineaRouter)
router.use("/", ParadaRouter); 
router.use("/", HorarioRouter);
router.use("/", PuntoRouter);
router.use("/", RecorridoRouter);

module.exports = router;
