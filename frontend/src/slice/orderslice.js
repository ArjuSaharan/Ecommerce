import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch user orders
const backendURL = "http://localhost:5000";
export const fetchUserOrders= createAsyncThunk("orders/fetchUserOrders",async(_,{rejectWithValue})=>{
   try{
        const response=await axios.get(backendURL +"/api/orders/myorders",
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        return response.data;
    }
    catch(error){
        return rejectWithValue( error.response?.data || {
                    message: error.message || "Failed to fetch orders"
                });

    }
})


//  specfic order by id
export const fetchOrderDetails=createAsyncThunk("orders/fetchOrderDetails",async(orderId,{rejectWithValue})=>{
    try{
        const response=await axios.get(backendURL +`/api/orders/${orderId}`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        return response.data;
    }
    catch(error){
        return rejectWithValue( error.response?.data || {
                    message: error.message || "Failed to fetch orders"
                });

    }
})


// state manage of order
const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload?.message || action.error.message;
        })
         .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload;
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload?.message || action.error.message;
        })
    }
})


export default orderSlice.reducer;