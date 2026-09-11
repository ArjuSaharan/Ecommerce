import React from 'react'
import { Link } from 'react-router-dom'
const AdminHome = () => {
    const orders=[
        {
            _id:1232,
            user:{
                name:"john"
            },
            totalprice:120,
            status:"Processing"
        },
         {
            _id:1232,
            user:{
                name:"john"
            },
            totalprice:120,
            status:"Processing"
        }
    ]
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Revenue</h2>
                <p className='text-2xl'>$1000</p>

            </div>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Toatl Orders</h2>
                <p className='text-2xl'>$1000</p>
                <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage orders</Link>

            </div>
            <div className='p-4 shadow rounded-lg'>
                <h2 className='text-xl font-semibold'>Toatl products</h2>
                <p className='text-2xl'>$1000</p>
                 <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage products</Link>
            </div>
        </div>
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
                                         <td className='p-4'>{val.totalprice}</td>
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