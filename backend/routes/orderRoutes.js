import express from 'express'
import orderModel from '../config/models/order.js';
import {protect} from '../middleware/authmiddleware.js'

const router =express.Router();

// get order logged in user 
router.get('/myorders',protect,async(req,res)=>{
    try{
        //find orders fro the authenticated user
        const orders=(await orderModel.find({user:req.user._id})).sort({
            createdAt:-1,
        });
        res.json(orders);
    }
    catch(error){
        return res.status(500).json({message:"server aerror"});
    }
})

// get order detail by id
router.get('/:id',protect,async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            return res.status(404).json({message:'order not found'});
        }
        return res.json(order);

    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})


export default router;