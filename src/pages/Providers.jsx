import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHospital, 
  FaClipboardCheck, 
  FaShieldAlt, 
  FaPercentage, 
  FaStar, 
  FaExclamationTriangle, 
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
  FaSortDown,
  FaStethoscope,
  FaCut,
  FaDog,
  FaGraduationCap,
  FaPaw,
  FaTimes
} from 'react-icons/fa';
import DashboardLayout from '../components/layout/DashboardLayout';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Sample data for provider statistics
  const providerStats = {
    totalProviders: 842,
    activeProviders: 750,
    pendingApproval: 42,
    flaggedProviders: 8
  };

  // Sample data for providers
  const providersData = [
    { id: 1, name: 'Dr. James Wilson', email: 'james.wilson@example.com', type: 'Veterinarian', specialty: 'Small Animals', status: 'Active', rating: 4.8, reviews: 124, lastActive: '2 hours ago', registeredDate: '12/05/2023', appointments: 35, commission: '15%', verified: true },
    { id: 2, name: 'Emma Thompson', email: 'emma.t@example.com', type: 'Groomer', specialty: 'Dogs', status: 'Active', rating: 4.6, reviews: 98, lastActive: '1 day ago', registeredDate: '10/15/2023', appointments: 28, commission: '12%', verified: true },
    { id: 3, name: 'Dr. Michael Chen', email: 'michael.c@example.com', type: 'Veterinarian', specialty: 'Exotic Pets', status: 'Active', rating: 4.9, reviews: 87, lastActive: '3 hours ago', registeredDate: '11/20/2023', appointments: 42, commission: '15%', verified: true },
    { id: 4, name: 'Sophia Rodriguez', email: 'sophia.r@example.com', type: 'Pet Sitter', specialty: 'All Pets', status: 'Pending', rating: 0, reviews: 0, lastActive: 'Never', registeredDate: '12/01/2023', appointments: 0, commission: '10%', verified: false },
    { id: 5, name: 'Robert Johnson', email: 'robert.j@example.com', type: 'Trainer', specialty: 'Behavior Training', status: 'Active', rating: 4.7, reviews: 56, lastActive: '5 hours ago', registeredDate: '09/18/2023', appointments: 19, commission: '12%', verified: true },
    { id: 6, name: 'Dr. Sarah Miller', email: 'sarah.m@example.com', type: 'Veterinarian', specialty: 'Surgery', status: 'Active', rating: 4.9, reviews: 112, lastActive: '1 hour ago', registeredDate: '08/30/2023', appointments: 31, commission: '15%', verified: true },
    { id: 7, name: 'David Garcia', email: 'david.g@example.com', type: 'Groomer', specialty: 'Cats', status: 'Flagged', rating: 3.2, reviews: 23, lastActive: '2 weeks ago', registeredDate: '07/12/2023', appointments: 8, commission: '12%', verified: true },
    { id: 8, name: 'Jennifer Lee', email: 'jennifer.l@example.com', type: 'Pet Sitter', specialty: 'Overnight Care', status: 'Active', rating: 4.5, reviews: 45, lastActive: '4 hours ago', registeredDate: '10/05/2023', appointments: 15, commission: '10%', verified: true },
    { id: 9, name: 'Thomas Wright', email: 'thomas.w@example.com', type: 'Trainer', specialty: 'Puppy Training', status: 'Pending', rating: 0, reviews: 0, lastActive: 'Never', registeredDate: '12/02/2023', appointments: 0, commission: '12%', verified: false },
    { id: 10, name: 'Dr. Elizabeth Taylor', email: 'elizabeth.t@example.com', type: 'Veterinarian', specialty: 'Dermatology', status: 'Active', rating: 4.7, reviews: 78, lastActive: '6 hours ago', registeredDate: '11/10/2023', appointments: 27, commission: '15%', verified: true }
  ];

  // Filter and sort providers
  const filteredAndSortedProviders = providersData
    .filter(provider => {
      const matchesSearch = 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || provider.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesType = filterType === 'all' || provider.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === 'type') {
        comparison = a.type.localeCompare(b.type);
      } else if (sortField === 'specialty') {
        comparison = a.specialty.localeCompare(b.specialty);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortField === 'reviews') {
        comparison = a.reviews - b.reviews;
      } else if (sortField === 'appointments') {
        comparison = a.appointments - b.appointments;
      } else if (sortField === 'registeredDate') {
        // Simple date comparison for demo purposes
        const dateA = new Date(a.registeredDate.split('/').reverse().join('/'));
        const dateB = new Date(b.registeredDate.split('/').reverse().join('/'));
        comparison = dateA - dateB;
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
      setSelectedProviders([]);
    } else {
      setSelectedProviders(filteredAndSortedProviders.map(provider => provider.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual provider selection
  const handleSelectProvider = (providerId) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(selectedProviders.filter(id => id !== providerId));
    } else {
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on providers:`, selectedProviders);
    // In a real app, you would call an API to perform the action
    alert(`${action} action would be performed on ${selectedProviders.length} providers`);
  };

  // Get provider type icon
  const getProviderTypeIcon = (type) => {
    switch (type) {
      case 'Veterinarian':
        return <FaStethoscope className="text-indigo-600" />;
      case 'Groomer':
        return <FaCut className="text-pink-600" />;
      case 'Pet Sitter':
        return <FaPaw className="text-amber-600" />;
      case 'Trainer':
        return <FaGraduationCap className="text-green-600" />;
      default:
        return <FaHospital className="text-indigo-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaHospital className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Service Provider Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage and monitor all service providers</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Create a CSV string from the filtered providers
                const headers = ['ID', 'Name', 'Email', 'Type', 'Specialty', 'Status', 'Rating', 'Reviews', 'Appointments', 'Commission', 'Verified'];
                const csvRows = [headers];
                
                filteredAndSortedProviders.forEach(provider => {
                  csvRows.push([
                    provider.id,
                    provider.name,
                    provider.email,
                    provider.type,
                    provider.specialty,
                    provider.status,
                    provider.rating,
                    provider.reviews,
                    provider.appointments,
                    provider.commission,
                    provider.verified ? 'Yes' : 'No'
                  ]);
                });
                
                const csvString = csvRows.map(row => row.join(',')).join('\n');
                
                // Create a Blob and download link
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `providers-report-${new Date().toISOString().split('T')[0]}.csv`);
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
                // Show a modal or form to add a new provider
                const name = prompt("Enter provider name:");
                if (!name) return;
                
                const email = prompt("Enter provider email:");
                if (!email) return;
                
                const type = prompt("Enter provider type (Veterinarian, Groomer, Pet Sitter, Trainer):", "Veterinarian");
                if (!type) return;
                
                const specialty = prompt("Enter provider specialty:", "Small Animals");
                if (!specialty) return;
                
                // In a real app, this would send data to an API
                console.log("Adding new provider:", { name, email, type, specialty });
                alert(`Provider ${name} added successfully! They will need to complete verification.`);
                
                // Simulate adding the provider to the list
                // In a real app, this would be handled by state management after API response
                const newProvider = {
                  id: providersData.length + 1,
                  name,
                  email,
                  type,
                  specialty,
                  status: 'Pending',
                  rating: 0,
                  reviews: 0,
                  lastActive: 'Never',
                  registeredDate: new Date().toLocaleDateString(),
                  appointments: 0,
                  commission: '10%',
                  verified: false
                };
                
                // This is just for demonstration - in a real app you would update state properly
                console.log("New provider object:", newProvider);
              }}
            >
              <FaUserPlus /> Add Provider
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Providers</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{providerStats.totalProviders}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaHospital className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Providers</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{providerStats.activeProviders}</p>
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
                <p className="text-2xl font-bold text-amber-600 mt-1">{providerStats.pendingApproval}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FaClipboardCheck className="text-amber-600 text-xl" />
              </div>
            </div>
            <button 
              className="text-xs text-amber-600 mt-2 inline-block hover:underline"
              onClick={() => setFilterStatus('pending')}
            >
              Review pending providers →
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Flagged Providers</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{providerStats.flaggedProviders}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
            </div>
            <button 
              className="text-xs text-red-600 mt-2 inline-block hover:underline"
              onClick={() => setFilterStatus('flagged')}
            >
              View flagged providers →
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link 
              to="/providers/onboarding" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaClipboardCheck className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Onboarding</h3>
                <p className="text-sm text-gray-500">Manage new registrations</p>
              </div>
            </Link>
            
            <Link 
              to="/providers/verification" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaShieldAlt className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Verification</h3>
                <p className="text-sm text-gray-500">Verify credentials</p>
              </div>
            </Link>
            
            <Link 
              to="/providers/commission" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <FaPercentage className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Commission</h3>
                <p className="text-sm text-gray-500">Set commission rates</p>
              </div>
            </Link>
            
            <Link 
              to="/providers/performance" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaStar className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Performance</h3>
                <p className="text-sm text-gray-500">View ratings & reviews</p>
              </div>
            </Link>
            
            <Link 
              to="/providers/flags" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-red-100 p-3 rounded-full">
                <FaExclamationTriangle className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Flags</h3>
                <p className="text-sm text-gray-500">Handle reported providers</p>
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
                placeholder="Search providers by name, email, specialty..."
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
                <option value="flagged">Flagged</option>
              </select>
              
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="veterinarian">Veterinarians</option>
                <option value="groomer">Groomers</option>
                <option value="pet sitter">Pet Sitters</option>
                <option value="trainer">Trainers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProviders.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-indigo-700 font-medium">
              {selectedProviders.length} providers selected
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
                onClick={() => handleBulkAction('Flag')}
              >
                <FaExclamationTriangle size={12} /> Flag
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
                  setSelectedProviders([]);
                  setSelectAll(false);
                }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Provider List */}
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
                      Provider {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                    <div className="flex items-center">
                      Type {getSortIcon('type')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('specialty')}>
                    <div className="flex items-center">
                      Specialty {getSortIcon('specialty')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('rating')}>
                    <div className="flex items-center">
                      Rating {getSortIcon('rating')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('appointments')}>
                    <div className="flex items-center">
                      Appts {getSortIcon('appointments')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedProviders.includes(provider.id)}
                        onChange={() => handleSelectProvider(provider.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          {getProviderTypeIcon(provider.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                          <div className="text-sm text-gray-500">{provider.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${provider.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          provider.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-1">{provider.rating}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({provider.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.commission}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.verified ? (
                        <span className="text-green-600">
                          <FaCheck />
                        </span>
                      ) : (
                        <span className="text-red-600">
                          <FaTimes />
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="Edit Provider"
                          onClick={() => alert(`Edit provider ${provider.name}`)}
                        >
                          <FaEdit />
                        </button>
                        {provider.status === 'Active' ? (
                          <button 
                            className="text-red-600 hover:text-red-900" 
                            title="Flag Provider"
                            onClick={() => alert(`Flag provider ${provider.name}`)}
                          >
                            <FaExclamationTriangle />
                          </button>
                        ) : provider.status === 'Flagged' ? (
                          <button 
                            className="text-green-600 hover:text-green-900" 
                            title="Restore Provider"
                            onClick={() => alert(`Restore provider ${provider.name}`)}
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button 
                            className="text-green-600 hover:text-green-900" 
                            title="Approve Provider"
                            onClick={() => alert(`Approve provider ${provider.name}`)}
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
                              onClick={() => alert(`View profile for ${provider.name}`)}
                            >
                              View Full Profile
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`View reviews for ${provider.name}`)}
                            >
                              View Reviews
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`View credentials for ${provider.name}`)}
                            >
                              View Credentials
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => alert(`Delete provider ${provider.name}`)}
                            >
                              Delete Provider
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
          
          {filteredAndSortedProviders.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">No providers found matching your filters.</p>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredAndSortedProviders.length}</span> of <span className="font-medium">{providersData.length}</span> providers
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

export default Providers;