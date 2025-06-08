import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaArrowLeft, FaDog, FaCat, FaBone, FaFish } from 'react-icons/fa';
import { PetIcon, PetIconButton } from '../components/layout/PetIcons';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4 relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <FaPaw className="absolute top-[10%] left-[15%] text-indigo-200 w-8 h-8 transform rotate-12" />
        <FaPaw className="absolute top-[15%] left-[25%] text-indigo-200 w-6 h-6 transform rotate-45" />
        <FaPaw className="absolute top-[25%] left-[10%] text-indigo-200 w-10 h-10 transform rotate-12" />
        <FaPaw className="absolute top-[40%] left-[20%] text-indigo-200 w-8 h-8 transform rotate-45" />
        
        <FaPaw className="absolute top-[10%] right-[15%] text-indigo-200 w-8 h-8 transform -rotate-12" />
        <FaPaw className="absolute top-[20%] right-[25%] text-indigo-200 w-6 h-6 transform -rotate-45" />
        <FaPaw className="absolute top-[30%] right-[10%] text-indigo-200 w-10 h-10 transform -rotate-12" />
        <FaPaw className="absolute top-[45%] right-[20%] text-indigo-200 w-8 h-8 transform -rotate-45" />
        
        <FaPaw className="absolute bottom-[10%] left-[30%] text-indigo-200 w-8 h-8 transform rotate-12" />
        <FaPaw className="absolute bottom-[20%] left-[15%] text-indigo-200 w-6 h-6 transform rotate-45" />
        
        <FaPaw className="absolute bottom-[15%] right-[25%] text-indigo-200 w-8 h-8 transform -rotate-12" />
        <FaPaw className="absolute bottom-[25%] right-[10%] text-indigo-200 w-6 h-6 transform -rotate-45" />
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center relative z-10 border border-indigo-100">
        <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaPaw className="text-indigo-600 text-5xl animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold text-indigo-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
        
        <div className="flex justify-center gap-4 mb-6">
          <FaDog className="text-indigo-400 text-2xl animate-bounce-slow" />
          <FaCat className="text-purple-400 text-2xl animate-wiggle" />
          <FaBone className="text-blue-400 text-2xl animate-pulse" />
          <FaFish className="text-green-400 text-2xl animate-bounce-slow" />
        </div>
        
        <p className="text-gray-600 mb-8">
          It looks like this page has run away like a playful puppy! Don't worry, we can help you find your way back.
        </p>
        
        <Link to="/admin/dashboard">
          <PetIconButton 
            type="dog" 
            variant="primary" 
            label="Back to Dashboard" 
            size="lg"
            className="mx-auto"
          />
        </Link>
        
        <div className="mt-6 text-indigo-400 text-sm flex items-center justify-center gap-2">
          <FaPaw className="w-3 h-3 transform rotate-12" />
          <span>PawsIQ Admin</span>
          <FaPaw className="w-3 h-3 transform -rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;