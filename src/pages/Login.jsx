import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaDog, FaCat } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/icons/logo.jpg';

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
    <div className="min-h-screen w-full bg-indigo-900 bg-paw-pattern flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative Icons */}
      <div className="absolute top-10 left-10 text-indigo-300 opacity-20 animate-bounce-slow z-0">
        <FaDog className="w-16 h-16" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-300 opacity-20 animate-pulse z-0">
        <FaCat className="w-12 h-12" />
      </div>

      {/* Login Box */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-lg p-8 sm:p-12 z-10 overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-6 rounded-t-3xl -mx-8 -mt-8 px-8 sm:-mx-12 sm:-mt-12 sm:px-12 flex flex-col items-center justify-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 transform translate-x-10 -translate-y-10" />
          
          <div className="bg-white p-4 rounded-full shadow-lg mb-4">
            <img src={logoImage} alt="PawsIQ Logo" className="w-20 h-20 object-contain" />
          </div>

          <h2 className="text-3xl font-extrabold">PawsIQ Admin</h2>
          <p className="text-indigo-200 text-sm mt-2">Your Pet Care Platform</p>
        </div>

        {/* Login Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back!</h2>
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
                <FaEnvelope className="mr-2 text-indigo-500" /> Email address
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
                <FaLock className="mr-2 text-indigo-500" /> Password
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
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <div className="text-sm">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset functionality would be implemented here');
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
            >
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
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={() => alert('Sign up functionality would be implemented here')}
              className="text-indigo-600 hover:text-indigo-500 font-medium border-none bg-transparent p-0"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;