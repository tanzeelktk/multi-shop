import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const { admin, adminLogin, loading } = useAuth()
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (admin) {
            navigate('/admin/dashboard', { replace: true })
        }
    }, [])

    const handleLogin = async () => {
        if (!userName || !password) {
            alert("Please enter username or password")
            return
        }
        try {
            const user = await axios.post(`${API_URL}/api/admin/login`, { email: userName, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            console.log(user.data)
            adminLogin(user.data)
            navigate('/admin/dashboard', { replace: true })
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <section className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='flex flex-col gap-5 bg-white text-gray-800 p-8 rounded-lg shadow-lg w-80'>

                <h1 className='text-2xl font-bold text-center text-blue-500'>
                    Login
                </h1>

                <input
                    type='text'
                    placeholder='Username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />

                <button className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
                    disabled={loading}
                    onClick={handleLogin}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </div>
        </section>
    )
}

export default Login
