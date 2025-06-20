const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
const cors = require("cors");
// const { connectDB } = require("./src/models/database");

const routes = require("./src/routes/index");

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  } catch (err) {
    console.error("💥 Error al iniciar el servidor:", err.message);
    process.exit(1);
  }
});



