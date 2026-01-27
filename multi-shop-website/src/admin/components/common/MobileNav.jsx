import { ChevronDown, Clipboard, Layers, LayoutDashboard, Lock, Settings, ShoppingBag, ShoppingCart, User, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MobileNav = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const [ecommerceOpen, setEcommerceOpen] = useState(false)
    return (
        <>

            <div className={`bg-white h-full absolute p-4 flex flex-col gap-5 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                transition-transform duration-300`}>
                <NavItem icon={<LayoutDashboard size={15} />}
                    to='/admin/dashboard'
                    text={'Dashboard'}
                    close={() => setMobileMenuOpen(false)} />
                <div>

                    <button className="
                                flex items-center justify-between gap-3 px-4 py-2 rounded-md
                                text-gray-700 font-medium
                                hover:bg-blue-50 hover:text-blue-600
                                transition"
                        onClick={() => setEcommerceOpen(!ecommerceOpen)}>
                        <span className='flex items-center gap-2'>
                            <ShoppingCart size={15} />  E-commerce
                        </span>
                        <ChevronDown className={`${ecommerceOpen ? "rotate-180" : ""} transition-transform`} />
                    </button>


                    <div className={`${ecommerceOpen ? "h-48 opacity-100" : "h-0 opacity-0"} overflow-hidden transition-all duration-300 pl-5`}>
                        <NavItem icon={<ShoppingBag size={15} />}
                            to='/admin/ecommerce/products'
                            text='Products'
                            close={() => {setEcommerceOpen(false); setMobileMenuOpen(false)}} />

                        <NavItem icon={<Layers size={15} />}
                            to='/admin/ecommerce/categories'
                            text='Categories'
                            close={() => {setEcommerceOpen(false); setMobileMenuOpen(false)}} />

                        <NavItem icon={<Clipboard size={15} />}
                            to='/admin/ecommerce/orders'
                            text='Orders'
                            close={() => {setEcommerceOpen(false); setMobileMenuOpen(false)}} />

                        <NavItem icon={<Wallet size={15} />}
                            to='/admin/ecommerce/payements'
                            text='Payements'
                            close={() => {setEcommerceOpen(false); setMobileMenuOpen(false)}} />
                    </div>
                </div>

                <NavItem icon={<User size={15} />}
                    to='/admin/user-management'
                    text='User Management'
                    close={() => setMobileMenuOpen(false)} />

                <NavItem icon={<Lock size={15} />}
                    to={'/admin/security'}
                    text={'Security'}
                    close={() => setMobileMenuOpen(false)} />

                <NavItem icon={<Settings size={15} />}
                    to='/admin/settings'
                    text={'Settings'}
                    close={() => setMobileMenuOpen(false)} />

            </div>
        </>

    )
}

export default MobileNav

const NavItem = ({ icon, to, text, close }) => {
    return (
        <Link to={to} onClick={close}>
            <div className="
        flex items-center gap-3 px-4 py-2 rounded-md
        text-gray-700 font-medium
        hover:bg-blue-50 hover:text-blue-600
        transition
      ">
                {icon}
                <span>{text}</span>
            </div>
        </Link>
    )
}