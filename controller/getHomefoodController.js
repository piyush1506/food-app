
const Food = require('../models/food')

const getHomefoodController = async(req,res)=>{
    try {
        const foods = await Food.aggregate([
            {
                $group:{
                    _id:{$toLower:"$title"},
                    title:{$first:"$title"},
                    description:{$first:"$description"},
                    imageUrl:{$first:"$imageUrl"},
                    category:{$first:"$category"},
                    rating:{$avg:"$rating"},
                    price :{$min:"$price"},
                    resturants:{$addToSet:"$resturant"}
                }
            },
            {
                $sort:{title:1}
            }
        ])
        await Food.populate(foods,{path:"resturants"});
        res.status(200).json({
            success:true,
            count:foods.length,
            foods
        })
    } catch (error) {
        return res.status(404).json({
        success:false,
            message:error.message
        })
    }
}
module.exports = {getHomefoodController}