const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const registerDataValidator = require('../middlewares/validateRegisterDataMW');
const loginDataValidator = require('../middlewares/validateLoginDataMW');

router.post('/register', registerDataValidator, userController.register);
router.post('/login', loginDataValidator, userController.login);
router.get('/verify', userController.verify);
router.get('/logout', userController.logout);


module.exports = router;