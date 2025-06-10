import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaDog, FaCat } from 'react-icons/fa'; // Keeping some relevant icons
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        console.log('Login successful, navigating to dashboard');
        // The navigation will happen automatically through the route protection in App.jsx
      } else {
        console.log('Login failed');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Main Login Box Container */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 transform transition-all duration-300 hover:scale-[1.01]">
        
        {/* Header with Logo and Title */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-8 rounded-t-2xl -mx-8 -mt-8 px-8 sm:-mx-12 sm:-mt-12 sm:px-12 relative flex flex-col items-center justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
          
          <div className="bg-white p-4 rounded-full shadow-lg mb-4">
            {/* Using the uploaded image as the icon */}
            <img 
              src="/PawsIQ_logo.jpg" // Assuming the image is in the public folder
              alt="PawsIQ Logo" 
              className="w-20 h-20 object-contain" 
            />
          </div>
          
          <h2 className="text-center text-3xl font-extrabold text-white">
            PawsIQ Admin
          </h2>
          <p className="text-center text-indigo-200 text-sm mt-2">Your Pet Care Platform</p>
          
          <div className="flex justify-center mt-4 gap-4">
            <FaDog className="text-indigo-300 text-xl" />
            <FaCat className="text-indigo-300 text-xl" />
          </div>
        </div>
        
        {/* Login Form Section */}
        <div className="p-8"> {/* Adjusted padding for consistency */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-6">Sign in to manage your pet care platform</p>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start">
              <div className="mr-2 mt-0.5">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>{error}</div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-indigo-500" />
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-indigo-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200"
                  placeholder="admin@pawsiq.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaLock className="mr-2 text-indigo-500" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-indigo-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
              >
                {/* Simplified loading icon to just the text */}
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
          
          {/* Demo Credentials Section */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-indigo-500 font-medium">
                  Demo Credentials
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;