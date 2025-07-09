import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaUserShield, 
  FaUserCog, 
  FaDatabase, 
  FaSearch, 
  FaFilter, 
  FaEllipsisH, 
  FaCheck, 
  FaBan, 
  FaTrash, 
  FaEdit,
  FaUserPlus,
  FaDownload,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import DashboardLayout from '../components/layout/DashboardLayout';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Sample data for user statistics
  const userStats = {
    totalUsers: 5842,
    activeUsers: 5650,
    pendingApproval: 24,
    suspendedUsers: 8
  };

  // Sample data for users
  const usersData = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Pet Owner', status: 'Active', lastActive: '2 hours ago', registeredDate: '12/05/2023', pets: 2 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Pet Owner', status: 'Active', lastActive: '1 day ago', registeredDate: '10/15/2023', pets: 1 },
    { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', role: 'Service Provider', status: 'Active', lastActive: '3 hours ago', registeredDate: '11/20/2023', pets: 0 },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', role: 'Pet Owner', status: 'Pending', lastActive: 'Never', registeredDate: '12/01/2023', pets: 0 },
    { id: 5, name: 'David Wilson', email: 'david.w@example.com', role: 'Service Provider', status: 'Active', lastActive: '5 hours ago', registeredDate: '09/18/2023', pets: 0 },
    { id: 6, name: 'Jessica Taylor', email: 'jessica.t@example.com', role: 'Admin', status: 'Active', lastActive: '1 hour ago', registeredDate: '08/30/2023', pets: 0 },
    { id: 7, name: 'Robert Martinez', email: 'robert.m@example.com', role: 'Pet Owner', status: 'Suspended', lastActive: '2 weeks ago', registeredDate: '07/12/2023', pets: 3 },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Moderator', status: 'Active', lastActive: '4 hours ago', registeredDate: '10/05/2023', pets: 0 }
  ];

  // Filter and sort users
  const filteredAndSortedUsers = usersData
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesRole;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'registeredDate') {
        // Simple date comparison for demo purposes
        comparison = new Date(a.registeredDate) - new Date(b.registeredDate);
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaUsers className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            </div>
            <p className="text-gray-500 mt-1">View and manage all user accounts</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Create a CSV string from the filtered users
                const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Last Active', 'Registered Date', 'Pets'];
                const csvRows = [headers];
                
                filteredAndSortedUsers.forEach(user => {
                  csvRows.push([
                    user.id,
                    user.name,
                    user.email,
                    user.role,
                    user.status,
                    user.lastActive,
                    user.registeredDate,
                    user.pets
                  ]);
                });
                
                const csvString = csvRows.map(row => row.join(',')).join('\n');
                
                // Create a Blob and download link
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `users-report-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FaDownload /> Export
            </button>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              onClick={() => {
                // Show a modal or form to add a new user
                const name = prompt("Enter user name:");
                if (!name) return;
                
                const email = prompt("Enter user email:");
                if (!email) return;
                
                const role = prompt("Enter user role (Pet Owner, Service Provider, Admin, Moderator):", "Pet Owner");
                if (!role) return;
                
                // In a real app, this would send data to an API
                console.log("Adding new user:", { name, email, role });
                alert(`User ${name} added successfully!`);
                
                // Simulate adding the user to the list
                // In a real app, this would be handled by state management after API response
                const newUser = {
                  id: usersData.length + 1,
                  name,
                  email,
                  role,
                  status: 'Pending',
                  lastActive: 'Never',
                  registeredDate: new Date().toLocaleDateString(),
                  pets: 0
                };
                
                // This is just for demonstration - in a real app you would update state properly
                console.log("New user object:", newUser);
              }}
            >
              <FaUserPlus /> Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{userStats.totalUsers}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaUsers className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{userStats.activeUsers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheck className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{userStats.pendingApproval}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FaUserCog className="text-amber-600 text-xl" />
              </div>
            </div>
            <button 
              className="text-xs text-amber-600 mt-2 inline-block hover:underline"
              onClick={() => setFilterStatus('pending')}
            >
              Review pending users →
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Suspended Users</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{userStats.suspendedUsers}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaBan className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/users/profiles" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaUsers className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">User Profiles</h3>
                <p className="text-sm text-gray-500">View and manage all user accounts</p>
              </div>
            </Link>
            
            <Link 
              to="/users/roles" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUserShield className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">User Roles</h3>
                <p className="text-sm text-gray-500">Assign and manage user permissions</p>
              </div>
            </Link>
            
            <Link 
              to="/users/activity" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaDatabase className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Activity Logs</h3>
                <p className="text-sm text-gray-500">View user activity and audit logs</p>
              </div>
            </Link>
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
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="pet owner">Pet Owners</option>
                <option value="service provider">Service Providers</option>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                          user.role === 'Moderator' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'Service Provider' ? 'bg-green-100 text-green-800' :
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
    </DashboardLayout>
  );
};

export default Users;