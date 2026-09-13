import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { NavLink ,Link, useNavigate} from 'react-router-dom'
import { logout } from '../../slice/authSlice';
import { clearCart } from '../../slice/cartSlice';

const AdminSidebar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handlelogout=()=>{
        dispatch(logout());
        dispatch(clearCart());
        navigate('/')
    }
  return (
    <>
    <div className='p-6'>
        <div className='mb-6'>
            <Link to="/admin" className="text-2xl font-medium">BhumiFashion</Link>
        </div>
        <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-2'>
            <NavLink  to="/admin/users" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2": "bg-gray-900 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaUser/>
            <span>Users</span>
            </NavLink>

            <NavLink  to="/admin/products" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2": "bg-gray-900 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaBoxOpen/>
            <span>Products</span>
            </NavLink>

            <NavLink  to="/admin/orders" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2": "bg-gray-900 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaClipboardList/>
            <span>Orders</span>
            </NavLink>

            <NavLink  to="/admin/shop" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2": "bg-gray-900 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaStore/>
            <span>Shop</span>
            </NavLink>


        </nav>
        <div className='mt-6'>
            <button onClick={handlelogout}
            className='w-full bg-red-500 hover:bg-red-600 text-white px-2 py-4 rounded flex items-center justify-center space-x-2'>
                <FaSignOutAlt/>
                <span>Logout</span>
            </button>

        </div>

    </div>
    </>
  )
}

export default AdminSidebar