import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    const[serachParams,setserachParams]=useSearchParams();
    const[filters,setfilters]=useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minprice:0,
        maxprice:100
    });
    const[priceRange,setPRiceRange]=useState([0,100]);
      const navigate=useNavigate();
    const categories=["Top wear","Bottom wear"];
    const color=["Red","Black","Brown","Pink","Green","White","Blue","Beige","Navy"];
    const size=["XS","S","M","L","XL","XXL"];
    const material=["Cotton","Wool","Denim","Polyster","Silk","Linem","Fleece"]
    const brand=["Urban Threads","Modern Fit","StreetStyle","Beach Breeze","Fashionista","ChicStyle"];
    const gender=["Men","Women"];

    useEffect(()=>{
      const params=Object.fromEntries([...serachParams]);
      setfilters({
        category:params.category || "",
        gender:params.gender || "",
        color:params.color || "",
        size:params.size ? params.size.split(",") :[],
        material:params.material ? params.material.split(",") :[],
        brand:params.brand ? params.brand.split(",") :[],
        minprice:params.minprice || 0,
        maxprice:params.maxprice || 100,
      })

      setPRiceRange([0,params.maxprice || 100])
    },[serachParams]);

    const handleFilterChange=(e)=>{
      const {name,value,checked,type}=e.target;
      let newFilter={...filters};
      if(type==="checkbox"){
        if(checked){
          newFilter[name]=[...(newFilter[name] || []),value];
        }
        else{
          newFilter[name]=newFilter[name].filter((item)=>item !== value)
        }
      }
       else{
          newFilter[name]=value;
        }
        setfilters(newFilter);
        updateURLParams(newFilter);
            console.log({name,value,checked,type});
    }

    const updateURLParams=(newFilter)=>{
      const params=new URLSearchParams();
      Object.keys(newFilter).forEach((key)=>{
        if(Array.isArray(newFilter[key]) && newFilter[key].length>0){
          params.set(key, newFilter[key].join(","));
        }
        else if(newFilter[key]){
          params.set(key,newFilter[key]);
        }
      })
      setserachParams(params);
      // navigate(`?${params.toString()}`)
    }

    const handlePricechange = (e) => {

    const newPrice = Number(e.target.value);

    setPRiceRange([0, newPrice]);

    const newFilter = {
        ...filters,
        minprice: 0,
        maxprice: newPrice
    };

    setfilters(newFilter);

    updateURLParams(newFilter);
};
  return (
    <>
    <div className='p-4'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
       
       {/* category filter */}
       <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Category</label>
        {
          categories.map((category)=>(
            <div key={category} className='flex items-center mb-1'>
              <input type="radio" name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category ===category}
               className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{category}</span>
              </div>
          ))
        }

       </div>
        {/* gender filter */}
       <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Gender</label>
        {
          gender.map((gen)=>(
            <div key={gen} className='flex items-center mb-1'>
              <input type="radio" name="gender"
              value={gen}
              onChange={handleFilterChange}
               checked={filters.gender === gen}
               className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{gen}</span>
              </div>
          ))
        }
       </div>

       {/* color section */}
       <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
          {
            color.map((colors)=>(
              <button key={colors}
              name="color"
              value={colors}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer
              hover:scale-105  ${filters.color ===colors ? "ring-3 ring-blue-500 border-gray-300" :""}`} style={{background:colors.toLocaleLowerCase()}}></button>
            ))
          }

        </div>
       </div>

       {/*size filter */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {
          size.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="size"
              value={val}
              onChange={handleFilterChange}
               checked={filters.size.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }
      </div>

       {/*material filter */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {
          material.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="material"
              value={val}
              onChange={handleFilterChange}
              checked={filters.material.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }

      </div>

       {/*brand filter */}
      <div className='mb-6'>
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {
          brand.map((val)=>(
            <div key={val} className='flex items-center mb-1'>
              <input type="checkbox" name="brand"
              value={val}
              onChange={handleFilterChange}
              checked={filters.brand.includes(val)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{val}</span>
              </div>
          ))
        }

      </div>
      {/* price range */}
      <div className='mb-8'>
        <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
        <input type="range" name="priceRange" min={0} max={100}
        value={priceRange[1]}
        onChange={handlePricechange}
        className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$0</span>
          <span>${priceRange[1]}</span>

        </div>


      </div>

    </div>
    </>
  )
}

export default FilterSidebar