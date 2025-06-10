import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaSearch, FaFilter, FaEllipsisH, FaCheck, FaBan, FaTrash, FaEdit, FaUserPlus, FaDownload, FaArrowLeft } from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Sample data for users
  const usersData = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '2 hours ago', registeredDate: '12/05/2023', pets: 2, appointments: 5 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '1 day ago', registeredDate: '10/15/2023', pets: 1, appointments: 3 },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', type: 'Service Provider', role: 'Vet', status: 'Active', lastActive: '3 hours ago', registeredDate: '11/20/2023', pets: 0, appointments: 12 },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', type: 'Pet Owner', role: 'User', status: 'Pending', lastActive: 'Never', registeredDate: '12/01/2023', pets: 0, appointments: 0 },
    { id: 5, name: 'David Wilson', email: 'david.w@example.com', type: 'Service Provider', role: 'Groomer', status: 'Active', lastActive: '5 hours ago', registeredDate: '09/18/2023', pets: 0, appointments: 8 },
    { id: 6, name: 'Jessica Taylor', email: 'jessica.t@example.com', type: 'Staff', role: 'Admin', status: 'Active', lastActive: '1 hour ago', registeredDate: '08/30/2023', pets: 0, appointments: 0 },
    { id: 7, name: 'Robert Martinez', email: 'robert.m@example.com', type: 'Pet Owner', role: 'User', status: 'Suspended', lastActive: '2 weeks ago', registeredDate: '07/12/2023', pets: 3, appointments: 0 },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', type: 'Staff', role: 'Moderator', status: 'Active', lastActive: '4 hours ago', registeredDate: '10/05/2023', pets: 0, appointments: 0 },
    { id: 9, name: 'Kevin Thomas', email: 'kevin.t@example.com', type: 'Service Provider', role: 'Pet Sitter', status: 'Active', lastActive: '6 hours ago', registeredDate: '11/10/2023', pets: 0, appointments: 4 },
    { id: 10, name: 'Amanda White', email: 'amanda.w@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '12 hours ago', registeredDate: '10/22/2023', pets: 2, appointments: 2 },
    { id: 11, name: 'Daniel Lee', email: 'daniel.l@example.com', type: 'Service Provider', role: 'Trainer', status: 'Pending', lastActive: 'Never', registeredDate: '12/02/2023', pets: 0, appointments: 0 },
    { id: 12, name: 'Jennifer Clark', email: 'jennifer.c@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '2 days ago', registeredDate: '09/15/2023', pets: 1, appointments: 1 }
  ];

  // Filter users based on search term and filters
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
    const matchesType = filterType === 'all' || user.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesRole && matchesType;
  });

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual user selection
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    // In a real app, you would call an API to perform the action
    alert(`${action} action would be performed on ${selectedUsers.length} users`);
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
              <h1 className="text-2xl font-bold text-gray-800">User Profiles</h1>
              <p className="text-gray-500">View and manage all user accounts</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              onClick={() => alert('Add new user functionality would be implemented here')}
            >
              <FaUserPlus /> Add New User
            </button>
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pet owner">Pet Owners</option>
                <option value="service provider">Service Providers</option>
                <option value="staff">Staff</option>
              </select>
              
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="vet">Vets</option>
                <option value="groomer">Groomers</option>
                <option value="pet sitter">Pet Sitters</option>
                <option value="trainer">Trainers</option>
                <option value="admin">Admins</option>
                <option value="moderator">Moderators</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-indigo-700 font-medium">
              {selectedUsers.length} users selected
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-700 transition-colors"
                onClick={() => handleBulkAction('Approve')}
              >
                <FaCheck size={12} /> Approve
              </button>
              <button 
                className="px-3 py-1.5 bg-amber-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-amber-700 transition-colors"
                onClick={() => handleBulkAction('Suspend')}
              >
                <FaBan size={12} /> Suspend
              </button>
              <button 
                className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-red-700 transition-colors"
                onClick={() => handleBulkAction('Delete')}
              >
                <FaTrash size={12} /> Delete
              </button>
              <button 
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setSelectedUsers([]);
                  setSelectAll(false);
                }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* User List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                          user.role === 'Moderator' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'Vet' || user.role === 'Groomer' || user.role === 'Pet Sitter' || user.role === 'Trainer' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.registeredDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.pets}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="Edit User"
                          onClick={() => alert(`Edit user ${user.name}`)}
                        >
                          <FaEdit />
                        </button>
                        {user.status === 'Active' ? (
                          <button 
                            className="text-red-600 hover:text-red-900" 
                            title="Suspend User"
                            onClick={() => alert(`Suspend user ${user.name}`)}
                          >
                            <FaBan />
                          </button>
                        ) : user.status === 'Suspended' ? (
                          <button 
                            className="text-green-600 hover:text-green-900" 
                            title="Activate User"
                            onClick={() => alert(`Activate user ${user.name}`)}
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button 
                            className="text-green-600 hover:text-green-900" 
                            title="Approve User"
                            onClick={() => alert(`Approve user ${user.name}`)}
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Delete User"
                          onClick={() => alert(`Delete user ${user.name}`)}
                        >
                          <FaTrash />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-500 hover:text-gray-700" title="More Options">
                            <FaEllipsisH />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`View profile for ${user.name}`)}
                            >
                              View Full Profile
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`View activity for ${user.name}`)}
                            >
                              View Activity
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`Reset password for ${user.name}`)}
                            >
                              Reset Password
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`Impersonate ${user.name}`)}
                            >
                              Login as User
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No users found matching your filters.</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{usersData.length}</span> users
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

export default UserProfiles;