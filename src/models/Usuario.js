const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Usuario = sequelize.define("Usuario", {
  dni: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // 🔒 Hace que el email sea único
    allowNull: false,
    validate: {
      isEmail: true, // ✅ Valida que sea un email válido
    },
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("pasajero", "admin"),
    allowNull: false,
  },
  resetToken: {
  type: DataTypes.STRING,
  allowNull: true,
},
resetTokenExpiry: {
  type: DataTypes.DATE,
  allowNull: true,
}
});

module.exports = Usuario;
