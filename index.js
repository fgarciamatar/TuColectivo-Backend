const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
const cors = require("cors");
// const { connectDB } = require("./src/models/database");

const routes = require("./src/routes/index");

const app = express();
app.use(cors({
  origin: '*', // o especificá tu IP: 'http://192.168.0.123:3000'
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3002;
const IP = "192.168.1.9"



app.listen(3002,IP, async () => {
   await connectDB(); // 📡 Acá conectás
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

