import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductByFilters, setFilters } from '../../slice/productsSlice';
const Searchbar = () => {
    const[search,setsearch]=useState("")
    const [isOpen, setIsopen]=useState(false)

    const distpatch=useDispatch();
    const navigate=useNavigate();
    const handlesearch=()=>{
        setIsopen(!isOpen)
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
         distpatch(setFilters({search:search}));
         distpatch(fetchProductByFilters({search:search}));
         navigate(`/collections/all?search=${search}`);
        setIsopen(false);
        setsearch("");
    }
  return (
   
     <>
     <div className={`flex items-center justify-center w-full transition-all duration-300
         ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" :"w-auto "}`}>
    {isOpen ?
     (<form onSubmit={handlesubmit}className='relative flex items-center justify-center w-full'>
        <div className='relative w-1/2'>
        <input type="text" value={search}
        onChange={(e)=>setsearch(e.target.value)}
         placeholder='serach..'
        className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'
        />
        <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
            <FaSearch className='h-6 w-6'/>
        </button>
        </div>
        <button type="button" 
        onClick={handlesearch}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
            <IoClose className='h-6 w-6 ' />
        </button>
        
    </form>):

    (<button onClick={handlesearch}><FaSearch className='h-6 w-6 text-gray-700' /></button>)
    }
   </div>
    </>
  )
}

export default Searchbar