import { useState } from 'react';
import { FaBell, FaSearch, FaEnvelope, FaQuestionCircle, FaPaw, FaBone, FaDog, FaCat } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { PetIcon, PetIconButton } from './PetIcons';

const Header = () => {
  const { currentUser } = useAuth();
  const [notifications] = useState(3);
  const [messages] = useState(5);

  return (
    <header className="bg-white shadow-md h-20 fixed top-0 right-0 left-72 z-10 rounded-bl-2xl">
      <div className="flex items-center justify-between h-full px-8">
        <div className="w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for pets, users, appointments..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
              <FaSearch />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <FaPaw className="text-indigo-300 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="relative">
            <button className="p-3 rounded-full hover:bg-indigo-50 transition-colors bg-indigo-100 text-indigo-600">
              <FaBell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          
          <div className="relative">
            <button className="p-3 rounded-full hover:bg-indigo-50 transition-colors bg-indigo-100 text-indigo-600">
              <FaEnvelope className="w-5 h-5" />
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {messages}
                </span>
              )}
            </button>
          </div>
          
          <button className="p-3 rounded-full hover:bg-indigo-50 transition-colors bg-indigo-100 text-indigo-600">
            <FaQuestionCircle className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 ml-4 bg-indigo-50 px-4 py-2 rounded-full">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <span className="font-medium text-gray-800">{currentUser?.name || 'Admin User'}</span>
              <div className="flex items-center gap-1 text-xs text-indigo-500">
                <FaPaw className="w-3 h-3" />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cute pet paw prints decoration */}
      <div className="absolute bottom-0 left-8 flex items-center gap-1 opacity-20">
        <FaPaw className="text-indigo-400 w-3 h-3 transform rotate-12" />
        <FaPaw className="text-indigo-500 w-4 h-4 transform -rotate-12" />
        <FaPaw className="text-indigo-600 w-3 h-3 transform rotate-45" />
        <FaPaw className="text-indigo-700 w-2 h-2 transform -rotate-25" />
      </div>
      
      {/* Quick action buttons */}
      <div className="absolute bottom-0 right-8 transform translate-y-1/2">
        <div className="flex items-center gap-2">
          <PetIconButton type="dog" variant="primary" label="New Appointment" size="sm" />
          <PetIconButton type="cat" variant="secondary" label="Add User" size="sm" />
        </div>
      </div>
    </header>
  );
};

export default Header;