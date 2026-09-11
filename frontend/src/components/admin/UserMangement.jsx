import React, { useState } from 'react'

const UserMangement = () => {
    const users=[
        {
            _id:1,
            name:"john",
            email:"john@gmail.com",
            role:'admin',
        }
    ]

    const[formData,setfromdata]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer", //default role
    })
const handlechange=(e)=>{
    setfromdata({
        ...formData,
        [e.target.name]:e.target.value
    })
}
const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
    setfromdata({
        name:"",
        email:"",
        password:"",
        role:"customer"
    })
}

    const handleRoleChange=(userId,newRole)=>{
        console.log(userId,newRole);
    }

    const handleDelete=(userId)=>{
        if(window.confirm("Are you sure to delete this user")){
            console.log("delete");
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6 '>
        <h2 className='text-2xl font-bold mb-4'>user Management</h2>
        <div className='p-6 rounded mb-6'>
            <h3 className='text-lg font-bold mb-4'>Add new user</h3>

            <form className='mb-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                <input type="text" name="name"
                value={formData.name}
                onChange={handlechange}
                className='w-full p-2 border rounded' required
                />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                <input type="email" name="email"
                value={formData.email}
                onChange={handlechange}
                className='w-full p-2 border rounded' required
                />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                <input type="password" name="password"
                value={formData.password}
                onChange={handlechange}
                className='w-full p-2 border rounded' required
                />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                     <select name="role" 
                     value={formData.role}
                     onChange={handlechange}
                     className='w-full p-2 border rounded'>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                     </select>
                </div>
                <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Add user</button>
            </form>
        </div>

        {/* user list */}
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-3 px-3'>Name</th>
                         <th className='py-3 px-3'>Email</th>
                          <th className='py-3 px-3'>Role</th>
                           <th className='py-3 px-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user)=>(
                            <tr key={user._id} className='border-b hover:bg-gray-50'> 
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
                                <td className='p-4'>{user.email}</td>
                                <td className='p-4'>
                                    <select value={user.role} onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                                        className='p-2 border rounded'>
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                </td>
                                <td className='p-4'>
                                    <button onClick={()=>handleDelete(user._id)}
                                        className='bg-red-500 text-white rounded hover:bg-red-600 px-2 py-1'>Delete</button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </div>

    </div>
  )
}

export default UserMangement