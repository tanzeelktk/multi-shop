import { Menu, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=' w-full py-5 px-5 bg-[#3d464d]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-white'>Multi Shop</h1>
                {
                    isOpen ? <X className='w-6 h-6 text-white mt-2' onClick={() => setIsOpen(!isOpen)} />
                        :
                        <Menu className='w-6 h-6 text-white mt-2' onClick={() => setIsOpen(!isOpen)} />
                }

            </div>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
                <nav className={`flex flex-col text-left text-white gap-4 w-full py-5 px-5 bg-[#3d464d] `}>
                    <Link to="/" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Home</Link>
                    <Link to="/shop" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Shop</Link>
                    <Link to="/about" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>About</Link>
                    <Link to="/contact" className='hover:text-[#ffc800] hover:cursor-pointer font-semibold'>Contact</Link>
                </nav>
            </div>


        </div>
    )
}

export default MobileHeader