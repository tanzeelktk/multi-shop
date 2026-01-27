import React, { useState } from 'react'
import Reviews from './Reviews'

const ProductDescription = ({description, reviews, productName}) => {
    const [active, setActive] = useState("desc")
    return (
        <div className='w-full flex flex-col gap-5 p-5 bg-white'>
            <div className='flex flex-col '>
                <div className='flex items-start gap-5 text-[#3d464d]'>
                    <button className={`text-[20px] p-2 ${active === "desc" ? "bg-gray-200 border-gray-200 border-t border-l border-r" : ""}`} onClick={() => setActive("desc")}>Description</button>
                    <button className={`text-[20px] p-2 ${active === "rev" ? "bg-gray-200 border-gray-200 border-t border-l border-r" : ""}`} onClick={() => setActive("rev")}>Reviewes ({reviews.length})</button>
                </div>
                <hr className='text-gray-200' />
            </div>
            <div className='w-full '>
                {active === "desc" ?
                    <div className='transition-all duration-300 flex flex-col items-start text-[#3d464d]'>
                        <p>Description</p>
                        <p className='text-sm'>{description}</p>
                    </div>
                    :
                    <Reviews reviews={reviews} productName={productName}/>
                }
            </div>

        </div>
    )
}

export default ProductDescription