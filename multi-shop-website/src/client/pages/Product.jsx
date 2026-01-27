
import React, { useEffect, useState } from 'react'
import ProductGallery from '../components/product/ProductGallery'
import ProductDescription from "../components/product/ProductDescription";
import ProductDetail from '../components/product/ProductDetail'
import RelatedProduct from '../components/product/RelatedProduct';
import { useLocation, useParams } from 'react-router-dom';

const Product = () => {
  const location = useLocation()
  const { state } = useLocation()
  const { id } = useParams()
  const [product, setProduct] = useState(null)

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
      const res = await fetch("/jsondata/products.json")
      if (!res.ok) throw new Error("Failed to get Product")
      const data = await res.json()
      const currentProduct = data.find(p => p.id === Number(id))
      console.log(currentProduct)
      setProduct(currentProduct)
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
          <ProductDescription description={product.longDescription} reviews={product.reviews} productName={product.title}/>
        </div>
        <div className=''>
          <div className='relative flex items-center text-[#3d464d]'>
            <p className='text-2xl font-semibold bg-[#f5f5f5] z-10 px-4 py-2'>YOU MAY ALSO LIKE </p>
            <div className='absolute border-t border-dashed w-full z-0'></div>
          </div>
          <RelatedProduct />
        </div>
      </div>
    </section>
  )
}

export default Product