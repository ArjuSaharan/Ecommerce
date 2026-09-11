import React from 'react'
import { HiShoppingBag } from "react-icons/hi";
import { FaRegCreditCard } from "react-icons/fa6";
import { HiArrowPath } from "react-icons/hi2";
const FeatureSection = () => {
    return (
        <>
            <section className="py-16 px-4 bg-white">
                <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center '>
                    {/*fetaure1  */}
                    <div className='flex flex-col items-center'>
                        <div className='p-4 rounded-full mb-4'></div>
                        <HiShoppingBag className='text-3xl' />
                        <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h4>
                        <p className='text-gray-600 text-sm tracking-tighter'>On all orders over $100</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='p-4 rounded-full mb-4'></div>
                        <HiArrowPath className='text-3xl' />
                        <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
                        <p className='text-gray-600 text-sm tracking-tighter'>money back guranted</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='p-4 rounded-full mb-4'></div>
                        <FaRegCreditCard className='text-3xl' />
                        <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
                        <p className='text-gray-600 text-sm tracking-tighter'>100% secure checkout process</p>
                    </div>
                </div>

            </section>

        </>
    )
}

export default FeatureSection