const express = require('express')
const router = express.Router()
const {deliverymiddleware }= require('../middlewares/deliveryboy')
const {registerdeliveryboy,loginboy,orderdetails, getStatscontroller, deliveryBoydetails} = require('../controller/deliverycontroller')

router.post('/createboy',registerdeliveryboy)
router.post('/loginboy',loginboy)
router.get('/stats',deliverymiddleware,deliveryBoydetails)
router.post('/orderdetails',orderdetails)

module.exports = router;