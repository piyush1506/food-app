const express  = require('express');
const router = express.Router();
const {
     createResturantController ,
    getAllResturantController,
    getResturantByIdController,
     deleteResturantController,
     } = require('../controller/resturantcontroller')
//    { getResturantByIdController} = require('../controller/resturantcontroller')
const {authmiddleware} = require('../middlewares/authmiddleware')
router.post('/create',authmiddleware,createResturantController)
router.get('/getall',getAllResturantController)

router.get('/get/:id',getResturantByIdController)

router.delete('/delete/:id',authmiddleware,deleteResturantController)
module.exports = router;