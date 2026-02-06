const testcontroller  = (req,res)=>{
    try {
         res.status(201).json({
            success:true,
            message:'allright'
         })

    } catch (error) {
        console.log('error',error)
    }
}
module.exports  = {testcontroller}