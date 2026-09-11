import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Sortoption = () => {
  const[searchParams,setserachParams]=useSearchParams();

  const handleSortChange=(e)=>{
    const sortby=e.target.value;
    searchParams.set("sortBy",sortby);
    setserachParams(searchParams);
  }
  return (
    <div className='mb-3 flex items-center justify-end'>
      <select onChange={handleSortChange}
      id="sort" className='border p-1 rounded-md text-sm focus:outline-none'>
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High To Low</option>
        <option value="popularity">Popularity</option>
       
      </select>
    </div>
  )
}

export default Sortoption