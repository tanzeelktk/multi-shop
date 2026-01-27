import React, { useEffect, useState } from 'react'
import ShowProducts from '../components/common/ShowProducts'
import Paginaton from '../components/common/Paginaton';

const Shop = () => {
  const [products, setProducts] = useState([])

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = itemsPerPage * currentPage 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  console.log(indexOfFirstItem, indexOfLastItem)
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    getProducts()
  }, [])
  async function getProducts(params) {
    try {
      const res = await fetch("/jsondata/products.json")
      if (!res.ok) throw new Error("Failed to get Products")
      setProducts(await res.json())
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
              currentItems.map((product, index) => {
                return (

                  <ShowProducts product={product} key={index}/>
                )
              })
            }
          </div>
          <div className='mt-10'>
              <Paginaton products={products.length} setCurrentPage={setCurrentPage} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
          </div>
            
        </div>
      </div>
    </section>
  )
}

export default Shop