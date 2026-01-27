import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';

import AdminNav from '../components/common/AdminNav';
import AdminFooter from '../components/common/AdminFooter';
import MobileNav from '../components/common/MobileNav';

const AdminLayout = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean); // remove empty strings
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Desktop Header */}
            <div className='bg-white/80 backdrop-blur-sm shadow sticky top-0 z-50 w-full'>
                <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Mobile Header */}
                <div className="lg:hidden w-1/2 h-full fixed z-60">
                    <MobileNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block col-span-1">
                    <AdminNav />
                </aside>

                {/* Main Content */}
                <main className="col-span-4 w-full px-4 lg:px-10 py-6 relative">

                    {mobileMenuOpen && (
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-black/40 z-30"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    )}

                    {/* Breadcrumbs */}
                    <div className="mb-4 p-2 bg-white rounded shadow-sm text-gray-600 text-sm flex flex-wrap gap-1 relative z-20">
                        {pathSegments.map((segment, idx) => (
                            <span key={idx} className="capitalize font-semibold">
                                {segment.replace('-', ' ')}
                                {idx < pathSegments.length - 1 && <span className="mx-1 text-gray-400">/</span>}
                            </span>
                        ))}
                    </div>

                    {/* Page content */}
                    <div className="bg-white p-5 rounded-lg shadow-md min-h-[60vh] relative z-20">
                        <Outlet />
                    </div>

                    {/* Footer */}
                    <div className="mt-10 relative z-20">
                        <AdminFooter />
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
