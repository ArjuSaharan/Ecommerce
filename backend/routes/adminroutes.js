import express from 'express'
import userModel from '../config/models/users.js'
import {protect,admin} from '../middleware/authmiddleware.js'
const router =express.Router();

//  get all users onlybfor admin
router.get('/',protect,admin,async (req,res)=>{
    try{
        const users=await userModel.find({});
        res.json(users);
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})

// add new users by admin only
router.post('/',protect,admin,async(req,res)=>{
    const {name,email,password,role}=req.body
    try{
        let user=await userModel.findOne({email});
        if(user){
            return res.status(404).json({message:"user alreday exist "});
        }
        user=new userModel({
            name,email,password,
            role:role || "customer",
        })
        await user.save();
        return res.status(201).json({message:'user created successfully',user:user});
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})

// put to update the users info by admin 
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "user updated successfully",
            user: updatedUser
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "server error"
        });
    }
});


// delete user by admin
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:'user deleted successfully'});
        }
        else{
            return res.status(401).json({message:"user not found"});
        }
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})

export default router
