const twilio = require('twilio');
const { Message } = require('twilio/lib/twiml/MessagingResponse');
const deliveryboy = require('../models/deliveryboy');
// const deliveryboy = require('../models/deliveryboy');
// const { Client } = require('twilio/lib/base/BaseTwilio');
const jwt = require('jsonwebtoken')
require('dotenv').config()

console.log("ACCOUNT SID:", process.env.TWILIO_ACCOUNT_SID)
console.log("VERIFY SID:", process.env.TWILIO_VERIFY_SID)
const client   = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)
console.log(process.env.twilo_sid,
    process.env.twilo_token)

exports.sendOtp = async (req,res)=>{
    try {
        const {phone}= req.body;
        await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
        .verifications.create({
            to: `+91${phone}`,
            channel:'sms'
        })
    res.json({
        success:true,
        message:'otp send successfully'
    })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.verifyOtp=  async(req,res)=>{
    try {
        const {phone,otp} = req.body
        const verification_checks = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SID)
        .verificationChecks.create({
            to:`+91${phone}`,
            code:otp
        })
        if (verification_checks.status !== 'approved') {
          return  res.status(400).json({
                success:false,
                message:'invalid otp'
            })
        }

        // const Deliveryboy =await deliveryboy.findOne({phone})
        //  if (!Deliveryboy) {
        //   return res.status(400).json({
        //         success:false,
        //         message:'delivery boy not found'
        //     })
        // }
        // Deliveryboy.isverified = true
//         await Deliveryboy.save()

//         const token = jwt.sign({
//             id:Deliveryboy._id,
//             userType:'delivery'
//         },
//         process.env.JWT_SECRET,
// {
//         expiresIn:'7d'
// })

        // else{
             res.json({
                success:true,
                message:'otp verified',
                // token,
                // Deliveryboy:{
                //     id:Deliveryboy._id,
                //     name:Deliveryboy.name,
                //     phone:Deliveryboy.phone
                // }
            })
        // }
        
    } catch(error){
             res.json({
                success:false,
                message:error.message
            })
        }
}