import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaPercentage,
  FaDownload,
  FaPlus,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaHospital,
  FaUserMd,
  FaCut,
  FaDog,
  FaHome,
  FaWalking
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ProviderCommission = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortField, setSortField] = useState('providerName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCommission, setCurrentCommission] = useState(null);
  
  // Sample data for commission rates
  const commissionRatesData = [
    { 
      id: 1, 
      providerName: 'Happy Paws Veterinary Clinic', 
      providerEmail: 'info@happypawsvet.com',
      category: 'Veterinary', 
      baseRate: 15, 
      volumeDiscount: true, 
      specialRate: false, 
      effectiveRate: 15, 
      lastUpdated: '2023-11-15', 
      nextReview: '2024-05-15',
      notes: 'Standard rate for veterinary services'
    },
    { 
      id: 2, 
      providerName: 'Fluffy Cuts Grooming', 
      providerEmail: 'appointments@fluffycuts.com',
      category: 'Grooming', 
      baseRate: 12, 
      volumeDiscount: false, 
      specialRate: false, 
      effectiveRate: 12, 
      lastUpdated: '2023-10-20', 
      nextReview: '2024-04-20',
      notes: 'Standard rate for grooming services'
    },
    { 
      id: 3, 
      providerName: 'Paws & Play Pet Sitting', 
      providerEmail: 'care@pawsandplay.com',
      category: 'Pet Sitting', 
      baseRate: 10, 
      volumeDiscount: true, 
      specialRate: true, 
      effectiveRate: 8, 
      lastUpdated: '2023-12-01', 
      nextReview: '2024-06-01',
      notes: 'Reduced rate due to high volume of bookings'
    },
    { 
      id: 4, 
      providerName: 'Canine Academy', 
      providerEmail: 'training@canineacademy.com',
      category: 'Training', 
      baseRate: 18, 
      volumeDiscount: false, 
      specialRate: false, 
      effectiveRate: 18, 
      lastUpdated: '2023-09-10', 
      nextReview: '2024-03-10',
      notes: 'Premium rate for specialized training services'
    },
    { 
      id: 5, 
      providerName: 'Pet Paradise Boarding', 
      providerEmail: 'reservations@petparadise.com',
      category: 'Boarding', 
      baseRate: 14, 
      volumeDiscount: true, 
      specialRate: false, 
      effectiveRate: 12, 
      lastUpdated: '2023-11-05', 
      nextReview: '2024-05-05',
      notes: 'Volume discount applied for long-term partnership'
    },
    { 
      id: 6, 
      providerName: 'Whiskers & Paws Clinic', 
      providerEmail: 'appointments@whiskerspaws.com',
      category: 'Veterinary', 
      baseRate: 15, 
      volumeDiscount: false, 
      specialRate: true, 
      effectiveRate: 13, 
      lastUpdated: '2023-10-15', 
      nextReview: '2024-04-15',
      notes: 'Special rate for new clinic partnership'
    },
    { 
      id: 7, 
      providerName: 'Pawfect Walkers', 
      providerEmail: 'schedule@pawfectwalkers.com',
      category: 'Dog Walking', 
      baseRate: 8, 
      volumeDiscount: false, 
      specialRate: false, 
      effectiveRate: 8, 
      lastUpdated: '2023-12-05', 
      nextReview: '2024-06-05',
      notes: 'Standard rate for dog walking services'
    },
    { 
      id: 8, 
      providerName: 'Elite Pet Grooming', 
      providerEmail: 'bookings@elitepetgrooming.com',
      category: 'Grooming', 
      baseRate: 12, 
      volumeDiscount: false, 
      specialRate: true, 
      effectiveRate: 15, 
      lastUpdated: '2023-11-20', 
      nextReview: '2024-05-20',
      notes: 'Premium rate for luxury grooming services'
    },
    { 
      id: 9, 
      providerName: 'Healthy Paws Veterinary', 
      providerEmail: 'care@healthypaws.com',
      category: 'Veterinary', 
      baseRate: 15, 
      volumeDiscount: true, 
      specialRate: false, 
      effectiveRate: 13, 
      lastUpdated: '2023-09-25', 
      nextReview: '2024-03-25',
      notes: 'Volume discount applied based on patient referrals'
    },
    { 
      id: 10, 
      providerName: 'Home Pet Care', 
      providerEmail: 'service@homepetcare.com',
      category: 'Pet Sitting', 
      baseRate: 10, 
      volumeDiscount: false, 
      specialRate: false, 
      effectiveRate: 10, 
      lastUpdated: '2023-10-10', 
      nextReview: '2024-04-10',
      notes: 'Standard rate for in-home pet sitting'
    }
  ];

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'veterinary':
        return <FaUserMd className="text-blue-500" />;
      case 'grooming':
        return <FaCut className="text-purple-500" />;
      case 'pet sitting':
        return <FaHome className="text-green-500" />;
      case 'training':
        return <FaDog className="text-amber-500" />;
      case 'boarding':
        return <FaHospital className="text-red-500" />;
      case 'dog walking':
        return <FaWalking className="text-indigo-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  // Filter and sort commission rates
  const filteredAndSortedRates = commissionRatesData
    .filter(rate => {
      const matchesSearch = 
        rate.providerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        rate.providerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || rate.category.toLowerCase() === filterCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'providerName') {
        comparison = a.providerName.localeCompare(b.providerName);
      } else if (sortField === 'category') {
        comparison = a.category.localeCompare(b.category);
      } else if (sortField === 'baseRate') {
        comparison = a.baseRate - b.baseRate;
      } else if (sortField === 'effectiveRate') {
        comparison = a.effectiveRate - b.effectiveRate;
      } else if (sortField === 'lastUpdated') {
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
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

  // Handle edit commission rate
  const handleEditCommission = (rate) => {
    setCurrentCommission({...rate});
    setShowEditModal(true);
  };

  // Handle save commission changes
  const handleSaveCommission = () => {
    // In a real app, you would call an API to update the commission rate
    console.log('Saving commission rate changes:', currentCommission);
    alert(`Commission rate for ${currentCommission.providerName} updated successfully`);
    setShowEditModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/providers" className="text-gray-500 hover:text-indigo-600">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Commission Rates</h1>
              <p className="text-gray-500">Manage provider commission rates and fee structures</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              onClick={() => alert('Add new commission rate functionality would be implemented here')}
            >
              <FaPlus /> Add New Rate
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
                placeholder="Search providers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Category Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="veterinary">Veterinary</option>
              <option value="grooming">Grooming</option>
              <option value="pet sitting">Pet Sitting</option>
              <option value="training">Training</option>
              <option value="boarding">Boarding</option>
              <option value="dog walking">Dog Walking</option>
            </select>
          </div>
        </div>

        {/* Commission Rates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('providerName')}
                  >
                    <div className="flex items-center">
                      Provider {getSortIcon('providerName')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Category {getSortIcon('category')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('baseRate')}
                  >
                    <div className="flex items-center">
                      Base Rate (%) {getSortIcon('baseRate')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discounts
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('effectiveRate')}
                  >
                    <div className="flex items-center">
                      Effective Rate (%) {getSortIcon('effectiveRate')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <div className="flex items-center">
                      Last Updated {getSortIcon('lastUpdated')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Review
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{rate.providerName}</div>
                          <div className="text-sm text-gray-500">{rate.providerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(rate.category)}
                        <span className="text-sm text-gray-900">{rate.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{rate.baseRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {rate.volumeDiscount && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Volume</span>
                        )}
                        {rate.specialRate && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Special</span>
                        )}
                        {!rate.volumeDiscount && !rate.specialRate && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600">{rate.effectiveRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rate.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rate.nextReview}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditCommission(rate)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Commission Rate"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Commission Modal */}
        {showEditModal && currentCommission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Edit Commission Rate</h2>
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Provider Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Provider Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={currentCommission.providerName}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={currentCommission.category}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Commission Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={currentCommission.baseRate}
                        onChange={(e) => setCurrentCommission({...currentCommission, baseRate: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Effective Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={currentCommission.effectiveRate}
                        onChange={(e) => setCurrentCommission({...currentCommission, effectiveRate: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={currentCommission.volumeDiscount}
                        onChange={(e) => setCurrentCommission({...currentCommission, volumeDiscount: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-gray-700">Volume Discount</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={currentCommission.specialRate}
                        onChange={(e) => setCurrentCommission({...currentCommission, specialRate: e.target.checked})}
                      />
                      <span className="ml-2 text-sm text-gray-700">Special Rate</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Review Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentCommission.nextReview}
                    onChange={(e) => setCurrentCommission({...currentCommission, nextReview: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentCommission.notes}
                    onChange={(e) => setCurrentCommission({...currentCommission, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCommission}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProviderCommission;