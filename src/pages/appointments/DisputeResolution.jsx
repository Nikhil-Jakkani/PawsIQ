import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  FaExclamationTriangle, 
  FaUsers, 
  FaComments,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaGavel,
  FaPhone,
  FaEnvelope,
  FaCamera,
  FaUpload,
  FaDownload,
  FaEye,
  FaEdit,
  FaFlag,
  FaMoneyBillWave,
  FaCalendarTimes,
  FaUserClock,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaSort
} from 'react-icons/fa';

const DisputeResolution = () => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample disputes data
  const disputes = [
    {
      id: 'DSP001',
      type: 'Service Quality',
      status: 'Open',
      priority: 'High',
      customerName: 'Sarah Johnson',
      providerName: 'Mike Thompson',
      petName: 'Max',
      service: 'Dog Walking',
      appointmentDate: '2024-01-10',
      amount: 25.00,
      createdDate: '2024-01-11',
      description: 'Dog was returned dirty and tired. Provider was 30 minutes late for pickup.',
      customerRating: 1,
      evidence: ['photo1.jpg', 'photo2.jpg'],
      messages: [
        { sender: 'Customer', message: 'Very disappointed with the service quality.', timestamp: '2024-01-11 10:30' },
        { sender: 'Provider', message: 'I apologize for the delay. There was unexpected traffic.', timestamp: '2024-01-11 11:00' }
      ],
      resolution: null
    },
    {
      id: 'DSP002',
      type: 'No Show',
      status: 'In Progress',
      priority: 'Medium',
      customerName: 'John Smith',
      providerName: 'Dr. Anderson',
      petName: 'Luna',
      service: 'Veterinary Checkup',
      appointmentDate: '2024-01-12',
      amount: 120.00,
      createdDate: '2024-01-12',
      description: 'Provider did not show up for scheduled appointment. No prior notice given.',
      customerRating: null,
      evidence: ['screenshot.jpg'],
      messages: [
        { sender: 'Customer', message: 'Waited for 2 hours, no one showed up.', timestamp: '2024-01-12 14:00' },
        { sender: 'Admin', message: 'We are investigating this matter. Apologies for the inconvenience.', timestamp: '2024-01-12 15:30' }
      ],
      resolution: null
    },
    {
      id: 'DSP003',
      type: 'Payment Issue',
      status: 'Resolved',
      priority: 'Low',
      customerName: 'Emily Davis',
      providerName: 'Lisa Chen',
      petName: 'Buddy',
      service: 'Pet Grooming',
      appointmentDate: '2024-01-08',
      amount: 75.00,
      createdDate: '2024-01-09',
      description: 'Double charged for the same service. Requesting refund for duplicate payment.',
      customerRating: 4,
      evidence: ['receipt.pdf'],
      messages: [
        { sender: 'Customer', message: 'I was charged twice for the same appointment.', timestamp: '2024-01-09 09:00' },
        { sender: 'Admin', message: 'Refund has been processed. Please allow 3-5 business days.', timestamp: '2024-01-09 11:00' }
      ],
      resolution: {
        type: 'Refund',
        amount: 75.00,
        resolvedBy: 'Admin Team',
        resolvedDate: '2024-01-09',
        notes: 'Duplicate charge confirmed. Full refund issued.'
      }
    }
  ];

  // Filter disputes
  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.petName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || dispute.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || dispute.type.toLowerCase().replace(' ', '') === filterType.toLowerCase().replace(' ', '');
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Open': { bg: 'bg-red-100', text: 'text-red-800', icon: FaExclamationTriangle },
      'In Progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      'Resolved': { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle },
      'Closed': { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaTimesCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Open'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {status}
      </span>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'High': { bg: 'bg-red-100', text: 'text-red-800' },
      'Medium': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'Low': { bg: 'bg-green-100', text: 'text-green-800' }
    };
    
    const config = priorityConfig[priority] || priorityConfig['Medium'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
        {priority}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Dispute Resolution Center</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage and resolve customer disputes and complaints</p>
          </div>
          <Link 
            to="/appointments"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            Back to Appointments <FaArrowRight />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Disputes</p>
                <p className="text-2xl font-bold text-red-600">
                  {disputes.filter(d => d.status === 'Open').length}
                </p>
              </div>
              <FaExclamationTriangle className="text-red-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {disputes.filter(d => d.status === 'In Progress').length}
                </p>
              </div>
              <FaClock className="text-yellow-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <FaCheckCircle className="text-green-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-blue-600">2.5h</p>
              </div>
              <FaGavel className="text-blue-400 text-2xl" />
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
                  placeholder="Search disputes, customers, providers..."
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
                <option value="open">Open</option>
                <option value="inprogress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            {/* Type Filter */}
            <div>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="servicequality">Service Quality</option>
                <option value="noshow">No Show</option>
                <option value="paymentissue">Payment Issue</option>
                <option value="behavioral">Behavioral Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Disputes List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Active Disputes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dispute ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parties Involved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service & Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDisputes.map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{dispute.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dispute.type}</div>
                      <div className="mt-1">{getPriorityBadge(dispute.priority)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{dispute.customerName}</div>
                        <div className="text-gray-500">vs {dispute.providerName}</div>
                        <div className="text-xs text-gray-400">Pet: {dispute.petName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dispute.service}</div>
                      <div className="text-sm font-medium text-green-600">${dispute.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(dispute.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dispute.createdDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDispute(dispute)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {dispute.status !== 'Resolved' && (
                          <button
                            onClick={() => {
                              setSelectedDispute(dispute);
                              setShowResolutionModal(true);
                            }}
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                            title="Resolve Dispute"
                          >
                            <FaGavel />
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Contacting parties for dispute ${dispute.id}`)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                          title="Contact Parties"
                        >
                          <FaPhone />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dispute Details Modal */}
        {selectedDispute && !showResolutionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Dispute Details - #{selectedDispute.id}
                </h3>
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimesCircle className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Dispute Info */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Dispute Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDispute.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedDispute.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        {getPriorityBadge(selectedDispute.priority)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium text-green-600">${selectedDispute.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Date:</span>
                        <span className="font-medium">{selectedDispute.appointmentDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parties Involved */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Parties Involved</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-blue-800">Customer</div>
                        <div className="text-sm text-gray-600">{selectedDispute.customerName}</div>
                        <div className="text-xs text-gray-500">Pet: {selectedDispute.petName}</div>
                      </div>
                      <div>
                        <div className="font-medium text-purple-800">Provider</div>
                        <div className="text-sm text-gray-600">{selectedDispute.providerName}</div>
                        <div className="text-xs text-gray-500">Service: {selectedDispute.service}</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedDispute.description}</p>
                  </div>

                  {/* Evidence */}
                  {selectedDispute.evidence.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Evidence</h4>
                      <div className="flex gap-2">
                        {selectedDispute.evidence.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                            <FaFileAlt className="text-gray-500" />
                            <span className="text-sm">{file}</span>
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <FaDownload />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Messages & Resolution */}
                <div className="space-y-6">
                  {/* Messages */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Communication History</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedDispute.messages.map((message, index) => (
                        <div key={index} className={`p-3 rounded-lg ${
                          message.sender === 'Customer' ? 'bg-blue-50 ml-4' :
                          message.sender === 'Provider' ? 'bg-purple-50 mr-4' :
                          'bg-gray-100'
                        }`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Message</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows="3"
                      placeholder="Type your message to the parties..."
                    ></textarea>
                    <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                      Send Message
                    </button>
                  </div>

                  {/* Resolution (if resolved) */}
                  {selectedDispute.resolution && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Resolution</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Type:</strong> {selectedDispute.resolution.type}</div>
                        <div><strong>Amount:</strong> ${selectedDispute.resolution.amount.toFixed(2)}</div>
                        <div><strong>Resolved By:</strong> {selectedDispute.resolution.resolvedBy}</div>
                        <div><strong>Date:</strong> {selectedDispute.resolution.resolvedDate}</div>
                        <div><strong>Notes:</strong> {selectedDispute.resolution.notes}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedDispute.status !== 'Resolved' && (
                  <button
                    onClick={() => setShowResolutionModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                  >
                    <FaGavel /> Resolve Dispute
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Resolution Modal */}
        {showResolutionModal && selectedDispute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Resolve Dispute - #{selectedDispute.id}
                </h3>
                <button
                  onClick={() => setShowResolutionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimesCircle className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Resolution Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Resolution</option>
                    <option value="full-refund">Full Refund</option>
                    <option value="partial-refund">Partial Refund</option>
                    <option value="service-credit">Service Credit</option>
                    <option value="reschedule">Reschedule Service</option>
                    <option value="provider-warning">Provider Warning</option>
                    <option value="no-action">No Action Required</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Refund Amount ($)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                    step="0.01"
                    max={selectedDispute.amount}
                  />
                </div>

                {/* Resolution Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Notes</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="4"
                    placeholder="Explain the resolution and any actions taken..."
                  ></textarea>
                </div>

                {/* Notifications */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Notifications</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notify customer via email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notify provider via email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Send SMS notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowResolutionModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Dispute resolved successfully!');
                    setShowResolutionModal(false);
                    setSelectedDispute(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <FaCheckCircle /> Resolve Dispute
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DisputeResolution;