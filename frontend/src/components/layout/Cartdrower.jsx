import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import CartContent from '../cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Cartdrower = ({draweropen,togglecart}) => {

    const navigate=useNavigate();
    const {user,guestId}=useSelector((state)=>state.auth);
    const {cart}=useSelector((state)=>state.cart);
    const userId=user ? user._id :null;
    const handleCheckout=()=>{
      togglecart();
      if(!user){
          navigate("/login?redirect=checkout")
      }
      else{
        navigate("/checkout");
      }
   
    }
   
  return (
    <>
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 ms:w-[30rem] h-full bg-white shadowlg
    transform transition -transform duration-300 flex flex-col z-50 ${draweropen ? "translate-x-0":" translate-x-full"}`}>
           {/* close button */}
       <div className='flex justify-end p-4'>
         <button onClick={togglecart}><IoClose  className='h-6 w-6 text-gray-600'/></button>
       </div>

       {/* cart content */}
        <div className='flex-grow p-5 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>Your cart</h2>
            {/* cart componets */}
            {cart && cart?.products?.length > 0 ? (
               <CartContent cart={cart} userId={userId} guestId={guestId} />
            ) : (
              <p>Your cart is Empty</p>
            )}
           

        </div>
        <div className='p-4 bg-white sticky bottom-0'>
          {cart && cart?.products?.length > 0 && (
            <>
            <button  onClick={handleCheckout}
            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
            <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping ,taxes and discount codes calculated at checkout.</p>
            </>
          )}

        </div>
    </div>
    </>
  )
}

export default Cartdrower