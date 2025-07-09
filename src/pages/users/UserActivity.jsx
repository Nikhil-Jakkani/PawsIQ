import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaArrowLeft,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaDatabase,
  FaCalendarAlt,
  FaUserCircle,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaTabletAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaUserMinus,
  FaExclamationTriangle,
  FaShieldAlt,
  FaCreditCard,
  FaEnvelope,
  FaBell
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Sample data for activity logs
  const activityLogsData = [
    { 
      id: 1, 
      userId: 1, 
      userName: 'John Smith', 
      userEmail: 'john.smith@example.com',
      action: 'login', 
      description: 'User logged in successfully', 
      timestamp: '2023-12-10T14:30:00Z', 
      ipAddress: '192.168.1.1', 
      device: 'desktop', 
      browser: 'Chrome', 
      location: 'New York, USA' 
    },
    { 
      id: 2, 
      userId: 2, 
      userName: 'Sarah Johnson', 
      userEmail: 'sarah.j@example.com',
      action: 'profile_update', 
      description: 'User updated their profile information', 
      timestamp: '2023-12-10T13:45:00Z', 
      ipAddress: '192.168.1.2', 
      device: 'mobile', 
      browser: 'Safari', 
      location: 'Los Angeles, USA' 
    },
    { 
      id: 3, 
      userId: 3, 
      userName: 'Michael Brown', 
      userEmail: 'michael.b@example.com',
      action: 'password_change', 
      description: 'User changed their password', 
      timestamp: '2023-12-10T12:15:00Z', 
      ipAddress: '192.168.1.3', 
      device: 'tablet', 
      browser: 'Firefox', 
      location: 'Chicago, USA' 
    },
    { 
      id: 4, 
      userId: 4, 
      userName: 'Emily Davis', 
      userEmail: 'emily.d@example.com',
      action: 'registration', 
      description: 'New user registered', 
      timestamp: '2023-12-10T11:30:00Z', 
      ipAddress: '192.168.1.4', 
      device: 'desktop', 
      browser: 'Edge', 
      location: 'Houston, USA' 
    },
    { 
      id: 5, 
      userId: 5, 
      userName: 'David Wilson', 
      userEmail: 'david.w@example.com',
      action: 'logout', 
      description: 'User logged out', 
      timestamp: '2023-12-10T10:45:00Z', 
      ipAddress: '192.168.1.5', 
      device: 'mobile', 
      browser: 'Chrome', 
      location: 'Miami, USA' 
    },
    { 
      id: 6, 
      userId: 6, 
      userName: 'Jessica Taylor', 
      userEmail: 'jessica.t@example.com',
      action: 'pet_added', 
      description: 'User added a new pet to their profile', 
      timestamp: '2023-12-10T09:30:00Z', 
      ipAddress: '192.168.1.6', 
      device: 'desktop', 
      browser: 'Safari', 
      location: 'Seattle, USA' 
    },
    { 
      id: 7, 
      userId: 7, 
      userName: 'Robert Martinez', 
      userEmail: 'robert.m@example.com',
      action: 'appointment_booked', 
      description: 'User booked a new appointment', 
      timestamp: '2023-12-10T08:15:00Z', 
      ipAddress: '192.168.1.7', 
      device: 'mobile', 
      browser: 'Chrome', 
      location: 'Denver, USA' 
    },
    { 
      id: 8, 
      userId: 8, 
      userName: 'Lisa Anderson', 
      userEmail: 'lisa.a@example.com',
      action: 'payment_method_added', 
      description: 'User added a new payment method', 
      timestamp: '2023-12-10T07:30:00Z', 
      ipAddress: '192.168.1.8', 
      device: 'desktop', 
      browser: 'Firefox', 
      location: 'Boston, USA' 
    },
    { 
      id: 9, 
      userId: 9, 
      userName: 'Kevin Thomas', 
      userEmail: 'kevin.t@example.com',
      action: 'account_deactivated', 
      description: 'User deactivated their account', 
      timestamp: '2023-12-10T06:45:00Z', 
      ipAddress: '192.168.1.9', 
      device: 'tablet', 
      browser: 'Safari', 
      location: 'Atlanta, USA' 
    },
    { 
      id: 10, 
      userId: 10, 
      userName: 'Amanda White', 
      userEmail: 'amanda.w@example.com',
      action: 'notification_settings_updated', 
      description: 'User updated notification preferences', 
      timestamp: '2023-12-10T05:30:00Z', 
      ipAddress: '192.168.1.10', 
      device: 'mobile', 
      browser: 'Chrome', 
      location: 'Phoenix, USA' 
    },
    { 
      id: 11, 
      userId: 11, 
      userName: 'Daniel Lee', 
      userEmail: 'daniel.l@example.com',
      action: 'login_failed', 
      description: 'Failed login attempt', 
      timestamp: '2023-12-10T04:15:00Z', 
      ipAddress: '192.168.1.11', 
      device: 'desktop', 
      browser: 'Edge', 
      location: 'Philadelphia, USA' 
    },
    { 
      id: 12, 
      userId: 12, 
      userName: 'Jennifer Clark', 
      userEmail: 'jennifer.c@example.com',
      action: 'email_verified', 
      description: 'User verified their email address', 
      timestamp: '2023-12-10T03:30:00Z', 
      ipAddress: '192.168.1.12', 
      device: 'mobile', 
      browser: 'Safari', 
      location: 'San Diego, USA' 
    }
  ];

  // Get unique users for filter dropdown
  const uniqueUsers = [...new Set(activityLogsData.map(log => log.userName))];

  // Filter and sort activity logs
  const filteredAndSortedLogs = activityLogsData
    .filter(log => {
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAction = filterAction === 'all' || log.action === filterAction;
      const matchesUser = filterUser === 'all' || log.userName === filterUser;
      
      // Date range filtering
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const logDate = new Date(log.timestamp);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Set to end of day
        matchesDateRange = logDate >= startDate && logDate <= endDate;
      }
      
      return matchesSearch && matchesAction && matchesUser && matchesDateRange;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'timestamp') {
        comparison = new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortField === 'userName') {
        comparison = a.userName.localeCompare(b.userName);
      } else if (sortField === 'action') {
        comparison = a.action.localeCompare(b.action);
      } else if (sortField === 'ipAddress') {
        comparison = a.ipAddress.localeCompare(b.ipAddress);
      } else if (sortField === 'location') {
        comparison = a.location.localeCompare(b.location);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1 text-indigo-600" /> : <FaSortDown className="ml-1 text-indigo-600" />;
  };

  // Get icon for action type
  const getActionIcon = (action) => {
    switch (action) {
      case 'login':
        return <FaSignInAlt className="text-green-500" />;
      case 'logout':
        return <FaSignOutAlt className="text-gray-500" />;
      case 'profile_update':
        return <FaEdit className="text-blue-500" />;
      case 'password_change':
        return <FaShieldAlt className="text-purple-500" />;
      case 'registration':
        return <FaUserPlus className="text-indigo-500" />;
      case 'account_deactivated':
        return <FaUserMinus className="text-red-500" />;
      case 'login_failed':
        return <FaExclamationTriangle className="text-amber-500" />;
      case 'pet_added':
        return <FaPlus className="text-green-500" />;
      case 'appointment_booked':
        return <FaCalendarAlt className="text-blue-500" />;
      case 'payment_method_added':
        return <FaCreditCard className="text-purple-500" />;
      case 'notification_settings_updated':
        return <FaBell className="text-amber-500" />;
      case 'email_verified':
        return <FaEnvelope className="text-green-500" />;
      default:
        return <FaDatabase className="text-gray-500" />;
    }
  };

  // Get icon for device type
  const getDeviceIcon = (device) => {
    switch (device) {
      case 'desktop':
        return <FaDesktop className="text-gray-600" />;
      case 'mobile':
        return <FaMobile className="text-gray-600" />;
      case 'tablet':
        return <FaTabletAlt className="text-gray-600" />;
      default:
        return <FaGlobe className="text-gray-600" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/users" className="text-gray-500 hover:text-indigo-600">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Activity Logs</h1>
              <p className="text-gray-500">Track and monitor user activities</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Logs
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Action Filter */}
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="registration">Registration</option>
                <option value="profile_update">Profile Update</option>
                <option value="password_change">Password Change</option>
                <option value="pet_added">Pet Added</option>
                <option value="appointment_booked">Appointment Booked</option>
                <option value="payment_method_added">Payment Method Added</option>
                <option value="account_deactivated">Account Deactivated</option>
                <option value="notification_settings_updated">Notification Settings Updated</option>
                <option value="login_failed">Login Failed</option>
                <option value="email_verified">Email Verified</option>
              </select>
              
              {/* User Filter */}
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              >
                <option value="all">All Users</option>
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>{user}</option>
                ))}
              </select>
            </div>
            
            {/* Date Range */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">From:</label>
                <input
                  type="date"
                  className="pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">To:</label>
                <input
                  type="date"
                  className="pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => {
                  // Apply date filter
                  console.log('Applying date filter:', dateRange);
                }}
              >
                Apply Filter
              </button>
              <button
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setDateRange({ start: '', end: '' });
                }}
              >
                Clear Dates
              </button>
            </div>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('timestamp')}
                  >
                    <div className="flex items-center">
                      Timestamp {getSortIcon('timestamp')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('userName')}
                  >
                    <div className="flex items-center">
                      User {getSortIcon('userName')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('action')}
                  >
                    <div className="flex items-center">
                      Action {getSortIcon('action')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ipAddress')}
                  >
                    <div className="flex items-center">
                      IP Address {getSortIcon('ipAddress')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center">
                      Location {getSortIcon('location')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaUserCircle className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-sm text-gray-500">{log.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-sm text-gray-900 capitalize">{log.action.replace(/_/g, ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">{log.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(log.device)}
                        <span className="text-sm text-gray-900 capitalize">{log.device} - {log.browser}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAndSortedLogs.length}</span> of{' '}
                  <span className="font-medium">{filteredAndSortedLogs.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &laquo;
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &raquo;
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserActivity;