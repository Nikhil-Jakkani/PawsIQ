import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDatabase, FaSearch, FaFilter, FaDownload, FaArrowLeft, FaUser, FaCalendarAlt, FaExclamationTriangle, FaCheck, FaSignInAlt, FaSignOutAlt, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Sample data for users
  const users = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Pet Owner' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Pet Owner' },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Service Provider' },
    { id: 4, name: 'Jessica Taylor', email: 'jessica.t@example.com', role: 'Admin' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Moderator' }
  ];

  // Sample data for activity logs
  const activityLogs = [
    { id: 1, userId: 1, user: 'John Smith', action: 'login', details: 'Logged in from IP 192.168.1.1', timestamp: '2023-12-05 09:23:45', status: 'success' },
    { id: 2, userId: 4, user: 'Jessica Taylor', action: 'user_update', details: 'Updated user profile for Sarah Johnson', timestamp: '2023-12-05 10:15:22', status: 'success' },
    { id: 3, userId: 3, user: 'Michael Brown', action: 'appointment_create', details: 'Created new appointment #12345', timestamp: '2023-12-05 11:30:10', status: 'success' },
    { id: 4, userId: 2, user: 'Sarah Johnson', action: 'login', details: 'Failed login attempt from IP 203.0.113.1', timestamp: '2023-12-05 12:45:33', status: 'failed' },
    { id: 5, userId: 5, user: 'Lisa Anderson', action: 'content_moderation', details: 'Removed inappropriate content from post #7890', timestamp: '2023-12-05 13:20:18', status: 'success' },
    { id: 6, userId: 1, user: 'John Smith', action: 'pet_create', details: 'Added new pet profile "Max"', timestamp: '2023-12-05 14:05:42', status: 'success' },
    { id: 7, userId: 4, user: 'Jessica Taylor', action: 'user_delete', details: 'Deleted user account for David Wilson', timestamp: '2023-12-05 15:12:09', status: 'success' },
    { id: 8, userId: 3, user: 'Michael Brown', action: 'logout', details: 'Logged out', timestamp: '2023-12-05 16:30:55', status: 'success' },
    { id: 9, userId: 2, user: 'Sarah Johnson', action: 'payment_process', details: 'Processed payment for appointment #12345', timestamp: '2023-12-05 17:45:20', status: 'failed' },
    { id: 10, userId: 5, user: 'Lisa Anderson', action: 'content_create', details: 'Created new announcement', timestamp: '2023-12-05 18:10:33', status: 'success' },
    { id: 11, userId: 1, user: 'John Smith', action: 'appointment_cancel', details: 'Cancelled appointment #12346', timestamp: '2023-12-06 09:05:12', status: 'success' },
    { id: 12, userId: 4, user: 'Jessica Taylor', action: 'settings_update', details: 'Updated system settings', timestamp: '2023-12-06 10:20:45', status: 'success' },
    { id: 13, userId: 3, user: 'Michael Brown', action: 'login', details: 'Logged in from IP 192.168.1.5', timestamp: '2023-12-06 11:15:30', status: 'success' },
    { id: 14, userId: 2, user: 'Sarah Johnson', action: 'pet_update', details: 'Updated pet profile "Luna"', timestamp: '2023-12-06 12:40:18', status: 'success' },
    { id: 15, userId: 5, user: 'Lisa Anderson', action: 'user_role_update', details: 'Changed role for Robert Martinez to Moderator', timestamp: '2023-12-06 13:55:22', status: 'success' }
  ];

  // Filter activity logs based on search term and filters
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = filterUser === 'all' || log.userId === parseInt(filterUser);
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    // Date filtering
    let matchesDate = true;
    if (filterDateRange === 'custom' && startDate && endDate) {
      const logDate = new Date(log.timestamp.split(' ')[0]);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = logDate >= start && logDate <= end;
    } else if (filterDateRange === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = log.timestamp.startsWith(today);
    } else if (filterDateRange === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      matchesDate = log.timestamp.startsWith(yesterdayStr);
    } else if (filterDateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const logDate = new Date(log.timestamp.split(' ')[0]);
      matchesDate = logDate >= weekAgo;
    }
    
    return matchesSearch && matchesUser && matchesAction && matchesDate;
  });

  // Get unique action types for filter
  const actionTypes = [...new Set(activityLogs.map(log => log.action))];

  // Helper function to get icon for action type
  const getActionIcon = (action) => {
    switch (action) {
      case 'login':
        return <FaSignInAlt className="text-green-500" />;
      case 'logout':
        return <FaSignOutAlt className="text-blue-500" />;
      case 'user_update':
      case 'pet_update':
      case 'settings_update':
      case 'user_role_update':
        return <FaEdit className="text-amber-500" />;
      case 'user_delete':
        return <FaTrash className="text-red-500" />;
      case 'appointment_create':
      case 'pet_create':
      case 'content_create':
        return <FaPlus className="text-indigo-500" />;
      case 'appointment_cancel':
        return <FaExclamationTriangle className="text-orange-500" />;
      case 'content_moderation':
        return <FaEye className="text-purple-500" />;
      case 'payment_process':
        return <FaCheck className="text-green-500" />;
      default:
        return <FaDatabase className="text-gray-500" />;
    }
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
              <p className="text-gray-500">Track and monitor user actions across the platform</p>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            onClick={() => alert('Export functionality would be implemented here')}
          >
            <FaDownload /> Export Logs
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search activity logs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* User Filter */}
              <div>
                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                >
                  <option value="all">All Users</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Action Filter */}
              <div>
                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                >
                  <option value="all">All Actions</option>
                  {actionTypes.map(action => (
                    <option key={action} value={action}>
                      {action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date Range Filter */}
              <div>
                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">Last 7 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            
            {/* Custom Date Range */}
            {filterDateRange === 'custom' && (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    className="pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    className="pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Activity Logs</h2>
            <p className="text-sm text-gray-500 mt-1">Showing {filteredLogs.length} of {activityLogs.length} log entries</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-sm text-gray-900">
                          {log.action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{log.details}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No activity logs found matching your filters.</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{activityLogs.length}</span> logs
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserActivity;