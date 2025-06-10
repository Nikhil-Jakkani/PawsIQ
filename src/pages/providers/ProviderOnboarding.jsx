import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHospital, 
  FaClipboardCheck, 
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
  FaSortDown
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ProviderOnboarding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  // Sample data for applications
  const applicationsData = [
    { id: 1, name: 'Dr. James Wilson', email: 'james.wilson@example.com', phone: '(555) 123-4567', type: 'Veterinarian', specialty: 'Small Animals', status: 'Pending Review', date: '2023-12-05', documents: ['License', 'Certification', 'Insurance', 'ID'], experience: '8 years', address: '123 Main St, Anytown, CA 12345', notes: 'Specializes in small animal care with focus on dogs and cats. Previously worked at City Animal Hospital for 5 years.' },
    { id: 2, name: 'Emma Thompson', email: 'emma.t@example.com', phone: '(555) 234-5678', type: 'Groomer', specialty: 'Dogs', status: 'Pending Review', date: '2023-12-04', documents: ['Certification', 'Insurance', 'ID'], experience: '5 years', address: '456 Oak Ave, Somewhere, NY 67890', notes: 'Professional dog groomer with specialty in poodles and other high-maintenance breeds. Owns mobile grooming business.' },
    { id: 3, name: 'Dr. Michael Chen', email: 'michael.c@example.com', phone: '(555) 345-6789', type: 'Veterinarian', specialty: 'Exotic Pets', status: 'In Progress', date: '2023-12-03', documents: ['License', 'ID'], experience: '10 years', address: '789 Pine Rd, Elsewhere, TX 54321', notes: 'Waiting for certification documents. Specializes in exotic animals including reptiles and birds.' },
    { id: 4, name: 'Sophia Rodriguez', email: 'sophia.r@example.com', phone: '(555) 456-7890', type: 'Pet Sitter', specialty: 'All Pets', status: 'Pending Review', date: '2023-12-02', documents: ['Insurance', 'ID', 'Background Check'], experience: '3 years', address: '321 Elm St, Nowhere, FL 13579', notes: 'Experienced with dogs, cats, and small mammals. Available for overnight stays.' },
    { id: 5, name: 'Robert Johnson', email: 'robert.j@example.com', phone: '(555) 567-8901', type: 'Trainer', specialty: 'Behavior Training', status: 'Incomplete', date: '2023-12-01', documents: ['ID'], experience: '7 years', address: '654 Maple Dr, Anyplace, WA 24680', notes: 'Missing certification documents and insurance information. Follow up required.' },
    { id: 6, name: 'Dr. Sarah Miller', email: 'sarah.m@example.com', phone: '(555) 678-9012', type: 'Veterinarian', specialty: 'Surgery', status: 'Approved', date: '2023-11-30', documents: ['License', 'Certification', 'Insurance', 'ID', 'References'], experience: '12 years', address: '987 Cedar Ln, Somewhere, IL 97531', notes: 'Highly qualified veterinary surgeon with specialty in orthopedics. All documents verified.' },
    { id: 7, name: 'David Garcia', email: 'david.g@example.com', phone: '(555) 789-0123', type: 'Groomer', specialty: 'Cats', status: 'Rejected', date: '2023-11-29', documents: ['ID', 'Insurance'], experience: '2 years', address: '246 Birch Ct, Elsewhere, GA 86420', notes: 'Insufficient experience and missing proper certification for cat grooming.' },
    { id: 8, name: 'Jennifer Lee', email: 'jennifer.l@example.com', phone: '(555) 890-1234', type: 'Pet Sitter', specialty: 'Overnight Care', status: 'Pending Review', date: '2023-11-28', documents: ['Insurance', 'ID', 'Background Check', 'References'], experience: '4 years', address: '135 Walnut Ave, Nowhere, MI 75319', notes: 'Specializes in overnight pet sitting and house sitting. Good references from previous clients.' }
  ];

  // Filter and sort applications
  const filteredAndSortedApplications = applicationsData
    .filter(app => {
      const matchesSearch = 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || app.type.toLowerCase() === filterType.toLowerCase();
      const matchesStatus = filterStatus === 'all' || app.status.toLowerCase().includes(filterStatus.toLowerCase());
      
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
      } else if (sortField === 'experience') {
        const expA = parseInt(a.experience.split(' ')[0]);
        const expB = parseInt(b.experience.split(' ')[0]);
        comparison = expA - expB;
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

  // Handle view application
  const handleViewApplication = (application) => {
    setSelectedApplication(application);
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

  // Handle application action
  const handleApplicationAction = (action, applicationId) => {
    console.log(`Performing ${action} on application:`, applicationId);
    // In a real app, you would call an API to perform the action
    alert(`${action} action would be performed on application #${applicationId}`);
    
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication(null);
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Provider Onboarding</h1>
              <p className="text-gray-500">Manage and approve new service provider applications</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{applicationsData.length}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <FaClipboardCheck className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-xl font-bold text-amber-600 mt-1">
                  {applicationsData.filter(app => app.status === 'Pending Review').length}
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <FaClipboardCheck className="text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {applicationsData.filter(app => app.status === 'Approved').length}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheck className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-xl font-bold text-red-600 mt-1">
                  {applicationsData.filter(app => app.status === 'Rejected').length}
                </p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaTimes className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
                {/* Search */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search applications..."
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
                    <option value="pending">Pending Review</option>
                    <option value="in progress">In Progress</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Provider Applications</h2>
                <div className="text-sm text-gray-500">
                  Showing {filteredAndSortedApplications.length} of {applicationsData.length}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                        <div className="flex items-center">
                          Date {getSortIcon('date')}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          Status {getSortIcon('status')}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedApplications.map((application) => (
                      <tr 
                        key={application.id} 
                        className={`hover:bg-gray-50 ${selectedApplication?.id === application.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => handleViewApplication(application)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              {getProviderTypeIcon(application.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{application.name}</div>
                              <div className="text-sm text-gray-500">{application.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>{application.type}</div>
                            <div className="text-xs text-gray-400">{application.specialty}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(application.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${application.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              application.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              application.status === 'Incomplete' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'}`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            <button 
                              className="text-indigo-600 hover:text-indigo-900" 
                              title="View Application"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewApplication(application);
                              }}
                            >
                              <FaEye />
                            </button>
                            {application.status !== 'Approved' && application.status !== 'Rejected' && (
                              <button 
                                className="text-green-600 hover:text-green-900" 
                                title="Approve Application"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplicationAction('Approve', application.id);
                                }}
                              >
                                <FaCheck />
                              </button>
                            )}
                            {application.status !== 'Rejected' && (
                              <button 
                                className="text-red-600 hover:text-red-900" 
                                title="Reject Application"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplicationAction('Reject', application.id);
                                }}
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredAndSortedApplications.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No applications found matching your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">Application Details</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedApplication(null)}
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      {getProviderTypeIcon(selectedApplication.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{selectedApplication.name}</h3>
                      <p className="text-gray-500">{selectedApplication.type} - {selectedApplication.specialty}</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1
                        ${selectedApplication.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          selectedApplication.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                          selectedApplication.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          selectedApplication.status === 'Incomplete' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'}`}>
                        {selectedApplication.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-800">{selectedApplication.email}</p>
                        <p className="text-sm text-gray-800">{selectedApplication.phone}</p>
                        <p className="text-sm text-gray-800">{selectedApplication.address}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                      <p className="text-sm text-gray-800 mt-1">{selectedApplication.experience}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Application Date</h4>
                      <p className="text-sm text-gray-800 mt-1">{new Date(selectedApplication.date).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Documents Submitted</h4>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {selectedApplication.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md">
                            <FaFileAlt className="text-indigo-500 mr-2" />
                            <span className="text-sm text-gray-800">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="text-sm text-gray-800 mt-1">{selectedApplication.notes}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    {selectedApplication.status !== 'Approved' && selectedApplication.status !== 'Rejected' && (
                      <button 
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        onClick={() => handleApplicationAction('Approve', selectedApplication.id)}
                      >
                        <FaCheck /> Approve Application
                      </button>
                    )}
                    
                    {selectedApplication.status !== 'Rejected' && (
                      <button 
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        onClick={() => handleApplicationAction('Reject', selectedApplication.id)}
                      >
                        <FaTimes /> Reject Application
                      </button>
                    )}
                    
                    <button 
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      onClick={() => alert(`Request more information from ${selectedApplication.name}`)}
                    >
                      <FaClipboardCheck /> Request More Info
                    </button>
                    
                    <button 
                      className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      onClick={() => alert(`View all documents for ${selectedApplication.name}`)}
                    >
                      <FaEye /> View All Documents
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClipboardCheck className="text-indigo-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Application Details</h3>
                <p className="text-gray-500 mb-4">Select an application to view its details</p>
                <div className="flex justify-center">
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => handleViewApplication(filteredAndSortedApplications[0])}
                    disabled={filteredAndSortedApplications.length === 0}
                  >
                    View First Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderOnboarding;