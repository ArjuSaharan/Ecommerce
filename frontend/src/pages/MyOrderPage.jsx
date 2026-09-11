import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyOrderPage = () => {
    const[orders,setorders]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        // simulate the fetching order
        setTimeout(() => {
            const mockorders=[
                {
                    _id:"1211",
                    createdAt:new Date(),
                    shippingAddress:{city:"New york",country:"USA"},
                    ordersItems:[
                        {
                            name:"product1",
                            image:"https://i.pinimg.com/736x/6c/a5/3b/6ca53bf3b2861e5ad541236480cabdfe.jpg",
                        }
                    ],
                    totalprice:100,
                    isPaid:true,
                },
                {
                    _id:"2345",
                    createdAt:new Date(),
                    shippingAddress:{city:"New york",country:"USA"},
                    ordersItems:[
                        {
                            name:"product1",
                            image:"https://i.pinimg.com/736x/00/f6/c8/00f6c8cb68a07a9a5756e6b85edfd113.jpg",
                        }
                    ],
                    totalprice:140,
                    isPaid:false,
                },
                {
                    _id:"1456",
                    createdAt:new Date(),
                    shippingAddress:{city:"New york",country:"USA"},
                    ordersItems:[
                        {
                            name:"product1",
                            image:"https://i.pinimg.com/736x/45/ce/d6/45ced66a9f6b7c78618112734cb00777.jpg",
                        }
                    ],
                    totalprice:120,
                    isPaid:true,
                }
            ];

            setorders(mockorders);
        }, 1000);

    },[]);
    const handleRowClick=async(orderId)=>{
        navigate(`/order/${orderId}`);
    }

  return (
    <>
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
        <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order id</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 px-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 ?(
                            orders.map((order)=>(
                                <tr key={order._id}  onClick={()=>handleRowClick(order._id)}
                                className='border-b hover:border-r-gray-50 cursor-pointer'> 
                                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                    <img src={order.ordersItems?.[0]?.image}
                                    className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded'
                                    />
                                  </td>
                                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id} </td>
                                  <td className='py-2 px-2 sm:py-4 sm:px-4'>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                  <td className='py-2 px-2 sm:py-4 sm:px-4 '>{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`:"N/a"}</td>
                                  <td className='py-2 px-2 sm:py-4 sm:px-4 '>{order.ordersItems.length}</td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium'>{order.totalprice}</td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium'>
                                    <span className={`${order.isPaid ? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}
                                    px-2 py-1 rounded-full text-sm sm:text-sm font-medium`}>
                                        {order.isPaid ? "Paid" : "Pending"}
                                    </span>
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>You have no orders</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>

        </div>

    </div>
    </>
  )
}

export default MyOrderPage