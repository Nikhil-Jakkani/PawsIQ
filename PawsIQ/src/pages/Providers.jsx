import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEllipsisV, FaFilter, FaDownload, FaStar, FaPaw, FaHospital, FaCut, FaHome, FaDumbbell, FaStethoscope, FaCalendarCheck } from 'react-icons/fa';
import { PetIcon, PetIconButton, PetBadge } from '../components/layout/PetIcons';

// Enhanced mock data for providers with pet specialties
const mockProviders = [
  {
    id: 1,
    name: 'Dr. James Wilson',
    email: 'james.wilson@example.com',
    type: 'Veterinarian',
    specialty: 'General Care',
    petSpecialties: ['dog', 'cat', 'rabbit'],
    rating: 4.8,
    status: 'active',
    appointments: 156,
    joinDate: '2023-01-10',
    avatar: null,
  },
  {
    id: 2,
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    type: 'Groomer',
    specialty: 'Full Service',
    petSpecialties: ['dog', 'cat'],
    rating: 4.6,
    status: 'active',
    appointments: 98,
    joinDate: '2023-02-15',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mark Johnson',
    email: 'mark.j@example.com',
    type: 'Pet Sitter',
    specialty: 'Overnight Care',
    petSpecialties: ['dog', 'cat', 'bird', 'fish'],
    rating: 4.9,
    status: 'active',
    appointments: 72,
    joinDate: '2023-03-05',
    avatar: null,
  },
  {
    id: 4,
    name: 'Dr. Sarah Miller',
    email: 'sarah.m@example.com',
    type: 'Veterinarian',
    specialty: 'Surgery',
    petSpecialties: ['dog', 'cat'],
    rating: 4.7,
    status: 'active',
    appointments: 112,
    joinDate: '2023-03-20',
    avatar: null,
  },
  {
    id: 5,
    name: 'Robert Davis',
    email: 'robert.d@example.com',
    type: 'Trainer',
    specialty: 'Behavior Training',
    petSpecialties: ['dog'],
    rating: 4.5,
    status: 'inactive',
    appointments: 45,
    joinDate: '2023-04-10',
    avatar: null,
  },
  {
    id: 6,
    name: 'Jennifer Adams',
    email: 'jennifer.a@example.com',
    type: 'Groomer',
    specialty: 'Breed Specific',
    petSpecialties: ['dog'],
    rating: 4.4,
    status: 'active',
    appointments: 87,
    joinDate: '2023-05-01',
    avatar: null,
  },
  {
    id: 7,
    name: 'Dr. Michael Chen',
    email: 'michael.c@example.com',
    type: 'Veterinarian',
    specialty: 'Dermatology',
    petSpecialties: ['dog', 'cat', 'rabbit'],
    rating: 4.9,
    status: 'pending',
    appointments: 0,
    joinDate: '2023-06-01',
    avatar: null,
  },
];

const Providers = () => {
  const [providers] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && provider.type.toLowerCase() === activeTab.toLowerCase();
  });

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

  const getProviderTypeColor = (type) => {
    switch (type) {
      case 'Veterinarian':
        return 'bg-blue-100 text-blue-800';
      case 'Groomer':
        return 'bg-purple-100 text-purple-800';
      case 'Pet Sitter':
        return 'bg-green-100 text-green-800';
      case 'Trainer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProviderTypeIcon = (type) => {
    switch (type) {
      case 'Veterinarian':
        return <FaStethoscope className="text-blue-600" />;
      case 'Groomer':
        return <FaCut className="text-purple-600" />;
      case 'Pet Sitter':
        return <FaHome className="text-green-600" />;
      case 'Trainer':
        return <FaDumbbell className="text-orange-600" />;
      default:
        return <FaPaw className="text-gray-600" />;
    }
  };

  // Get a random gradient color based on the first letter of the name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-red-400 to-red-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Count providers by type
  const providerCounts = providers.reduce((acc, provider) => {
    const type = provider.type.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaHospital className="text-indigo-600 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Service Providers</h1>
          </div>
          <p className="text-gray-500 mt-1">Manage all pet care service providers</p>
        </div>
        <PetIconButton 
          type="cat" 
          variant="primary" 
          label="Add New Provider" 
          size="md"
          className="shadow-md"
        />
      </div>
      
      {/* Provider Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-1 border border-indigo-50">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Providers
          </button>
          <button 
            onClick={() => setActiveTab('veterinarian')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'veterinarian' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaStethoscope />
            Veterinarians ({providerCounts.veterinarian || 0})
          </button>
          <button 
            onClick={() => setActiveTab('groomer')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'groomer' 
                ? 'bg-purple-100 text-purple-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCut />
            Groomers ({providerCounts.groomer || 0})
          </button>
          <button 
            onClick={() => setActiveTab('pet sitter')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'pet sitter' 
                ? 'bg-green-100 text-green-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHome />
            Pet Sitters ({providerCounts['pet sitter'] || 0})
          </button>
          <button 
            onClick={() => setActiveTab('trainer')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'trainer' 
                ? 'bg-orange-100 text-orange-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaDumbbell />
            Trainers ({providerCounts.trainer || 0})
          </button>
        </div>
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
              placeholder="Search providers by name, email, or specialty..."
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
              type="dog" 
              variant="secondary" 
              label="Filter" 
              size="md"
            />
            <PetIconButton 
              type="rabbit" 
              variant="secondary" 
              label="Export" 
              size="md"
            />
          </div>
        </div>
      </div>
      
      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="paw-card group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-14 w-14 rounded-full ${getAvatarColor(provider.name)} flex items-center justify-center text-white font-medium shadow-md`}>
                  {provider.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  <FaStar className="text-yellow-500" />
                  {provider.rating}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 inline-flex items-center gap-2 text-xs leading-5 font-semibold rounded-full ${getProviderTypeColor(provider.type)}`}>
                  {getProviderTypeIcon(provider.type)}
                  {provider.type}
                </span>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(provider.status)}`}>
                  {provider.status}
                </span>
              </div>
              
              <div>
                <p className="text-sm text-gray-700 font-medium">Specialty</p>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-700 font-medium">Pet Specialties</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.petSpecialties.map((pet, index) => (
                    <PetBadge key={index} type={pet} label={pet} variant="primary" size="xs" />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-indigo-50">
                <div className="flex items-center gap-2 text-indigo-600">
                  <FaCalendarCheck />
                  <span className="text-sm font-medium">{provider.appointments} appointments</span>
                </div>
                <p className="text-xs text-gray-500">Joined {provider.joinDate}</p>
              </div>
            </div>
            
            {/* Action buttons that appear on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                <button className="p-2 bg-white rounded-full shadow-sm text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50">
                  <FaEdit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-sm text-red-600 hover:text-red-900 hover:bg-red-50">
                  <FaTrash className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  <FaEllipsisV className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state if no providers match the filter */}
      {filteredProviders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-indigo-50">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FaPaw className="text-indigo-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
          <p className="text-gray-600 mb-6">We couldn't find any providers matching your search criteria.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => {setSearchTerm(''); setActiveTab('all');}}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
      
      {/* Provider insights */}
      {filteredProviders.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
            <FaPaw className="text-indigo-600" />
            Provider Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <FaStethoscope />
                <h3 className="font-medium">Veterinarians</h3>
              </div>
              <p className="text-gray-600 text-sm">Veterinarians have the highest average rating (4.8/5) and handle 60% of all appointments on the platform.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
              <div className="flex items-center gap-2 mb-2 text-purple-600">
                <FaCut />
                <h3 className="font-medium">Groomers</h3>
              </div>
              <p className="text-gray-600 text-sm">Groomers specializing in specific breeds have 25% higher booking rates and better customer satisfaction scores.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <FaHome />
                <h3 className="font-medium">Pet Sitters</h3>
              </div>
              <p className="text-gray-600 text-sm">Pet sitters who care for multiple pet types earn 40% more and have the highest rebooking rate among all providers.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;