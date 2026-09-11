import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetails = () => {
    const{id}=useParams();
    const[orderDetails,setOrderDetails]=useState(null);

    useEffect(()=>{
        const mockOrderDetail={
            _id:id,
            createdAt:new Date(),
            isPaid:true,
            isDeliverd:false,
            paymentMethod:"Paypal",
            shippingMethod:"Standard",
            shippingAddress:{city:"ratia",country:"India"},
            orderItems:[
                {
                    productId:"1",
                    name:"jacket",
                    price:120,
                    quantity:1,
                    image:"https://picsum.photos/150?random=1"
                },
                {
                    productId:"2",
                    name:"jacket",
                    price:120,
                    quantity:1,
                    image:"https://picsum.photos/150?random=2"
                },
                {
                    productId:"3",
                    name:"jacket",
                    price:120,
                    quantity:1,
                    image:"https://picsum.photos/150?random=3"
                }
            ]
        }
        setOrderDetails(mockOrderDetail);
    },[id]);
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {
            !orderDetails ? (<p>No order Details found</p>):
            (
                <div className='p-4 sm:p-6 rounded-lg border'>
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className=' text-lg ms:text-xl font-semibold'>Oder ID: #{orderDetails._id}</h3>
                            <p className='text-gray-600'>
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                            
                        </div>
                        <div className='flex flex-col items-start sm:items-end sm:mt-0'> 
                            <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-600":"bg-red-100 text-red-600"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>

                            <span className={`${orderDetails.isDeliverd ? "bg-green-100 text-green-600":"bg-yellow-100 text-yellow-600"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isDeliverd ? "Delivered" : "Pending Delivered"}
                            </span>
                        </div>
                    </div>
                    {/* customer patemnt */}
                   <div>
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                        <h4 className='text-lg font-semibold'>Payment info</h4>
                        <p className=''>Payment Method:{orderDetails.paymentMethod}</p>
                        <p>Status:{orderDetails.isPaid ? "Paid" :"Unpaid"}</p>

                    </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                        <h4 className='text-lg font-semibold'>Shipping info</h4>
                        <p className=''>shipping Method:{orderDetails.shippingMethod}</p>
                        <p>Address: {`${orderDetails.shippingAddress.city} ,${orderDetails.shippingAddress.country}`}</p>
                    </div>
                   </div>

                   {/* product list */}
                   <div className='overflow-x-auto'>
                    <h4 className='text-lg font-semibold mb-4'></h4>
                    <table className='min-w-full text-gray-600 mb-4'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='py-2 px-4'>Name</th>
                                <th className='py-2 px-4'>Unit Price</th>
                                <th className='py-2 px-4'>Quantity</th>
                                <th className='py-2 px-4'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetails.orderItems.map((items)=>(
                                    <tr key={items.productId} className='border-b'>
                                        <td className='py-2 px-4 flex'>
                                            <img src={items.image} alt={items.name} className='w-12 h-12 object-cover rounded-lg mr-4'/>
                                        <Link to={`/product/${items.productId}`} 
                                        className='text-blue-500 hover:underline'>{items.name}</Link>
                                        </td>
                                        <td className='py-2 px-4'>${items.price}</td>
                                        <td className='py-2 px-4'>${items.quantity}</td>
                                        <td className='py-2 px-4'>${items.price * items.quantity}</td>
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                   </div>
                   {/* back to order page */}
                   <Link to="my-orders" className='text-blue-500 hover:underline'>Back to my Orders</Link>
                </div>
            )
        }

    </div>
  )
}

export default OrderDetails