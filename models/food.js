const mongoose  = require('mongoose');


const foodSchemma  = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'food title is required'],
        index:true
    },
    description:{
        type:String,
        required:[true,'food description is required']
    },
    price:{
        type:Number,
        required:[true,'food price is required']
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    foodTags:{
        type:String,
    },
    code:{
        type:String,
    },
    isavailable:{
        type:Boolean,
        default:true
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resturant'
    },
    imageUrl:{
        type:String,
       
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },

    ratingCount:{
        type:Number,
        default:0
    }
},{timestamps:true})
module.exports = mongoose.model('food',foodSchemma)