import React, { useContext, useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import Rating from '../Rating'
import { CartContext} from '../../context/CartContext'

const ProductDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext)
   

    const [qty, setQty] = useState(1)

    const discountPrice = product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price

    const handleAddToCart = () => {
        const productToAdd = {
            ...product, qty, finalPrice: discountPrice
        }
        addToCart(productToAdd)
    }

    return (
        <div className='flex flex-col gap-4 bg-white items-start p-10'>
            <h1 className='text-3xl font-bold text-[#3d464d]'>{product.title}</h1>
            <div className='flex gap-2 items-center justify-center'><Rating rating={product.rating} /> <p className='text-[#3d464d]'>({product.reviews.length} reviews)</p></div>
            <p className='text-[#3d464d]'>{product.description}</p>
            <p className='text-[#3d464d]'>Price : {product.price - (product.price / product.discount)}  <span className='line-through'>{product.price}</span></p>
            <div className='flex gap-5'>
                <div className='flex justify-center items-center text-[#3d464d]'>
                    <button className='p-2 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'
                        onClick={() => setQty(value => (value > 1 ? value - 1 : 1))}
                    ><Minus /></button>
                    <div className='py-2 px-4 bg-gray-200'>{qty}</div>
                    <button className='p-2 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'
                        onClick={() => setQty(value => value + 1)}
                    ><Plus /></button>
                </div>
                <button className='flex gap-2 py-2 px-4 text-[#3d464d] bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'
                onClick={handleAddToCart}
                ><ShoppingCart />Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductDetail