import React from 'react'
import Hero from './Hero'
import GenderCollection from '../components/product/GenderCollection'
import NewArrivals from '../components/product/NewArrivals'
import ProductDetails from '../components/product/ProductDetails'
import ProductGrid from '../components/product/ProductGrid'
import FeatureCollections from '../components/product/FeatureCollections'
import FeatureSection from '../components/product/FeatureSection'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchProductByFilters } from '../slice/productsSlice'
import axios from 'axios'

const Home = () => {
  const dispatch= useDispatch();
  const{products,loading,error}=useSelector((state)=>state.products);
  const[bestSellerProduct,setbestSellerProduct]=useState(null);

  useEffect(()=>{
    dispatch(fetchProductByFilters({
        gender:"Women",
        category:"Top Wear",
        limit:4,
    }));
    const fetchBestSeller=async()=>{
        try{
            const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
            setbestSellerProduct(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    fetchBestSeller();
  },[dispatch])
  return (
    <>
   <div>
     <Hero/>
     <GenderCollection/>
     <NewArrivals/>

{/* best seller section */}
     <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
     {
        bestSellerProduct ? (<ProductDetails product={bestSellerProduct}/>)
        :(
            <p className='text-center'>Loading best seller products...</p>
        )
     }
     <div className='container mx-auto'>
      <h2 className='text-3xl text-center font-bold mb-4'>Top wears for women</h2>
      <ProductGrid products={products} loading={loading} error={error}/>
      </div>

      <FeatureCollections/>
      <FeatureSection/>
   </div>
    </>
  )
}

export default Home