const express  = require('express');
const router = express.Router();

//    { getResturantByIdController} = require('../controller/resturantcontroller')
const {authmiddleware} = require('../middlewares/authmiddleware');
const { createcatController,deletecatController, getAllcatController, updatecatController } = require('../controller/categoryController');

  router.get('/get-cat',authmiddleware,getAllcatController)
 router.post('/create',authmiddleware,createcatController)
 router.put('/update/:id',authmiddleware,updatecatController)
 router.delete('/delete/:id',authmiddleware,deletecatController)
module.exports = router;