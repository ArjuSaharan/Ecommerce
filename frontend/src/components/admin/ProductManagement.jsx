import React from 'react'
import { Link } from 'react-router-dom'

const ProductManagement = () => {
    const products=[
        {
            _id:1,
            name:"shirt",
            price:120,
            sku:"123467"
        },
    ]

    const handleDelete=(userId)=>{
        if(window.confirm("Are you sure to delete this product?")){
            console.log("delete");
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
        <div className='overflow-x-auto text-left sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-2 px-4'>Name</th>
                        <th className='py-2 px-4'>Price</th>
                        <th className='py-2 px-4'>Sku</th>
                        <th className='py-2 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length >0 ? (
                        products.map((val)=>(
                            <tr key={val._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{val.name}</td>
                                <td className='p-4'>${val.price}</td>
                                <td className='p-4'>{val.sku}</td>
                                <td className='p-4'>
                                    <Link to={`/admin/products/${val._id}/edit`}
                                    className='bg-green-600 text-white py-1 px-2 mr-2 hover:bg-green-500'>Edit</Link>
                                    <button onClick={()=>handleDelete(val._id)}
                                        className='text-white bg-red-600 px-2 py-1 rounded hover:bg-red-500'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ):
                    (
                        <tr colSpan={4} className='p-4 text-center text-gray-500'>
                            No products found.
                        </tr>
                    )
                    }
                </tbody>

            </table>

        </div>

    </div>
  )
}

export default ProductManagement