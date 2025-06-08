import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaLock, FaEnvelope, FaDog, FaCat, FaBone, FaFish, FaFeather } from 'react-icons/fa';
import { GiDogBowl, GiCat, GiSittingDog } from 'react-icons/gi';
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
      const success = login(email, password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative pet icons */}
      <div className="absolute top-10 left-10 text-indigo-300 opacity-20 animate-bounce-slow">
        <FaDog className="w-16 h-16" />
      </div>
      <div className="absolute top-20 right-20 text-purple-300 opacity-20 animate-pulse">
        <FaCat className="w-12 h-12" />
      </div>
      <div className="absolute bottom-10 left-20 text-blue-300 opacity-20 animate-pulse">
        <FaFish className="w-14 h-14" />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-300 opacity-20 animate-bounce-slow">
        <FaBone className="w-10 h-10" />
      </div>
      
      {/* Paw print trail */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <FaPaw className="absolute top-[10%] left-[15%] text-white opacity-5 w-8 h-8 transform rotate-12" />
        <FaPaw className="absolute top-[15%] left-[18%] text-white opacity-5 w-8 h-8 transform rotate-45" />
        <FaPaw className="absolute top-[20%] left-[21%] text-white opacity-5 w-8 h-8 transform rotate-12" />
        <FaPaw className="absolute top-[25%] left-[24%] text-white opacity-5 w-8 h-8 transform rotate-45" />
        <FaPaw className="absolute top-[30%] left-[27%] text-white opacity-5 w-8 h-8 transform rotate-12" />
        <FaPaw className="absolute top-[35%] left-[30%] text-white opacity-5 w-8 h-8 transform rotate-45" />
        <FaPaw className="absolute top-[40%] left-[33%] text-white opacity-5 w-8 h-8 transform rotate-12" />
        
        <FaPaw className="absolute top-[60%] right-[15%] text-white opacity-5 w-8 h-8 transform -rotate-12" />
        <FaPaw className="absolute top-[65%] right-[18%] text-white opacity-5 w-8 h-8 transform -rotate-45" />
        <FaPaw className="absolute top-[70%] right-[21%] text-white opacity-5 w-8 h-8 transform -rotate-12" />
        <FaPaw className="absolute top-[75%] right-[24%] text-white opacity-5 w-8 h-8 transform -rotate-45" />
        <FaPaw className="absolute top-[80%] right-[27%] text-white opacity-5 w-8 h-8 transform -rotate-12" />
      </div>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-6 px-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 transform translate-x-10 -translate-y-10"></div>
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <FaPaw className="text-indigo-600 text-4xl" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold text-white">
            PawsIQ Admin
          </h2>
          <p className="text-center text-indigo-200 text-sm mt-1">Pet Care Platform</p>
          
          <div className="flex justify-center mt-2 gap-3">
            <FaDog className="text-indigo-300" />
            <FaCat className="text-indigo-300" />
            <FaFish className="text-indigo-300" />
            <FaFeather className="text-indigo-300" />
          </div>
        </div>
        
        <div className="p-8">
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
                  className="w-full pl-10 pr-12 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="admin@pawsiq.com"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaDog className="text-indigo-200" />
                </div>
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
                  className="w-full pl-10 pr-12 py-3 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaCat className="text-indigo-200" />
                </div>
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
                <FaPaw className={`${isLoading ? 'animate-spin' : 'animate-pulse'}`} />
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
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
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                  <FaDog />
                  <p className="font-semibold">Admin</p>
                </div>
                <p className="text-gray-600">admin@pawsiq.com</p>
                <p className="text-gray-600">admin123</p>
              </div>
              <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                  <FaCat />
                  <p className="font-semibold">User</p>
                </div>
                <p className="text-gray-600">user@pawsiq.com</p>
                <p className="text-gray-600">user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;