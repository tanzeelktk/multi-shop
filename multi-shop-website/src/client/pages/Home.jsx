import React from 'react'
import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import CategoriesSection from '../components/home/CategoriesSection'
import FeaturedProductSection from '../components/home/FeaturedProductSection'
import OfferSection from '../components/home/OfferSection'
import RecentProductSection from '../components/home/RecentProductSection'
import BrandsSection from '../components/home/BrandsSection'

const Home = () => {
  return (
    <div className='w-[90%] flex gap-20 flex-col'>
      <HeroSection/>
      <FeatureSection/>
      <CategoriesSection/>
      <FeaturedProductSection/>
      <OfferSection/>
      <RecentProductSection/>
      <BrandsSection/>
    </div>
  )
}

export default Home