import React from 'react'
import { Link } from 'react-router-dom'
const GenderCollection = () => {
  return (
    <>
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            <div className='relative flex-1'>
                <img src="https://i.pinimg.com/1200x/aa/6c/55/aa6c55b5dcaef3fcaae68b3ad2a69ac6.jpg" className='w-full h-[600px] object-cover' alt="women collection"/>
                <div className='absolute  bottom-8 left-8 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women`s Collections</h2>
                    <Link to="/collections/all?gender=Women" className='bg-white  p-2 rounded text-gray-900 hover:text-gray-600'>Shop Now</Link>
                </div>
            </div>

             <div className='relative flex-1'>
                <img src="https://i.pinimg.com/736x/61/35/2a/61352a9803c210a3b3acee7bd0183e18.jpg" className='w-full h-[600px] object-cover' alt="women collection"/>
                <div className='absolute  bottom-8 left-8 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men`s Collections</h2>
                    <Link to="/collections/all?gender=Women" className='bg-white  p-2 rounded text-gray-900 hover:text-gray-600'>Shop Now</Link>

                </div>

            </div>

        </div>

    </section>
    </>
  )
}

export default GenderCollection