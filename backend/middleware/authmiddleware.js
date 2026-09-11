import jwt from 'jsonwebtoken'
import userModel from '../config/models/users.js'
import "dotenv/config"
// middleware to protect route

export const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.SECRET_KEY)

            req.user= await userModel.findById(decoded.user.id).select("-password") ;   //exculde password
            next();
        }
        catch(error){
            console.log("token verification field" ,error);
            resizeBy.json(401).json({message:"not authorize token failed"});
        }
    }
    else{
        res.status(401).json({message:"not authoried not token provided"});
    }
}


// middleware to check user is admin

 export const admin=(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }
    else{
        res.status(403).json({message:"not aithoried as na admin"})
    }
}

