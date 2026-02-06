const mongoose  = require('mongoose');


const categorySchemma  = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category ttle is required']
    },
    imageUrl:{
        type:String,
        default:"https://marketplace.canva.com/EAFaFUz4aKo/3/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-tn1zF-_cG9c.jpg"
    },
},{timestamps:true})
module.exports = mongoose.model('category',categorySchemma)