import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../slice/cartSlice';
const Register = () => {
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const [password,setpassword]=useState("");
   const dispatch = useDispatch();
    const naviagte = useNavigate();
    const loaction = useLocation();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const redirect = new URLSearchParams(loaction.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if(user){
        if (cart?.products.length > 0 && guestId) {
            dispatch(mergeCart({guestId,user})).then(()=>{
                naviagte(isCheckoutRedirect ? "/checkout" : "/");
            })
        }
        else { naviagte(isCheckoutRedirect ? "/checkout" : "/"); }
    }
    }, [user, guestId, cart, naviagte, isCheckoutRedirect, dispatch]);
    const handlesubmit=(e)=>{
    e.preventDefault();
    dispatch(registerUser({name,email,password}));

}
  return (
    <>
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handlesubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
            <div className='text-xl font-medium'>
                <h2 className='text-xl text-center font-medium'>BhumiFashion</h2>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Welcome</h2>
            <p className='text-center mb-6 text-sm'>create an account to register</p>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Name</label>
                <input type="name" value={name}
                onChange={(e)=>setname(e.target.value)}
                className='w-full p-2 border rounded'
                placeholder='enter your name'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Email</label>
                <input type="email" value={email}
                onChange={(e)=>setemail(e.target.value)}
                className='w-full p-2 border rounded'
                placeholder='enter your email'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Password</label>
                <input type="password" value={password}
                onChange={(e)=>setpassword(e.target.value)}
                className='w-full p-2 border rounded'
                placeholder='enter your password'
                />

            </div>
            <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold
            hover:bg-gray-800 transition'>Sign Up</button>
            <p className='mt-6 text-center text-sm'>You have an Account?
                <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500"> Login</Link>
            </p>
        </form>
        </div>

        <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
            <img src="https://i.pinimg.com/1200x/e2/f0/fd/e2f0fd94247e36a74f5d16e492523d3d.jpg" className='h-[750px] w-full object-cover '/>
        </div>

        </div>

    </div>
    </>
  )
}

export default Register
