const express = require("express");
const http = require("http"); // ✅ Faltaba esta línea
const { Server } = require("socket.io"); // ✅ Faltaba esta línea
require("dotenv").config();
const { connectDB } = require("./src/models/database");
const cors = require("cors");

const routes = require("./src/routes/index");

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use("/", routes);

// Crear servidor HTTP y Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);

  socket.on('sendLocation', (data) => {
    console.log('📍 Nueva ubicación:', data);
    io.emit(`location-${data.busId}`, data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Servidor Express + Socket.io corriendo 🚀');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  } catch (err) {
    console.error("💥 Error al iniciar el servidor:", err.message);
    process.exit(1);
  }
});
