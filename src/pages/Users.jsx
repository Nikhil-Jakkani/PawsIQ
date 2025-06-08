import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEllipsisV, FaFilter, FaDownload, FaPaw, FaDog, FaCat, FaFish } from 'react-icons/fa';
import { PetIcon, PetIconButton, PetBadge } from '../components/layout/PetIcons';

// Enhanced mock data for users with pet types
const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Pet Owner',
    status: 'active',
    pets: 2,
    petTypes: ['dog', 'cat'],
    joinDate: '2023-01-15',
    lastActive: '2023-06-07',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Pet Owner',
    status: 'active',
    pets: 1,
    petTypes: ['dog'],
    joinDate: '2023-02-20',
    lastActive: '2023-06-08',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Pet Owner',
    status: 'inactive',
    pets: 3,
    petTypes: ['cat', 'fish', 'bird'],
    joinDate: '2023-03-10',
    lastActive: '2023-05-25',
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    role: 'Pet Owner',
    status: 'active',
    pets: 1,
    petTypes: ['cat'],
    joinDate: '2023-04-05',
    lastActive: '2023-06-06',
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@example.com',
    role: 'Pet Owner',
    status: 'active',
    pets: 2,
    petTypes: ['dog', 'rabbit'],
    joinDate: '2023-04-15',
    lastActive: '2023-06-08',
  },
  {
    id: 6,
    name: 'Jennifer Garcia',
    email: 'jennifer.g@example.com',
    role: 'Pet Owner',
    status: 'pending',
    pets: 1,
    petTypes: ['hamster'],
    joinDate: '2023-05-20',
    lastActive: '2023-06-01',
  },
  {
    id: 7,
    name: 'Robert Martinez',
    email: 'robert.m@example.com',
    role: 'Pet Owner',
    status: 'active',
    pets: 4,
    petTypes: ['dog', 'cat', 'fish', 'turtle'],
    joinDate: '2023-05-25',
    lastActive: '2023-06-07',
  },
];

const Users = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get a random pastel color based on the first letter of the name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-indigo-400 to-indigo-500',
      'bg-gradient-to-br from-purple-400 to-purple-500',
      'bg-gradient-to-br from-blue-400 to-blue-500',
      'bg-gradient-to-br from-green-400 to-green-500',
      'bg-gradient-to-br from-yellow-400 to-yellow-500',
      'bg-gradient-to-br from-red-400 to-red-500',
      'bg-gradient-to-br from-pink-400 to-pink-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaUsers className="text-indigo-600 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Pet Owners</h1>
          </div>
          <p className="text-gray-500 mt-1">Manage all pet owners on the platform</p>
        </div>
        <PetIconButton 
          type="dog" 
          variant="primary" 
          label="Add New Pet Owner" 
          size="md"
          className="shadow-md"
        />
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-indigo-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="Search pet owners by name or email..."
              className="pl-11 pr-4 py-3 border border-indigo-100 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <FaPaw className="text-indigo-200 animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <PetIconButton 
              type="cat" 
              variant="secondary" 
              label="Filter" 
              size="md"
            />
            <PetIconButton 
              type="fish" 
              variant="secondary" 
              label="Export" 
              size="md"
            />
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-indigo-50">
          <div className="bg-indigo-50 rounded-lg p-3 flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FaUsers className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-indigo-600">Total Owners</p>
              <p className="text-lg font-bold text-indigo-900">{users.length}</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FaDog className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-green-600">Dog Owners</p>
              <p className="text-lg font-bold text-green-900">
                {users.filter(user => user.petTypes.includes('dog')).length}
              </p>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <FaCat className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-purple-600">Cat Owners</p>
              <p className="text-lg font-bold text-purple-900">
                {users.filter(user => user.petTypes.includes('cat')).length}
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaFish className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-blue-600">Other Pets</p>
              <p className="text-lg font-bold text-blue-900">
                {users.filter(user => 
                  user.petTypes.some(type => !['dog', 'cat'].includes(type))
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-50">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-100">
            <thead className="bg-indigo-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Pet Owner
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Pets
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-12 w-12 rounded-full ${getAvatarColor(user.name)} flex items-center justify-center text-white font-medium shadow-md`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm text-gray-900 font-medium">{user.pets} pets</div>
                      <div className="flex gap-1">
                        {user.petTypes.map((petType, index) => (
                          <PetBadge key={index} type={petType} label={petType} variant="primary" size="xs" />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors">
                        <FaTrash />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-indigo-50">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <FaPaw className="text-indigo-400 w-3 h-3" />
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> pet owners
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px overflow-hidden" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-indigo-100 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-100 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-indigo-100 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pet owner insights */}
      <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <FaPaw className="text-indigo-600" />
          Pet Owner Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <FaDog />
              <h3 className="font-medium">Most Active</h3>
            </div>
            <p className="text-gray-600 text-sm">Pet owners with dogs tend to be the most active users, logging in 3x more frequently than other pet owners.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <FaCat />
              <h3 className="font-medium">Booking Trends</h3>
            </div>
            <p className="text-gray-600 text-sm">Cat owners book grooming services 2x less frequently than dog owners, but use veterinary services at similar rates.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <PetIcon type="rabbit" />
              <h3 className="font-medium">Retention</h3>
            </div>
            <p className="text-gray-600 text-sm">Owners with multiple pets have a 78% higher retention rate and spend 2.3x more on the platform annually.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;