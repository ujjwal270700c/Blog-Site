const jwt=require('jsonwebtoken');
require('dotenv').config()

module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:"no token found...."});
    }
    try{
       const decodetoken=jwt.verify(token,process.env.Secret);
       req.user=decodetoken;
       console.log(req.user);
       next();
    }catch{
      res.status(401).json({msg:"Token is invalid"});
    }
}

