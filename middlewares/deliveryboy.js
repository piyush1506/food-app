const jwt = require('jsonwebtoken')
const DeliveryBoy = require('../models/deliveryboy')
const deliverymiddleware  = async(req,res,next)=>{
    try {
         const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
                return res.status(401).json({ message: 'Token missing' })
            }

            const decoded = jwt.verify(token,process.env.JWT_SECRET)
console.log("DELIVERY TOKEN:", token)
            const boy = await DeliveryBoy.findById(decoded.id).select('-password')

            if(!boy){
                 return res.status(401).json({ message: 'Unauthorized' })
            }
            
            if(decoded.userType !== 'delivery'){
                 return res.status(401).json({ message: 'Unauthorized' })
            }
             req.userId = decoded.id
            req.deliveryBoy = boy
            next();



    } catch (error) {
             res.status(401).json({ message: 'Invalid token' })
    }
}
module.exports =  { deliverymiddleware }