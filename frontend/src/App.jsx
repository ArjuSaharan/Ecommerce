import React from 'react'
import {BrowserRouter, Route,Routes, useParams} from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from './pages/Home';
import {Toaster} from 'sonner'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/product/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetails from './pages/OrderDetails';
import MyOrderPage from './pages/MyOrderPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/AdminHome';
import UserMangement from './components/admin/UserMangement';
import ProductManagement from './components/admin/ProductManagement';
import Editproduct from './components/admin/Editproduct';
import OrderMangement from './components/admin/OrderMangement';

import {Provider} from 'react-redux';
import store from './redux/store';
import ProtectRoutes from './components/common/ProtectRoutes';
const App = () => {
  const {collection}=useParams();
  return (
    <Provider store={store}>
   <BrowserRouter>
   <Toaster position="top-right"/>
     <Routes>
      <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="collections/:collection" element={<CollectionPage/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="order/:id" element={<OrderDetails/>}/>
          <Route path="/my-orders" element={<MyOrderPage/>}/>
        </Route>
        {/* <Route path='/admin' element={<ProtectRoutes role="admin"><AdminLayout/></ProtectRoutes>}> */}
        <Route path='/admin' element={<AdminLayout/>}>
           <Route index element={<AdminHome/>}/>
           <Route path='users' element={<UserMangement/>}/>
           <Route path="products" element={<ProductManagement/>}/>
           <Route path='products/:id/edit' element={<Editproduct/>}/>
           <Route path="orders" element={<OrderMangement/>}/>
        </Route>
     </Routes>
   </BrowserRouter>
   </Provider>
  )
}

export default App