const jwt = require('jsonwebtoken');
const adminmiddleware =  async(req,res,next)=>{
    try{
          
            const authorization = req.headers.authorization;
            if (!authorization) {
  return res.status(401).json({
    success: false,
    message: 'Authorization header missing'
  });
}
    console.log('AUTH HEADER:', authorization);

  const token = authorization.split(' ')[1];
            if(!token){return res.status(401).json({success: false, message: 'Authorization header missing' });
    }
        
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if (err) {
                return res.status(401).json({
                    success:false,
            message:err.message
                })
            }
            else{
                  req.user = decoded;
                 req.user.usertype = 'admin';
                  console.log('AUTH MIDDLEWARE HIT');
                 next();
            }
        })
       

    }catch(error){
        console.error(error)
        res.status(500).json({
            message:error.message
        })    
    }
}


module.exports ={adminmiddleware}