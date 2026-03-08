const mongoose  = require('mongoose');
const { Profiler } = require('react');

const resturantSchema  = new mongoose.Schema({
     title:{
        type:String,
        required:[true,'resturant name is required']
     },
     imageUrl:{
        type:String,
             },
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food'
            }],
    time:{type:String,},
    pickup:{type:Boolean,default:true},
    delivery:{type:Boolean,default:true},
    isopen:{type:Boolean,default:true},
    foodurl:{type:String,},
     location:{type:String,
            required:true
        },
    rating:{type:Number,default:4.5,min:1,max:5},
    ratingcount:{type:Number,default:0},
    code:{type:String,unique:true},
    coods:{
        id:{type:String,},
       latitude:{ type:Number },
longitude:{ type:Number },
latitudeDelta:{ type:Number },
longitudeDelta:{ type:Number },
       
        title:{type:String,},

    }

},{timestamps:true})
module.exports = mongoose.model('resturant',resturantSchema)