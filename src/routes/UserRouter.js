const express = require('express');
const router = express.Router();
const { getUsersController, createUserController, loginController, recoverPasswordController,refreshTokenController, logoutController } = require('../controllers/UserController');

router.get('/getAllUsers', getUsersController);//SOLO PARA DESAROLLO POR SEGURIDAD
router.post('/register', createUserController);
router.post('/login', loginController);
router.post('/recoverPassword', recoverPasswordController);
router.post('/logout', logoutController);

router.post('/refreshToken', refreshTokenController);


module.exports = router;


