import React, { useState } from 'react'
import { Label, Modal, ModalBody } from 'flowbite-react'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../../../admin/context/AuthContext'

const Signin = ({ openModal, setOpenModal, setOpenSignupModal }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { userLogin } = useAuth()

    const API_URL = import.meta.env.VITE_API_URL

    function validateForm() {
        if (email === '' || password === '') {
            setMessage("All fields are required")
        }
        else {
            setLoading(true)
            loginUser()
        }
    }

    function handleChange(e) {
        if (e.target.name === "email") setEmail(e.target.value)
        if (e.target.name === "password") setPassword(e.target.value)
        if (message !== '') setMessage('')
    }

    async function loginUser() {
        try {
            const res = await axios.post(`${API_URL}/api/user/login`, { email, password })
            userLogin(res.data)
            setLoading(false)
            setOpenModal(false)
        } catch (error) {
            setMessage(error?.response?.data?.message)
        }
    }

    return (
        <Modal size='sm' show={openModal} popup onClose={() => setOpenModal(false)}>
            <ModalBody className="bg-[#3d464d] text-white border border-white/10 px-10 rounded-sm py-5 flex flex-col gap-7">
                {/* Heading */}
                <h1 className='flex justify-center text-2xl font-bold'>Login</h1>

                {/* Email/Password section */}
                <div className='flex flex-col gap-5'>
                    {
                        message !== '' && <p className='text-red-500'>{message}</p>
                    }

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='email' className='text-white'>Email</Label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-gray-400 rounded-sm p-1 bg-white text-black'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor='password' className='text-white'>Password</Label>
                        <div className=' border border-gray-400 rounded-sm p-1 bg-white text-black flex items-center justify-between'>
                            <input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => handleChange(e)}
                                className=' focus:outline-none focus:ring-0 bg-transparent'
                            />
                            <button onClick={() => setShowPassword(!showPassword)}
                                className='text-[#ffd333] hover:text-[#ffc800]'>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>

                        </div>

                    </div>
                </div>

                {/* Forgot password section */}
                <div className='flex justify-end'>
                    <button className='text-sm font-thin hover:text-blue-600 hover:cursor-pointer underline'>Forgot Password?</button>
                </div>

                {/* Buttons section */}
                <div className='flex gap-2 justify-end'>
                    <button
                        onClick={validateForm}
                        className={`bg-[#ffd333]  text-[#3d464d]  py-2 
                        px-7 transition-colors duration-300 flex  items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#ffc800] hover:cursor-pointer"}`}>
                        {
                            loading && <div className='w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin'></div>
                        }
                        Login
                    </button>
                    <button
                        className='border border-[#ffd333] hover:bg-[#ffd333] hover:cursor-pointer hover:text-[#3d464d]  py-2 px-5 transition-colors duration-300'
                        onClick={() => setOpenModal(false)}>
                        Cancel
                    </button>
                </div>

                {/* create an account section */}
                <div className='flex justify-center'>
                    <span className='text-sm font-thin flex gap-1'>Create account?
                        <button onClick={() => {
                            setOpenModal(false)
                            setOpenSignupModal(true)
                        }}
                            className='text-sm font-thin hover:text-blue-600 hover:cursor-pointer underline'>Signup</button>
                    </span>
                </div>

            </ModalBody>
        </Modal>
    )
}

export default Signin