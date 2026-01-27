import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MainLayout from './client/layouts/MainLayout'
import Home from './client/pages/Home.jsx'
import Shop from './client/pages/Shop.jsx'
import About from './client/pages/About.jsx'
import Contact from './client/pages/Contact.jsx'
import Product from './client/pages/Product.jsx'
import Cart from './client/pages/Cart.jsx'
import Checkout from './client/pages/Checkout.jsx'
import AdminDashboard from './admin/pages/AdminDashboard.jsx'
import AdminLayout from './admin/layouts/AdminLayout.jsx'
import Products from './admin/pages/e-commerce/Products.jsx'
import Categories from './admin/pages/e-commerce/Categories.jsx'
import Orders from './admin/pages/e-commerce/Orders.jsx'
import Payements from './admin/pages/e-commerce/Payements.jsx'
import UserManagement from './admin/pages/UserManagement.jsx'
import Security from './admin/pages/Security.jsx'
import Settings from './admin/pages/Settings.jsx'
import Login from './admin/pages/Login.jsx'
import ProtectedRoutes from './admin/components/ProtectedRoutes.jsx'
import Loading from './admin/components/Loading.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            {/* Single Product Page */}
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
          <Route path='/admin/login' element={<Login />} />
          <Route path='/loading' element={<Loading/>}/>

          <Route element={<ProtectedRoutes><AdminLayout /></ProtectedRoutes>}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/ecommerce/products' element={<Products />} />
            <Route path='/admin/ecommerce/categories' element={<Categories />} />
            <Route path='/admin/ecommerce/orders' element={<Orders />} />
            <Route path='/admin/ecommerce/payements' element={<Payements />} />
            <Route path='/admin/user-management' element={<UserManagement />} />
            <Route path='/admin/security' element={<Security />} />
            <Route path='/admin/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
