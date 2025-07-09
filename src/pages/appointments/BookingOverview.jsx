import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CalendarView from '../../components/dashboard/CalendarView';
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTimes, 
  FaCheck,
  FaExclamationTriangle,
  FaClock,
  FaMoneyBillWave,
  FaPercent,
  FaDownload,
  FaEye,
  FaCalendarCheck,
  FaCalendarTimes,
  FaUserClock,
  FaExclamationCircle,
  FaArrowRight
} from 'react-icons/fa';

const BookingOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  // Sample booking data
  const bookingStats = {
    totalBookings: 1247,
    upcomingBookings: 156,
    completedToday: 23,
    noShows: 8,
    cancellations: 12,
    disputes: 3
  };

  const recentBookings = [
    {
      id: 'BK001',
      customerName: 'Sarah Johnson',
      petName: 'Buddy',
      service: 'Dog Walking',
      provider: 'Mike Thompson',
      date: '2025-06-15',
      time: '10:00 AM',
      status: 'Confirmed',
      price: 25.00
    },
    {
      id: 'BK002',
      customerName: 'John Smith',
      petName: 'Whiskers',
      service: 'Pet Grooming',
      provider: 'Pet Spa Plus',
      date: '2025-06-16',
      time: '2:00 PM',
      status: 'In Progress',
      price: 85.00
    },
    {
      id: 'BK003',
      customerName: 'Emily Davis',
      petName: 'Max',
      service: 'Veterinary Checkup',
      provider: 'Dr. Anderson',
      date: '2024-01-14',
      time: '3:30 PM',
      status: 'No Show',
      price: 120.00
    }
  ];

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Confirmed': { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaCalendarCheck },
      'In Progress': { bg: 'bg-green-100', text: 'text-green-800', icon: FaClock },
      'Completed': { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaCheck },
      'Cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: FaCalendarTimes },
      'No Show': { bg: 'bg-orange-100', text: 'text-orange-800', icon: FaUserClock },
      'Disputed': { bg: 'bg-purple-100', text: 'text-purple-800', icon: FaExclamationCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Confirmed'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaCalendarAlt className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Booking Overview</h1>
            </div>
            <p className="text-gray-500 mt-1">Real-time view of all bookings and appointments</p>
          </div>
          <Link 
            to="/appointments"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            View All Bookings <FaArrowRight />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <p className="text-xl font-bold text-gray-800">{bookingStats.totalBookings}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <FaCalendarAlt className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-xl font-bold text-blue-600">{bookingStats.upcomingBookings}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaCalendarCheck className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Today</p>
                <p className="text-xl font-bold text-green-600">{bookingStats.completedToday}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheck className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">No Shows</p>
                <p className="text-xl font-bold text-orange-600">{bookingStats.noShows}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <FaUserClock className="text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cancellations</p>
                <p className="text-xl font-bold text-red-600">{bookingStats.cancellations}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaCalendarTimes className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Disputes</p>
                <p className="text-xl font-bold text-purple-600">{bookingStats.disputes}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaExclamationCircle className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              to="/appointments" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaCalendarAlt className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">All Bookings</h3>
                <p className="text-sm text-gray-500">View and manage all bookings</p>
              </div>
            </Link>
            
            <button 
              onClick={() => alert('Opening calendar view...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaCalendarCheck className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Calendar View</h3>
                <p className="text-sm text-gray-500">View bookings in calendar</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Opening no-show tracking...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
            >
              <div className="bg-orange-100 p-3 rounded-full">
                <FaUserClock className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">No-Show Tracking</h3>
                <p className="text-sm text-gray-500">Track and manage no-shows</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Opening dispute resolution...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaExclamationCircle className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Dispute Resolution</h3>
                <p className="text-sm text-gray-500">Handle booking disputes</p>
              </div>
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarView />
          
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
                <Link 
                  to="/appointments"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
            </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer & Pet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service & Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">#{booking.id}</div>
                      <div className="text-sm text-gray-500">{booking.date} at {booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">Pet: {booking.petName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                      <div className="text-sm text-gray-500">{booking.provider}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${booking.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Viewing details for booking ${booking.id}`)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => alert(`Editing booking ${booking.id}`)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingOverview;