import React, { useEffect, useState } from 'react'
import { Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react'
import { Eye, EyeIcon, EyeOff, X } from 'lucide-react'
import axios from 'axios'

const Signup = ({ openModal, setOpenModal, setOpenLoginModal }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL

    function validateForm() {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setMessage("All fields are required")
        }
        else if (password !== confirmPassword) {
            setMessage("Password not matched")
        }
        else {
            setLoading(true)
            createUser()
        }
    }

    function handleChange(e) {
        if (e.target.name === "name") setName(e.target.value)
        if (e.target.name === "email") setEmail(e.target.value)
        if (e.target.name === "password") setPassword(e.target.value)
        if (e.target.name === "confirmPassword") setConfirmPassword(e.target.value)
        if (message !== '') setMessage('')
    }

    async function createUser() {
        try {
            const res = await axios.post(`${API_URL}/api/user/register`, { name, email, password })
            console.log(res.data.user)
            setLoading(false)
        } catch (error) {
            setMessage(error?.response?.data?.message)
            setLoading(false)
        }
    }


    return (
        <Modal size='sm' show={openModal} popup onClose={() => setOpenModal(false)}>
            <ModalBody className="bg-[#3d464d] text-white border border-white/10 px-10 rounded-sm py-5 flex flex-col gap-7">
                {/* Heading */}
                <h1 className='flex justify-center text-2xl font-bold'>Register Account</h1>

                {/* Email/Password section */}
                <div className='flex flex-col gap-5'>
                    {
                        message !== '' && <p className='text-red-500'>{message}</p>
                    }

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='name' className='text-white'>Name</Label>
                        <input
                            id='name'
                            type='name'
                            name="name"
                            value={name}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-gray-400 rounded-sm p-1 bg-white text-black'
                        />
                    </div>


                    {/* Email/Password section */}

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='email' className='text-white'>Email</Label>
                        <input
                            id='email'
                            type='email'
                            name="email"
                            value={email}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-gray-400 rounded-sm p-1 bg-white text-black'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='password' className='text-white'>Password</Label>
                        <div className='flex justify-between items-center border border-gray-400 rounded-sm p-1 bg-white'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => handleChange(e)}
                                className='focus:outline-none  text-black'
                            />
                            <button onClick={() => setShowPassword(!showPassword)}
                                className='text-[#ffd333] hover:text-[#ffc800] hover:cursor-pointer'>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        </div>

                    </div>

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='confirmPassword' className='text-white'>Confirm Password</Label>
                        <div className='flex justify-between items-center border border-gray-400 rounded-sm p-1 bg-white'>
                            <input
                                id='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => handleChange(e)}
                                className='focus:outline-none  text-black'
                            />
                            <button onClick={() => setShowConfirmPassword(!showPassword)}
                                className='text-[#ffd333] hover:text-[#ffc800] hover:cursor-pointer'>{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        </div>
                    </div>
                </div>


                {/* Buttons section */}
                <div className='flex gap-2 justify-end'>
                    <button
                        onClick={validateForm} disabled={loading}
                        className={`bg-[#ffd333]  text-[#3d464d]  py-2 px-7 
                        transition-colors duration-300 flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#ffc800] hover:cursor-pointer"}`}>
                        {
                            loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                        }

                        Signup
                    </button>
                    <button className='border border-[#ffd333] hover:bg-[#ffd333] hover:cursor-pointer hover:text-[#3d464d]  py-2 px-5 transition-colors duration-300' onClick={() => setOpenModal(false)}>Cancel</button>
                </div>

                {/* create an account section */}
                <div className='flex justify-center'>
                    <span className='text-sm font-thin flex gap-1'>Alraedy have account?
                        <button onClick={() => {
                            setOpenModal(false)
                            setOpenLoginModal(true)
                        }}
                            className='text-sm font-thin hover:text-blue-600 hover:cursor-pointer underline'>Login</button>
                    </span>
                </div>

            </ModalBody>
        </Modal>
    )
}

export default Signup