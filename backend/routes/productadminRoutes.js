import express from 'express'
import  {protect,admin} from '../middleware/authmiddleware.js'
import productModel from '../config/models/products.js'
const router=express.Router();

// get reuest all products by admin only

router.get('/',protect,admin,async(req,res)=>{
    try{
        const products=await productModel.find({});
        res.json(products);
    }
    catch(error){
        return res.status(500).json({message:"server error"})
    }
})

export default router;