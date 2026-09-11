import React from 'react'
import { FaMeta ,FaInstagram} from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
const Topbar = () => {
  return (
    <>
    <div className='bg-[#c82306] text-white'>
        <div className='container mx-auto flex justify-between items-center py-3'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href="#" className='hover:text-gray-300'></a>
                <FaMeta  className='h-5 w-5'/>
                <a href="#" className='hover:text-gray-300'></a>
                <FaInstagram  className='h-5 w-5'/>
                <a href="#" className='hover:text-gray-300'></a>
                < FaTwitterSquare  className='h-5 w-5'/> 
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>We ship WorldWide- Fast and Reliable Shipping !</span>
            </div>
            <div className='hidden md:block text-sm'>
                <a href='tel:+7082270412' className='hover:text-gray-300'>Contact us</a>
            </div>

        </div>
    </div>
    </>
  )
}

export default Topbar