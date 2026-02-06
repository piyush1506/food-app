const express  = require('express');
const router = express.Router();
const {authmiddleware} = require('../middlewares/authmiddleware')
const {getUserController, updateUserController, updatepassController,deleteUserController, resetpassController } = require('../controller/usercontroller')


router.get('/getUser',authmiddleware,getUserController);
router.put('/updateUser',authmiddleware,updateUserController)
router.post('/updatepass',authmiddleware,updatepassController)
router.post('/resetpass',resetpassController)
router.delete('/deleteuser/:id',deleteUserController)
module.exports = router;