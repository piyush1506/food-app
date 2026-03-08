const express  = require('express')
const Order = require('../models/order');
const DeliveryBoy = require('../models/deliveryboy');
const deliveryboyid = require('../utils/deliveryboyid');


const getCartdetails = async(req,res)=>{

    try {
         const id = req.userId;
         console.log(id)
         const usercart = await Order.find({buyer:id})
         .populate("cart")
         .select('cart payments status location buyer deliveryboy deliveryAddress createdAt ')
        if (usercart.length == 0) {
            return res.status(404).json({
                success:false,
                message:"usercart is empty "
            })
            console.log(usercart)
        }
    
    res.status(200).json({
        success:true,
        message:'data fetched successfully',
        usercart
    })
        
    } catch (error) {
         return res.status(400).json({
        success:false,
        message:error.message
    })
    }
}

const createorderController = async(req,res)=>{
    try {
        
        const {cart,payments,deliveryAddress,location} = req.body
       console.log(req.body)
        if(!cart || !payments || !deliveryAddress ){
            return res.status(400).json({
                success:false,
                message:'foods and buyer details are required'
            });
        }
       
        const order  = await Order.create({
            cart,
            payments,
            buyer:req.userId,
            deliveryAddress :{
                name:deliveryAddress.name,
                phone:deliveryAddress.phone,
                street:deliveryAddress.street,
                city:deliveryAddress.city,
                pincode:deliveryAddress.pincode,
                fullAddress:deliveryAddress.fullAddress
            },
            location
            
            
        })

console.log(' Order created:', order._id)          
        
        const populateorder  = await Order.findById(order._id).populate('buyer')

        const io = req.app.get('io')
console.log('📡 io exists:', !!io)  
        io.to('delivery-boys').emit('new-order',{
            orderId:order._id.toString(),
            itemsCount:order.cart.length,
            buyerName:order.buyer?.name || 'customer',
            deliveryAddress:`${order.deliveryAddress?.street}, ${order.deliveryAddress?.city}` || 'address pending',
           totalPrice: order.payments || 0,
        })
console.log('✅ Emit done')  
        res.status(201).json({
        success:true,
        message:'order created successfully',
        order,
        
        })
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

const rejectOrderController = async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await Order.findOneAndUpdate(
      { _id: orderId, status: 'preparing' },
      { status: 'rejected' },
      { new: true }
    )
    if (!order) {
      return res.status(400).json({ success: false, message: 'Order not found or already handled' })
    }
    const io = req.app.get('io')
    io.emit('order-rejected', { orderId: order._id.toString() })

    res.status(200).json({ success: true, message: 'Order rejected' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// const myorder =async(req,res)=>{
//     try {
//          const details= await Orders
//     } catch (error) {
        
//     }
// }

const updateOrederStausConroller = async(req,res)=>{
    try {
        const orderid = req.params.id;
        const {status} = req.body;
        if(!orderid || !status){
            return res.status(400).json({
                success:false,
                message:'order id and status are required'
            });
        }
        const order = await Order.findByIdAndUpdate(orderid,{status},{new:true});
        if(!order){
          return  res.status(404).json({
                success:false,
                message:'order is not updated'
            })
        }
        res.status(201).json({
            success:true,
            message:'order status updated successfully'
        })
        
    } catch (error) {
           return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}



const acceptOrdercontroller = async(req,res)=>{
    try {
         const orderId = req.params.id
    const deliveryBoyId  = req.userId
   const order = await Order.findOneAndUpdate(
  { _id: orderId, status: 'pending' },
  { status: 'accepted', deliveryboy:deliveryBoyId},
  { new: true }

)
    
if (!order) {
    return res.status(400).json({
        success: false,
        message: 'Order already accepted'
      })
}
    const  deliveryboy =await DeliveryBoy.findById(deliveryBoyId)
      if (!deliveryboy) {
         return res.status(404).json({success:false,
            message:'deliveryboy not found  '
         })
            }
        deliveryboy.orders.push(orderId)
        deliveryboy.currentOrder =orderId
        deliveryboy.stats.acceptOrder +=1
        deliveryboy.stats.totalOrders +=1
        deliveryboy.stats.income += order.deliveryCharge
          
     await deliveryboy.save()
    


const io = req.app.get('io')

io.emit('order-accepted',{
    orderId:order._id.toString(),
    deliveryBoyId
})
 res.json({ success: true, message: 'Order accepted' ,deliveryboy,order})     
}  
    catch (error) {
          res.status(500).json({
      success: false,
      message: error.message
    })
    }
}

const getPendingOrdersForDelivery = async(req,res)=>{
    try {
        const orders = await Order.find({status:'pending'})
        .populate('buyer')
        .populate('cart')
        
    res.status(200).json({
      success: true,
      orders
    })
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message
    })
    }
}
   


module.exports ={rejectOrderController, getPendingOrdersForDelivery,updateOrederStausConroller,acceptOrdercontroller
,getCartdetails,createorderController,}