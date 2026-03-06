const mongoose  = require('mongoose');
const express = require('express')

const orderSchemma  = new mongoose.Schema({

    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food'
    }],
    payments:{
        type:Number
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
     
    deliveryAddress:{       
        name:{type:String,required:true},
        phone:{type:String,required:true},
        street:{type:String,required:true},
        city:{type:String,required:true},
           },
     location:{
            type:{
                type:String,
            enum:['Point'],
            default:'Point'

            // required:true
            },
            coordinates:{
            type:[Number],
            required:true
           }
           },
           

    status:{
        type:String,
        enum:['pending','accepted','preparing','prepared','delivering','delivered','rejected'],
        default:'pending'
    },
    deliveryboy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'DeliveryBoy',
        default:null
    }
   
},{timestamps:true})
    orderSchemma.index({location:'2dsphere'})
module.exports = mongoose.model('Order',orderSchemma)