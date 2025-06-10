import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import { FaBell, FaSearch, FaUser } from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-64">
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          <p>© 2025 PawsIQ Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;