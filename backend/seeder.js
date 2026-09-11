import mongoose from "mongoose";
import "dotenv/config";
import  productModel  from "./config/models/products.js";
import products from './data/products.js'
// import userModel from './config/models/users.js'
import userModel from "./config/models/users.js";
import cartModel from "./config/models/cart.js";

// conect dtabse


// function to seed data
 const seetData= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        // every time run this file clear existinfg data
        await productModel.deleteMany();
        await userModel.deleteMany();
        await cartModel.deleteMany();

        // admin user create 
        const createdUser=await userModel.create({
            name:"admin",
            email:"admin@example.com",
            password:"admin123",
            role:"admin"
        })
        // assign  the defult user id to ecah product
        const userId=createdUser._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:userId};
        })
        // insert the products into dabase
        await productModel.insertMany(sampleProducts);
        console.log("product data seeded successfully");
        process.exit();

    }
    catch(error){
        // res.status(500).json({message:"error in seeding the data"});
        console.log("error in seeding data")
        process.exit(1);
    }
}

seetData();