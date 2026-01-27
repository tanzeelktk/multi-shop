import { Check, LucideTruck, Phone, Repeat, RotateCcw, Truck, TruckIcon } from 'lucide-react'
import React from 'react'

const FeatureSection = () => {
  return (
    <section className='w-full my-15 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        <div className='flex px-8 py-6 gap-4 items-center justify-center bg-white'>
            <Check size={40} strokeWidth={4}  className='text-[#ffd333]'/>
            <h1 className='text-2xl font-semibold text-[#3d464d]'>Quality Product</h1>
        </div>
         <div className='flex px-8 py-6 gap-4 items-center justify-center bg-white'>
            <Truck size={40} strokeWidth={4}  className='text-[#ffd333]'/>
            <h1 className='text-2xl font-semibold text-[#3d464d]'>Free Shipping</h1>
        </div>
         <div className='flex px-8 py-6 gap-4 items-center justify-center bg-white'>
            <Repeat size={40} strokeWidth={4}  className='text-[#ffd333]'/>
            <h1 className='text-2xl font-semibold text-[#3d464d]'>14-Day Return</h1>
        </div>
         <div className='flex px-8 py-6 gap-4 items-center justify-center bg-white'>
            <Phone size={40} strokeWidth={4}  className='text-[#ffd333]'/>
            <h1 className='text-2xl font-semibold text-[#3d464d]'>24/7 Support</h1>
        </div>
    </section>
  )
}

export default FeatureSection