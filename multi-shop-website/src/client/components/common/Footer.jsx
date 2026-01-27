import { LocateIcon, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe } from "react-icons/fa";

const Footer = () => {
    return (
        <section className='w-full bg-[#3d464d] flex items-center justify-center py-20'>
            <div className='w-[90%] flex flex-col gap-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
                    <div className='text-white flex flex-col items-start gap-4'>
                        <p className='text-xl font-semibold'>GET IN TOUCH</p>
                        <p className='text-left'>Looking for professional services? <br />Reach out to us and let’s grow together.</p>
                        <div className='flex gap-2 items-center justify-center'><MapPin size={20} className='text-[#ffd333]' /> <p>123 Street, New York, USA</p></div>
                        <div className='flex gap-2 items-center justify-center'><Mail size={20} className='text-[#ffd333]' /><p>tanzeelktk123@gmail.com</p></div>
                        <div className='flex gap-2 items-center justify-center'><Phone size={20} className='text-[#ffd333]' /><p>+923123274630</p></div>
                    </div>
                    <div className='flex flex-col gap-4 items-start text-white'>
                        <p className='text-xl font-semibold'>QUICK SHOP</p>
                        <div className='flex flex-col gap-1 items-start'>
                            <Link >Home</Link>
                            <Link>Our Shop</Link>
                            <Link>Shop Detail</Link>
                            <Link>Shopping Cart</Link>
                            <Link>Checkout</Link>
                            <Link>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 items-start text-white'>
                        <p className='text-xl font-semibold'>MY ACCOUNT</p>
                        <div className='flex flex-col gap-1 items-start'>
                            <Link>Home</Link>
                            <Link>Our Shop</Link>
                            <Link>Shop Detail</Link>
                            <Link>Shopping Cart</Link>
                            <Link>Checkout</Link>
                            <Link>Contact Us</Link>
                        </div>
                    </div>
                    <div className='text-white flex flex-col items-start gap-4'>
                        <p className='text-xl font-semibold'>NEWSLETTER</p>
                        <p className='text-left'>Get fresh updates straight to your inbox.
                            Subscribe now and never miss out!</p>
                        <div className='bg-white flex w-auto'>
                            <input placeholder='Enter Your Email' className='text-black p-2 focus:outline-none' />
                            <button className='text-[#3d464d] py-2 px-4 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Sign Up</button>
                        </div>
                        <div className='text-xl font-semibold'>FOLLOW US ON</div>
                        <div className='flex gap-4'>
                            <div className='social-icon'><FaFacebookF /></div>
                            <div className='social-icon'><FaTwitter  /></div>
                            <div className='social-icon'><FaLinkedin /></div>
                            <div className='social-icon'><FaInstagram /></div>
                        </div>
                    </div>
                </div>
                <hr className='text-gray-600' />
                <div className='flex flex-col md:flex-row justify-between items-center gap-5'>
                    <p className='text-white'>© Domain. All Rights Reserved. Designed by HTML Codex
                        Distributed By: ThemeWagon</p>

                    <div className="flex gap-4 text-4xl text-[#ffd333]">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                        <FaCcStripe />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Footer