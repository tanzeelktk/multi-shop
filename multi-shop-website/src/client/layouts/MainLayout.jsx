import React from 'react'
import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const MainLayout = () => {
  return (
    <div className='w-full flex flex-col items-center gap-20 bg-[#f5f5f5]'>
      <Header />
      <Outlet />
      <Footer/>
    </div>

  )
}

export default MainLayout