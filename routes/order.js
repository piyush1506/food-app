const express = require('express');
const router = express.Router();

const {authmiddleware} = require('../middlewares/authmiddleware');
const {adminmiddleware} = require('../middlewares/adminmiddlware')
const {deliverymiddleware} = require('../middlewares/deliveryboy')
const { getCartdetails,rejectOrderController,updateOrederStausConroller,createorderController ,acceptOrdercontroller, getPendingOrdersForDelivery} = require('../controller/ordercontroller');

router.put('/reject/:id', deliverymiddleware, rejectOrderController)

router.put('/updatestatus/:id',authmiddleware,adminmiddleware,updateOrederStausConroller)
router.get('/cartdetails',authmiddleware,getCartdetails)
router.post('/createorder',authmiddleware,createorderController)



// deliveryroute

router.get('/pending-orders',deliverymiddleware,getPendingOrdersForDelivery)

router.put('/accept/:id',deliverymiddleware,acceptOrdercontroller)

module.exports = router