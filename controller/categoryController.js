
 const Category = require('../models/category');

const createcatController = async (req,res)=>{
     try {
            const {title,imageUrl} = req.body;
            if(!title){
                return res.status(400).json({
                    success:false,
                    message:'category title is required'
                })
            }
        const isexixt = await Category.findOne({title});
        if (isexixt) {
            return res.status(400).json({
                success:false,
                message:'category already exists'
            })
        }
       const category = await Category.create({
            title,
            imageUrl
        })
        res.status(201).json({
            success:true,
            message:'category created successfully',
            category
        })

     } catch (error) {
        console.log('error in create category controller',error);
        res.status(500).json({
            success:false,
            message:error.message,
            error
        })
     }
}

const getAllcatController = async (req,res)=>{
    try {
         const categories = await Category.find({});
         if (!categories) {
            return res.status(404).json({
                success:false,
                message:'no categories found'
            })
         }
         res.status(200).json({
            success:true,
            message:'all categories fetched successfully',
            categories
         })

    } catch (error) {
       return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

const updatecatController  = async(req,res)=>{
    try {
        const {id} = req.params.id;
        const {title,imageUrl} = req.body;
        const  updatecategory = await Category.findOneAndUpdate(id,{
            title,imageUrl
        },{new:true});
        if(!updatecategory){
            return res.status(404).json({
                success:false,
                message:'category not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'category updated successfully',
            updatecategory
        })
    } catch (error) {
     return  res.status(500).json({
            success:false,
            message:error.message,
                     })   
    }
}

const deletecatController = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletecategory = await Category.findOneAndDelete({_id:id});
         if(!deletecategory){
                return res.status(404).json({
                success:false,
                message:'category not found'
            })
         }
                
          res.status(200).json({
            success:true,
            message:'category deleted successfully',       
          })
        
    } catch (error) {
        return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}
module.exports = {deletecatController,createcatController,getAllcatController,updatecatController};