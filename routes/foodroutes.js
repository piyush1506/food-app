const express  = require('express');
const router = express.Router();
 
 const  { getAllOrderdatailcontroller,createFoodController,updateFoodByIdController,createorderController, getAllFoodController,getFoodByrestIdController ,getFoodByIdController, deleteFoodByIdController, updateOrederStausConroller, getResturantBydish} = require('../controller/foodcontroller')
const {authmiddleware} = require('../middlewares/authmiddleware');
const { adminmiddleware } = require('../middlewares/adminmiddlware');
const { getHomefoodController } = require('../controller/getHomefoodController');


 router.post('/create-food',authmiddleware,createFoodController)


 router.get('/get-food',authmiddleware,getAllFoodController)

 router.get('/get/:id',authmiddleware,getFoodByIdController)

 router.get('/resturant/:id',authmiddleware,getFoodByrestIdController)
router.put('/update/:id',authmiddleware,updateFoodByIdController)

router.delete('/delete/:id',authmiddleware,deleteFoodByIdController)

// order routes

router.post('/createorder',authmiddleware,createorderController)
router.get('/cartdetails/:id',authmiddleware,getAllOrderdatailcontroller)


router.put('/updatestatus/:id',authmiddleware,adminmiddleware,updateOrederStausConroller)
router.get('/find',getResturantBydish)

router.get('/home',getHomefoodController)

 module.exports = router;