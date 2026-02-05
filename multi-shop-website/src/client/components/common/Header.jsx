import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Circle, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import MobileHeader from './MobileHeader'
import { CartContext } from '../../context/CartContext'
import { useState } from 'react'
import Signin from '../auth/Signin'
import Signup from '../auth/Signup'
import { useAuth } from '../../../admin/context/AuthContext'

const Header = () => {
  const { cart } = useContext(CartContext)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const { user, userLogout } = useAuth()


  return (
    <>
      <div className="w-full lg:hidden" >
        <MobileHeader />
      </div>
      <Signin openModal={openLoginModal} setOpenModal={setOpenLoginModal} setOpenSignupModal={setOpenSignupModal} />
      <Signup openModal={openSignupModal} setOpenModal={setOpenSignupModal} setOpenLoginModal={setOpenLoginModal} />
      <header className='hidden lg:block w-full py-5'>
        <div className='w-[90%] mx-auto flex mb-4 justify-between items-center'>
          <h1 className='text-3xl font-bold  bg-[#ffd333]'>Multi Shop</h1>
          <div className='flex items-center p-2 border border-gray-300 rounded-sm'>
            <input type="text" placeholder='Search here...' className='focus:outline-none' />
            <Search className='w-5 h-5 text-[#ffd333]' />
          </div>
          <p className='text-gray-400'>Cutomer Service <br /> +012 345 6789</p>
        </div>
        <div className='w-full mx-auto bg-[#3d464d]'>
          <div className='w-[90%] mx-auto flex justify-between items-center'>
            <div className='w-[50%] flex items-center gap-8'>
              <div className='w-[40%] flex items-center justify-between bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer gap-2 py-6 cursor-pointer px-5 '>
                <div className='flex gap-2 items-center'>
                  <Menu className='w-5 h-5 text-[#3d464d] font-semibold' />
                  <p className='text-[#3d464d] font-semibold'>Categories</p>
                </div>
                <ChevronDown className='w-5 h-5 text-[#3d464d] font-semibold' />
              </div>
              <nav className='w-[50%] flex justify-between items-center text-white'>
                <Link to="/" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Home</Link>
                <Link to="/shop" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Shop</Link>
                <Link to="/about" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>About</Link>
                <Link to="/contact" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Contact</Link>
              </nav>
            </div>
            <div className='flex gap-5 items-center py-5'>
              <div className='relative flex'>
                <Heart className='text-[#ffd333] fill-[#ffd333] hover:text-[#ffc800] hover:fill-[#ffc800] hover:cursor-pointer' />
                <span className="absolute -top-2 -right-2 
          bg-red-500 text-white text-xs 
          w-5 h-5 flex items-center justify-center 
          rounded-full">
                  0
                </span>
              </div>
              <Link to={'/cart'}>
                <div className='relative flex'>
                  <ShoppingCart className='text-[#ffd333] fill-[#ffd333] hover:text-[#ffc800] hover:fill-[#ffc800] hover:cursor-pointer' />
                  <span className="absolute -top-2 -right-2 
          bg-red-500 text-white text-xs 
          w-5 h-5 flex items-center justify-center 
          rounded-full">
                    {cart.length}
                  </span>
                </div>
              </Link>
              {
                user ? <div className='text-white'>
                  {user.name}
                  <button onClick={userLogout}>Logout</button>
                </div>
                  :
                  <button className='text-white border border-[#ffd333] hover:bg-[#ffd333] hover:cursor-pointer hover:text-[#3d464d]  py-2 px-5 transition-colors duration-300'
                    onClick={() => setOpenLoginModal(true)}>Login</button>
              }

            </div>
          </div>
        </div>

      </header>
    </>

  )
}

export default Header