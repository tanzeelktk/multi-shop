import React from 'react'

const Checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const subTotal = cart.reduce((total, item) => total + (item.finalPrice * item.qty), 0)
    const shipping = cart.length > 0 ? 10 : 0
    const total = subTotal + shipping

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
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>First Name</label>
                                <input type='text' placeholder='Jhon' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Last Name</label>
                                <input type='text' placeholder='Doe' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>E-mail</label>
                                <input type='email' placeholder='example@email.com' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Mobile No</label>
                                <input type='text' placeholder='+1234567890' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Address Line 1</label>
                                <input type='text' placeholder='123 Street' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Address Line 2</label>
                                <input type='text' placeholder='123 Street' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Country</label>
                                <select className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' >
                                    <option>United States</option>
                                    <option>India</option>
                                    <option>Canada</option>
                                    <option>UK</option>
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>City</label>
                                <input type='text' placeholder='New York' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                        </div>
                        <div className='flex gap-10 items-center justify-center'>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>State</label>
                                <input type='text' placeholder='New York' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
                            </div>
                            <div className='w-full flex flex-col gap-2 items-start'>
                                <label>Zip Code</label>
                                <input type='text' placeholder='123' className='border border-gray-300 w-full py-1 px-3 focus:outline-none focus:border-orange-300' />
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
                                <button className='text-[#3d464d] py-4 w-full font-semibold
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