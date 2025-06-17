const express = require('express');
const router = express.Router();
const { getUsersController, createUserController, loginController, recoverPasswordController,refreshTokenController, logoutController, resetPasswordController } = require('../controllers/UserController');

router.get('/getAllUsers', getUsersController);//SOLO PARA DESAROLLO POR SEGURIDAD
router.post('/register', createUserController); //Registro de usuario
router.post('/login', loginController);//Inicio de sesión de usuario
router.post('/logout', logoutController);//Cerrar sesión de usuario
router.post('/recoverPassword', recoverPasswordController);//Recuperar contraseña de usuario- se envia al correo PIN para recuperar contraseña
router.post("/resetPassword", resetPasswordController);//Restablecer contraseña de usuario 
router.post('/refreshToken', refreshTokenController);//Refrescar token de acceso


module.exports = router;


