import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts, } from '../../slice/productsSlice';
import { addToCart } from '../../slice/cartSlice';
const ProductDetails = ({ product }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProducts, loading, error, similarProducts } =
        useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainimage, setmainimage] = useState(null);
    const [selectedsize, setselectedsize] = useState("");
    const [selectedcolor, setselectedcolor] = useState("");
    const [quantity, setquantity] = useState(1);
    const [isButtondisbale, setbtndisable] = useState(false);

    const productFetchId = product?._id || id;
    const currentProduct = product || selectedProducts;
    useEffect(() => {
        if (productFetchId) {
            if (!product) {
                dispatch(fetchProductDetails(productFetchId));
            }

            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);
    useEffect(() => {

        if (currentProduct?.images?.length > 0) {
            setmainimage(currentProduct.images[0].url);
        }

    }, [currentProduct]);


    const handleQuantitychange = (action) => {
        if (action === "plus") {
            setquantity((prev) => prev + 1);
        }
        if (action === "minus" && quantity > 1) {
            setquantity((prev) => prev - 1);
        }
    }

    const handleaddtocart = () => {
        if (!selectedsize || !selectedcolor) {
            toast.error("Please select size or color before add to cart", {
                duration: 1000,
            });
            return;
        }
        setbtndisable(true);
        dispatch(addToCart({
            productId: productFetchId,
            quantity,
            size: selectedsize,
            color: selectedcolor,
            guestId,
            userId: user?._id,
        }))
            .then(() => {
                toast.success("Products added to cart", {
                    duration: 1000,
                })
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add product to cart");
            })
            .finally(() => {
                setbtndisable(false);
            })
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error:{error}</p>
    }
    return (

        <>
            <div className='p-6'>
                {currentProduct && (
                    <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                        <div className='flex flex-col md:flex-row'>
                            {/* left thumbnails */}
                            <div className='hidden md:flex flex-col space-y-4 mr-6'>
                                {
                                    currentProduct.images.map((image, index) => (
                                        <img key={index}
                                            onClick={() => setmainimage(image.url)}
                                            src={image.url} alt="images"
                                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimage === image.url ? "border-black" : "border-gray-300"}`} />

                                    ))
                                }
                            </div>
                            {/* main image */}
                            <div className='md:w-1/2'>
                                <div className='mb-4'>
                                    <img src={mainimage} alt="product image"
                                        className="w-full h-auto object-cover rounded-lg" />
                                </div>
                            </div>
                            {/* mobile thumbnail */}
                            <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                                {
                                    currentProduct.images.map((image, index) => (
                                        <img key={index}
                                            src={image.url} alt="images"
                                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimage === image.url ? "border-black" : "border-gray-300"}`}
                                            onClick={() => setmainimage(image.url)} />

                                    ))
                                }

                            </div>
                            {/* right section */}
                            <div className='md:w-1/2 md:ml-10'>
                                <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{currentProduct.name}</h1>
                                <p className='text-lg text-gray-600 mb-1 line-through'>$
                                    {currentProduct.originalprice && `${currentProduct.originalprice}`}
                                </p>
                                <p className='text-xl mb-2 text-gray-500'>${currentProduct.price}</p>
                                <p className='text-gray-600 mb-4'>{currentProduct.description}</p>
                                <div className='mb-4'>
                                    <p className='text-gray-900'>Color:</p>
                                    <div className='flex gap-2 mt-2'>
                                        {
                                            currentProduct.colors.map((color) => (
                                                <button key={color}
                                                    onClick={() => setselectedcolor(color)}
                                                    className={`w-8 h-8 rounded-full border ${selectedcolor === color ? "border-4 border-black" : "border-gray-300"}`}
                                                    style={{ backgroundColor: color.toLocaleUpperCase(), filter: "brightness(0.5)" }}>

                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <p className='text-gray-900'>Sizes:</p>
                                    <div className='flex gap-2 mt-2'>
                                        {
                                            currentProduct.sizes.map((size) => (
                                                <button key={size}
                                                    onClick={() => setselectedsize(size)}
                                                    className={`px-4 py-2rounded border ${selectedsize === size ? "bg-black text-white" : ""}`}>{size}
                                                </button>
                                            ))
                                        }
                                    </div>

                                </div>
                                {/* quantity */}
                                <div className='mb-6' >
                                    <p className='text-gray-700'>Quantity:</p>
                                    <div className='flex items-center space-x-4 mt-2'>
                                        <button className='px-2 py-1 bg-gray-300 rounded text-lg'
                                            onClick={() => handleQuantitychange("minus")}>-</button>
                                        <span className='text-lg'>{quantity}</span>
                                        <button className='px-2 py-1 bg-gray-300 rounded text-lg'
                                            onClick={() => handleQuantitychange("plus")}>+</button>
                                    </div>
                                </div>

                                {/* add to cart btn */}
                                <button
                                    disabled={isButtondisbale}
                                    onClick={handleaddtocart}
                                    className={`bg-black text-white font-bold py-2 px-6 rounded w-full mb-4 mt-4
                    ${isButtondisbale ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
                                >{isButtondisbale ? "ADDING...." : "ADD TO CART"}</button>

                                <div className='mt-10 text-gray-700'>
                                    <h3 className='text-xl font-bold mb-4'>Characterisitices:</h3>
                                    <table className='w-full text-left text-sm text-gray-600'>
                                        <tbody>
                                            <tr>
                                                <td className='py-1'>Brand</td>
                                                <td className='py-1'>{currentProduct.brand}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1'>Material</td>
                                                <td className='py-1'>{currentProduct.material}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className='mt-20'>
                            <h2 className='text-2xl text-center font-medium mb-4'>You may also like</h2>
                            <ProductGrid products={similarProducts || []} error={error} loading={loading} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductDetails