import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialGuestId =
    localStorage.getItem("guestId") ||
    `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};


// Backend URL
const backendURL = "http://localhost:5000";
export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                backendURL + "/api/users/login",
                userData
            );
            console.log("LOGIN RESPONSE:", response.data);

            // Save user
            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.user)
            );

            // Save token
            localStorage.setItem(
                "userToken",
                response.data.token
            );

            return response.data.user;

        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        }
    }
);
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                backendURL + "/api/users/register",
                userData
            );

            console.log("REGISTER RESPONSE:", response.data);
            console.log("token",response.data.token)
            // Save user
            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.user)
            );
            // Save token
            localStorage.setItem(
                "userToken",
                response.data.token
            );
            return response.data.user;

        } catch (error) {

            console.log(
                "REGISTER ERROR:",
                error.response?.data
            );
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {

            state.user = null;

            state.guestId =
                `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem(
                "guestId",
                state.guestId
            );
        },
        generateNewGuestId: (state) => {

            state.guestId =
                `guest_${new Date().getTime()}`;

            localStorage.setItem(
                "guestId",
                state.guestId
            );
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error =
                action.payload.message || "Login failed";
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;

            state.error =
                action.payload || "Registration failed";
        });
    }
});


export const {
    logout,
    generateNewGuestId
} = authSlice.actions;


export default authSlice.reducer;

