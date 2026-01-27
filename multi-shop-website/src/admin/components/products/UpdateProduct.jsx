import React, { useState } from 'react'
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

const UpdateProduct = ({ setOpenModal, openModal , product}) => {

    const [name, setName] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [stock, setStock] = useState(5)
    const [discount, setDiscount] = useState(product.discount)
    const [category, setCategory] = useState(product.category)
    const salePrice = Math.ceil(product.price - (product.price * discount / 100))
    const [shortDescription, setShortDescription] = useState(product.description)
    const [longDescription, setLongDescription] = useState(product.longDescription)
    const [productImages, setProductImages] = useState(product.images)
    const [mainImage, setMainImage] = useState(product.mainImage)

    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    function onCloseModal() {
        setOpenModal(false)
    }


    function handleImageChange(e) {
        const files = Array.from(e.target.files)
        setProductImages(files)
    }

    function handleMainImageChange(index) {
        const changeMessage = mainImage ? "Thumbnail changed successfully!" : "Thumbnail set successfully!"
        setMainImage(productImages[index])
        alert(changeMessage)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const product = {
            name,
            price,
            stock,
            category,
            discount,
            salePrice,
            shortDescription,
            longDescription,
            productImages,
            mainImage
        }
        if (!mainImage) return alert("Please select a thumbnail image for the product.")
        console.log(product) // API call yahan hogi
        setOpenModal(false)
    }

    return (
        <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
            <ModalHeader />

            <ModalBody>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <h3 className="text-xl font-semibold text-gray-900">
                        Add New Product
                    </h3>

                    {/*Image preview*/}
                    <div className='bg-gray-200 w-full h-60'
                        onClick={() => document.getElementById("imageInput").click()}>
                        <input
                            id='imageInput'
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <div className='w-full h-full relative'>
                            {productImages.length === 0 ? (
                                <div className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <ImagePlus /> No image selected</div>) : (
                                <>
                                    <img src={productImages[currentImageIndex]} className='w-full h-full object-contain' alt="" />
                                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2  py-2 px-4 
                                    hover:cursor-pointer opacity-60 hover:opacity-100 bg-blue-500 text-white text-xs text-center transition-opacity duration-300'
                                        onClick={(e) => { e.stopPropagation(); handleMainImageChange(currentImageIndex) }}>Select For Thumbnail</div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        {productImages.length > 0 && (
                            productImages.map((image, index) => {
                                return (
                                    <div className='w-15 h-15 relative' key={index} onClick={() => setCurrentImageIndex(index)}>
                                        <img src={image} className='w-full h-full object-cover' alt="" />
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/*Product Details here*/}
                    <div className="grid grid-cols-2 gap-10">
                        <div className='flex flex-col gap-2'>
                            {/*Product Images*/}


                            {/* Name */}
                            <div>
                                <Label htmlFor="name" >Product Name</Label>
                                <TextInput
                                    id="name"
                                    placeholder="iPhone 14"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <TextInput
                                    id="price"
                                    type="number"
                                    placeholder="500"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Stock */}
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
                            {/* Category */}
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <TextInput
                                    id="category"
                                    placeholder="Mobile"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <Label htmlFor="discount">Discount (%)</Label>
                                <TextInput
                                    id="discount"
                                    type='number'
                                    placeholder="10"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="salePrice">Sale Price</Label>
                                <TextInput
                                    id="salePrice"
                                    placeholder="12345"
                                    type='number'
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="shortDescription">Short Description</Label>
                                <Textarea
                                    id="shortDescription"
                                    placeholder="Write short description here..."
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="longDescription">Long Description</Label>
                                <Textarea
                                    id="longDescription"
                                    placeholder="Write long description here..."
                                    value={longDescription}
                                    onChange={(e) => setLongDescription(e.target.value)}
                                    required
                                />
                            </div>


                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <Button color="gray" onClick={onCloseModal}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Update
                                </Button>
                            </div>
                        </div>


                    </div>


                </form>
            </ModalBody>
        </Modal>
    )
}

export default UpdateProduct
