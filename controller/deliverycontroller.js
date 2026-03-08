const DeliveryBoy = require('../models/deliveryboy')
const bcrypt = require('bcryptjs')
const generateid = require('../utils/deliveryboyid')
const deliveryboy = require('../models/deliveryboy')
const jwt = require('jsonwebtoken')
const Order = require('../models/order')
const deliveryboyid = require('../utils/deliveryboyid')
// const order = require('../models/order')

const registerdeliveryboy = async(req,res)=>{
    try {
        const {name,phone,password} = req.body
        const isexist = await deliveryboy.findOne({phone})
        if (isexist) {
             return res.status(400).json({
    success: false,
    message: "Phone number already registered"
  });
        }


        const hashpassword = await bcrypt.hash(password,10)
        const boy = await DeliveryBoy.create({
            name,
            phone,
            password:hashpassword,
            uniqueId:generateid()
        })
        console.log(boy)
         const payload = {id:boy._id,userType:'delivery'}

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

        if (!boy) {
            return res.status(403).json({
                success:false,
                message:'error in boy creation'
            })

        }
            res.status(200).json({
                success:true,
                token,
                message:'delivery boy created successfully',
                deliveryboy:{
                    id:boy._id,
                    uniqueId:boy.uniqueId,
                    phone:boy.phone,
                    name:boy.name,
                    userType:'delivery'
                    
                }
            })
        

    } catch (error) {
         res.status(500).json({ success: false, message: error.message })
 
        
    }
}

const loginboy = async(req,res)=>{
    const {phone,password} = req.body;
    if(!phone || !password){
        return res.status(400).json({
        success: false,
        message: 'Phone and password required',
      })
    }

    const boy = await deliveryboy.findOne({phone})
    if(!boy){
      return res.status(404).json({
        success: false,
        message: 'Delivery boy not found',
      })
    }
    const ismatch = await bcrypt.compare(password,boy.password)
    if(!ismatch){
        return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }
    const payload = {id:boy._id,userType:'delivery'}

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'7d'
    })


      res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      deliveryboy: {
        id: boy._id,
        name: boy.name,
        phone: boy.phone,
        uniqueId: boy.uniqueId,
        token,
          userType: 'delivery'
      }
    })
}



const orderdetails =async(req,res)=>{
    try {
        const {orderId} = req.body 
    const order = await Order.findById({orderId})
    .populate('deliveryAddress')
     if (!order) {
         return res.status(404).json({success:false,
            message:'deliveryboy not found '
         })
        }
         res.status(200).json({
            success:true,
            message:'details find successfully',
            order
        })
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message
    })
    }
    

}

const deliveryBoydetails = async(req,res)=>{
    try {
         const deliveryBoyId  = req.userId
         
     const  stats =await  DeliveryBoy.findById(deliveryBoyId).populate('orders')

      if (!stats) {
         return res.status(404).json({success:false,
            message:'deliveryboy not found  '
         })
        }
        res.status(200).json({
            success:true,
            message:'stats find successfully',
            stats
        })
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
    
    
}
module.exports = {deliveryBoydetails,orderdetails,registerdeliveryboy,loginboy}