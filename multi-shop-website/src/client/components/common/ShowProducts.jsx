import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext'
import Rating from '../Rating'

const ShowProducts = ({ product }) => {
    const { addToCart } = useContext(CartContext)
    const discountPrice = product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price
    const updatedProduct = { ...product, qty: 1, finalPrice: discountPrice }
    console.log(product)
    return (
        <div className=''>

            <Link to={`/product/${product.id}`} state={{ product }}>
                <div className={`group flex flex-col items-center justify-center bg-white pb-5  shadow-2xl `}>
                    <div className='w-50 h-50 relative p-5'>
                        <img src={product.mainImage}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />

                        <div className="absolute top-1/2 left-1/2 flex gap-3 -translate-x-1/2 transition-all duration-300 -translate-y-full opacity-0                                
                                group-hover:-translate-y-1/2 group-hover:opacity-100" >
                            <button className='p-2 border border-[#3d464d] hover:bg-[#3d464d] hover:text-[#ffc800] hover:cursor-pointer transition-colors duration-300'>
                                <FiHeart className='' />
                            </button>
                            <button onClick={(e) => { e.preventDefault(); addToCart(updatedProduct); }}
                                className='p-2 border border-[#3d464d] hover:bg-[#3d464d] hover:text-[#ffc800] hover:cursor-pointer transition-colors duration-300'>
                                <FiShoppingCart />
                            </button>
                        </div>


                    </div>
                    <div className='text-[#3d464d]'>
                        <h1 className='text-2xl font-semibold '>{product.title}</h1>
                        <p className='text-[14px] font-semibold'>
                            {
                                discountPrice < product.price ? (
                                    <>$ {discountPrice} <span className='line-through text-gray-500'>${product.price}</span></>
                                ) : (
                                    <>$ {product.price}</>
                                )
                            }


                        </p>
                        <p className='flex items-center justify-center'> <Rating rating={product.rating} /> ({product.rating})</p>
                    </div>
                </div>
            </Link >

        </div >
    )
}

export default ShowProducts