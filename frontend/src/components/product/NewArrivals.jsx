import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import {Link} from 'react-router-dom'
const NewArrivals = () => {
    const scrollRef=useRef(null);
    const[isDraging,setisDraging]=useState(false);
    const[startX,setstartX]=useState(0);
    const[scrollleft,setscrollleft]=useState(false);
    const[canscrollright,setcanscrollright]=useState(false);
    const[canscrollleft,setcanscrollleft]=useState(false);

    const [newArrivals,setnewArrivals]=useState([]);

    useEffect(()=>{
        const fetchNewArrivals=async()=>{
            try{
                console.log("backend utl :", import.meta.env.VITE_BACKEND_URL)
                const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
            //      console.log("FULL RESPONSE:", response);
            // console.log("RESPONSE DATA:", response.data);
            // console.log("PRODUCTS:", response.data?.products);
                setnewArrivals(
                    Array.isArray(response.data) ? response.data :  []
                );
            }
            catch(error){
                console.log(error);
            }
        }
        fetchNewArrivals();
    },[]);
    const scroll=(direction)=>{
        const scrollamount=direction ==="left" ? -300:300;
        scrollRef.current.scrollBy({left:scrollamount,behaviour:'smooth'})
    }
    const updateScollButtons=()=>{
        const container=scrollRef.current;

        if(container){
         const leftscroll=container.scrollLeft;
         const rightscroll=container.scrollWidth+container.clientWidth;
             setcanscrollleft(leftscroll>0)
             setcanscrollright(rightscroll);
        }
        console.log({
            scrollLeft:container.current,
            clientWidth:container.clientWidth,
            containerScrollWidth:container.containerScrollWidth,

        })
    }
    useEffect(()=>{
        const container =scrollRef.current;
        if(container){
            container.addEventListener("scroll",updateScollButtons);
            updateScollButtons();

            return ()=>container.removeEventListener("scroll",updateScollButtons);
        }
    },[newArrivals])

    const handlemouseDown=(e)=>{
        setisDraging(true);
        setstartX(e.pageX-scrollRef.current.offsetLeft);
        setscrollleft(scrollRef.current.scrollLeft);
    }
    const handlemouseMove=(e)=>{
        if(!isDraging) return ;
        const x=e.pageX-scrollRef.current.offsetLeft;
        const walk=x-startX;
        scrollRef.current.scrollLeft=scrollleft-walk;
    }
    const handlemouseLeave=(e)=>{
        setisDraging(false);
    }
  return (
    <>
    <section className='py-16 px-6 lg:px-0'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-12'>Explore New Arrivals</h2>
            <p className='text-lg text-gray-700 mb-8'>
                Discover the latest styles Straight off the runway, freshly, added to keep your wardrobe on the cutting edge of fashion
            </p>
            {/* scroll button */}
            <div 
            className='absolute right-0 bottom-[-30px] flex space-x-2'>
                <button  onClick={()=>scroll("left")} disabled={!canscrollleft}   
                className={`p-2 rounded borde ${canscrollleft ? "text-black bg-white":"bg-gray-200 text-gray-400 cursor-not-allowed"} `}>
                    <FiChevronLeft className='text-sm '/>
                </button>
                <button onClick={()=>scroll("right")} disabled={!canscrollright}
                className={`p-2 rounded borde ${canscrollright ? "text-black bg-white":"bg-gray-200 text-gray-400 cursor-not-allowed"} `}>
                    <FiChevronRight className='text-sm '/>
                </button>
            </div>
        </div>

        {/* scroll content */}
        <div  onMouseDown={handlemouseDown}
             onMouseMove={handlemouseMove}
             onMouseLeave={handlemouseLeave}
             onMouseUp={handlemouseLeave}
         ref={scrollRef} className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDraging ? "cursor-grabbing":"cursor-grab"}`}>
            {
                newArrivals.map((product)=>(
                    <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url} alt={product.images[0]?.alt} 
                        className='w-full h-[400px] object-cover rounded-lg'
                        draggable='false'/>
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white'>
                            <Link to={`/product/${product._id}`} className='block'></Link>
                            <h4 className='font-medium'>{product.name}</h4>
                            <p className='mt-1 '>${product.price}</p>
                        </div>
                        </div>
                        
                ))
            }
        </div>
    </section>
    </>
  )
}

export default NewArrivals