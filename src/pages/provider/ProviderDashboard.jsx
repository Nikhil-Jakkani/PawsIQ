import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUserFriends, 
  FaChartLine, 
  FaClipboardList, 
  FaBell, 
  FaCog, 
  FaSignOutAlt,
  FaPaw,
  FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProviderDashboard = () => {
  const { currentUser, logout, isProvider } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in or not a provider
  useEffect(() => {
    if (!currentUser) {
      navigate('/provider/login');
    } else if (!isProvider()) {
      // If logged in but not as a provider, redirect to appropriate dashboard
      if (currentUser.role === 'user') {
        navigate('/user/dashboard');
      } else if (currentUser.role === 'admin') {
        navigate('/dashboard');
      }
    }
  }, [currentUser, navigate, isProvider]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Mock data for the dashboard
  const upcomingAppointments = [
    { id: 1, date: '2023-07-22', time: '10:00 AM', client: 'Sarah Johnson', pet: 'Max (Golden Retriever)', service: 'Checkup' },
    { id: 2, date: '2023-07-22', time: '2:30 PM', client: 'Michael Chen', pet: 'Luna (Siamese Cat)', service: 'Vaccination' },
    { id: 3, date: '2023-07-23', time: '11:15 AM', client: 'Emma Wilson', pet: 'Charlie (Labrador)', service: 'Dental Cleaning' }
  ];
  
  const recentReviews = [
    { id: 1, client: 'David Miller', rating: 5, comment: 'Dr. Wilson was amazing with my anxious dog. Very patient and knowledgeable!', date: '2023-07-20' },
    { id: 2, client: 'Jessica Lee', rating: 4, comment: 'Great service, but had to wait a bit longer than expected.', date: '2023-07-18' }
  ];
  
  // If still loading or not authenticated, show loading
  if (!currentUser || !isProvider()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FaPaw className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">PawsIQ Provider</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <FaBell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <span className="mr-2">{currentUser.name}</span>
                {currentUser.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  {currentUser.avatar ? (
                    <img
                      className="h-16 w-16 rounded-full"
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                  ) : (
                    <FaUserCircle className="h-16 w-16 text-gray-400" />
                  )}
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{currentUser.name}</h2>
                    <p className="text-sm text-gray-500">{currentUser.providerType}</p>
                  </div>
                </div>
              </div>
              <nav className="py-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex items-center px-6 py-2 text-sm font-medium text-indigo-600 bg-indigo-50">
                      <FaChartLine className="mr-3 h-5 w-5" />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <FaCalendarAlt className="mr-3 h-5 w-5 text-gray-400" />
                      Appointments
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <FaUserFriends className="mr-3 h-5 w-5 text-gray-400" />
                      Clients
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <FaClipboardList className="mr-3 h-5 w-5 text-gray-400" />
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <FaCog className="mr-3 h-5 w-5 text-gray-400" />
                      Settings
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-6 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <FaSignOutAlt className="mr-3 h-5 w-5" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome message */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.name}!</h2>
                <p className="text-gray-600">
                  Here's what's happening with your {currentUser.providerType.toLowerCase()} practice today.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <FaCalendarAlt className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">3</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <FaUserFriends className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">42</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-pink-100 rounded-md p-3">
                      <FaChartLine className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">This Month's Revenue</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">$3,240</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Appointments */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                        <p className="text-sm text-gray-500">{appointment.pet}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{appointment.date} at {appointment.time}</p>
                        <p className="text-sm text-gray-500">{appointment.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-right">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all appointments
                </a>
              </div>
            </div>
            
            {/* Recent Reviews */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentReviews.map((review) => (
                  <div key={review.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{review.client}</p>
                          <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.585l-7.07 3.707 1.35-7.87-5.72-5.573 7.91-1.149L10 0l3.53 7.7 7.91 1.149-5.72 5.573 1.35 7.87L10 15.585z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-right">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;