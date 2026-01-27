import { MapIcon, PinIcon } from 'lucide-react'
import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <section className='w-[90%] flex flex-col gap-5'>
      <div className='relative  flex items-center gap- text-[#3d464d]'>
        <p className='text-3xl font-bold bg-[#f5f5f5] z-10 pr-4 py-2 '>CONTACT US </p>
        <div className='absolute border-t border-dashed w-full z-0'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 '>
        <div className='col-span-2 bg-white p-10 flex flex-col gap-5'>
          <input type="text" placeholder='Your Name' className='focus:outline-none border border-gray-300 focus:border-blue-300 px-4 py-2' />
          <input type="text" placeholder='Your Email' className='focus:outline-none border border-gray-300 focus:border-blue-300 px-4 py-2' />
          <input type="text" placeholder='Subject' className='focus:outline-none border border-gray-300 focus:border-blue-300 px-4 py-2' />
          <textarea placeholder='Your Message' className='focus:outline-none border border-gray-300 focus:border-blue-300 px-4 py-2 h-50' />
          <button className='text-[#3d464d] w-40 px-3 py-2 text-[16px] font-semibold 
                                     bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Send Message</button>
        </div>
        <div>
          <div></div>
          <div className='flex flex-col items-start justify-center gap-4 bg-white p-5'>
            <div className='flex gap-2 items-center justify-center'><MapPin size={20} className='text-[#ffd333]' /> <p>123 Street, New York, USA</p></div>
            <div className='flex gap-2 items-center justify-center'><Mail size={20} className='text-[#ffd333]' /><p>tanzeelktk123@gmail.com</p></div>
            <div className='flex gap-2 items-center justify-center'><Phone size={20} className='text-[#ffd333]' /><p>+923123274630</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact