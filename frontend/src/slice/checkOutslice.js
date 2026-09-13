import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const backendURL = "http://localhost:5000";
// craet fro checkout 
export const createCheckout=createAsyncThunk("checkout/createCheckout",
    async(checkoutdata,{rejectWithValue})=>{
    try{
        const response=await axios.post(backendURL +"/api/checkout/",checkoutdata,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
        console.log(response.data);
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);

    }
})


const checkoutslice=createSlice({
    name:"checkout",
    initialState:{
        checkout:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createCheckout.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createCheckout.fulfilled,(state,action)=>{
            state.loading=false;
            state.checkout=action.payload;
            state.error=null;
        })
        .addCase(createCheckout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
    }
})

export default  checkoutslice.reducer;