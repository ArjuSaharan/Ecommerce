import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


import axios from 'axios'
import { act } from "react";
const backendURL = "http://localhost:5000";
export const fetchProductByFilters=createAsyncThunk('products/fetchByFilters',async ({
    collection,size,color,gender,minPrice,maxPrice,category
    ,sortBy,search,material,brand,limit})=>{
        const query=new URLSearchParams();
        if(collection) query.append("collection",collection);
        if(size) query.append("size",size);
        if(category) query.append("category",category);
        if(color) query.append("color",color);
        if(gender) query.append("gender",gender);
        if(maxPrice) query.append("maxPrice",maxPrice);
        if(minPrice) query.append("minPrice",minPrice);
        if(sortBy) query.append("sortBy",sortBy);
        if(search) query.append("serach",search);
        if(material) query.append("marterial",material);
        if(brand) query.append("brand",brand);
        if(limit) query.append("limit",limit);

        const response=await axios.get(backendURL +`/api/products?${query.toString()}`);
        return response.data;
    }

)


// async thunk to fetch single product by id
export const fetchProductDetails=createAsyncThunk("products/fetchProductDeails",async (id)=>{
    const response=await axios.get(backendURL + `/api/products/${id}`)
    return response.data;
})


// async the to update product
export const updateProduct=createAsyncThunk("products/updateProduct",async ({id,productData})=>{
    const response=await axios.put(backendURL +`/api/products/${id}`,productData,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            }
        }
    )
    return response.data;
})


// async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/api/products/similar/${id}`
      );

      return response.data;

    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch similar products"
      );
    }
  }
);

const ProductSlice=createSlice({
    name:"Products",
    initialState:{
        products:[],
        selectedProducts:null,
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            maxPrice:"",
            minPrice:"",
            material:"",
            sortBy:"",
            search:"",
            collection:""
        },
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters={...state.filters,...action.payload};
        },
        clearFilters:(state)=>{
            state.filters={
                category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            maxPrice:"",
            minPrice:"",
            material:"",
            sortBy:"",
            search:"",
            collection:""
            };
        },
    },
    extraReducers:(builder)=>{
        builder
        // handle ftching products with filters
        .addCase(fetchProductByFilters.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductByFilters.fulfilled,(state,action)=>{
            state.loading=false,
            state.products=Array.isArray(action.payload) ? action.payload: [];
        })
        .addCase(fetchProductByFilters.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedProducts=action.payload;
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })

        // hanlde updateing product
        .addCase(updateProduct.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedProduct=action.payload;
            const index=state.products.findIndex((product)=> product._id ===updateProduct._id);
            if(index!==-1){
                state.products[index]=updatedProduct;
            }
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.similarProducts = Array.isArray(action.payload)
        ? action.payload
        : [];
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })

    }
})

export const {setFilters,clearFilters}=ProductSlice.actions;
export default ProductSlice.reducer;
