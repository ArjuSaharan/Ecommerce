import mongoose from "mongoose";
import "dotenv/config"
export const conectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is conncted");

    }
    catch(error){
        console.error("connection failed",error.message);
        process.exit(1);
    }


}

