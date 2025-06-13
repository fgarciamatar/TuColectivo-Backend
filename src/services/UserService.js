const { Usuario } = require("../models/index");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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

  // Generamos un token temporal
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutos

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  // Configurar transporte de correo
  const transporter = nodemailer.createTransport({
    service: "Gmail", // o cualquier otro (Outlook, SMTP, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `https://tuapp.com/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperación de contraseña",
    html: `<p>Hola, solicitaste restablecer tu contraseña.</p>
           <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Este enlace expirará en 15 minutos.</p>`,
  };

  await transporter.sendMail(mailOptions);

  return {
    message: "Correo enviado con instrucciones para recuperar la contraseña",
  };
};

const refreshTokenService = async (refreshToken) => {
  // Buscar el usuario por el refreshToken guardado
  const user = await Usuario.findOne({ where: { refreshToken } });

  if (!user) {
    const error = new Error("Refresh Token no válido");
    error.status = 403;
    throw error;
  }

  // Verificar el token y generar uno nuevo
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        nombre: decoded.nombre,
        rol: decoded.rol,
        email: decoded.email,
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
  refreshTokenService,
  logoutService,
};
