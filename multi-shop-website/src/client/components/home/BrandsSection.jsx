import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BrandsSection = () => {

    const brands = [
        { name: 'Adidas', image: "/images/brands/adidas.png" },
        { name: 'Clothing', image: "/images/brands/clothing.jpg" },
        { name: 'Reebok', image: "/images/brands/reebok.png" },
        { name: 'Samsung', image: "/images/brands/samsung.png" },
        { name: 'Shirt', image: "/images/brands/shirt.jpg" },
        { name: 'Vivo', image: "/images/brands/vivo.png" },
    ]

    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-auto px-20"
            
            breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
            }}
        >
            {brands.map((brand, index) => (
                <SwiperSlide key={index}>
                    <div className='w-full h-40 p-3 bg-white rounded-xl 
                    flex flex-col items-center justify-between 
                    shadow hover:shadow-xl transition'>
                        <img 
                          src={brand.image} 
                          className='h-20 object-contain'
                        />
                        <h1 className='text-lg font-semibold text-[#3d464d]'>
                            {brand.name}
                        </h1>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default BrandsSection;
