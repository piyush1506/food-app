const mongoose  = require('mongoose');
const { Profiler } = require('react');

const userSchemma  = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
   },
   password:{
    type:String,
    required:[true,'password is requied']
     },
     address:{
        type:Array,
     },
     phone:{
        type:String,
        required:[true,'phone is required']
     },
     usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
     },
      Profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy-nMokF0yazcxuSpThQVg2UYckMjNNFaOw&s'
      },
      answer:{
         type:String,
       required:[true,'anser is required']  
      }


},{timestamps:true})
module.exports = mongoose.model('user',userSchemma)