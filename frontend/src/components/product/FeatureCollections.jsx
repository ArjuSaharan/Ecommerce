import React from 'react'
import { Link } from 'react-router-dom'

const FeatureCollections = () => {
  return (
    <>
    <section className='py-16 px-4 lg:px-0'>
        <div className='conatiner mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
            {/* left */}
            <div className='lg:w-1/2 p-8 text-center lg:text-left'>
            <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                Comfort And style
                <h2 className='text-4xl lg-text-5xl font-bold mb-6'>Apparel made for your everday life</h2>
                <p className='text-lg text-gray-600 mb-6'>
                    Discover,highQuality, comfortable clothing taht effortlessly blends fashion and function.
                     Designed to make you look and feel great every day.
                </p>
                <Link to="/collections/all" className='bg-black text-white px-6 py-3 rounded-lg text-lg
                hover:bg-gray-800'>SHOP NOW</Link>
            </h2>
            </div>
            {/* right */}
            <div className='lg:w-1/2'>
            <img src="https://i.pinimg.com/1200x/61/0d/71/610d71b8a2d34712a8a5228fc41bdced.jpg" 
            className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'/>

            </div>



        </div>

    </section>
    </>
  )
}

export default FeatureCollections