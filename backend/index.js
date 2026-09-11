import express from 'express'
import cors from 'cors'
import { conectdb } from './config/mongodb.js';

import userRoutes from './routes/userroutes.js'
import productRoutes from './routes/productRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import subscribeRoutes from './routes/subscriberRoutes.js'
import adminRoutes from './routes/adminroutes.js'
import productAdminRoutes from './routes/productadminRoutes.js'
import adminorderrotes from './routes/adminorderRotes.js';
const app=express();
import "dotenv/config"

app.use(express.json())
app.use(cors());

conectdb();

app.get('/',(req,res)=>{
    res.send("welocme to home apge");
})

// api routes

app.use('/api/products',productRoutes)
app.use("/api/users",userRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api',subscribeRoutes);

// admin routes
app.use('/api/admin/users',adminRoutes);
app.use('/api/admin/products',productAdminRoutes);
app.use('api/admin/orders',adminorderrotes)
const port=5000;
app.listen((port),()=>{
    console.log(`server is running on http://localhost:${port}`)
})