import { createSlice,createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000";

// fetch all products of orders
export const fetchAllOrders=createAsyncThunk("adminOrders/fetchAllOrders",async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get(backendURL+'/api/admin/orders',
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const updateOrderstatus=createAsyncThunk("adminOrders/updateOrderStatus",async({id,status},{rejectWithValue})=>{
    try{
        const response=await axios.get(backendURL+`/api/admin/orders/${id}`,{status},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
})


export const deleteOrder=createAsyncThunk("adminOrders/deleteOrder",async({id},{rejectWithValue})=>{
    try{
        await axios.delete(backendURL+`/api/admin/orders/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
})


const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null,
    },reduers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
            state.totalOrders=action.payload.length;

            const totalSales=action.payload.reduce((acc,order)=>{
                return acc+order.totalPrice;
            },0);
            state.totalSales=totalSales;
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
        .addCase(updateOrderstatus.fulfilled,(state,action)=>{
            const updateOrders=action.payload;
            const orderIndex=state.orders.findIndex((order)=>order._id===updateOrders._id);
            if(orderIndex!==-1){
                state.order[orderIndex]=updateOrders;
            }
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.orders=state.orders.filter((order)=>order._id!== action.payload);
        })
    }
})

export default adminOrderSlice.reducer;
