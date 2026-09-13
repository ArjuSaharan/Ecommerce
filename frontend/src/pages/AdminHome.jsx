import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAdminProduct } from '../slice/adminProductSlice';
import { fetchAllOrders } from '../slice/adminOrderSlice';
const AdminHome = () => {
    const dispatch=useDispatch();
    const {products,loading:productloading,errro:producterror}=useSelector((state)=>state.adminProducts);
    const {orders,totalOrders,totalSales,loading:orderLoading,error:ordererror}=useSelector((state)=>state.adminOrder);

    useEffect(()=>{
        dispatch(fetchAdminProduct());
        dispatch(fetchAllOrders());
    },[dispatch])
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        {productloading || orderLoading ? (
            <p>Loading...</p>
        ): producterror ? (
            <p>Error fetching products :{producterror}</p>
        ): ordererror ? (
            <p>Error fetching orders :{ordererror}</p>
        ):(
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Revenue</h2>
                <p className='text-2xl'>${totalSales.toFixed(2)}</p>

            </div>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Toatl Orders</h2>
                <p className='text-2xl'>${totalOrders}</p>
                <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage orders</Link>

            </div>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Toatl products</h2>
                <p className='text-2xl'>{products.length}</p>
                 <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage products</Link>
            </div>
        </div>
        )}
        <div className='mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-sm uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>order id</th>
                            <th className='py-3 px-4'>user</th>
                            <th className='py-3 px-4'>total price</th>
                            <th className='py-3 px-4'>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ?  (
                                orders.map((val,index)=>(
                                    <tr key={val.id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                        <td className='p-4'>{val._id}</td>
                                        <td className='p-4'>{val.user.name}</td>
                                         <td className='p-4'>{val.totalprice.toFixed(2)}</td>
                                          <td className='p-4'>{val.status}</td>

                                    </tr>
                                ))
                            )
                            :(
                                <tr colSpan={4} className='p-4 text-center text-gray-600'>
                                    <td>
                                        no recent orders are found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>

        </div>
        
        
    </div>
  )
}

export default AdminHome