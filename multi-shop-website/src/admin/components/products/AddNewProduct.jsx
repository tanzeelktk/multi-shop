import React, { useEffect, useState } from 'react'
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput
} from "flowbite-react";
import { ImagePlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2'

const AddNewProduct = ({ setOpenModal, openModal, getProducts}) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [status, setStatus] = useState('')
  const [discount, setDiscount] = useState(0)
  const [category, setCategory] = useState("")
  const salePrice = Math.ceil(price - (price * discount / 100))
  const [shortDescription, setShortDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [productImages, setProductImages] = useState([])
  const [mainImage, setMainImage] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { adminToken } = useAuth()
  const API_URL = import.meta.env.VITE_API_URL

  const [categories, setCategories] = useState([])


  useEffect(() => {
    getCategories()
  }, [])


  async function getCategories() {
    try {
      const res = await axios.get(`${API_URL}/api/categories/get-all`)
      setCategories(res.data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  function onCloseModal() {
    setOpenModal(false)
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files)
    setProductImages(files)
  }

  function handleMainImageChange(index) {
    setMainImage(index)
    alert("Thumbnail updated successfully!")
  }

  function handleCategorySelect(value) {
    console.log(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()


    const formData = new FormData()
    formData.append("title", name)
    formData.append("description", shortDescription)
    formData.append("longDescription", longDescription)
    formData.append("status", status)
    formData.append("price", price)
    formData.append("discountPercent", discount)
    formData.append("category", category)
    formData.append("stock", stock)
    formData.append("mainImageIndex", mainImage)
    for (let i = 0; i < productImages.length; i++) {
      formData.append("images", productImages[i])
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const res = await axios.post(`${API_URL}/api/product/create`, formData,
      { headers: { Authorization: `Bearer ${adminToken}` } })
    if (res) {
      Swal.fire({
        title: "Product Created Sccessfully!",
        icon: "success",
        draggable: true
      });
    setOpenModal(false)
    getProducts()
    }
  }

  return (
    <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
      <ModalHeader />
      <ModalBody className="overflow-y-auto scroll-smooth">

        <h3 className="text-2xl font-bold mb-5 text-gray-800">Add New Product</h3>

        {/* Image Preview */}
        <div className='mb-5'>
          <div
            className='bg-gray-100 w-full h-64 rounded-md flex items-center justify-center cursor-pointer relative'
            onClick={() => document.getElementById("imageInput").click()}
          >
            <input
              id='imageInput'
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {productImages.length === 0 ? (
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={40} />
                <p>No image selected</p>
              </div>
            ) : (
              <>
                <img
                  src={URL.createObjectURL(productImages[currentImageIndex])}
                  alt="Preview"
                  className='w-full h-full object-contain rounded-md'
                />
                <div
                  className='absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm rounded-md cursor-pointer hover:opacity-90'
                  onClick={(e) => { e.stopPropagation(); handleMainImageChange(currentImageIndex) }}
                >
                  Select as Thumbnail
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Selector */}
          {productImages.length > 0 && (
            <div className='flex gap-2 mt-3 overflow-x-auto'>
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded-md border ${mainImage === img ? 'border-blue-500' : 'border-gray-300'} overflow-hidden cursor-pointer`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={URL.createObjectURL(img)} className='w-full h-full object-cover' alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} encType="multipart/form-data">

          {/* Left Column */}
          <div className='flex flex-col gap-4'>
            <div>
              <Label htmlFor="name">Product Name</Label>
              <TextInput
                id="name"
                placeholder="iPhone 14"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <TextInput
                id="price"
                type="number"
                placeholder="500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <TextInput
                id="stock"
                type="number"
                placeholder="10"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='status'>Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className='focus:outline-none p-2 border border-gray-200 rounded-sm'
              >
                <option>Select Status</option>
                <option value={"Active"}>Active</option>
                <option value={"inActive"}>inActive</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className='focus:outline-none p-2 border border-gray-200 rounded-sm'
              >
                <option>Select Category</option>
                {
                  categories && categories.map((catg, index) => {
                    return (
                      <option key={index} value={catg._id}>{catg.title}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-4'>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <TextInput
                id="discount"
                type='number'
                placeholder="10"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="salePrice">Sale Price ($)</Label>
              <TextInput
                id="salePrice"
                type='number'
                value={salePrice}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="Write a short description..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea
                id="longDescription"
                placeholder="Write a detailed description..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end gap-3 mt-4">
            <Button color="gray" onClick={onCloseModal}>Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>

        </form>

      </ModalBody>
    </Modal>
  )
}

export default AddNewProduct
