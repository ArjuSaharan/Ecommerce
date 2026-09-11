import mongoose from "mongoose";
const orderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    iamge:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    size:String,
    color:String,
    quantity:{
        type:Number,
        required:true,
    }
},{_id:false}
)


const orderschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true,
    },
    orderItem:[orderItemSchema],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    toalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        defalt:false,
    },
    deliveredAt:{
        type:Date,
    },
    paymentStatus:{
        type:String,
        default:"pending",
    },
    status:{
        type:String,
        enum:["Processing","Shipped","Delivered","Cancelled"],
        default:"Processing",
    },
},{timeStamps:true},
)

const orderModel=mongoose.model("order",orderschema);

export default orderModel