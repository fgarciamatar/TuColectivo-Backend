const { Usuario } = require("../models/index");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const getUsersService = async () => {
  const users = await Usuario.findAll();

  return users;
};

const createUserService = async ({
  dni,
  nombre,
  apellido,
  email,
  contraseña,
  celular,
  rol,
}) => {
  const existingUser = await Usuario.findOne({
    where: { dni },
  });
  if (existingUser) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(contraseña, 10);
  const newUser = await Usuario.create({
    dni,
    nombre,
    apellido,
    email,
    contraseña: hashedPassword,
    celular,
    rol,
  });
  return {
    dni,
    nombre,
    apellido,
    email,
    celular,
    rol,
  };
};
const loginService = async (email) => {
  try {
    const user = await Usuario.findOne({
      where: { email },
    });

    if (!user) {
      console.log(`No se encontró un usuario con el email: ${email}`);
      return null;
    }

    console.log("Usuario encontrado:", user.email);
    return user;
  } catch (error) {
    console.error("Error en loginService:", error);
    throw new Error("Error al buscar el usuario");
  }
};

const recoverPasswordService = async (email) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) {
    throw new Error("No existe un usuario con ese email.");
  }

  // Generamos un PIN numérico de 6 dígitos
  const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
  const resetPinExpiry = Date.now() + 15 * 60 * 1000; // 15 minutos

  user.resetToken = resetPin; // lo podés renombrar a resetPin si querés
  user.resetTokenExpiry = resetPinExpiry;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de recuperación de contraseña",
    html: `
      <p>Hola ${user.nombre},</p>
      <p>Tu código de recuperación es:</p>
      <h2 style="color: #2e86de">${resetPin}</h2>
      <p>Este código expira en 15 minutos.</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  return { message: "Código enviado al correo electrónico" };
};

const resetPasswordService = async (email, pin, nuevaContraseña) => {
  const user = await Usuario.findOne({ where: { email } });

  if (!user || user.resetToken !== pin) {
    const error = new Error("PIN inválido");
    error.status = 400;
    throw error;
  }

  if (Date.now() > user.resetTokenExpiry) {
    const error = new Error("El PIN ha expirado");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
  user.contraseña = hashedPassword;

  user.resetToken = null;
  user.resetTokenExpiry = null;

  await user.save();

  return { message: "Contraseña actualizada correctamente" };
};


const refreshTokenService = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("Decoded refresh token:", decoded);
    

    const user = await Usuario.findOne({ where: { id: decoded.id, refreshToken } });

    if (!user) {
      throw new Error("Usuario no encontrado o token no coincide");
    }

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return newAccessToken;
  } catch (err) {
    const error = new Error("Token expirado o inválido");
    error.status = 403;
    throw error;
  }
};


const logoutService = async (refreshToken) => {
  const user = await Usuario.findOne({ where: { refreshToken } });

  if (!user) {
    const error = new Error("Refresh Token no válido");
    error.status = 403;
    throw error;
  }

  user.refreshToken = null;
  await user.save();
};

module.exports = {
  getUsersService,
  createUserService,
  loginService,
  recoverPasswordService,
  resetPasswordService,
  refreshTokenService,
  logoutService,
};
