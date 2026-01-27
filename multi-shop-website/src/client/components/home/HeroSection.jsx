import React from 'react'

const HeroSection = () => {
  return (
    <section className="w-full bg-amber-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

        {/* Left Big Image */}
        <div className="relative aspect-video col-span-2">
          <img
            src="/images/hero/slide1.jpg"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 text-center">
            <h1 className="text-5xl font-semibold mb-2">Women Fashion</h1>
            <p className="mb-4 text-xl">Latest trends & collections</p>
            <button className="px-6 py-2 bg-[#ffd333] text-black font-semibold hover:bg-[#ffc800]">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Side Images */}
        <div className="grid grid-rows-2 gap-5">
          <div className="relative aspect-video">
            <img
              src="/images/hero/img3.png"
              className="w-full h-full absolute object-cover"
            />
          </div>
          <div className="relative aspect-video">
            <img
              src="/images/hero/img4.webp"
              className="w-full h-full object-cover"
            />
          </div>

          
        </div>

      </div>
    </section>
  )
}

export default HeroSection
