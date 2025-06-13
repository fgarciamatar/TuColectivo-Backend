const {
  getUsersService,
  createUserService,
  loginService,
  recoverPasswordService,
  logoutService,
  refreshTokenService
} = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService();
    const userList = users.map((user) => ({
      dni: user.dni,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      celular: user.celular,
      role: user.role,
    }));
    res
      .status(200)
      .json({ message: "Usuarios encontrados exitosamente", userList });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

const createUserController = async (req, res) => {
  const { dni, nombre, apellido, email, contraseña, celular, rol } = req.body;
  if (
    !dni ||
    !nombre ||
    !apellido ||
    !email ||
    !contraseña ||
    !celular ||
    !rol
  ) {
    return res.status(400).json({ error: "Todos los datos son requeridos" });
  }
  try {
    const newUser = await createUserService({
      dni,
      nombre,
      apellido,
      email,
      contraseña,
      celular,
      rol,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

const loginController = async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: "Todos los datos son requeridos" });
  }
  try {
    const user = await loginService(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    //   console.log('Contraseña ingresada:', contraseña);
    // console.log('Contraseña en BDD:', user?.contraseña);

    const iscontraseñaValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!iscontraseñaValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken; // modifica el campo
    await user.save(); // guarda el cambio en la base de datos

    res.status(200).json({
      message: "Login exitoso",
      access: true,
      accessToken,
      refreshToken,
      user: {
        dni: user.dni,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};

const recoverPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await recoverPasswordService(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const logoutController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh Token es requerido" });
  }

  try {
    await logoutService(refreshToken);
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(error.status || 500).json({ error: error.message || "Error del servidor" });
  }
};

const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh Token es requerido" });
  }

  try {
    const accessToken = await refreshTokenService(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    res.status(error.status || 500).json({ error: error.message || "Error del servidor" });
  }
};

module.exports = {
  getUsersController,
  createUserController,
  loginController,
  recoverPasswordController,
  logoutController,
  refreshTokenController
};
