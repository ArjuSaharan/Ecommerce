import express from 'express'
import userModel from '../config/models/users.js'
import "dotenv/config"
import jwt from 'jsonwebtoken';
import {protect} from '../middleware/authmiddleware.js'
const router=express.Router();

// user register

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await userModel.findOne({email})
        if(user){
            return res.status(400).json({message:"user alreday exit"});
        }
        user = new userModel({name,email,password});
        await user.save();
        // create token 
        const payload={user:{id:user._id, role:user.role}};
        const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'2d'});
            return res.status(201).json({
                    user:{
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        role:user.role
                    },
                    token,
            })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
})


// login post reguest

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try{
        const user =await userModel.findOne({email});
        if(!user) return  res.status(400).json({message:"invalid email"});

        const isMatch=await user.matchPassword(password);
        if(!isMatch) return  res.status(400).json({message:"invalid password"});

        const payload={user:{id:user._id, role:user.role}};
        const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'2d'});
            return res.json({
                    user:{
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        role:user.role
                    },
                    token,
            })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
})

// user profile get request api request protected route and access muts ve private

router.get('/profile',protect,async(req,res)=>{
    res.json(req.user);
})



export default router
