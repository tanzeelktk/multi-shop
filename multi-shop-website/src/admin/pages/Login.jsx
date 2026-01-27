import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const { user, login, loading} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard', { replace: true })
        }
    }, [])

    const handleLogin = async () => {
        if (!userName || !password) {
            alert("Please enter username or password")
            return
        }
        login({ userName: userName, image:"/images/admin/admin1.png" })
        navigate('/admin/dashboard', { replace: true })
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
