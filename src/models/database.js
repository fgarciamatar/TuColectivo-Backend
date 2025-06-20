require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Railway no tiene certificado verificado
      },
    },
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ TODO BIEN EN LA BDD!!");

    await sequelize.sync({ alter: false }); // usa alter si no querés borrar la BDD

  } catch (error) {
    console.error("❌ TODO MAL EN LA BDD :(", error);
    throw error;
  }
}

module.exports = { sequelize, connectDB };


