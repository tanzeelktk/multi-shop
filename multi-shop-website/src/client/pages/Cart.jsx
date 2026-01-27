import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus} from 'lucide-react'
import { CartContext } from '../context/CartContext'

const Cart = () => {

    const { cart, updateQty, removeFromCart } = useContext(CartContext)
    const subTotal = cart.reduce((total, item) => total + (item.finalPrice * item.qty), 0)
    const shipping = cart.length > 0 ? 10 : 0
    const total = subTotal + shipping


    return (
        <section className='w-[90%]'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div className='col-span-2'>
                    <div className='grid gap-5'>
                        <div className='grid grid-cols-5 text-center text-[16px] font-bold bg-[#3d464d] py-2 text-white'>
                            <div>Products</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Total</div>
                            <div>Remove</div>
                        </div>
                        {cart.length === 0 ? <div className='text-center text-[#3d464d] py-10'>Your Cart is Empty</div> :
                            cart.map((product, index) => {
                                return (
                                    <div className='grid grid-cols-5 text-center items-center text-[16px] bg-white text-[#3d464d] py-2'>
                                        <div className='flex justify-center items-center'><img src={product.mainImage} alt="" className='w-10 h-10' />{product.title}</div>
                                        <div>${product.finalPrice}</div>
                                        <div className='flex justify-center items-center text-[#3d464d]'>
                                            <button className='p-1 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'
                                                onClick={() => updateQty(product.id, product.qty > 1 ? (product.qty - 1) : 1)}
                                            ><Minus size={20} strokeWidth={3} /></button>
                                            <div className='py-0.5 px-2 bg-gray-200'>{product.qty}</div>
                                            <button className='p-1 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'
                                                onClick={() => updateQty(product.id, product.qty + 1)}
                                            ><Plus size={20} strokeWidth={3} /></button>
                                        </div>
                                        <div>${product.finalPrice * product.qty}</div>
                                        <div><button className='p-1 bg-[#dc3545] hover:bg-[#c82333] rounded-sm hover:cursor-pointer'
                                            onClick={() => removeFromCart(product.id)}>
                                            <X size={15} color='white' strokeWidth={4} />
                                        </button></div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='bg-white flex justify-between w-auto'>
                        <input placeholder='Coupon Code' className='text-black py-2 px-4 focus:outline-none' />
                        <button className='text-[#3d464d] py-2 px-4
                         bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Apply Coupon</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='relative  flex items-center text-[#3d464d]'>
                            <p className='text-xl font-semibold bg-[#f5f5f5] z-10 pr-4 py-2 '>CART SUMMARY </p>
                            <div className='absolute border-t border-dashed w-full z-0'></div>
                        </div>
                        <div>
                            <div className='flex flex-col gap-4 bg-white py-8 px-6 text-[#3d464d]'>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-4 text-[16px] font-semibold'>
                                        <div className='flex items-center justify-between'>
                                            <p>Subtotal</p><p>${subTotal}</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <p>Shipping</p><p>${shipping}</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray-300' />
                                </div>
                                <div className='flex items-center justify-between text-xl font-semibold'>
                                    <p>Total</p><p>${total}</p>
                                </div>
                                <Link to='/checkout'>
                                    <button className='text-[#3d464d] w-full py-4 font-semibold
                                     bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Proceed To Checkout</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart