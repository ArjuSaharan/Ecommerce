import express from 'express';
import orderModel from '../config/models/order.js';
import { protect,admin } from '../middleware/authmiddleware.js';
const router =express.Router();

// route to access the order products
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("user", "name email");

        return res.status(200).json(orders);

    } catch (error) {
        console.log("GET ORDERS ERROR:", error);

        return res.status(500).json({
            message: "server error"
        });
    }
});

// route to update order status
router.put("/:id", protect, admin, async (req, res) => {
    try {
        console.log("put route")
        console.log("ID RECEIVED:", req.params.id);
        console.log("BODY RECEIVED:", req.body);

        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = req.body.status || order.status;

        if (req.body.status === "Delivered") {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        } else {
            order.isDelivered = false;
            order.deliveredAt = null;
        }

        const updatedOrder = await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order: updatedOrder
        });

    } catch (error) {
        console.log("UPDATE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// route to delete the order
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.status({message:"order deleted successfully"});
        }
        else{
            return res.staus(404).json({message:"order not found"});
        }
    }
    catch(error){
        return res.status(500).json({message:'server error'});
    }
})
export default router