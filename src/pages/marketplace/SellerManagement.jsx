import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  FaStore, 
  FaUser,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaStar,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaShoppingCart,
  FaBoxes,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload,
  FaPlus,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaFlag,
  FaBan,
  FaThumbsUp,
  FaThumbsDown,
  FaComments,
  FaFileAlt,
  FaArrowRight,
  FaPercent,
  FaDollarSign
} from 'react-icons/fa';

const SellerManagement = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Sample sellers data
  const sellers = [
    {
      id: 'SEL001',
      businessName: 'PetCare Plus Clinic',
      ownerName: 'Dr. Sarah Wilson',
      email: 'sarah@petcareplus.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      category: 'Veterinary',
      status: 'Active',
      joinDate: '2023-06-15',
      totalSales: 145670.50,
      totalOrders: 1234,
      productsListed: 45,
      rating: 4.9,
      reviews: 234,
      commissionRate: 8.5,
      payoutsPending: 12450.75,
      lastActive: '2024-01-15',
      verificationStatus: 'Verified',
      documents: ['business_license.pdf', 'insurance.pdf', 'tax_id.pdf'],
      description: 'Full-service veterinary clinic specializing in preventive care, surgery, and emergency services for all pets.',
      businessHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM, Sun: Closed',
      specialties: ['Emergency Care', 'Surgery', 'Preventive Care', 'Dental Care']
    },
    {
      id: 'SEL002',
      businessName: 'Happy Paws Grooming',
      ownerName: 'Lisa Chen',
      email: 'lisa@happypaws.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      category: 'Grooming',
      status: 'Pending',
      joinDate: '2024-01-10',
      totalSales: 0,
      totalOrders: 0,
      productsListed: 12,
      rating: 0,
      reviews: 0,
      commissionRate: 12.0,
      payoutsPending: 0,
      lastActive: '2024-01-14',
      verificationStatus: 'Pending',
      documents: ['business_license.pdf', 'grooming_certification.pdf'],
      description: 'Professional pet grooming services with 10+ years of experience. Specializing in breed-specific cuts and nail care.',
      businessHours: 'Tue-Sat: 9AM-5PM, Sun-Mon: Closed',
      specialties: ['Breed-Specific Cuts', 'Nail Trimming', 'Flea Treatment', 'De-shedding']
    },
    {
      id: 'SEL003',
      businessName: 'Urban Dog Walking Co.',
      ownerName: 'Mike Thompson',
      email: 'mike@urbandogwalking.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, Chicago, IL 60601',
      category: 'Walking Services',
      status: 'Suspended',
      joinDate: '2023-03-20',
      totalSales: 23450.25,
      totalOrders: 567,
      productsListed: 8,
      rating: 4.2,
      reviews: 89,
      commissionRate: 15.0,
      payoutsPending: 2345.00,
      lastActive: '2024-01-12',
      verificationStatus: 'Verified',
      documents: ['business_license.pdf', 'insurance.pdf', 'background_check.pdf'],
      description: 'Professional dog walking and pet sitting services covering downtown Chicago area.',
      businessHours: 'Mon-Sun: 7AM-7PM',
      specialties: ['Group Walks', 'Individual Walks', 'Pet Sitting', 'Emergency Care']
    },
    {
      id: 'SEL004',
      businessName: 'Pet Nutrition Store',
      ownerName: 'Emily Davis',
      email: 'emily@petnutrition.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Miami, FL 33101',
      category: 'Pet Food & Supplies',
      status: 'Active',
      joinDate: '2023-01-08',
      totalSales: 89750.75,
      totalOrders: 892,
      productsListed: 156,
      rating: 4.7,
      reviews: 156,
      commissionRate: 10.0,
      payoutsPending: 8975.08,
      lastActive: '2024-01-15',
      verificationStatus: 'Verified',
      documents: ['business_license.pdf', 'food_safety_cert.pdf', 'supplier_agreements.pdf'],
      description: 'Premium pet food and nutrition supplements. Specializing in organic and natural pet products.',
      businessHours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
      specialties: ['Organic Foods', 'Supplements', 'Special Diets', 'Treats']
    }
  ];

  // Filter and sort sellers
  const filteredSellers = sellers
    .filter(seller => {
      const matchesSearch = 
        seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || seller.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesCategory = filterCategory === 'all' || seller.category.toLowerCase().replace(' ', '') === filterCategory.toLowerCase().replace(' ', '');
      
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'sales':
          return b.totalSales - a.totalSales;
        case 'rating':
          return b.rating - a.rating;
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate);
        default:
          return a.businessName.localeCompare(b.businessName);
      }
    });

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheck },
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      'Suspended': { bg: 'bg-red-100', text: 'text-red-800', icon: FaBan },
      'Inactive': { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaTimes }
    };
    
    const config = statusConfig[status] || statusConfig['Pending'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {status}
      </span>
    );
  };

  // Get verification badge
  const getVerificationBadge = (status) => {
    const statusConfig = {
      'Verified': { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaUserCheck },
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaUserClock },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: FaUserTimes }
    };
    
    const config = statusConfig[status] || statusConfig['Pending'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {status}
      </span>
    );
  };

  const handleSellerAction = (sellerId, action) => {
    const seller = sellers.find(s => s.id === sellerId);
    switch (action) {
      case 'approve':
        alert(`Seller "${seller.businessName}" has been approved!`);
        break;
      case 'suspend':
        alert(`Seller "${seller.businessName}" has been suspended.`);
        break;
      case 'reject':
        alert(`Seller "${seller.businessName}" application has been rejected.`);
        break;
      case 'reactivate':
        alert(`Seller "${seller.businessName}" has been reactivated.`);
        break;
      default:
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaStore className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Seller Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage seller accounts and applications</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => alert('Inviting new seller...')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <FaPlus /> Invite Seller
            </button>
            <Link 
              to="/marketplace"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Back to Marketplace <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sellers</p>
                <p className="text-2xl font-bold text-gray-800">{sellers.length}</p>
              </div>
              <FaStore className="text-gray-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Sellers</p>
                <p className="text-2xl font-bold text-green-600">
                  {sellers.filter(s => s.status === 'Active').length}
                </p>
              </div>
              <FaCheck className="text-green-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {sellers.filter(s => s.status === 'Pending').length}
                </p>
              </div>
              <FaClock className="text-yellow-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${sellers.reduce((sum, s) => sum + s.totalSales, 0).toLocaleString()}
                </p>
              </div>
              <FaDollarSign className="text-blue-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-600">4.7</p>
              </div>
              <FaStar className="text-purple-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sellers, businesses, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="veterinary">Veterinary</option>
                <option value="grooming">Grooming</option>
                <option value="walkingservices">Walking Services</option>
                <option value="petfood&supplies">Pet Food & Supplies</option>
                <option value="training">Training</option>
              </select>
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name A-Z</option>
                <option value="sales">Highest Sales</option>
                <option value="rating">Highest Rating</option>
                <option value="joinDate">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{seller.businessName}</h3>
                    <p className="text-sm text-gray-600">{seller.ownerName}</p>
                    <p className="text-xs text-gray-500">{seller.category}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(seller.status)}
                    {getVerificationBadge(seller.verificationStatus)}
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaEnvelope />
                    <span className="truncate">{seller.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaPhone />
                    <span>{seller.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <span className="truncate">{seller.address}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      ${seller.totalSales.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Total Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{seller.totalOrders}</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{seller.productsListed}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-lg font-bold text-gray-800">{seller.rating || 'N/A'}</span>
                    </div>
                    <div className="text-xs text-gray-500">({seller.reviews} reviews)</div>
                  </div>
                </div>

                {/* Commission & Payouts */}
                <div className="bg-gray-50 rounded p-3 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Commission Rate</span>
                    <span className="text-sm font-bold text-indigo-600">{seller.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Pending Payouts</span>
                    <span className="text-sm font-bold text-orange-600">
                      ${seller.payoutsPending.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedSeller(seller)}
                    className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaEye /> View
                  </button>
                  
                  {seller.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleSellerAction(seller.id, 'approve')}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        title="Approve Seller"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleSellerAction(seller.id, 'reject')}
                        className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        title="Reject Seller"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  
                  {seller.status === 'Active' && (
                    <button
                      onClick={() => handleSellerAction(seller.id, 'suspend')}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                      title="Suspend Seller"
                    >
                      <FaBan />
                    </button>
                  )}
                  
                  {seller.status === 'Suspended' && (
                    <button
                      onClick={() => handleSellerAction(seller.id, 'reactivate')}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                      title="Reactivate Seller"
                    >
                      <FaThumbsUp />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seller Details Modal */}
        {selectedSeller && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedSeller.businessName} - Details
                </h3>
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Business Info */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Business Information</h4>
                    <div className="space-y-2">
                      <div><strong>Business Name:</strong> {selectedSeller.businessName}</div>
                      <div><strong>Owner:</strong> {selectedSeller.ownerName}</div>
                      <div><strong>Category:</strong> {selectedSeller.category}</div>
                      <div><strong>Join Date:</strong> {selectedSeller.joinDate}</div>
                      <div><strong>Last Active:</strong> {selectedSeller.lastActive}</div>
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong> {getStatusBadge(selectedSeller.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>Verification:</strong> {getVerificationBadge(selectedSeller.verificationStatus)}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Contact & Location</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-600" />
                        <span>{selectedSeller.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        <span>{selectedSeller.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-blue-600 mt-1" />
                        <span>{selectedSeller.address}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaClock className="text-blue-600 mt-1" />
                        <span>{selectedSeller.businessHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedSeller.description}</p>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeller.specialties.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Performance & Actions */}
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ${selectedSeller.totalSales.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedSeller.totalOrders}</div>
                        <div className="text-sm text-gray-600">Total Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedSeller.productsListed}</div>
                        <div className="text-sm text-gray-600">Products Listed</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-2xl font-bold text-gray-800">{selectedSeller.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">({selectedSeller.reviews} reviews)</div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Financial Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Commission Rate:</span>
                        <span className="font-medium">{selectedSeller.commissionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending Payouts:</span>
                        <span className="font-medium text-orange-600">
                          ${selectedSeller.payoutsPending.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commission Earned:</span>
                        <span className="font-medium text-green-600">
                          ${(selectedSeller.totalSales * selectedSeller.commissionRate / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {selectedSeller.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <FaFileAlt className="text-gray-500" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                            <FaDownload />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => alert(`Contacting ${selectedSeller.businessName}...`)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <FaEnvelope /> Contact
                      </button>
                      <button 
                        onClick={() => alert(`Editing commission rate for ${selectedSeller.businessName}...`)}
                        className="px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <FaPercent /> Commission
                      </button>
                      <button 
                        onClick={() => alert(`Processing payout for ${selectedSeller.businessName}...`)}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <FaMoneyBillWave /> Payout
                      </button>
                      <button 
                        onClick={() => alert(`Viewing analytics for ${selectedSeller.businessName}...`)}
                        className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <FaChartLine /> Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedSeller(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedSeller.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleSellerAction(selectedSeller.id, 'approve');
                        setSelectedSeller(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                      <FaCheck /> Approve Seller
                    </button>
                    <button
                      onClick={() => {
                        handleSellerAction(selectedSeller.id, 'reject');
                        setSelectedSeller(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                    >
                      <FaTimes /> Reject Application
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SellerManagement;