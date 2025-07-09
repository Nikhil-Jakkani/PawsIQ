import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaPaw, FaGoogle, FaFacebook, FaApple, FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ec4899'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const UserLogin = () => {
  const [email, setEmail] = useState('user@pawsiq.com');
  const [password, setPassword] = useState('user123');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, error: authError, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Hide loading screen when Login component mounts
  useEffect(() => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }, []);
  
  // Check if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/user/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Handle auth errors
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/user/dashboard');
      } else {
        setLocalError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setLocalError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 p-3 rounded-full">
              <img src={logoImage} alt="PawsIQ Logo" className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome to PawsIQ</h1>
          <p className="text-center text-gray-600 mb-6">Sign in to your pet owner account</p>
          
          {localError && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {localError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-pink-600 hover:text-pink-700">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-sm hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <FaPaw />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaFacebook className="text-blue-600" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaApple className="text-gray-800" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            Don't have an account?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a 
              href="#" 
              className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1"
            >
              <FaPaw size={12} />
              Create a Pet Owner Account
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link 
              to="/provider/signup" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <FaStethoscope size={12} />
              Join as a Provider
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="text-white opacity-10 text-9xl">
          <FaPaw className="absolute bottom-10 left-10 transform rotate-12" />
          <FaPaw className="absolute bottom-40 left-1/4 transform -rotate-12" />
          <FaPaw className="absolute bottom-20 left-1/2 transform rotate-45" />
          <FaPaw className="absolute bottom-60 left-3/4 transform -rotate-45" />
          <FaPaw className="absolute bottom-5 right-10 transform rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;