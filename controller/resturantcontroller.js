const resturant = require('../models/resturant');
const Resturant  = require('../models/resturant');
const uniquecodegenerator=require('../models/uniquecodeforresturant')

const createResturantController = async (req,res)=>{
    try {
        const code = uniquecodegenerator();
        const {title,imageUrl,time,foods,location,pickup,delivery,rating,ratingcount,isopen} = req.body;
   if(!title || !imageUrl || !foods ||!location){
    return res.status(400).json({
        success:false,
        message:'fill all required fields'
    })  
}
   const  isexixt = await Resturant.findOne({title})
     if(isexixt){
        return res.status(400).json({
            success:false,
            message:'resturant already exists'
        })
}
 await Resturant.create({
        title,imageUrl,time,foods,pickup,delivery,rating,location,ratingcount,isopen,
  code:code  })
 res.status(201).json({
    success:true,
    message:'resturant created successfully'
 })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'error in create resturant api',
            error
        })
    }
}

const  getAllResturantController = async (req,res)=>{
    try {
        const resturants= await Resturant.find({});
        if (!resturants) {
            return res.status(404).json({
                success:false,
                message:'no resturant found'
            })

        }
                    res.status(200).json({
                success:true,
                resturants
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:{'error in get all resturant api':error.message},
        })
    }

}

const getResturantByIdController = async (req,res)=>{
    try {
        const resturantid = req.params.id;
         if(!resturantid){
            return res.status(404).json({
                success:false,
                message:' provide  resturant id '
            })
        }
        const resturant = await Resturant.findById(resturantid).populate('foods');
        if(!resturant){
            return res.status(404).json({
                success:false,
                message:'resturant not found'
            })
        }
        // const restfood = await Food.findById(resturantid).populate("foods")
        res.status(200).json({
            success:true,
            resturant,
          
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:{'error in get resturant by id api':error.message},
        })
    }
}

const deleteResturantController = async (req,res)=>{
    try {
        const resturantid = req.params.id;
        if (!resturantid) {
            return res.status(404).json({
                success:false,
                message:'provide resturant id'
            })
        }
        const resturant = await Resturant.findOneAndDelete(resturantid);
        if (!resturant) {
            return res.status(404).json({
                success:false,
                message:'resturant not found'
            })
             }
             res.status(200).json({
                success:true,
                message:'resturant deleted successfully'
             })
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:{'error in delete resturant by id api':error.message},
        })
        
    }
}

module.exports = {createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController
}