import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaHospital, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaCreditCard, 
  FaCommentAlt, 
  FaChartBar, 
  FaBell, 
  FaCog, 
  FaShieldAlt, 
  FaQuestionCircle,
  FaPaw,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/icons/logo.jpg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const menuItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/users', icon: <FaUsers />, label: 'Users' },
    { path: '/providers', icon: <FaHospital />, label: 'Providers' },
    { path: '/appointments', icon: <FaCalendarAlt />, label: 'Appointments & Bookings' },
    { path: '/marketplace', icon: <FaShoppingCart />, label: 'Marketplace' },
    { path: '/transactions', icon: <FaCreditCard />, label: 'Transactions & Payments' },
    { path: '/content', icon: <FaCommentAlt />, label: 'Content Moderation' },
    { path: '/analytics', icon: <FaChartBar />, label: 'Analytics' },
    { path: '/notifications', icon: <FaBell />, label: 'Notifications' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
    { path: '/security', icon: <FaShieldAlt />, label: 'Security & Logs' },
    { path: '/support', icon: <FaQuestionCircle />, label: 'Support & Tickets' },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-indigo-600 text-white shadow-lg"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-indigo-900 text-white z-20 transition-all duration-300 ease-in-out shadow-xl overflow-y-auto
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo and Title */}
        <div className="p-4 border-b border-indigo-800 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <img src={logoImage} alt="PawsIQ Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              PawsIQ Admin
            </h1>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-indigo-800 transition-colors
                    ${location.pathname === item.path ? 'bg-indigo-700 border-l-4 border-white' : ''}`}
                >
                  <span className="text-indigo-300">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-indigo-800 text-indigo-300">
          <div className="p-4 flex items-center gap-3">
            <div className="bg-indigo-800 p-2 rounded-full">
              <FaUser className="text-indigo-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white truncate">
                {/* {currentUser?.email || 'Admin User'} */}
              </p>
              <button 
                onClick={logout}
                className="text-xs text-indigo-300 hover:text-white transition-colors flex items-center gap-1 mt-1"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            </div>
          </div>
          <div className="px-4 pb-4 text-xs">
            <p>© 2025 PawsIQ Admin</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;