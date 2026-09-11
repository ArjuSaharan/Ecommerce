import React from 'react'
import { Link } from 'react-router-dom'
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

import { FaPhoneAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <>
   <footer className='border-t py-12'>
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div>
            <h3 className='text-lg text-gray-500 mb-4'>NewLetter</h3>
            <p className='text-gray-500 mb-4'>Be the first to hear about new Products, exclusive events and online offers. </p>
            <p className='font-medium text-sm text-gray-600 mb-6'>
                sign up and get 10% off on your first order
            </p>
            {/* new letter form */}
            <form className='flex'>
                <input type="email" placeholder='enter email' 
                className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
                />
                <button  type="submit" className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
            </form>
        </div>
        <div>
           <h3 className='text-lg text-gray-800 mb-4'>Shop</h3> 
           <ul className='space-y-2 text-gray-600'>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Men`s Top Wear</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Women`s top Wear</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Men`s Bottom Wear</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Women`s Bottom Wear</Link>
            </li>

           </ul>
        </div>
         <div>
           <h3 className='text-lg text-gray-800 mb-4'>Support</h3> 
           <ul className='space-y-2 text-gray-600'>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Contact-us</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>About-us</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>FAQs</Link>
            </li>
            <li>
                <Link to="#" className='hover:text-gray-500 transition-colors'>Features</Link>
            </li>

           </ul>
        </div>

        {/* follower */}
        <div>
            <h1 className='text-lg text-gray-800 mb-4'>Follow Us</h1>
            <div className='flex items-center space-x-4 mb-6'>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className='hover:text-gray-500'><FaMeta className='sh-5 w-5 text-gray-800'/></a>
                <a href="https://www.instagram.com/shiksha.biishnoi?igsh=eGc3bHI2Nm5qaXk2" target="_blank" rel="noopener noreferrer"
                className='hover:text-gray-500'><FaInstagram className='sh-5 w-5 text-gray-800'/></a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className='hover:text-gray-500'><FaTwitterSquare className='sh-5 w-5 text-gray-800'/></a>
            </div>
            <p className='text-gray-800'>Call us</p>
            <p><FaPhoneAlt className=' inline-block mr-2 h-4 w-4 text-gray-800'/>01234-56789</p>
        </div>
    </div>

    <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300 pt-6'>
        <p className='text-gray-500 text-sm tracking-tight text-center'>@ 2026, CompileTab. All rights Reserved</p>

    </div>

   </footer>
    </>
  )
}

export default Footer