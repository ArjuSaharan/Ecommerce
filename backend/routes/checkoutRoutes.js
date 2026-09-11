import express from 'express'
import checkOutModel from '../config/models/checkout.js'
import orderModel from '../config/models/order.js'
import productModel from '../config/models/products.js'
import cartModel from '../config/models/cart.js'

import {protect} from '../middleware/authmiddleware.js'
const router=express.Router();

// checkout post request create new checkout 
router.post('/',protect,async (req,res)=>{
    const{checkoutItems,shippingAddress,paymentMethod,totalPrice,}=req.body

    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"no items in checkout"});
    }
    try{
        const newCheckout= await checkOutModel.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,totalPrice,
            paymentStatus:"Pending",
            isPaid:false,
        })
        console.log("checkout ");
        res.status(201).json(newCheckout);
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})


// update the cjeckout after payment
router.put('/:id/pay',protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    try{
        const checkout=await checkOutModel.findById(req.params.id);
        if(!checkout){
            return res.status(400).json({message:"checkout not found"});
        }
        if(paymentStatus === "paid"){
            checkout.isPaid=true,
            checkout.paymentStatus=paymentStatus,
            checkout.paymentDetails=paymentDetails,
            checkout.paidAt=Date.now();

            await checkout.save();
            res.status(200).json(checkout);
        }
        else{
            res.status(400).json({message:"invaild payment status"});
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:"server error"});
    }
})


// finalize route  and conert into order after payment confrmation
router.post('/:id/finalize',protect,async(req,res)=>{
    try{
        const checkout=await checkOutModel.findById(req.params.id);

        if(!checkout){
            return res.status(400).json({message:"checkout not found"})
        }
        if(checkout.isPaid && !checkout.isFinalized){
            // create final order
            const finalOrder =await orderModel.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails,
            });
            // mark the checkout finalize
            checkout.isFinalized=true,
            checkout.finalizedAt=Date.now();
            await checkout.save();

            // delete the cart associate with user
            await cartModel.findOneAndDelete({user:checkout.user});
            res.status(201).json(finalOrder);
        }
        else if(checkout.isFinalized){
            return res.status(400).json({message:"checkout already finalize"});
        }
        else{
            res.status(400).json({message:"checkout is not paid"});
        }
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
});


export default router;