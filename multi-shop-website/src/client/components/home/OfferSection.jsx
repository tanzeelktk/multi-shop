import React from 'react';

const OfferSection = () => {
    const offers = [
        {
            image: "/images/hero/slide3.jpg",
            alt: "offer 1"
        },
        {
            image: "/images/hero/slide2.jpg",
            alt: "offer 2"
        }
    ]
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {
                    offers.map((offer, index) => {
                        return (
                            <div className="w-full overflow-hidden h-70 relative group" key={index}>
                                <img
                                    src={offer.image}
                                    alt={offer.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                                />
                                <div className='absolute bg-black/40 inset-0 flex flex-col gap-2 items-center justify-center'>
                                    <p className='text-xl font-semibold text-white'>Save 20%</p>
                                    <p className='text-2xl font-bold text-white'>Special Offer</p>
                                    <button className='py-2 px-4 bg-[#ffd333] hover:bg-[#ffc800] hover:cursor-pointer text-[#3d464d]'>Shop Now</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default OfferSection;
