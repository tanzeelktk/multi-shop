import React, { useEffect, useState } from 'react'
import ShowProducts from '../components/common/ShowProducts'
import Paginaton from '../components/common/Paginaton';
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const API_URL = import.meta.env.VITE_API_URL
  const limit = 9;
 
  useEffect(() => {
    getProducts()
  }, [page])
  async function getProducts() {
    try {
      const res = await axios.get(`${API_URL}/api/product/all-products?page=${page}&limit=${limit}`)
      setProducts(res.data.products)
      setTotalPages(res.data.pagination.totalPages)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='w-[90%]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-semibold text-[#3d464d] text-left'>FILTER BY PRICE</p>
            <div className=' flex flex-col gap-2 bg-[#3d464d] text-white p-5'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>All Prices</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>1000</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$0 - $100</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>200</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$101 - $200</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>150</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-semibold text-[#3d464d] text-left'>FILTER BY COLOR</p>
            <div className=' flex flex-col gap-2 bg-[#3d464d] text-white p-5'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>All Prices</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>1000</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$0 - $100</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>200</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$101 - $200</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>150</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-2xl font-semibold text-[#3d464d] text-left'>FILTER BY Size</p>
            <div className=' flex flex-col gap-2 bg-[#3d464d] text-white p-5'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>All Prices</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>1000</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$0 - $100</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>200</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'><input type='checkbox' /><p>$101 - $200</p></div>
                <div className='p-1 border border-gray-300 text-[12px]'>150</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-3 pt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              products.map((product, index) => {
                return (

                  <ShowProducts product={product} key={index} />
                )
              })
            }
          </div>
          <div className="flex gap-2 justify-center items-center mt-4 flex-wrap">

            {/* Previous Button */}
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`flex items-center px-3 py-1 rounded-md border border-gray-300 
          ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition`}
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 rounded-md border transition
            ${page === index + 1
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'} `}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`flex items-center px-3 py-1 rounded-md border border-gray-300 
          ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition`}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Shop