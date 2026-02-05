import {
    Modal,
    ModalBody,
    Button,
    TextInput,
    Label,
    FileInput
} from 'flowbite-react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddCategory = ({ openModal, setOpenModal, getCategories }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    

    const { adminToken } = useAuth()
    const API_URL = import.meta.env.VITE_API_URL

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)

        try {
            const res = await axios.post(
                `${API_URL}/api/categories/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            Swal.fire({
                title: "Category Added",
                text: "Category successfully created",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            })

            setOpenModal(false)
            getCategories()
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
        <Modal
            size="xl"
            show={openModal}
            popup
            onClose={() => setOpenModal(false)}
        >
            <ModalBody>
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                        Add New Category
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div>
                            <Label value="Category Title" />
                            <TextInput
                                placeholder="e.g. Electronics"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label value="Description" />
                            <TextInput
                                placeholder="Short description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label value="Category Image" />
                            <FileInput
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Image Preview */}
                        {preview && (
                            <div className="mt-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-32 rounded-lg object-cover border"
                                />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Category
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default AddCategory
