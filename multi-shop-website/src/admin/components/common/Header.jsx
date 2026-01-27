import { BellIcon, ChevronDown, Menu, Power, Search, Settings, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { TextInput, Dropdown } from 'flowbite-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <header className="">
      <div className="flex justify-between items-center px-4 md:px-6 py-3">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Search - hide on small screens */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-md bg-white px-3 py-1 shadow-sm">
            <TextInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent focus:ring-0 focus:outline-none border-none text-sm w-48"
            />
            <Search color="gray" size={18} className="ml-2" />
          </div>

          {/* Mobile Search Icon */}
          <Search
            size={20}
            className="md:hidden text-gray-600 cursor-pointer"
          />

          {/* Notifications */}
          <div className="relative">
            <BellIcon size={20} className="cursor-pointer text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-semibold">
              0
            </span>
          </div>

          <div className='flex gap-2 relative'>
            <div className='relative w-7 h-7 rounded-full bg-amber-200'>
              <img src={user.image} className='w-full h-full object-contain rounded-full' />
            </div>
            <button onClick={() => setOpenDropDown(!openDropDown)}>
              <ChevronDown size={15} className={`${openDropDown ? "rotate-180" : ""} transition-all duration-300`} />
            </button>
            <div className={`
                    absolute top-7 right-1
                    flex flex-col gap-1
                    bg-white rounded-md shadow-lg
                    overflow-hidden transition-all duration-300 z-50 p-2
                    ${openDropDown ? "w-48 opacity-100 scale-100" : "w-0 opacity-0 scale-95 pointer-events-none"}
                  `}>
              <button className='flex items-center gap-1'><User size={15} />Profile</button>
              <button className='flex items-center gap-1'><Settings size={15} />Settings</button>
              <hr className='w-full text-gray-300' />
              <button className='flex items-center gap-1'
                onClick={handleLogout}
              ><Power size={15} />Logout</button>
            </div>
          </div>


        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex gap-5 md:hidden px-4 pb-3">
        {/* Mobile menu button */}
        <button
          className=""
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {
            mobileMenuOpen ? <X size={22} /> : <Menu size={22} />
          }

        </button>
        <TextInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
    </header>
  );
};

export default Header;
