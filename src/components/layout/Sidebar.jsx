import React, { useState, useEffect } from 'react';
import { FaStethoscope, FaCut, FaGraduationCap, FaDog, FaShieldAlt, FaPercentage, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  FaQuestionCircle,
  FaPaw,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaIdCard,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBoxOpen,
  FaEnvelope,
  FaLock,
  FaHeadset,
  FaDatabase,
  FaEdit,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaTag,
  FaComments,
  FaChartLine,
  FaWrench,
  FaUserShield,
  FaTicketAlt,
  FaToggleOn,
  FaFileAlt,
  FaChevronDown,
  FaChevronRight,
  FaAngleLeft,
  FaAngleRight,
  FaBook
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/icons/logo.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [minimized, setMinimized] = useState(false);
  
  // Load minimized state from localStorage on component mount
  useEffect(() => {
    const savedMinimizedState = localStorage.getItem('sidebarMinimized');
    if (savedMinimizedState !== null) {
      setMinimized(JSON.parse(savedMinimizedState));
    }
  }, []);
  
  // Toggle minimized state and save to localStorage
  const toggleMinimized = () => {
    const newMinimizedState = !minimized;
    setMinimized(newMinimizedState);
    localStorage.setItem('sidebarMinimized', JSON.stringify(newMinimizedState));
    
    // Dispatch a custom event to notify other components about the change
    window.dispatchEvent(new CustomEvent('sidebarMinimizedChange'));
  };
  
  const menuCategories = [
    {
      id: 'dashboard',
      icon: <FaHome />,
      label: 'Dashboard',
      path: '/dashboard',
      items: []
    },
    {
      id: 'users',
      icon: <FaUsers />,
      label: 'User Management',
      path: '/users',
      items: [
        { path: '/users/profiles', icon: <FaIdCard />, label: 'User Profiles' },
        { path: '/users/roles', icon: <FaUserShield />, label: 'User Roles' },
        // { path: '/users/activity', icon: <FaDatabase />, label: 'Activity Logs' }
      ]
    },
    {
      id: 'providers',
      icon: <FaHospital />,
      label: 'Provider Management',
      path: '/providers',
      items: [
        { path: '/providers/onboarding/veterinarian', icon: <FaStethoscope />, label: 'Vet Onboarding' },
        { path: '/providers/onboarding/groomer', icon: <FaCut />, label: 'Groomer Onboarding' },
        { path: '/providers/onboarding/trainer', icon: <FaGraduationCap />, label: 'Trainer Onboarding' },
        { path: '/providers/onboarding/pet-sitter', icon: <FaDog />, label: 'Pet Sitter Onboarding' },
        { path: '/providers/verification', icon: <FaShieldAlt />, label: 'Verification' },
        { path: '/providers/commission', icon: <FaPercentage />, label: 'Commission' },
        { path: '/providers/performance', icon: <FaStar />, label: 'Performance' },
        { path: '/providers/flags', icon: <FaExclamationTriangle />, label: 'Flags' },
      ]
    },
    {
      id: 'pets',
      icon: <FaPaw />,
      label: 'Pet Profiles',
      path: '/pets',
      items: [
        { path: '/pets/profiles', icon: <FaIdCard />, label: 'View Profiles' },
        { path: '/pets/moderation', icon: <FaEdit />, label: 'Content Moderation' },
        { path: '/pets/lost', icon: <FaExclamationTriangle />, label: 'Lost Pet Reports' }
      ]
    },
    {
      id: 'appointments',
      icon: <FaCalendarAlt />,
      label: 'Booking Management',
      path: '/appointments',
      items: [
        { path: '/appointments/overview', icon: <FaCalendarCheck />, label: 'Booking Overview' },
        { path: '/appointments/scheduler', icon: <FaCalendarAlt />, label: 'Appointment Scheduler' },
        { path: '/appointments', icon: <FaEdit />, label: 'All Bookings' },
        { path: '/appointments/disputes', icon: <FaExclamationTriangle />, label: 'Disputes & No-shows' },
        { path: '/appointments/pricing', icon: <FaTag />, label: 'Pricing & Discounts' }
      ]
    },
    {
      id: 'transactions',
      icon: <FaCreditCard />,
      label: 'Payments & Transactions',
      path: '/transactions',
      items: [
        { path: '/transactions/payments', icon: <FaMoneyBillWave />, label: 'Manage Payments' },
        { path: '/transactions/reports', icon: <FaFileInvoiceDollar />, label: 'Financial Reports' },
        { path: '/transactions', icon: <FaCreditCard />, label: 'All Transactions' },
        { path: '/transactions/pricing', icon: <FaTag />, label: 'Subscription Pricing' },
        { path: '/transactions/refunds', icon: <FaMoneyBillWave />, label: 'Refunds & Credits' },
        { path: '/transactions/balances', icon: <FaCreditCard />, label: 'Outstanding Balances' }
      ]
    },
    {
      id: 'marketplace',
      icon: <FaShoppingCart />,
      label: 'Marketplace',
      path: '/marketplace',
      items: [
        { path: '/marketplace/products', icon: <FaBoxOpen />, label: 'Products & Services' },
        { path: '/marketplace/sellers', icon: <FaUsers />, label: 'Seller Management' },
        { path: '/marketplace', icon: <FaShoppingCart />, label: 'All Marketplace' },
        { path: '/marketplace/inventory', icon: <FaBoxOpen />, label: 'Inventory Management' },
        { path: '/marketplace/promotions', icon: <FaTag />, label: 'Promotions & Discounts' }
      ]
    },
    // {
    //   id: 'content',
    //   icon: <FaCommentAlt />,
    //   label: 'Content Moderation',
    //   path: '/content',
    //   items: [
    //     { path: '/content/approval', icon: <FaClipboardCheck />, label: 'Content Approval' },
    //     { path: '/content/social', icon: <FaComments />, label: 'Social Features' },
    //     { path: '/content/lost-found', icon: <FaExclamationTriangle />, label: 'Lost & Found' },
    //     { path: '/content/filters', icon: <FaShieldAlt />, label: 'Content Filters' }
    //   ]
    // },
    {
      id: 'analytics',
      icon: <FaChartBar />,
      label: 'Analytics & Reporting',
      path: '/analytics',
      items: [
        { path: '/analytics/dashboard', icon: <FaChartLine />, label: 'Metrics Dashboard' },
        { path: '/analytics/reports', icon: <FaFileInvoiceDollar />, label: 'Custom Reports' }
      ]
    },
    {
      id: 'notifications',
      icon: <FaBell />,
      label: 'Notifications',
      path: '/notifications',
      items: [
        { path: '/notifications/push', icon: <FaBell />, label: 'Push Notifications' },
        { path: '/notifications/email', icon: <FaEnvelope />, label: 'Email Campaigns' },
        { path: '/notifications/reminders', icon: <FaCalendarCheck />, label: 'Automated Reminders' }
      ]
    },
    {
      id: 'settings',
      icon: <FaCog />,
      label: 'Settings',
      path: '/settings',
      items: [
        { path: '/settings/app', icon: <FaWrench />, label: 'App Settings' },
        { path: '/settings/features', icon: <FaToggleOn />, label: 'Feature Controls' },
        { path: '/settings/legal', icon: <FaFileAlt />, label: 'Legal Documents' }
      ]
    },
    // {
    //   id: 'security',
    //   icon: <FaLock />,
    //   label: 'Security & Compliance',
    //   path: '/security',
    //   items: [
    //     { path: '/security/2fa', icon: <FaLock />, label: 'Two-Factor Auth' },
    //     { path: '/security/roles', icon: <FaUserShield />, label: 'Access Control' },
    //     { path: '/security/audit', icon: <FaDatabase />, label: 'Audit Logs' },
    //     { path: '/security/compliance', icon: <FaShieldAlt />, label: 'GDPR/CCPA Tools' }
    //   ]
    // },
    {
      id: 'support',
      icon: <FaHeadset />,
      label: 'Customer Support',
      path: '/support',
      items: [
        { path: '/support/tickets', icon: <FaTicketAlt />, label: 'Support Tickets' },
        { path: '/support/chat', icon: <FaComments />, label: 'Live Chat' },
        { path: '/support/knowledge', icon: <FaBook />, label: 'Knowledge Base' },
        { path: '/support/disputes', icon: <FaExclamationTriangle />, label: 'Dispute Resolution' },
        { path: '/support/assignment', icon: <FaUsers />, label: 'Ticket Assignment' }
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

  // Handle category click - navigate or expand
  const handleCategoryClick = (category) => {
    // If category has no subitems, navigate directly
    if (category.items.length === 0) {
      navigate(category.path);
      return;
    }
    
    // If sidebar is minimized, navigate to main category page
    if (minimized) {
      navigate(category.path);
      return;
    }
    
    // Otherwise, toggle expansion
    toggleCategory(category.id);
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
      <div 
        className={`fixed top-0 left-0 h-full bg-indigo-900 text-white z-20 transition-all duration-300 ease-in-out shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${minimized ? 'w-20 lg:w-20' : 'w-72'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className={`p-4 border-b border-indigo-800 flex items-center ${minimized ? 'justify-center' : 'gap-3'}`}>
            <div className="bg-white p-2 rounded-full">
              <img src={logoImage} alt="PawsIQ Logo" className="w-8 h-8 object-contain" />
            </div>
            {!minimized && (
              <div>
                <h1 className="text-xl font-bold flex items-center">
                  PawsIQ Admin
                </h1>
              </div>
            )}
          </div>
          
          {/* Minimize toggle button */}
          <button 
            onClick={toggleMinimized}
            className="absolute top-4 right-0 transform translate-x-1/2 bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          >
            {minimized ? <FaAngleRight size={16} /> : <FaAngleLeft size={16} />}
          </button>
          
          {/* Navigation Links - with scrollbar */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-900">
            <ul className="space-y-1 py-2">
              {menuCategories.map((category) => (
                <li key={category.id} className={minimized ? "px-1" : "px-2"}>
                  {/* Category header */}
                  <div 
                    className={`flex items-center ${minimized ? 'justify-center' : 'justify-between'} 
                      ${minimized ? 'px-2' : 'px-3'} py-2 rounded-md cursor-pointer
                      ${isCategoryActive(category) ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800'}`}
                    onClick={() => handleCategoryClick(category)}
                    title={minimized ? category.label : ""}
                  >
                    {minimized ? (
                      <span className={`text-indigo-300 text-xl ${isCategoryActive(category) ? 'text-white' : ''}`}>
                        {category.icon}
                      </span>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-indigo-300">{category.icon}</span>
                          <span className="font-medium">{category.label}</span>
                        </div>
                        {category.items.length > 0 && (
                          <span className="text-indigo-300">
                            {expandedCategory === category.id ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Subcategory items - only show when not minimized */}
                  {!minimized && category.items.length > 0 && expandedCategory === category.id && (
                    <ul className="mt-1 ml-6 space-y-1 border-l border-indigo-700 pl-2">
                      {category.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md
                              ${location.pathname === item.path 
                                ? 'bg-indigo-700 text-white' 
                                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}
                          >
                            <span className="text-indigo-300">{item.icon}</span>
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
          <div className="border-t border-indigo-800 text-indigo-300">
            {minimized ? (
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="bg-indigo-800 p-2 rounded-full mb-2">
                  <FaUser className="text-indigo-300" />
                </div>
                <button 
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="text-xs text-indigo-300 hover:text-white transition-colors mt-2"
                  title="Logout"
                >
                  <FaSignOutAlt size={16} />
                </button>
              </div>
            ) : (
              <div className="p-4 flex items-center gap-3">
                <div className="bg-indigo-800 p-2 rounded-full">
                  <FaUser className="text-indigo-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {currentUser?.email || 'Admin User'}
                  </p>
                  <button 
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                    className="text-xs text-indigo-300 hover:text-white transition-colors flex items-center gap-1 mt-1"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
            {!minimized && (
              <div className="px-4 pb-4 text-xs">
                <p>© 2025 PawsIQ Admin</p>
                <p className="mt-1">Version 1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;