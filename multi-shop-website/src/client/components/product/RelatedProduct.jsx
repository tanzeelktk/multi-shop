import React, { useEffect, useState } from 'react'
import ShowProducts from '../common/ShowProducts'
import { useLocation } from 'react-router-dom'

const RelatedProduct = () => {
    const [relatedProduct, setRelatedProduct] = useState([])
    const location = useLocation()

    useEffect(()=>{
        getRelatedProducts()
    },[location.pathname])

    async function getRelatedProducts(){
        try {
            const res = await fetch("/jsondata/products.json")
            if(!res.ok) throw new Error("Failed to fetch data")
            const products = await res.json()
            const related = [products[0], products[1], products[2]] 
            setRelatedProduct(related)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='grid grid-cols-3 gap-5'>
        {
            relatedProduct.map((product, index)=>{
                return(
                    <ShowProducts product={product} key={index}/>
                )
            })
        }
    </div>
  )
}

export default RelatedProduct