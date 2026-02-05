import React, { useState } from 'react'
import { useAuth } from '../../admin/context/AuthContext'
import axios from 'axios'

const Checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const subTotal = cart.reduce((total, item) => total + (item.finalPrice * item.qty), 0)
    const shipping = cart.length > 0 ? 10 : 0
    const total = subTotal + shipping
    const API_URL = import.meta.env.VITE_API_URL

    const { user, userToken } = useAuth()

    const [paymentMethod, setPaymentMethod] = useState('cod')
    const products = cart.map((item) => {
        return {
            product: item._id,
            name: item.title,
            quantity: item.qty,
            price: item.finalPrice,
            image: item.images.find(image => image.main)?.filename,
        }
    })
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        country: '',
        city: '',
        postalCode: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setShippingAddress(prev => ({ ...prev, [name]: value }))
    }


    async function handlePlaceOrder() {
        if (!user) return alert("Please login")
        try {
            const res = await axios.post(`${API_URL}/api/orders/place-order`,
                { products, paymentMethod, shippingAddress, shippingPrice: shipping },
                { headers: { Authorization: `Bearer ${userToken}` } })
                alert("Order placed")
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <section className='w-[90%]'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/*Address section*/}
                <div className='col-span-2'>
                    <div className='relative  flex items-center text-[#3d464d]'>
                        <p className='text-xl font-semibold bg-[#f5f5f5] z-10 pr-4 py-2 '>BILLING ADDRESS </p>
                        <div className='absolute border-t border-dashed w-full z-0'></div>
                    </div>
                    <div className='bg-white py-10 px-5 flex flex-col gap-4 text-[#3d464d] text-[14px]'>
                        <div className='flex gap-10 items-center '>
                            <div className='w-full md:w-1/2 flex flex-col gap-2 items-start'>
                                <label htmlFor='name'>Full Name</label>
                                <input id='name'
                                    name='name'
                                    value={shippingAddress.name}
                                    onChange={(e) => handleChange(e)}
                                    type='text'
                                    placeholder='Jhon'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='email'>E-mail</label>
                                <input id='email'
                                    name='email'
                                    type='email'
                                    value={shippingAddress.email}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='example@email.com'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='mobile'>Mobile No</label>
                                <input id='mobile'
                                    name='mobile'
                                    type='text'
                                    value={shippingAddress.mobile}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='+1234567890'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='address'>Address </label>
                                <input id='address'
                                    name='address'
                                    type='text'
                                    value={shippingAddress.address}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='123 Street'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='country'>Country</label>
                                <select id='country'
                                    name='country'
                                    value={shippingAddress.country}
                                    onChange={(e) => handleChange(e)}
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' >
                                    <option value={''}>Select Country</option>
                                    <option value={"United States"}>United States</option>
                                    <option value={"India"}>India</option>
                                    <option value={"Pakistan"}>Pakistan</option>
                                    <option value={"Bangladesh"}>Bangladesh</option>
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='city'>City</label>
                                <input id='city'
                                    name='city'
                                    type='text'
                                    value={shippingAddress.city}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='New York'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label htmlFor='postalCode'>Postal Code</label>
                                <input id='postalCode'
                                    name='postalCode'
                                    type='text'
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='123'
                                    className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start gap-3'>
                            <div className='flex items-center justify-center gap-2'><input type='checkbox' /><label>Create an account</label></div>
                            <div className='flex items-center justify-center gap-2'><input type='checkbox' /><label>Ship to different address</label></div>
                        </div>
                    </div>
                </div>

                {/*Total amount section*/}
                <div className='col-span-1 flex flex-col gap-10'>
                    <div>
                        <div className='relative  flex items-center text-[#3d464d]'>
                            <p className='text-xl font-semibold bg-[#f5f5f5] z-10 pr-4 py-2 '>ORDER TOTAL </p>
                            <div className='absolute border-t border-dashed w-full z-0'></div>
                        </div>
                        <div className='bg-white text-[#3d464d] flex flex-col gap-3 py-10 px-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-left font-semibold'>Products</p>
                                {
                                    cart.map((item, index) => {
                                        return (
                                            <div className='text-gray-500 flex justify-between' key={index}><p>{item.title}</p><p>${item.finalPrice * item.qty}</p></div>
                                        )
                                    })
                                }


                            </div>
                            <hr className='w-full text-gray-400' />
                            <div className='flex flex-col gap-4 text-[15px] font-semibold'>
                                <div className='flex justify-between'><p>Subtotal</p><p>${subTotal}</p></div>
                                <div className='flex justify-between'><p>Shipping</p><p>${shipping}</p></div>
                            </div>
                            <hr className='w-full text-gray-400 text-2xl font-semibold' />
                            <div className='flex justify-between font-semibold'><p>Total</p><p>${total}</p></div>
                        </div>
                    </div>
                    <div>
                        <div className='relative  flex items-center text-[#3d464d]'>
                            <p className='text-xl font-semibold bg-[#f5f5f5] z-10 pr-4 py-2 '>PAYMENT </p>
                            <div className='absolute border-t border-dashed w-full z-0'></div>
                        </div>
                        <div className='bg-white text-[#3d464d] flex flex-col gap-5 py-10 px-5'>
                            <div className='flex flex-col items-start gap-2'>
                                <div className='flex items-center gap-2'><input type="radio" name="payment" />Paypal</div>
                                <div className='flex items-center gap-2'><input type="radio" name="payment" />Credit Card</div>
                                <div className='flex items-center gap-2'><input type="radio" name="payment" />Cash on Delivery</div>
                            </div>
                            <div>
                                <button onClick={handlePlaceOrder}
                                    className='text-[#3d464d] py-4 w-full font-semibold
                         bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>



        </section>
    )
}

export default Checkout