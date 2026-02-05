import React, {useState} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductGallery = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const API_URL = import.meta.env.VITE_API_URL
    

    const nextImage = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }
    const prevImage = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    }
    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div className='w-120 h-120 relative border border-gray-300 rounded-xl'>
                <img
                    src={`${API_URL}/${images[currentIndex].filename}`}
                    className='w-full h-full object-cover rounded-xl transition-all duration-300'
                />
                {/* ARROWS */}
                <div className='absolute inset-0 flex justify-between items-center px-4'>
                    <button className='bg-black/60 opacity-15 hover:opacity-70 p-2 rounded-full
                     text-white hover:bg-black hover:cursor-pointer transition-all duration-300' onClick={prevImage}>
                        <ChevronLeft size={28} />
                    </button>
                    <button className='bg-black/60 opacity-15 hover:opacity-70 p-2 rounded-full
                     text-white hover:bg-black hover:cursor-pointer transition-all duration-300' onClick={nextImage}>
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>

            <div className='flex h-15 w-full items-center justify-center gap-2'>
                {
                    images.map((image, index) => {
                        return (
                            <div className={`h-full w-15 relative border hover:cursor-pointer
                      ${currentIndex === index ? "border-blue-600 scale-105" : "border-gray-400"}  rounded-sm transition-all duration-300`} key={index}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={`${API_URL}/${image.filename}`} className='w-full h-full object-cover rounded-sm' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductGallery