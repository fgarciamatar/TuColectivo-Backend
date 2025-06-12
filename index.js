const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
// const cors = require("cors");
// const { connectDB } = require("./src/models/database");

const routes = require("./src/routes/index");

// app.use(cors({
//   origin: process.env.FRONT,
//    credentials: true,
// }))
const app = express();
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  await connectDB(); // 📡 Acá conectás
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
