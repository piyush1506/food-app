const express = require('express');
const { registerController, loginController } = require('../controller/authcontroller');
const {authmiddleware} = require('../middlewares/authmiddleware');
const { getUserController } = require('../controller/usercontroller');

const router   = express.Router();

router.post('/register',registerController)
router.post('/login',loginController)

 

module.exports = router