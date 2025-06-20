const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/models/database");
const cors = require("cors");
const routes = require("./src/routes/index");

const app = express();

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

// Rutas principales
app.use("/", routes);

// Puerto dinámico
const PORT = process.env.PORT || 3002;

// 🌐 Ambiente actual
const ENV = process.env.NODE_ENV || "development";

// 🔌 Conexión y servidor
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      if (ENV === "development") {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      } else {
        console.log(`🚀 Servidor corriendo en producción en el puerto ${PORT}`);
      }
    });

  } catch (err) {
    console.error("💥 Error al iniciar el servidor:", err.message);
    process.exit(1);
  }
}

startServer();
