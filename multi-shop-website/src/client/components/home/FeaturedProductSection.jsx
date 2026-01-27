import React, { useEffect, useState } from 'react'
import ShowProducts from '../common/ShowProducts'
import Paginaton from '../common/Paginaton'

const FeaturedProductSection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])

    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastItem = itemsPerPage * currentPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = featuredProducts.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        getFeaturedProducts()
    }, [])

    async function getFeaturedProducts() {
        try {
            const res = await fetch('/jsondata/products.json')
            if (!res.ok) throw new Error("Failed to get products")
            const data = await res.json()
            const productArray = data.filter((item)=>item.featured === true)
            console.log(productArray)
            setFeaturedProducts(productArray)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <section className="w-full flex flex-col gap-10">
            <div className="flex items-center gap-3 relative w-full">
                <h1 className="text-[#3d464d] bg-[#f5f5f5] text-3xl font-semibold py-2 px-5 leading-none z-10">
                    FEATURED PRODUCTS
                </h1>
                <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-400 transform -translate-y-1/2 z-0"></span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    currentItems.map((product,index)=>{
                        return(
                                <ShowProducts product={product} key={index}/>
                        )
                    })
                }
            </div>
            <div>
                <Paginaton products={featuredProducts.length} setCurrentPage={setCurrentPage} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
            </div>
            
        </section>
    )
}

export default FeaturedProductSection