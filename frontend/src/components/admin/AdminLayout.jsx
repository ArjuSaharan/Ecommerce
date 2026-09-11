import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const[isSidebar,setisSidebar]=useState(false);
    const toggleSide=()=>{
        setisSidebar(!isSidebar);
    }

  return (
    <>
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* toggle mobile button */}
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
            <button onClick={toggleSide}><FaBars size={24}/></button>
            <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
        </div>

        {/* overlay */}
        {
            isSidebar &&(
                <div className='fixed inset-0 z-10  bg-opacity-50 md:hidden' 
                onClick={toggleSide}>

                </div>
            )
        }
        {/* sidebar */}
        <div className={` bg-gray-900 min-h-screen text-white w-64 absolute md:relative transform
            ${isSidebar ? "translate-x-0" :"-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>

            <AdminSidebar/>
        </div>

        {/* main content */}
        <div className='flex-grow p-6 overflow-auto'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default AdminLayout