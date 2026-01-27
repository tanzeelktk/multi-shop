import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { user} = useAuth()
    

    if (!user) {
        return <Navigate to='/admin/login' replace />
    }


    return children
}

export default ProtectedRoutes