import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="bg-white shadow-inner p-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        {/* Left side */}
        <div className="mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Multi-Shop Admin Panel. All rights reserved.
        </div>

        {/* Center links */}
        <div className="flex gap-4 mb-2 md:mb-0">
          <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition">Help</a>
        </div>

        {/* Right side */}
        <div>
          Version 1.0.0
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
