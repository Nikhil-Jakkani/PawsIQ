import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaPaw, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaCreditCard, 
  FaCommentAlt, 
  FaBell, 
  FaCog, 
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaClipboardList,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLock,
  FaHeadset,
  FaAngleLeft,
  FaAngleRight,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ec4899'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [minimized, setMinimized] = useState(false);
  
  // Load minimized state from localStorage on component mount
  useEffect(() => {
    const savedMinimizedState = localStorage.getItem('userSidebarMinimized');
    if (savedMinimizedState !== null) {
      setMinimized(JSON.parse(savedMinimizedState));
    }
  }, []);
  
  // Toggle minimized state and save to localStorage
  const toggleMinimized = () => {
    const newMinimizedState = !minimized;
    setMinimized(newMinimizedState);
    localStorage.setItem('userSidebarMinimized', JSON.stringify(newMinimizedState));
    
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new CustomEvent('userSidebarMinimizedChange'));
  };
  
  const menuCategories = [
    {
      id: 'dashboard',
      icon: <FaHome />,
      label: 'Dashboard',
      path: '/user/dashboard',
      items: []
    },
    {
      id: 'pets',
      icon: <FaPaw />,
      label: 'My Pets',
      path: '/user/pets',
      items: [
        { path: '/user/pets/add', icon: <FaPaw />, label: 'Add a Pet' },
        { path: '/user/pets/profiles', icon: <FaUser />, label: 'Pet Profiles' },
        { path: '/user/pets/health', icon: <FaHeart />, label: 'Health Records' }
      ]
    },
    {
      id: 'appointments',
      icon: <FaCalendarAlt />,
      label: 'Appointments',
      path: '/user/appointments',
      items: [
        { path: '/user/appointments/new', icon: <FaCalendarAlt />, label: 'Book Appointment' },
        { path: '/user/appointments/upcoming', icon: <FaClipboardList />, label: 'Upcoming' },
        { path: '/user/appointments/history', icon: <FaClipboardList />, label: 'History' }
      ]
    },
    {
      id: 'services',
      icon: <FaMapMarkerAlt />,
      label: 'Find Services',
      path: '/user/services',
      items: [
        { path: '/user/services/vets', icon: <FaHeart />, label: 'Veterinarians' },
        { path: '/user/services/grooming', icon: <FaPaw />, label: 'Grooming' },
        { path: '/user/services/sitting', icon: <FaHome />, label: 'Pet Sitting' },
        { path: '/user/services/training', icon: <FaClipboardList />, label: 'Training' }
      ]
    },
    {
      id: 'marketplace',
      icon: <FaShoppingCart />,
      label: 'Shop',
      path: '/user/marketplace',
      items: [
        { path: '/user/marketplace/food', icon: <FaShoppingCart />, label: 'Pet Food' },
        { path: '/user/marketplace/toys', icon: <FaShoppingCart />, label: 'Toys & Accessories' },
        { path: '/user/marketplace/health', icon: <FaHeart />, label: 'Health Products' }
      ]
    },
    {
      id: 'orders',
      icon: <FaClipboardList />,
      label: 'My Orders',
      path: '/user/orders',
      items: []
    },
    {
      id: 'payments',
      icon: <FaCreditCard />,
      label: 'Payments',
      path: '/user/payments',
      items: [
        { path: '/user/payments/methods', icon: <FaCreditCard />, label: 'Payment Methods' },
        { path: '/user/payments/history', icon: <FaClipboardList />, label: 'Payment History' }
      ]
    },
    {
      id: 'community',
      icon: <FaCommentAlt />,
      label: 'Community',
      path: '/user/community',
      items: [
        { path: '/user/community/forum', icon: <FaCommentAlt />, label: 'Pet Forums' },
        { path: '/user/community/events', icon: <FaCalendarAlt />, label: 'Pet Events' }
      ]
    },
    {
      id: 'notifications',
      icon: <FaBell />,
      label: 'Notifications',
      path: '/user/notifications',
      items: []
    },
    {
      id: 'settings',
      icon: <FaCog />,
      label: 'Settings',
      path: '/user/settings',
      items: [
        { path: '/user/settings/profile', icon: <FaUser />, label: 'Profile Settings' },
        { path: '/user/settings/notifications', icon: <FaBell />, label: 'Notification Settings' },
        { path: '/user/settings/security', icon: <FaLock />, label: 'Security' }
      ]
    },
    {
      id: 'help',
      icon: <FaQuestionCircle />,
      label: 'Help & Support',
      path: '/user/help',
      items: [
        { path: '/user/help/faq', icon: <FaQuestionCircle />, label: 'FAQs' },
        { path: '/user/help/contact', icon: <FaEnvelope />, label: 'Contact Us' },
        { path: '/user/help/support', icon: <FaHeadset />, label: 'Support Tickets' }
      ]
    }
  ];

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  // Check if a category or any of its items is active
  const isCategoryActive = (category) => {
    if (location.pathname === category.path) return true;
    return category.items.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-pink-600 text-white shadow-lg"
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
      <div 
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-pink-600 to-purple-600 text-white z-20 transition-all duration-300 ease-in-out shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${minimized ? 'w-20 lg:w-20' : 'w-72'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className={`p-4 border-b border-pink-500 flex items-center ${minimized ? 'justify-center' : 'gap-3'}`}>
            <div className="bg-white p-2 rounded-full">
              <img src={logoImage} alt="PawsIQ Logo" className="w-8 h-8 object-contain" />
            </div>
            {!minimized && (
              <div>
                <h1 className="text-xl font-bold flex items-center">
                  PawsIQ
                </h1>
              </div>
            )}
          </div>
          
          {/* Minimize toggle button */}
          <button 
            onClick={toggleMinimized}
            className="absolute top-4 right-0 transform translate-x-1/2 bg-pink-500 text-white p-1 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
          >
            {minimized ? <FaAngleRight size={16} /> : <FaAngleLeft size={16} />}
          </button>
          
          {/* Navigation Links - with scrollbar */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-700">
            <ul className="space-y-1 py-2">
              {menuCategories.map((category) => (
                <li key={category.id} className={minimized ? "px-1" : "px-2"}>
                  {/* Category header */}
                  <div 
                    className={`flex items-center ${minimized ? 'justify-center' : 'justify-between'} 
                      ${minimized ? 'px-2' : 'px-3'} py-2 rounded-md cursor-pointer
                      ${isCategoryActive(category) ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
                    onClick={() => minimized ? null : toggleCategory(category.id)}
                    title={minimized ? category.label : ""}
                  >
                    {minimized ? (
                      <span className={`text-white text-xl ${isCategoryActive(category) ? 'text-white' : ''}`}>
                        {category.icon}
                      </span>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-white">{category.icon}</span>
                          <span className="font-medium">{category.label}</span>
                        </div>
                        {category.items.length > 0 && (
                          <span className="text-white">
                            {expandedCategory === category.id ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Subcategory items - only show when not minimized */}
                  {!minimized && category.items.length > 0 && expandedCategory === category.id && (
                    <ul className="mt-1 ml-6 space-y-1 border-l border-pink-400 pl-2">
                      {category.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md
                              ${location.pathname === item.path 
                                ? 'bg-white bg-opacity-20 text-white' 
                                : 'text-white hover:bg-white hover:bg-opacity-10'}`}
                          >
                            <span className="text-white">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile & Logout */}
          <div className="border-t border-pink-500 text-white">
            {minimized ? (
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mb-2">
                  <FaUser className="text-white" />
                </div>
                <button 
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="text-xs text-white hover:text-pink-200 transition-colors mt-2"
                  title="Logout"
                >
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            ) : (
              <div className="p-4 flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <FaUser className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {currentUser?.email || 'Pet Owner'}
                  </p>
                  <button 
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                    className="text-xs text-white hover:text-pink-200 transition-colors flex items-center gap-1 mt-1"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
            {!minimized && (
              <div className="px-4 pb-4 text-xs text-pink-100">
                <p>© 2025 PawsIQ</p>
                <p className="mt-1">Version 1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;