import React from 'react'

const OrderMangement = () => {
    const orders=[
        {
            _id:1,
            user:{
                name:"rahul",
            },
            totalPrice:110,
            status:"Processing",
        }
    ]

    const handleStatusChange=(orderId,status)=>{
        console.lof(orderId,status);
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Orders Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-md'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-sm uppercase text-gray-800'>
                    <tr>
                        <th className='py-3 px-4'>OrderId</th>
                        <th className='py-3 px-4'>Customer</th>
                        <th className='py-3 px-4'>TotalPrice</th>
                        <th className='py-3 px-4'>Status</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ?(
                                orders.map((order,index)=>(
                                    <tr key={order._id} className='border-b cursor-pointer hover:bg-gray-50'>
                                        <td className='py-4 px-4 font-medium whitespace-nowrap'>{order._id}</td>
                                        <td className='p-4'>{order.user.name}</td>
                                        <td className='p-4'>{order.totalPrice}</td>
                                        <td className='p-4'>
                                            <select value={order.status} onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className='p-4'>
                                            <button onClick={()=>handleStatusChange(order._id,"Delivered")}
                                                className='bg-green-600 text-white px-4 py-2 hover:bg-green-500 rounded'>Mark as Delivered</button>
                                        </td>

                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan={5} className='p-4 text-center text-gray-600'>No orders Found</td>
                                </tr>
                            )
                        }
                    </tbody>
            </table>

        </div>

    </div>
  )
}

export default OrderMangement