import React from 'react'
import Rating from '../Rating'
import { Star } from 'lucide-react'

const Reviews = ({ reviews, productName }) => {
    return (
        <section className='w-full grid grid-cols-2'>

            {/*All reviews will be shown here*/}
            <div className='flex flex-col gap-10'>
                <div className='flex items-start text-2xl font-bold text-[#3d464d]'>{reviews.length} Reviewe for {productName}</div>
                <div className='flex flex-col gap-10'>
                    {
                        reviews.map((rev, index) => {
                            return (
                                <div className='flex gap-5 items-start'>
                                    <div>Picture</div>
                                    <div className='flex flex-col items-start gap-2'>
                                        <p className='text-xl font-semibold text-[#3d464d]'>{rev.user}</p>
                                        <Rating rating={rev.rating} />
                                        <p className='text-[#3d464d]'>{rev.comment}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/*User can give riviewe here*/}
            <div className='w-full flex flex-col items-start gap-4'>
                <p className='text-2xl font-semibold text-[#3d464d]'>Leave a reviewe</p>
                <p className='text-sm text-[#3d464d]'>Your email address will not be published. Required fields are marked *</p>
                <div className='flex gap-1 items-center justify-center'> <p className='text-[#3d464d]'>Your Rating* :</p>
                    {
                        [1, 2, 3, 4, 5].map((num, index) => {
                            return (<div className='text-amber-300' key={index}><Star size={20} /></div>)
                        })
                    }
                </div>
                <div className='w-full flex flex-col gap-2 items-start'>
                    <p className='text-[#3d464d] text-left'>Your Review *</p>
                    <textarea className='w-full focus:outline-none p-2 border border-gray-300 focus:border-orange-400 rounded-sm h-30' />
                </div>
                <div className='w-full flex flex-col gap-2 items-start'>
                    <p className='text-[#3d464d] text-left'>Your Name *</p>
                    <input className='w-full focus:outline-none p-2 border border-gray-300 focus:border-orange-400 rounded-sm' />
                </div>
                <div className='w-full flex flex-col gap-2 items-start'>
                    <p className='text-[#3d464d] text-left'>Your Email *</p>
                    <input className='w-full focus:outline-none p-2 border border-gray-300 focus:border-orange-400 rounded-sm' />
                </div>
                <div>
                    <button className='flex gap-2 py-2 px-4 text-gray-600 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer'>Leave Your Review</button>
                </div>
            </div>
        </section>
    )
}

export default Reviews