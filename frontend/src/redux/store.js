import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../slice/authSlice'
import producsReducer from '../slice/productsSlice';
import cartReducer from '../slice/cartSlice'
import checkoutslice from '../slice/checkOutslice'
import orderSlice  from '../slice/orderslice';
import adminReducer from '../slice/adminSlice'
import adminProductSlice from '../slice/adminProductSlice'
import adminOrderSlice from '../slice/adminOrderSlice';
const store=configureStore({
    reducer:{
       auth:AuthReducer,
       products:producsReducer,
       cart:cartReducer,
       checkout:checkoutslice,
       orders:orderSlice,
       admin:adminReducer,
       adminProducts:adminProductSlice,
       adminOrder:adminOrderSlice,
    }
})
export default store;