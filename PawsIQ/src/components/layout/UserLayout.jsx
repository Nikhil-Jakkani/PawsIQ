import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserSidebar from './UserSidebar';
import { FaBell, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';

const UserLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const { currentUser, logout } = useAuth();
  
  // Check if sidebar is minimized on component mount
  useEffect(() => {
    const savedMinimizedState = localStorage.getItem('userSidebarMinimized');
    if (savedMinimizedState !== null) {
      setSidebarMinimized(JSON.parse(savedMinimizedState));
    }
  }, []);
  
  // Listen for changes to the minimized state in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const minimizedState = localStorage.getItem('userSidebarMinimized');
      if (minimizedState !== null) {
        setSidebarMinimized(JSON.parse(minimizedState));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userSidebarMinimizedChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userSidebarMinimizedChange', handleStorageChange);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
          ${sidebarMinimized ? 'lg:ml-20' : 'lg:ml-72'}`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-300 w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-pink-600 transition-colors">
              <FaShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="relative p-2 text-gray-500 hover:text-pink-600 transition-colors">
              <FaBell size={20} />
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <FaUser className="text-pink-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {currentUser?.name || 'Pet Owner'}
              </span>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          <p>© 2025 PawsIQ. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;