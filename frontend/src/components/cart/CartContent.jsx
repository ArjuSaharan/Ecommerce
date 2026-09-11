import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartitemQuantity } from '../../slice/cartSlice';
const CartContent = ({cart,userId,guestId}) => {
   const dispatch=useDispatch();
//    /hanlde add to cart cart or remove from cart
const handleAddTocart=(productId,delta,quantity,size,color)=>{
    const newQuantity=quantity+delta;
    if(newQuantity >=1){
        dispatch(updateCartitemQuantity({
            productId,quantity:newQuantity,
            guestId,
            userId,
            size,
            color,
        }))
    }
};

const handleRemoveToCart=(productId,size,color)=>{
    dispatch(removeFromCart({productId,guestId,userId,size,color}));
}
  return (
    <>
    {
        cart.products.map((product,index)=>(
            <div key={index} className='flex items-start justify-between py-4 border-b'>
                <div className='flex items-center'>
                    <img src={product.image} alt={product.name} className='w-24 h-25 object-cover mr-4 rounded'/>
                    <div>
                        <h3>{product.name}</h3>
                        <p className='text-sm text-gray-500'>size:{product.size} | color:{product.color}</p>
                        <div className='flex items-center mt-2'>
                            <button onClick={()=>handleAddTocart(product.productId,-1,product.quantity,
                                product.size,
                                product.color
                            )}
                             className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                            <span className='mx-4'>{product.quantity}</span>
                            <button onClick={()=>handleAddTocart(product.productId,1,
                                product.quantity,
                                product.size,
                                product.color
                            )}
                            className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                        </div>
                    </div>
                </div>
                <div className='pr-5'>
                    <p>${product.price.toLocaleString()}</p>
                    <button onClick={()=>handleRemoveToCart(product.productId,product.size,product.color)}
                    ><MdDelete className='h-6 w-6 nt-2 text-red-600'/></button>
                </div>
            </div>
        ))
    }
    </>
  )
}

export default CartContent




// filter on filesize of multer and type contraints that images type like pdf docs images
// file extension
