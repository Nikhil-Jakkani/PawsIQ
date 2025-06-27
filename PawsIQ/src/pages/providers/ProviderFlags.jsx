import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaCheck,
  FaTimes,
  FaFlag,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaUserCircle,
  FaCalendarAlt,
  FaCommentAlt,
  FaShieldAlt,
  FaBan,
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ProviderFlags = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [currentFlag, setCurrentFlag] = useState(null);
  
  // Sample data for provider flags
  const flagsData = [
    { 
      id: 1, 
      providerName: 'Happy Paws Veterinary Clinic', 
      providerEmail: 'info@happypawsvet.com',
      reportedBy: 'John Smith',
      reporterEmail: 'john.smith@example.com',
      reason: 'Service Quality',
      description: 'The vet was very rushed during the appointment and didn\'t address all my concerns about my pet\'s health.',
      date: '2023-12-05',
      status: 'pending',
      severity: 'low',
      notes: '',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Veterinary Check-up'
    },
    { 
      id: 2, 
      providerName: 'Fluffy Cuts Grooming', 
      providerEmail: 'appointments@fluffycuts.com',
      reportedBy: 'Sarah Johnson',
      reporterEmail: 'sarah.j@example.com',
      reason: 'Injury to Pet',
      description: 'My cat came back with a small cut on her paw after grooming. The groomer didn\'t mention anything about it when I picked her up.',
      date: '2023-12-03',
      status: 'investigating',
      severity: 'medium',
      notes: 'Contacted groomer for explanation. Awaiting response.',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Full Grooming'
    },
    { 
      id: 3, 
      providerName: 'Paws & Play Pet Sitting', 
      providerEmail: 'care@pawsandplay.com',
      reportedBy: 'Michael Brown',
      reporterEmail: 'michael.b@example.com',
      reason: 'No-Show',
      description: 'The pet sitter never showed up for the scheduled appointment. I had to rush home from work to take care of my pets.',
      date: '2023-12-01',
      status: 'resolved',
      severity: 'high',
      notes: 'Pet sitter confirmed they missed the appointment due to a scheduling error.',
      resolution: 'Full refund issued to customer. Warning issued to provider.',
      resolutionDate: '2023-12-02',
      serviceType: 'Pet Sitting'
    },
    { 
      id: 4, 
      providerName: 'Canine Academy', 
      providerEmail: 'training@canineacademy.com',
      reportedBy: 'Emily Davis',
      reporterEmail: 'emily.d@example.com',
      reason: 'Inappropriate Behavior',
      description: 'The trainer used harsh methods that made my dog fearful. This is not the positive reinforcement training that was advertised.',
      date: '2023-11-28',
      status: 'investigating',
      severity: 'high',
      notes: 'Scheduled interview with trainer and requested training session videos.',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Dog Training'
    },
    { 
      id: 5, 
      providerName: 'Pet Paradise Boarding', 
      providerEmail: 'reservations@petparadise.com',
      reportedBy: 'David Wilson',
      reporterEmail: 'david.w@example.com',
      reason: 'Facility Conditions',
      description: 'The boarding facility was not as clean as shown in the photos. My dog\'s kennel had not been cleaned properly.',
      date: '2023-11-25',
      status: 'pending',
      severity: 'medium',
      notes: '',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Overnight Boarding'
    },
    { 
      id: 6, 
      providerName: 'Whiskers & Paws Clinic', 
      providerEmail: 'appointments@whiskerspaws.com',
      reportedBy: 'Jessica Taylor',
      reporterEmail: 'jessica.t@example.com',
      reason: 'Billing Dispute',
      description: 'I was charged for services that were not performed. The itemized bill includes medications that my pet did not receive.',
      date: '2023-11-22',
      status: 'resolved',
      severity: 'medium',
      notes: 'Clinic provided documentation of all services and medications administered.',
      resolution: 'Billing error confirmed. Refund issued for incorrect charges.',
      resolutionDate: '2023-11-24',
      serviceType: 'Veterinary Care'
    },
    { 
      id: 7, 
      providerName: 'Pawfect Walkers', 
      providerEmail: 'schedule@pawfectwalkers.com',
      reportedBy: 'Robert Martinez',
      reporterEmail: 'robert.m@example.com',
      reason: 'Lost Pet',
      description: 'The dog walker lost control of my dog during a walk. Fortunately, a neighbor found him and returned him safely.',
      date: '2023-11-20',
      status: 'investigating',
      severity: 'critical',
      notes: 'Interviewing dog walker and reviewing their safety protocols.',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Dog Walking'
    },
    { 
      id: 8, 
      providerName: 'Elite Pet Grooming', 
      providerEmail: 'bookings@elitepetgrooming.com',
      reportedBy: 'Lisa Anderson',
      reporterEmail: 'lisa.a@example.com',
      reason: 'Service Not As Described',
      description: 'I paid for a premium grooming package but my dog only received a basic grooming service.',
      date: '2023-11-18',
      status: 'resolved',
      severity: 'low',
      notes: 'Groomer acknowledged the miscommunication.',
      resolution: 'Partial refund issued and complimentary grooming service offered for next visit.',
      resolutionDate: '2023-11-19',
      serviceType: 'Pet Grooming'
    },
    { 
      id: 9, 
      providerName: 'Healthy Paws Veterinary', 
      providerEmail: 'care@healthypaws.com',
      reportedBy: 'Kevin Thomas',
      reporterEmail: 'kevin.t@example.com',
      reason: 'Misdiagnosis',
      description: 'The vet misdiagnosed my dog\'s condition, leading to unnecessary treatment and delayed proper care.',
      date: '2023-11-15',
      status: 'investigating',
      severity: 'high',
      notes: 'Reviewing medical records and consulting with independent veterinarian.',
      resolution: '',
      resolutionDate: '',
      serviceType: 'Veterinary Care'
    },
    { 
      id: 10, 
      providerName: 'Home Pet Care', 
      providerEmail: 'service@homepetcare.com',
      reportedBy: 'Amanda White',
      reporterEmail: 'amanda.w@example.com',
      reason: 'Property Damage',
      description: 'The pet sitter damaged furniture in my home during their stay. They admitted to the damage but have not offered compensation.',
      date: '2023-11-12',
      status: 'resolved',
      severity: 'medium',
      notes: 'Pet sitter provided evidence of accidental damage.',
      resolution: 'Provider\'s insurance covered the cost of repairs.',
      resolutionDate: '2023-11-14',
      serviceType: 'In-home Pet Sitting'
    }
  ];

  // Get severity icon and color
  const getSeverityInfo = (severity) => {
    switch (severity) {
      case 'critical':
        return { 
          icon: <FaExclamationCircle className="text-red-600" />, 
          bgColor: 'bg-red-100', 
          textColor: 'text-red-800' 
        };
      case 'high':
        return { 
          icon: <FaExclamationTriangle className="text-amber-600" />, 
          bgColor: 'bg-amber-100', 
          textColor: 'text-amber-800' 
        };
      case 'medium':
        return { 
          icon: <FaFlag className="text-orange-500" />, 
          bgColor: 'bg-orange-100', 
          textColor: 'text-orange-800' 
        };
      case 'low':
        return { 
          icon: <FaFlag className="text-blue-500" />, 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-800' 
        };
      default:
        return { 
          icon: <FaFlag className="text-gray-500" />, 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800' 
        };
    }
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { 
          icon: <FaFlag className="text-amber-500" />, 
          bgColor: 'bg-amber-100', 
          textColor: 'text-amber-800',
          label: 'Pending Review'
        };
      case 'investigating':
        return { 
          icon: <FaSearch className="text-blue-500" />, 
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-800',
          label: 'Investigating'
        };
      case 'resolved':
        return { 
          icon: <FaCheck className="text-green-500" />, 
          bgColor: 'bg-green-100', 
          textColor: 'text-green-800',
          label: 'Resolved'
        };
      case 'dismissed':
        return { 
          icon: <FaTimes className="text-gray-500" />, 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          label: 'Dismissed'
        };
      default:
        return { 
          icon: <FaFlag className="text-gray-500" />, 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          label: status
        };
    }
  };

  // Filter and sort flags
  const filteredAndSortedFlags = flagsData
    .filter(flag => {
      const matchesSearch = 
        flag.providerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        flag.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flag.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flag.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = filterSeverity === 'all' || flag.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || flag.status === filterStatus;
      
      return matchesSearch && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortField === 'severity') {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        comparison = severityOrder[a.severity] - severityOrder[b.severity];
      } else if (sortField === 'providerName') {
        comparison = a.providerName.localeCompare(b.providerName);
      } else if (sortField === 'reason') {
        comparison = a.reason.localeCompare(b.reason);
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

  // Handle view flag details
  const handleViewFlag = (flag) => {
    setCurrentFlag(flag);
    setShowFlagModal(true);
  };

  // Handle flag status change
  const handleStatusChange = (flagId, newStatus) => {
    // In a real app, you would call an API to update the flag status
    console.log(`Changing flag ${flagId} status to ${newStatus}`);
    alert(`Flag status changed to ${newStatus}`);
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
              <h1 className="text-2xl font-bold text-gray-800">Provider Flags</h1>
              <p className="text-gray-500">Manage and investigate reported issues with service providers</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Reports
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
                placeholder="Search flags..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Severity Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            {/* Status Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        {/* Flags Table */}
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
                    onClick={() => handleSort('reason')}
                  >
                    <div className="flex items-center">
                      Reason {getSortIcon('reason')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported By
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date {getSortIcon('date')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('severity')}
                  >
                    <div className="flex items-center">
                      Severity {getSortIcon('severity')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedFlags.map((flag) => {
                  const severityInfo = getSeverityInfo(flag.severity);
                  const statusInfo = getStatusInfo(flag.status);
                  
                  return (
                    <tr key={flag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{flag.providerName}</div>
                        <div className="text-xs text-gray-500">{flag.serviceType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{flag.reason}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{flag.reportedBy}</div>
                        <div className="text-xs text-gray-500">{flag.reporterEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {flag.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${severityInfo.bgColor} ${severityInfo.textColor}`}>
                          {severityInfo.icon}
                          <span className="capitalize">{flag.severity}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.icon}
                          <span>{statusInfo.label}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewFlag(flag)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {flag.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(flag.id, 'investigating')}
                              className="text-blue-600 hover:text-blue-900"
                              title="Start Investigation"
                            >
                              <FaSearch />
                            </button>
                          )}
                          {(flag.status === 'pending' || flag.status === 'investigating') && (
                            <>
                              <button
                                onClick={() => handleStatusChange(flag.id, 'resolved')}
                                className="text-green-600 hover:text-green-900"
                                title="Mark as Resolved"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleStatusChange(flag.id, 'dismissed')}
                                className="text-red-600 hover:text-red-900"
                                title="Dismiss Flag"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flag Details Modal */}
        {showFlagModal && currentFlag && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Flag Details</h2>
                  <button 
                    onClick={() => setShowFlagModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Provider Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-base font-medium text-gray-900">{currentFlag.providerName}</p>
                      <p className="text-sm text-gray-500">{currentFlag.providerEmail}</p>
                      <p className="text-sm text-gray-500 mt-1">Service: {currentFlag.serviceType}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Reporter Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaUserCircle className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-900">{currentFlag.reportedBy}</p>
                          <p className="text-sm text-gray-500">{currentFlag.reporterEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Flag Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getSeverityInfo(currentFlag.severity).bgColor} ${getSeverityInfo(currentFlag.severity).textColor}`}>
                          {getSeverityInfo(currentFlag.severity).icon}
                          <span className="capitalize">{currentFlag.severity} Severity</span>
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusInfo(currentFlag.status).bgColor} ${getStatusInfo(currentFlag.status).textColor}`}>
                          {getStatusInfo(currentFlag.status).icon}
                          <span>{getStatusInfo(currentFlag.status).label}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaCalendarAlt />
                        <span>Reported on {currentFlag.date}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-base font-medium text-gray-900 mb-1">Reason for Flag</h4>
                      <p className="text-sm text-gray-700">{currentFlag.reason}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-1">Description</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{currentFlag.description}</p>
                    </div>
                  </div>
                </div>

                {currentFlag.notes && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Investigation Notes</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">{currentFlag.notes}</p>
                    </div>
                  </div>
                )}

                {currentFlag.resolution && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Resolution</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="text-base font-medium text-gray-900">Resolution Details</p>
                        {currentFlag.resolutionDate && (
                          <p className="text-sm text-gray-500">Resolved on {currentFlag.resolutionDate}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{currentFlag.resolution}</p>
                    </div>
                  </div>
                )}

                {(currentFlag.status === 'pending' || currentFlag.status === 'investigating') && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {currentFlag.status === 'pending' ? 'Add Investigation Notes' : 'Update Investigation Notes'}
                    </h3>
                    <textarea
                      rows="4"
                      placeholder="Enter notes about the investigation..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue={currentFlag.notes}
                    ></textarea>
                  </div>
                )}

                {(currentFlag.status === 'pending' || currentFlag.status === 'investigating') && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      {currentFlag.status === 'pending' && (
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                          onClick={() => {
                            handleStatusChange(currentFlag.id, 'investigating');
                            setShowFlagModal(false);
                          }}
                        >
                          <FaSearch /> Start Investigation
                        </button>
                      )}
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                        onClick={() => {
                          handleStatusChange(currentFlag.id, 'resolved');
                          setShowFlagModal(false);
                        }}
                      >
                        <FaCheck /> Mark as Resolved
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                        onClick={() => {
                          handleStatusChange(currentFlag.id, 'dismissed');
                          setShowFlagModal(false);
                        }}
                      >
                        <FaTimes /> Dismiss Flag
                      </button>
                      <button
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center gap-2"
                        onClick={() => alert('Provider would be suspended')}
                      >
                        <FaBan /> Suspend Provider
                      </button>
                    </div>
                  </div>
                )}

                {currentFlag.status === 'resolved' && !currentFlag.resolution && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Add Resolution Details</h3>
                    <textarea
                      rows="4"
                      placeholder="Enter details about how this issue was resolved..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                    <button
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => alert('Resolution details would be saved')}
                    >
                      Save Resolution
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowFlagModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProviderFlags;