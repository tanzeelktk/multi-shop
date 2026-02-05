import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { admin} = useAuth()
    

    if (!admin) {
        return <Navigate to='/admin/login' replace />
    }


    return children
}

export default ProtectedRoutes