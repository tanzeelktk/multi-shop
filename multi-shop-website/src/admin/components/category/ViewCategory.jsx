import {
    Modal,
    ModalBody,
    Button,
    FileInput
} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Pen, X } from 'lucide-react'

const ViewCategory = ({ openModal, setOpenModal, category, getCategories, setCategory }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [editTitle, setEditTitle] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [editImage, setEditImage] = useState(false)

    const { adminToken } = useAuth()
    const API_URL = import.meta.env.VITE_API_URL


    useEffect(() => {
        if (category) {
            setTitle(category.title)
            setDescription(category?.description || '')
            setPreview(category.image)
        }
    }, [category])

    function cancelEdit(name) {
        if (name === 'title') setTitle(category.title)
        else if (name === 'desc') setDescription(category.description)
        else if (name === 'image') { setPreview(category.image); setImage(null) }
    }

    function reset() {
        setTitle(category.title)
        setDescription(category.description)
        setImage(null)
        setEditTitle(false)
        setEditDescription(false)
        setEditImage(false)
    }

    async function handleUpdate() {
        const formData = new FormData()
        if (editTitle) formData.append("title", title)
        if (editDescription) formData.append("description", description)
        if (editImage) formData.append("image", image)

        try {
            const res = await axios.put(
                `${API_URL}/api/categories/update/${category._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            reset()    ///to reset all states
            getCategories()
            setCategory(res.data.category)
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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
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
                {!category ? (
                    <p className="text-center text-gray-500">
                        Loading category...
                    </p>
                ) : (
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Category Detail
                        </h3>
                        {
                            editTitle
                                ?
                                <div className='flex gap-2 items-center'>
                                    <span className="font-semibold">Title :</span>
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        className='focus:ouline-none border border-gray-300'
                                    />
                                    <X size={15} onClick={() => { cancelEdit("title"); setEditTitle(!editTitle) }} />
                                </div>
                                :
                                <p className='flex gap-2 items-center'>
                                    <span className="font-semibold">Title :</span> {category?.title}
                                    <Pen size={15} onClick={() => setEditTitle(!editTitle)} />
                                </p>
                        }

                        {
                            editDescription
                                ?
                                <div className='flex gap-2 items center'>
                                    <span className="font-semibold">Description :</span>
                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        className='focus:ouline-none border border-gray-300'
                                    />
                                    <X size={15} onClick={() => { cancelEdit("desc"); setEditDescription(!editDescription) }} />
                                </div>

                                :
                                <p className='flex gap-2 items-center'>
                                    <span className="font-semibold">Description: </span> {category?.description}
                                    <Pen size={15} onClick={() => setEditDescription(!editDescription)} />
                                </p>
                        }

                        <div className="flex gap-4 items-start">
                            {/* Image Preview */}
                            {preview && (
                                <img
                                    src={editImage && image ? preview : `${API_URL}/${preview}`}
                                    alt={category?.title}
                                    className="h-32 w-32 rounded-lg object-cover border"
                                />
                            )}

                            <div className="flex flex-col gap-2">
                                {/* Edit / Cancel Icon */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editImage && image) {
                                            cancelEdit('image')
                                        }; setEditImage(!editImage)
                                    }}
                                    className="self-start p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                    {editImage ? <X size={16} /> : <Pen size={16} />}
                                </button>

                                {/* File Input (only when editImage = true) */}
                                {editImage && (
                                    <FileInput
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-end pt-4 gap-2">
                    {
                        (editImage || editTitle || editDescription) &&
                        <Button
                            color="blue"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    }

                    <Button
                        color="gray"
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default ViewCategory
