import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const backendURL = "http://localhost:5000";
// load cart from staoge
const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem("cart");

        if (!storedCart || storedCart === "undefined") {
            return { products: [] };
        }

        const parsedCart = JSON.parse(storedCart);

        return parsedCart && typeof parsedCart === "object"
            ? parsedCart
            : { products: [] };

    } catch (error) {
        console.log("Invalid cart in localStorage:", error);
        localStorage.removeItem("cart");
        return { products: [] };
    }
};
// function to save cart to locastoarge
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// cart for user fetch
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(backendURL + '/api/cart',
            {
                params: { userId, guestId },
            }
        )
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

// thunk to add items in cart

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(backendURL + '/api/cart',
            {
                productId, quantity, size, color, guestId, userId
            }
        )
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// update the qunatity in cart;
export const updateCartitemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
        const response = await axios.put(backendURL + '/api/cart',
            {
                productId, quantity, guestId, userId, size, color,
            }
        );
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

// remove item friom cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: backendURL + '/api/cart',
            data: { productId, quantity, guestId, userId, size, color }
        })
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// merge guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(backendURL + "/api/cart/merge", { guestId, user },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                },
            },
        );
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                saveCartToStorage(action.payload.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                 console.log("ADD CART RESPONSE:", action.payload);
                state.cart = action.payload.cart;
                saveCartToStorage(action.payload.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to add to cart";
            })
            .addCase(updateCartitemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartitemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartitemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to add to cart";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to add to cart";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                saveCartToStorage(action.payload.cart);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to add to cart";
            })
    }
})


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;