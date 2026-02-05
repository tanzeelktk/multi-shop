import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null)
    const [adminToken, setAdminToken] = useState(JSON.parse(localStorage.getItem("adminToken")) || null)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("userToken")) || null)

    const adminLogin = (userData) => {
        setAdmin(userData.user)
        setAdminToken(userData.token)
        localStorage.setItem("admin", JSON.stringify(userData.user))
        localStorage.setItem("adminToken", JSON.stringify(userData.token))
    }

    const adminLogout = () => {
        setAdmin(null)
        setAdminToken(null)
        localStorage.removeItem('admin')
        localStorage.removeItem('adminToken')
    }

    const userLogin = (userData) => {
        setUser(userData.user)
        setUserToken(userData.token)
        localStorage.setItem("user", JSON.stringify(userData.user))
        localStorage.setItem("userToken", JSON.stringify(userData.token))
    }

    const userLogout = () => {
        setUser(null)
        setUserToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('userToken')
    }


    return (
        <AuthContext.Provider value={{ admin, adminLogin, adminLogout, adminToken, user, userToken, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

