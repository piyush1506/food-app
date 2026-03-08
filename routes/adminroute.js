const {getAllUser} = require('../controller/admincontroller')
const express = require('express')

const router  = express.Router()
 
router.get('/stats',getAllUser)


module.exports =router