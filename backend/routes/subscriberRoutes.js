import express from 'express';
import subscribeModel from '../config/models/subscriber.js';
const router=express.Router();

// /handle newletter subscrition

router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(404).json({message:"email is requied"});
    }
    try{
        let subscribe=await subscribeModel.findOne({email});
        if(subscribe){
            return res.status(404).json({message:"email is already subscribes"});
        }
        subscribe=new subscribeModel({email});
        await subscribe.save();
        return res.status(201).json({message:"successfullty login to newsLetter"});
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})

export default router