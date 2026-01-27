import React, { useEffect, useState } from 'react'

const CategoriesSection = () => {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getCategories()
    },[])
    async function getCategories(){
        try {
            const res = await fetch("/jsondata/categories.json")
            if (!res.ok) throw new Error("Failed to get categories.")
            setCategories(await res.json())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="w-full">
            <div className="flex items-center gap-3 relative w-full">
                <h1 className="text-[#3d464d] bg-[#f5f5f5] text-3xl font-semibold py-2 px-5 leading-none z-10">
                    Categories
                </h1>
                <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-400 transform -translate-y-1/2 z-0"></span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>
                {
                    categories.map((category, index) => {
                        return (
                            <div className='flex p-5 gap-5  bg-white  shadow-xl hover:scale-105
                             transition-transform duration-300 hover:cursor-pointer' key={index}>
                                <img src={category.image} className='w-20 h-20' />
                                <div className='flex flex-col gap-3 text-[#3d464d]'>
                                    <p className='text-xl font-semibold'>{category.title}</p>
                                    <p>{category.count} Products</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>

    )
}

export default CategoriesSection
