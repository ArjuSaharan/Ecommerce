import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/product/FilterSidebar';
import Sortoption from '../components/product/Sortoption';
import ProductGrid from '../components/product/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByFilters } from '../slice/productsSlice';
const CollectionPage = () => {
    const {collection} =useParams();

    const [serachParams]=useSearchParams();
    const disptach=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products)
    const queryParams=Object.fromEntries(serachParams.entries());

    useEffect(()=>{
        disptach(fetchProductByFilters({collection,...queryParams}));
    },[disptach,collection,serachParams]);


    const[product,setproducts]=useState([]);
    const sidebarRef=useRef(null) 
    const[issidebaropen ,setissidebaropen]=useState(false);

    const toggleSidebar=()=>{
        setissidebaropen(!issidebaropen);
    }
    const handleclickoutside=(e)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setissidebaropen(false);

        }
    }
    useEffect(()=>{
        //add event listener for click
        document.addEventListener("mousedown",handleclickoutside);
        return ()=>{
            document.removeEventListener("mousedown",handleclickoutside);
        }

    },[]);
   

  return (
    <>
    <div className='flex flex-col lg:flex-row'>
        {/*mobile filter button  */}
        <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2 '/>Filters
        </button>
        {/* filter sidebar */}
        <div ref={sidebarRef} className={`${issidebaropen ? "translate-x-0" :"-translate-x-full"}
        fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4 '>
            <h2 className=' text-2xl uppercase mb-4'>All Collections</h2>
            {/* sort */}
            <Sortoption/>

            {/* product grid */}

            <ProductGrid products={products} loading={loading} error={error}/>


        </div>

    </div>
    </>
  )
}

export default CollectionPage