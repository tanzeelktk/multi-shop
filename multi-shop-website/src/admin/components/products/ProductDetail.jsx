import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "flowbite-react";
import { ImagePlus } from 'lucide-react';
import Rating from '../../../client/components/Rating';

const ProductDetail = ({ setOpenModal, openModal, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onCloseModal = () => setOpenModal(false);

  return (
    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
      <ModalHeader />
      <ModalBody className="overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold text-gray-900 mb-5">Product Details</h3>

        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          <div className="bg-gray-100 w-full md:w-1/2 h-80 flex items-center justify-center relative rounded-md border">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <ImagePlus size={40} />
                <span>No image</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto md:flex-col md:w-1/4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded-md border cursor-pointer overflow-hidden
                    ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3 text-gray-800">
          <h2 className="text-xl font-bold">{product.title}</h2>

          <div className="flex items-center gap-3">
            <span className="font-semibold">Rating:</span>
            <Rating rating={product.rating} /> 
            <span className="text-gray-500">({product.rating})</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <span className="font-semibold">Category:</span> {product.category}
            <span className="font-semibold">Price:</span> ${product.price.toFixed(2)}
            <span className="font-semibold">Discount:</span> {product.discount}%
            <span className="font-semibold">Sale Price:</span> ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
          </div>

          <div className="font-semibold">Stock Status: 
            <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs 
              ${5 > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
              {5 > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div>
            <p className="font-semibold">Short Description:</p>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            <p className="font-semibold">Long Description:</p>
            <p className="text-gray-700">{product.longDescription}</p>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-5">
              <ReviewSection reviews={product.reviews} productName={product.title} />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-5">
            <Button color="gray" onClick={onCloseModal}>Close</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ProductDetail

// ================= Review Section =================
const ReviewSection = ({ reviews, productName }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold text-gray-800">{reviews.length} Reviews for {productName}</h3>
      <div className="flex flex-col gap-5">
        {reviews.map((rev, idx) => (
          <div key={idx} className="flex gap-4 items-start border-b border-gray-200 pb-4">
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold">
              {rev.user[0].toUpperCase()}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-gray-800">{rev.user}</p>
                <div className="flex items-center gap-1">
                  <Rating rating={rev.rating} />
                  <span className="text-gray-500 text-sm">({rev.rating})</span>
                </div>
              </div>
              <p className="text-gray-700">{rev.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
