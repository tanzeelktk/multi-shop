import React, { useEffect, useState, useMemo, useRef } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "flowbite-react";
import { ImagePlus, Pen, Plus, X } from 'lucide-react';
import Rating from '../../../client/components/Rating';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const ProductDetail = ({ setOpenModal, openModal, product, getProducts, setSelectedProduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const onCloseModal = () => setOpenModal(false);
  const API_URL = import.meta.env.VITE_API_URL
  const { adminToken } = useAuth()
  const [reviews, setReviews] = useState([])

  const [title, setTitle] = useState(null)
  const [status, setStatus] = useState(null)
  const [category, setCategory] = useState(null)
  const [price, setPrice] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [stock, setStock] = useState(null)
  const [description, setDescription] = useState(null)
  const [longDescription, setLongDescription] = useState(null)

  const [editTitle, setEditTitle] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [editPrice, setEditPrice] = useState(false)
  const [editDiscount, setEditDiscount] = useState(false)
  const [editStock, setEditStock] = useState(false)
  const [editDescription, setEditDescription] = useState(false)
  const [editLongDescription, setEditLongDescription] = useState(false)

  const [categories, setCategories] = useState([])

  const imageRef = useRef(null)


  const salePrice = useMemo(() => {
    const p = Number(price) || 0
    const d = Number(discount) || 0
    return (p - (p * d) / 100).toFixed(2)
  }, [price, discount])

  useEffect(() => {

    getCategories()
    if (product?.images?.length > 0) {
      if (currentImageIndex >= product.images.length) {
        setCurrentImageIndex(0)
      }
    }

    if (product) {
      setTitle(product.title)
      setStatus(product.status)
      setCategory(product.category._id)
      setPrice(product.price)
      setDiscount(product.discountPercent)
      setStock(product.stock)
      setDescription(product.description)
      setLongDescription(product.longDescription)
    }

    if (product?.numReviews > 0) {
      getReviews()
    }

  }, [product])

  const getReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/review/get-all/${product._id}`)
      setReviews(res.data.reviews)
    } catch (err) {
      console.log(err)
    }
  }

  function handleCancelEdit(name) {
    if (name === "title") setTitle(product.title)
    if (name === "status") setStatus(product.status)
    if (name === "category") setCategory(product.category._id)
    if (name === "price") setPrice(product.price)
    if (name === "discount") setDiscount(product.discountPercent)
    if (name === "stock") setStock(product.stock)
    if (name === "description") setDescription(product.description)
    if (name === "longDescription") setLongDescription(product.longDescription)
  }

  async function getCategories() {
    try {
      const res = await axios.get(`${API_URL}/api/categories/get-all`)
      setCategories(res.data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  function reset() {
    setEditTitle(false)
    setEditStatus(false)
    setEditCategory(false)
    setEditPrice(false)
    setEditStock(false)
    setEditDiscount(false)
    setEditDescription(false)
    setEditLongDescription(false)
  }

  async function handleDeleteImage(imageId) {
    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete"
    })
    if (!result) return
    try {
      const res = await axios.delete(`${API_URL}/api/product/delete-image/${imageId}/${product._id}`,
        { headers: { Authorization: `Bearer ${adminToken}` } })
      getProducts()
      setSelectedProduct(res.data.product)
      Swal.fire({
        title: "Product Updated",
        text: res.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error"
      })
      console.log(error)
    }
  }

  async function handleNewImage(e) {
    const newImage = e.target.files[0]
    if (!newImage) return
    const formData = new FormData()
    formData.append("image", newImage)
    try {
      const res = await axios.put(`${API_URL}/api/product/new-image/${product._id}`, formData,
        { headers: { Authorization: `Bearer ${adminToken}` } })
      getProducts()
      setSelectedProduct(res.data.product)
      Swal.fire({
        title: "Product Updated",
        text: res.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error"
      })
      console.log(error)
    }
  }

  async function handleUpdate() {
    const formData = new FormData()
    if (editTitle) formData.append("title", title)
    if (editStatus) formData.append("status", status)
    if (editCategory) formData.append("category", category)
    if (editPrice) formData.append("price", price)
    if (editDiscount) formData.append("discountPercent", discount)
    if (editStock) formData.append("stock", stock)
    if (editDescription) formData.append("description", description)
    if (editLongDescription) formData.append("longDescription", longDescription)
    try {
      const res = await axios.put(
        `${API_URL}/api/product/update/${product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      reset()    ///to reset all states
      setSelectedProduct(res.data.product)
      getProducts()
      Swal.fire({
        title: "Category Updated",
        text: "Category successfully updated",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error"
      })

      console.log(error)
    }
  }

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
                src={`${API_URL}/${product.images[currentImageIndex].filename}`}
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
          {(product.images && product.images.length > 0) ? (
            <div className="flex gap-2 overflow-x-auto md:flex-col md:w-1/4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded-md border cursor-pointer overflow-hidden relative group
                    ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={`${API_URL}/${img.filename}`} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  <div onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteImage(img._id)
                  }}
                    className='absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white z-20 
                  opacity-0 group-hover:opacity-100 border border-gray-700 transition-opacity duration-200'>
                    <X size={10} />
                  </div>
                </div>
              ))}
              <button onClick={() => imageRef.current?.click()}
                className={`flex items-center justify-center w-20 h-20 rounded-md border border-gray-500 cursor-pointer
                bg-gray-200 group`}>
                <Plus className='group-hover:scale-110 group-hover:text-blue-500 transition-all duration-200' />

              </button>
              <input ref={imageRef} type='file' accept='image/*' onChange={handleNewImage} hidden />
            </div>)
            :
            <>
              <button onClick={() => imageRef.current?.click()}
                className={`flex items-center justify-center w-20 h-20 rounded-md border border-gray-500 cursor-pointer
                bg-gray-200 group`}>
                <Plus className='group-hover:scale-110 group-hover:text-blue-500 transition-all duration-200' />

              </button>
              <input ref={imageRef} type='file' accept='image/*' onChange={handleNewImage} hidden />
            </>

          }
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3 text-gray-800">
          <div className='flex gap-5 items-center'>

            {/*Title*/}
            <div className='flex items-center gap-2 group'>
              {
                editTitle ? <input value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='focus:outline-none border border-gray-300 rounded-sm p-1' />
                  :
                  <h2 className="text-xl font-bold">{product.title}</h2>
              }
              <button onClick={() => {
                if (editTitle) {
                  handleCancelEdit("title")
                }
                setEditTitle(!editTitle)
              }
              }
                className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                {editTitle ? <X size={15} /> : <Pen size={15} />}
              </button>
            </div>

            {/*Status*/}
            <div className='flex items-center gap-2 group'>
              {
                editStatus ?
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='focus:outline-none border border-gray-300 rounded-sm p-1'>
                    <option value={"Active"}>Active</option>
                    <option value={"inActive"}>inActive</option>
                  </select>
                  :
                  <div className={`${product.status === "Active" ? "bg-green-400" : "bg-red-400"} text-white px-2 py-1 rounded-2xl`}>
                    {product?.status}
                  </div>
              }

            </div>
            <button onClick={() => {
              if (editStatus) {
                handleCancelEdit("status")
              }
              setEditStatus(!editStatus)
            }
            }
              className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
              {editStatus ? <X size={15} /> : <Pen size={15} />}
            </button>
          </div>


          <div className="flex items-center gap-3">
            <span className="font-semibold">Rating:</span>
            <Rating rating={product.rating} />
            <span className="text-gray-500">({product.rating})</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className='flex gap-2 items-center group'>
                <span className="font-semibold">Category:</span>{" "}
                {
                  editCategory ?
                    <select className='focus:outline-none border border-gray-300 rounded-sm p-1'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {
                        categories && categories.map((category, index) => {
                          return (
                            <option key={index} value={category._id}>{category.title}</option>
                          )
                        })
                      }
                    </select>
                    :
                    <> {product?.category?.title || "N/A"}</>
                }
                <button onClick={() => {
                  if (editCategory) {
                    handleCancelEdit("category")
                  }
                  setEditCategory(!editCategory)
                }
                }
                  className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                  {editCategory ? <X size={15} /> : <Pen size={15} />}
                </button>

              </div>

              <div className='flex gap-2 items-center group'>
                <span className="font-semibold">Price:</span>{" "}
                {editPrice ? <input type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className='focus:outline-none border border-gray-300 rounded-sm p-1' />
                  :
                  <>${product?.price?.toFixed(2)}</>
                }
                <button onClick={() => {
                  if (editPrice) {
                    handleCancelEdit("price")
                  }
                  setEditPrice(!editPrice)
                }}
                  className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                  {editPrice ? <X size={15} /> : <Pen size={15} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className='flex gap-2 items-center group'>
                <span className="font-semibold">Discount:</span>{" "}
                {
                  editDiscount ? <input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    type='number'
                    className='focus:outline-none border border-gray-300 rounded-sm p-1' />
                    :
                    <>{product?.discountPercent || 0}%</>
                }
                <button onClick={() => {
                  if (editDiscount) {
                    handleCancelEdit("discount")
                  }
                  setEditDiscount(!editDiscount)
                }}
                  className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                  {editDiscount ? <X size={15} /> : <Pen size={15} />}
                </button>

              </div>

              <div>
                <span className="font-semibold">Sale Price:</span>{" "}
                ${salePrice}
              </div>
            </div>
          </div>


          <div className="font-semibold flex gap-2 items-center group">Stock Status:
            {
              editStock ? <input type='number'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className='focus:outline-none border border-gray-300 rounded-sm p-1' />
                :
                <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs 
              ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            }
            <button onClick={() => {
              if (editStock) handleCancelEdit("stock");
              setEditStock(!editStock)
            }}
              className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
              {editStock ? <X size={15} /> : <Pen size={15} />}
            </button>

          </div>
          <div className='flex flex-col gap-2 group'>
            <div className='flex gap-2 items-center '>
              <p className="font-semibold">Short Description:</p>
              <button onClick={() => {
                if (editDescription) handleCancelEdit("description")
                setEditDescription(!editDescription)
              }}
                className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                {editDescription ? <X size={15} /> : <Pen size={15} />}
              </button>
            </div>
            {
              editDescription ? <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='focus:outline-none border border-gray-300 rounded-sm p-2' />
                :
                <p className="text-gray-700">{product.description}</p>
            }
          </div>

          <div className='flex flex-col gap-2 group'>
            <div className='flex gap-2 items-center '>
              <p className="font-semibold">Long Description:</p>
              <button onClick={() => {
                if (editLongDescription) handleCancelEdit("longDescription")
                setEditLongDescription(!editLongDescription)
              }}
                className={`opacity-5 group-hover:opacity-50 hover:opacity-100 hover:cursor-pointer self-start p-2 rounded-full bg-gray-400 border border-gray-800`}>
                {editLongDescription ? <X size={15} /> : <Pen size={15} />}
              </button>
            </div>
            {
              editLongDescription ? <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className='focus:outline-none border border-gray-300 rounded-sm p-2' />
                :
                <p className="text-gray-700">{product.longDescription}</p>
            }
          </div>

          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="mt-5">
              <ReviewSection reviews={reviews} productName={product.title} />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-5">
            {
              (editCategory || editPrice || editDiscount || editStock || editDescription
                || editLongDescription || editTitle || editStatus) &&
              <Button color="blue" onClick={handleUpdate}>Update</Button>
            }

            <Button color="gray" onClick={onCloseModal}>Close</Button>
          </div>
        </div>
      </ModalBody>
    </Modal >
  )
}

export default ProductDetail

// ================= Review Section =================
const ReviewSection = ({ reviews, productName }) => {
  const API_URL = import.meta.env.VITE_API_URL
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold text-gray-800">{reviews.length} Reviews for {productName}</h3>
      <div className="flex flex-col gap-5">
        {reviews.map((rev, idx) => (
          <div key={idx} className="flex gap-4 items-start border-b border-gray-200 pb-4">
            {/* Avatar Placeholder */}
            <div className="relative w-12 h-12 rounded-full bg-gray-300  text-white text-lg font-bold overflow-hidden">
              <img src={`${API_URL}/${rev.image}`} className='absolute w-full h-full object-contain' />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-gray-800">{rev.name}</p>
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
