
import React, { useEffect, useState } from 'react'
import ProductGallery from '../components/product/ProductGallery'
import ProductDescription from "../components/product/ProductDescription";
import ProductDetail from '../components/product/ProductDetail'
import RelatedProduct from '../components/product/RelatedProduct';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const location = useLocation()
  const { state } = useLocation()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
     window.scrollTo(0, 0)
    if (state?.product && state?.product.id===Number(id)) {
      setProduct(state?.product)
    }
    else{
      fetchProduct()
    }
  }, [id])

  async function fetchProduct() {

    try {
      const res = await axios.get(`${API_URL}/api/product/single-product/${id}`)
      setProduct(res.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  async function getReviews(){
    try {
      const res = await axios.get(`${API_URL}/api/review/get-all/${product._id}`)
      setReviews(res.data.reviews)
    } catch (error) {
      console.log(error)
    }
  }

  if (!product) return <div>Loading....</div>

  return (
    <section className='w-[90%] mx-auto'>
      <div className='flex flex-col gap-20'>
        <div className='grid grid-cols-2 gap-2'>
          <div >
            <ProductGallery images={product.images} />
          </div>
          <div>
            <ProductDetail product={product} />
          </div>
        </div>
        <div className="w-full">
          <ProductDescription description={product.longDescription} reviews={reviews} productName={product.title}/>
        </div>
        <div className=''>
          <div className='relative flex items-center text-[#3d464d]'>
            <p className='text-2xl font-semibold bg-[#f5f5f5] z-10 px-4 py-2'>YOU MAY ALSO LIKE </p>
            <div className='absolute border-t border-dashed w-full z-0'></div>
          </div>
          {/* <RelatedProduct /> */}
        </div>
      </div>
    </section>
  )
}

export default Product