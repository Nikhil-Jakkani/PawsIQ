import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHospital, 
  FaShieldAlt, 
  FaArrowLeft, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaDownload, 
  FaFileAlt, 
  FaIdCard, 
  FaGraduationCap, 
  FaStethoscope, 
  FaCut, 
  FaDog, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaFileImage,
  FaFilePdf,
  FaFileContract
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ProviderVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('documents');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  
  // Sample data for providers
  const providersData = [
    { 
      id: 1, 
      name: 'Dr. James Wilson', 
      email: 'james.wilson@example.com', 
      phone: '(555) 123-4567', 
      type: 'Veterinarian', 
      specialty: 'Small Animals', 
      status: 'Pending Verification', 
      date: '2023-12-05', 
      address: '123 Main St, Anytown, CA 12345',
      documents: [
        { id: 1, name: 'Veterinary License', type: 'license', status: 'pending', date: '2023-12-05', file: 'license.pdf' },
        { id: 2, name: 'Professional Certification', type: 'certification', status: 'pending', date: '2023-12-05', file: 'cert.pdf' },
        { id: 3, name: 'Liability Insurance', type: 'insurance', status: 'pending', date: '2023-12-05', file: 'insurance.pdf' },
        { id: 4, name: 'Government ID', type: 'id', status: 'verified', date: '2023-12-05', file: 'id.jpg' }
      ],
      background: {
        status: 'pending',
        checkDate: null,
        notes: 'Background check in progress'
      },
      references: [
        { name: 'Dr. Sarah Miller', relationship: 'Colleague', contact: 'sarah.m@example.com', verified: true },
        { name: 'City Animal Hospital', relationship: 'Previous Employer', contact: '(555) 987-6543', verified: true }
      ]
    },
    { 
      id: 2, 
      name: 'Emma Thompson', 
      email: 'emma.t@example.com', 
      phone: '(555) 234-5678', 
      type: 'Groomer', 
      specialty: 'Dogs', 
      status: 'Partially Verified', 
      date: '2023-12-04', 
      address: '456 Oak Ave, Somewhere, NY 67890',
      documents: [
        { id: 5, name: 'Grooming Certification', type: 'certification', status: 'verified', date: '2023-12-04', file: 'grooming_cert.pdf' },
        { id: 6, name: 'Liability Insurance', type: 'insurance', status: 'pending', date: '2023-12-04', file: 'insurance.pdf' },
        { id: 7, name: 'Government ID', type: 'id', status: 'verified', date: '2023-12-04', file: 'id.jpg' }
      ],
      background: {
        status: 'verified',
        checkDate: '2023-12-06',
        notes: 'Background check completed - no issues found'
      },
      references: [
        { name: 'Paws & Claws Grooming', relationship: 'Previous Employer', contact: '(555) 876-5432', verified: true },
        { name: 'Robert Johnson', relationship: 'Client', contact: 'robert.j@example.com', verified: false }
      ]
    },
    { 
      id: 3, 
      name: 'Dr. Michael Chen', 
      email: 'michael.c@example.com', 
      phone: '(555) 345-6789', 
      type: 'Veterinarian', 
      specialty: 'Exotic Pets', 
      status: 'Verification Failed', 
      date: '2023-12-03', 
      address: '789 Pine Rd, Elsewhere, TX 54321',
      documents: [
        { id: 8, name: 'Veterinary License', type: 'license', status: 'rejected', date: '2023-12-03', file: 'license.pdf', notes: 'License expired' },
        { id: 9, name: 'Professional Certification', type: 'certification', status: 'pending', date: '2023-12-03', file: 'cert.pdf' },
        { id: 10, name: 'Government ID', type: 'id', status: 'verified', date: '2023-12-03', file: 'id.jpg' }
      ],
      background: {
        status: 'pending',
        checkDate: null,
        notes: 'Background check in progress'
      },
      references: [
        { name: 'Exotic Animal Clinic', relationship: 'Previous Employer', contact: '(555) 765-4321', verified: true }
      ]
    },
    { 
      id: 4, 
      name: 'Sophia Rodriguez', 
      email: 'sophia.r@example.com', 
      phone: '(555) 456-7890', 
      type: 'Pet Sitter', 
      specialty: 'All Pets', 
      status: 'Fully Verified', 
      date: '2023-12-02', 
      address: '321 Elm St, Nowhere, FL 13579',
      documents: [
        { id: 11, name: 'Pet First Aid Certification', type: 'certification', status: 'verified', date: '2023-12-02', file: 'first_aid.pdf' },
        { id: 12, name: 'Liability Insurance', type: 'insurance', status: 'verified', date: '2023-12-02', file: 'insurance.pdf' },
        { id: 13, name: 'Government ID', type: 'id', status: 'verified', date: '2023-12-02', file: 'id.jpg' },
        { id: 14, name: 'Background Check Consent', type: 'consent', status: 'verified', date: '2023-12-02', file: 'consent.pdf' }
      ],
      background: {
        status: 'verified',
        checkDate: '2023-12-05',
        notes: 'Background check completed - no issues found'
      },
      references: [
        { name: 'Happy Tails Pet Sitting', relationship: 'Previous Employer', contact: '(555) 654-3210', verified: true },
        { name: 'Jennifer Lee', relationship: 'Client', contact: 'jennifer.l@example.com', verified: true },
        { name: 'David Garcia', relationship: 'Client', contact: 'david.g@example.com', verified: true }
      ]
    },
    { 
      id: 5, 
      name: 'Robert Johnson', 
      email: 'robert.j@example.com', 
      phone: '(555) 567-8901', 
      type: 'Trainer', 
      specialty: 'Behavior Training', 
      status: 'Pending Verification', 
      date: '2023-12-01', 
      address: '654 Maple Dr, Anyplace, WA 24680',
      documents: [
        { id: 15, name: 'Training Certification', type: 'certification', status: 'pending', date: '2023-12-01', file: 'training_cert.pdf' },
        { id: 16, name: 'Government ID', type: 'id', status: 'verified', date: '2023-12-01', file: 'id.jpg' }
      ],
      background: {
        status: 'pending',
        checkDate: null,
        notes: 'Background check in progress'
      },
      references: [
        { name: 'Canine Academy', relationship: 'Previous Employer', contact: '(555) 543-2109', verified: false },
        { name: 'Lisa Anderson', relationship: 'Client', contact: 'lisa.a@example.com', verified: true }
      ]
    }
  ];

  // Filter and sort providers
  const filteredAndSortedProviders = providersData
    .filter(provider => {
      const matchesSearch = 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || provider.type.toLowerCase() === filterType.toLowerCase();
      const matchesStatus = filterStatus === 'all' || provider.status.toLowerCase().includes(filterStatus.toLowerCase());
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'type') {
        comparison = a.type.localeCompare(b.type);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
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

  // Handle view provider
  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
    setActiveTab('documents');
  };

  // Get provider type icon
  const getProviderTypeIcon = (type) => {
    switch (type) {
      case 'Veterinarian':
        return <FaStethoscope className="text-indigo-600" />;
      case 'Groomer':
        return <FaCut className="text-pink-600" />;
      case 'Pet Sitter':
        return <FaDog className="text-amber-600" />;
      case 'Trainer':
        return <FaGraduationCap className="text-green-600" />;
      default:
        return <FaHospital className="text-indigo-600" />;
    }
  };

  // Get document type icon
  const getDocumentTypeIcon = (type) => {
    switch (type) {
      case 'license':
        return <FaIdCard className="text-indigo-600" />;
      case 'certification':
        return <FaGraduationCap className="text-green-600" />;
      case 'insurance':
        return <FaFileContract className="text-blue-600" />;
      case 'id':
        return <FaIdCard className="text-amber-600" />;
      case 'consent':
        return <FaFileAlt className="text-purple-600" />;
      default:
        return <FaFileAlt className="text-gray-600" />;
    }
  };

  // Get document status icon
  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <FaCheckCircle className="text-green-600" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-600" />;
      case 'pending':
        return <FaQuestionCircle className="text-amber-600" />;
      default:
        return <FaQuestionCircle className="text-gray-600" />;
    }
  };

  // Handle document action
  const handleDocumentAction = (action, documentId) => {
    console.log(`Performing ${action} on document:`, documentId);
    // In a real app, you would call an API to perform the action
    alert(`${action} action would be performed on document #${documentId}`);
  };

  // Handle view document
  const handleViewDocument = (document) => {
    setCurrentDocument(document);
    setShowDocumentModal(true);
  };

  // Handle provider verification
  const handleProviderVerification = (action, providerId) => {
    console.log(`Performing ${action} on provider:`, providerId);
    // In a real app, you would call an API to perform the action
    alert(`${action} action would be performed on provider #${providerId}`);
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
              <h1 className="text-2xl font-bold text-gray-800">Provider Verification</h1>
              <p className="text-gray-500">Verify credentials and documents for service providers</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Providers</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{providersData.length}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <FaHospital className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Verification</p>
                <p className="text-xl font-bold text-amber-600 mt-1">
                  {providersData.filter(provider => provider.status === 'Pending Verification').length}
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <FaQuestionCircle className="text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Fully Verified</p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {providersData.filter(provider => provider.status === 'Fully Verified').length}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Verification Failed</p>
                <p className="text-xl font-bold text-red-600 mt-1">
                  {providersData.filter(provider => provider.status === 'Verification Failed').length}
                </p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaTimesCircle className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Providers List */}
          <div className="lg:col-span-1">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-4">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search providers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-2 gap-3">
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
                  
                  <select
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="partially">Partially Verified</option>
                    <option value="fully">Fully Verified</option>
                    <option value="failed">Verification Failed</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Providers</h2>
                <div className="text-sm text-gray-500">
                  {filteredAndSortedProviders.length} providers
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[600px]">
                <ul className="divide-y divide-gray-200">
                  {filteredAndSortedProviders.map((provider) => (
                    <li 
                      key={provider.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedProvider?.id === provider.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => handleViewProvider(provider)}
                    >
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            {getProviderTypeIcon(provider.type)}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                                <div className="text-xs text-gray-500">{provider.email}</div>
                              </div>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${provider.status === 'Fully Verified' ? 'bg-green-100 text-green-800' : 
                                  provider.status === 'Pending Verification' ? 'bg-yellow-100 text-yellow-800' :
                                  provider.status === 'Partially Verified' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'}`}>
                                {provider.status}
                              </span>
                            </div>
                            <div className="mt-1 flex justify-between">
                              <div className="text-xs text-gray-500">{provider.type} - {provider.specialty}</div>
                              <div className="text-xs text-gray-500">{new Date(provider.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {filteredAndSortedProviders.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No providers found matching your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Provider Verification Details */}
          <div className="lg:col-span-2">
            {selectedProvider ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Provider Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        {getProviderTypeIcon(selectedProvider.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{selectedProvider.name}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{selectedProvider.type} - {selectedProvider.specialty}</p>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${selectedProvider.status === 'Fully Verified' ? 'bg-green-100 text-green-800' : 
                              selectedProvider.status === 'Pending Verification' ? 'bg-yellow-100 text-yellow-800' :
                              selectedProvider.status === 'Partially Verified' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'}`}>
                            {selectedProvider.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedProvider.status !== 'Fully Verified' && (
                        <button 
                          className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                          onClick={() => handleProviderVerification('Verify', selectedProvider.id)}
                        >
                          Verify All
                        </button>
                      )}
                      {selectedProvider.status !== 'Verification Failed' && (
                        <button 
                          className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                          onClick={() => handleProviderVerification('Reject', selectedProvider.id)}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 mt-4">
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'documents' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('documents')}
                    >
                      Documents
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'background' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('background')}
                    >
                      Background Check
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'references' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('references')}
                    >
                      References
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'info' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('info')}
                    >
                      Provider Info
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="p-4">
                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <div>
                      <div className="mb-4 flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">Verification Documents</h4>
                        <button 
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                          onClick={() => alert('Request additional documents')}
                        >
                          Request Documents
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {selectedProvider.documents.map((document) => (
                          <div key={document.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                  {getDocumentTypeIcon(document.type)}
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-800">{document.name}</h5>
                                  <p className="text-xs text-gray-500">Uploaded on {new Date(document.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1">
                                  {getDocumentStatusIcon(document.status)}
                                  <span className="text-xs font-medium capitalize">{document.status}</span>
                                </span>
                                <div className="flex gap-1">
                                  <button 
                                    className="p-1 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50"
                                    onClick={() => handleViewDocument(document)}
                                    title="View Document"
                                  >
                                    <FaEye />
                                  </button>
                                  {document.status !== 'verified' && (
                                    <button 
                                      className="p-1 text-green-600 hover:text-green-900 rounded-full hover:bg-green-50"
                                      onClick={() => handleDocumentAction('Verify', document.id)}
                                      title="Verify Document"
                                    >
                                      <FaCheck />
                                    </button>
                                  )}
                                  {document.status !== 'rejected' && (
                                    <button 
                                      className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                                      onClick={() => handleDocumentAction('Reject', document.id)}
                                      title="Reject Document"
                                    >
                                      <FaTimes />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            {document.notes && (
                              <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                                <span className="font-medium">Note:</span> {document.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {selectedProvider.documents.length === 0 && (
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                          <FaFileAlt className="mx-auto text-gray-400 text-3xl mb-2" />
                          <p className="text-gray-500">No documents have been submitted yet</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Background Check Tab */}
                  {activeTab === 'background' && (
                    <div>
                      <div className="mb-4 flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">Background Check</h4>
                        <button 
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                          onClick={() => alert('Initiate background check')}
                          disabled={selectedProvider.background.status === 'verified'}
                        >
                          {selectedProvider.background.status === 'pending' ? 'Check Status' : 'Initiate Check'}
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          {selectedProvider.background.status === 'verified' ? (
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <FaCheckCircle className="text-green-600" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <FaQuestionCircle className="text-amber-600" />
                            </div>
                          )}
                          <div>
                            <h5 className="text-sm font-medium text-gray-800">
                              {selectedProvider.background.status === 'verified' ? 'Background Check Completed' : 'Background Check Pending'}
                            </h5>
                            {selectedProvider.background.checkDate && (
                              <p className="text-xs text-gray-500">Completed on {new Date(selectedProvider.background.checkDate).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-700">
                          <p>{selectedProvider.background.notes || 'No notes available'}</p>
                        </div>
                        
                        {selectedProvider.background.status === 'verified' && (
                          <div className="mt-4">
                            <button 
                              className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
                              onClick={() => alert('View background check report')}
                            >
                              <FaFileAlt /> View Report
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* References Tab */}
                  {activeTab === 'references' && (
                    <div>
                      <div className="mb-4 flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">References</h4>
                        <button 
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                          onClick={() => alert('Request additional references')}
                        >
                          Request References
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {selectedProvider.references.map((reference, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-sm font-medium text-gray-800">{reference.name}</h5>
                                <p className="text-xs text-gray-500">{reference.relationship}</p>
                                <p className="text-xs text-gray-700 mt-1">{reference.contact}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {reference.verified ? (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <FaCheckCircle />
                                    <span className="text-xs font-medium">Verified</span>
                                  </span>
                                ) : (
                                  <button 
                                    className="px-2 py-1 bg-indigo-600 text-white rounded-md text-xs hover:bg-indigo-700 transition-colors"
                                    onClick={() => alert(`Verify reference: ${reference.name}`)}
                                  >
                                    Verify
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedProvider.references.length === 0 && (
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                          <FaFileAlt className="mx-auto text-gray-400 text-3xl mb-2" />
                          <p className="text-gray-500">No references have been provided</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Provider Info Tab */}
                  {activeTab === 'info' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-4">Provider Information</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h5>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm text-gray-800">{selectedProvider.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-sm text-gray-800">{selectedProvider.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Address</p>
                              <p className="text-sm text-gray-800">{selectedProvider.address}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Professional Information</h5>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-500">Provider Type</p>
                              <p className="text-sm text-gray-800">{selectedProvider.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Specialty</p>
                              <p className="text-sm text-gray-800">{selectedProvider.specialty}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Application Date</p>
                              <p className="text-sm text-gray-800">{new Date(selectedProvider.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <button 
                          className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => alert('Edit provider information')}
                        >
                          Edit Information
                        </button>
                        <button 
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                          onClick={() => alert('View full profile')}
                        >
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-indigo-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Provider Verification</h3>
                <p className="text-gray-500 mb-4">Select a provider from the list to verify their credentials and documents</p>
                <div className="flex justify-center">
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => handleViewProvider(filteredAndSortedProviders[0])}
                    disabled={filteredAndSortedProviders.length === 0}
                  >
                    View First Provider
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document View Modal */}
      {showDocumentModal && currentDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{currentDocument.name}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowDocumentModal(false);
                  setCurrentDocument(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center min-h-[300px]">
              {/* This would be the document preview in a real app */}
              <div className="text-center">
                <div className="text-6xl text-gray-400 mb-4">
                  {currentDocument.file.endsWith('.pdf') ? <FaFilePdf /> : <FaFileImage />}
                </div>
                <p className="text-gray-600">{currentDocument.file}</p>
                <p className="text-sm text-gray-500 mt-2">Document preview would be displayed here</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Uploaded on {new Date(currentDocument.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Status: <span className="capitalize">{currentDocument.status}</span></p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => alert('Download document')}
                >
                  <FaDownload className="inline mr-1" /> Download
                </button>
                {currentDocument.status !== 'verified' && (
                  <button 
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                    onClick={() => {
                      handleDocumentAction('Verify', currentDocument.id);
                      setShowDocumentModal(false);
                    }}
                  >
                    <FaCheck className="inline mr-1" /> Verify
                  </button>
                )}
                {currentDocument.status !== 'rejected' && (
                  <button 
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                    onClick={() => {
                      handleDocumentAction('Reject', currentDocument.id);
                      setShowDocumentModal(false);
                    }}
                  >
                    <FaTimes className="inline mr-1" /> Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProviderVerification;