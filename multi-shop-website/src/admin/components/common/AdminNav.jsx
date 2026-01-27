import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ClipboardList,
  Layers,
  LayoutDashboard,
  Lock,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User2,
  Wallet
} from 'lucide-react';

const AdminNav = () => {
  const location = useLocation();
  const [openEcommerce, setOpenEcommerce] = useState(false);

  // Determine active link based on current route
  const getActive = (path) => location.pathname.includes(path);

  return (
    <aside className="fixed left-0  h-screen w-64 bg-white shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={getActive('dashboard')}
        />

        {/* E-Commerce Dropdown */}
        <div className="flex flex-col gap-1">
          <button
            className={`flex justify-between items-center w-full py-2 px-3 rounded text-sm font-semibold hover:bg-gray-200 transition ${
              openEcommerce ? 'bg-green-100 text-green-600' : 'text-gray-800'
            }`}
            onClick={() => setOpenEcommerce(!openEcommerce)}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={20} /> E-Commerce
            </span>
            <ChevronDown size={16} className={`${openEcommerce ? 'rotate-180' : ''} transition-transform`} />
          </button>

          {openEcommerce && (
            <div className="flex flex-col pl-6 mt-1 gap-1">
              <NavLink
                to="/admin/ecommerce/products"
                icon={<ShoppingBag size={18} />}
                label="Products"
                active={getActive('products')}
              />
              <NavLink
                to="/admin/ecommerce/categories"
                icon={<Layers size={18} />}
                label="Categories"
                active={getActive('categories')}
              />
              <NavLink
                to="/admin/ecommerce/orders"
                icon={<ClipboardList size={18} />}
                label="Orders"
                active={getActive('orders')}
              />
              <NavLink
                to="/admin/ecommerce/payements"
                icon={<Wallet size={18} />}
                label="Payments"
                active={getActive('payements')}
              />
            </div>
          )}
        </div>

        {/* Users */}
        <NavLink
          to="/admin/user-management"
          icon={<User2 size={20} />}
          label="User Management"
          active={getActive('user-management')}
        />

        {/* Security */}
        <NavLink
          to="/admin/security"
          icon={<Lock size={20} />}
          label="Security"
          active={getActive('security')}
        />

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          icon={<Settings size={20} />}
          label="Settings"
          active={getActive('settings')}
        />
      </nav>
    </aside>
  );
};

// Reusable NavLink component
const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} className="w-full">
    <div
      className={`flex items-center gap-2 py-2 px-3 rounded text-sm font-semibold cursor-pointer transition hover:bg-gray-200 ${
        active ? 'bg-green-100 text-green-600' : 'text-gray-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  </Link>
);

export default AdminNav;
