import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaEllipsisH, 
  FaCheck, 
  FaBan, 
  FaTrash, 
  FaEdit, 
  FaUserPlus, 
  FaDownload, 
  FaArrowLeft,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaKey,
  FaUserShield,
  FaEnvelope,
  FaPaw,
  FaCalendarAlt,
  FaSignInAlt
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Sample data for users
  const usersData = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '2 hours ago', registeredDate: '12/05/2023', pets: 2, appointments: 5, phone: '(555) 123-4567', address: '123 Main St, Anytown, CA 12345', verifiedEmail: true, verifiedPhone: true },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '1 day ago', registeredDate: '10/15/2023', pets: 1, appointments: 3, phone: '(555) 234-5678', address: '456 Oak Ave, Somewhere, NY 67890', verifiedEmail: true, verifiedPhone: false },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', type: 'Service Provider', role: 'Vet', status: 'Active', lastActive: '3 hours ago', registeredDate: '11/20/2023', pets: 0, appointments: 12, phone: '(555) 345-6789', address: '789 Pine Rd, Elsewhere, TX 54321', verifiedEmail: true, verifiedPhone: true },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', type: 'Pet Owner', role: 'User', status: 'Pending', lastActive: 'Never', registeredDate: '12/01/2023', pets: 0, appointments: 0, phone: '(555) 456-7890', address: '321 Elm St, Nowhere, FL 13579', verifiedEmail: false, verifiedPhone: false },
    { id: 5, name: 'David Wilson', email: 'david.w@example.com', type: 'Service Provider', role: 'Groomer', status: 'Active', lastActive: '5 hours ago', registeredDate: '09/18/2023', pets: 0, appointments: 8, phone: '(555) 567-8901', address: '654 Maple Dr, Anyplace, WA 24680', verifiedEmail: true, verifiedPhone: true },
    { id: 6, name: 'Jessica Taylor', email: 'jessica.t@example.com', type: 'Staff', role: 'Admin', status: 'Active', lastActive: '1 hour ago', registeredDate: '08/30/2023', pets: 0, appointments: 0, phone: '(555) 678-9012', address: '987 Cedar Ln, Somewhere, IL 97531', verifiedEmail: true, verifiedPhone: true },
    { id: 7, name: 'Robert Martinez', email: 'robert.m@example.com', type: 'Pet Owner', role: 'User', status: 'Suspended', lastActive: '2 weeks ago', registeredDate: '07/12/2023', pets: 3, appointments: 0, phone: '(555) 789-0123', address: '246 Birch Ct, Elsewhere, GA 86420', verifiedEmail: true, verifiedPhone: true },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', type: 'Staff', role: 'Moderator', status: 'Active', lastActive: '4 hours ago', registeredDate: '10/05/2023', pets: 0, appointments: 0, phone: '(555) 890-1234', address: '135 Walnut Ave, Nowhere, MI 75319', verifiedEmail: true, verifiedPhone: true },
    { id: 9, name: 'Kevin Thomas', email: 'kevin.t@example.com', type: 'Service Provider', role: 'Pet Sitter', status: 'Active', lastActive: '6 hours ago', registeredDate: '11/10/2023', pets: 0, appointments: 4, phone: '(555) 901-2345', address: '864 Spruce St, Anytown, OR 42086', verifiedEmail: true, verifiedPhone: false },
    { id: 10, name: 'Amanda White', email: 'amanda.w@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '12 hours ago', registeredDate: '10/22/2023', pets: 2, appointments: 2, phone: '(555) 012-3456', address: '753 Fir Rd, Somewhere, AZ 31975', verifiedEmail: true, verifiedPhone: true },
    { id: 11, name: 'Daniel Lee', email: 'daniel.l@example.com', type: 'Service Provider', role: 'Trainer', status: 'Pending', lastActive: 'Never', registeredDate: '12/02/2023', pets: 0, appointments: 0, phone: '(555) 123-4567', address: '159 Aspen Ln, Elsewhere, CO 86420', verifiedEmail: false, verifiedPhone: false },
    { id: 12, name: 'Jennifer Clark', email: 'jennifer.c@example.com', type: 'Pet Owner', role: 'User', status: 'Active', lastActive: '2 days ago', registeredDate: '09/15/2023', pets: 1, appointments: 1, phone: '(555) 234-5678', address: '357 Redwood Dr, Nowhere, NV 75319', verifiedEmail: true, verifiedPhone: true }
  ];

  // Filter and sort users
  const filteredAndSortedUsers = usersData
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
      const matchesType = filterType === 'all' || user.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesRole && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else if (sortField === 'type') {
        comparison = a.type.localeCompare(b.type);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'registeredDate') {
        // Simple date comparison for demo purposes
        const dateA = new Date(a.registeredDate.split('/').reverse().join('/'));
        const dateB = new Date(b.registeredDate.split('/').reverse().join('/'));
        comparison = dateA - dateB;
      } else if (sortField === 'pets') {
        comparison = a.pets - b.pets;
      } else if (sortField === 'appointments') {
        comparison = a.appointments - b.appointments;
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

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredAndSortedUsers.map(user => user.id));
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

  // Handle view user details
  const handleViewUser = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
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
                placeholder="Search users by name, email, phone..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      User {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                    <div className="flex items-center">
                      Type {getSortIcon('type')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('role')}>
                    <div className="flex items-center">
                      Role {getSortIcon('role')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('pets')}>
                    <div className="flex items-center">
                      Pets {getSortIcon('pets')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('appointments')}>
                    <div className="flex items-center">
                      Appts {getSortIcon('appointments')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('registeredDate')}>
                    <div className="flex items-center">
                      Registered {getSortIcon('registeredDate')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedUsers.map((user) => (
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
                      {user.pets}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.registeredDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="View User"
                          onClick={() => handleViewUser(user)}
                        >
                          <FaEye />
                        </button>
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
                        <div className="relative group">
                          <button className="text-gray-500 hover:text-gray-700" title="More Options">
                            <FaEllipsisH />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`Reset password for ${user.name}`)}
                            >
                              Reset Password
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`View activity for ${user.name}`)}
                            >
                              View Activity
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`Delete user ${user.name}`)}
                            >
                              Delete User
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
          
          {filteredAndSortedUsers.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No users found matching your filters.</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredAndSortedUsers.length}</span> of <span className="font-medium">{usersData.length}</span> users
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

      {/* User Details Modal */}
      {showUserModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowUserModal(false);
                  setCurrentUser(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Info */}
              <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-indigo-600 font-bold text-2xl">{currentUser.name.charAt(0)}{currentUser.name.split(' ')[1]?.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{currentUser.name}</h3>
                  <p className="text-gray-500">{currentUser.email}</p>
                  <div className="mt-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${currentUser.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        currentUser.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {currentUser.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUserShield className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">User Type</p>
                      <p className="font-medium">{currentUser.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaUserShield className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{currentUser.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium flex items-center">
                        {currentUser.email}
                        {currentUser.verifiedEmail && (
                          <span className="ml-1 text-green-500 text-xs">(Verified)</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium flex items-center">
                        {currentUser.phone}
                        {currentUser.verifiedPhone && (
                          <span className="ml-1 text-green-500 text-xs">(Verified)</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{currentUser.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Registered</p>
                      <p className="font-medium">{currentUser.registeredDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="font-medium">{currentUser.lastActive}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <FaEdit /> Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FaKey /> Reset Password
                  </button>
                </div>
              </div>
              
              {/* User Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-indigo-600">{currentUser.pets}</p>
                    <p className="text-sm text-indigo-800">Pets</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">{currentUser.appointments}</p>
                    <p className="text-sm text-green-800">Appointments</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-amber-600">0</p>
                    <p className="text-sm text-amber-800">Reviews</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-600">0</p>
                    <p className="text-sm text-blue-800">Support Tickets</p>
                  </div>
                </div>
                
                {/* Pets */}
                {currentUser.type === 'Pet Owner' && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Pets</h3>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
                    </div>
                    {currentUser.pets > 0 ? (
                      <div className="p-4">
                        <div className="space-y-3">
                          {[...Array(currentUser.pets)].map((_, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <FaPaw className="text-indigo-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{['Max', 'Luna', 'Buddy', 'Bella', 'Charlie'][index % 5]}</p>
                                <p className="text-sm text-gray-500">{['Dog', 'Cat', 'Dog', 'Cat', 'Dog'][index % 5]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">No pets registered</div>
                    )}
                  </div>
                )}
                
                {/* Appointments */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Recent Appointments</h3>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
                  </div>
                  {currentUser.appointments > 0 ? (
                    <div className="p-4">
                      <div className="space-y-3">
                        {[...Array(Math.min(currentUser.appointments, 3))].map((_, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <FaCalendarAlt className="text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{['Vet Checkup', 'Grooming', 'Training Session', 'Pet Sitting', 'Vaccination'][index % 5]}</p>
                              <p className="text-sm text-gray-500">{['Dec 15, 2023', 'Dec 10, 2023', 'Dec 5, 2023', 'Nov 30, 2023', 'Nov 25, 2023'][index % 5]}</p>
                            </div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${['bg-green-100 text-green-800', 'bg-blue-100 text-blue-800', 'bg-amber-100 text-amber-800'][index % 3]}`}>
                              {['Completed', 'Upcoming', 'Pending'][index % 3]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No appointments found</div>
                  )}
                </div>
                
                {/* Activity Log */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                          <FaSignInAlt className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Logged in</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <FaEdit className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Updated profile information</p>
                          <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <FaCalendarAlt className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Booked an appointment</p>
                          <p className="text-sm text-gray-500">Dec 1, 2023 at 10:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowUserModal(false);
                  setCurrentUser(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserProfiles;