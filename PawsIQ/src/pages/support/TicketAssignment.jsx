import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaUsers, FaSearch, FaFilter, FaSort, FaUserPlus, FaUserMinus, FaUserEdit, FaChartBar, FaExclamationTriangle, FaCheckCircle, FaClock, FaUserClock } from 'react-icons/fa';

const TicketAssignment = () => {
  // Sample agents data
  const [agents, setAgents] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@pawsiq.com',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      role: 'Senior Support Agent',
      status: 'Available',
      specialties: ['Billing', 'Technical', 'Refunds'],
      activeTickets: 4,
      resolvedToday: 7,
      avgResponseTime: '10 min',
      performance: 95
    },
    { 
      id: 2, 
      name: 'Michael Brown', 
      email: 'michael.brown@pawsiq.com',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      role: 'Support Agent',
      status: 'Busy',
      specialties: ['Booking', 'Provider Issues'],
      activeTickets: 6,
      resolvedToday: 5,
      avgResponseTime: '15 min',
      performance: 88
    },
    { 
      id: 3, 
      name: 'Jennifer Wilson', 
      email: 'jennifer.wilson@pawsiq.com',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      role: 'Support Team Lead',
      status: 'In Meeting',
      specialties: ['Escalations', 'VIP Customers', 'Complaints'],
      activeTickets: 2,
      resolvedToday: 3,
      avgResponseTime: '8 min',
      performance: 97
    },
    { 
      id: 4, 
      name: 'David Miller', 
      email: 'david.miller@pawsiq.com',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      role: 'Support Agent',
      status: 'Available',
      specialties: ['Pet Health', 'Mobile App', 'Account Issues'],
      activeTickets: 5,
      resolvedToday: 6,
      avgResponseTime: '12 min',
      performance: 90
    },
    { 
      id: 5, 
      name: 'Emily Clark', 
      email: 'emily.clark@pawsiq.com',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      role: 'Junior Support Agent',
      status: 'On Break',
      specialties: ['General Inquiries', 'Password Reset'],
      activeTickets: 3,
      resolvedToday: 4,
      avgResponseTime: '18 min',
      performance: 82
    },
  ]);

  // Sample unassigned tickets
  const [unassignedTickets, setUnassignedTickets] = useState([
    {
      id: 'TKT-1006',
      customer: 'Alex Rodriguez',
      subject: 'Cannot update payment method',
      priority: 'Medium',
      category: 'Billing',
      created: '2025-06-10T10:15:00',
      waitTime: '45 min'
    },
    {
      id: 'TKT-1007',
      customer: 'Jessica Thompson',
      subject: 'App crashes when uploading pet photos',
      priority: 'High',
      category: 'Technical',
      created: '2025-06-10T09:30:00',
      waitTime: '1 hr 30 min'
    },
    {
      id: 'TKT-1008',
      customer: 'William Davis',
      subject: 'Need to cancel subscription',
      priority: 'Low',
      category: 'Billing',
      created: '2025-06-10T11:45:00',
      waitTime: '15 min'
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  // Filtered agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'All' || agent.specialties.includes(specialtyFilter);
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  // Status badge color
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'In Meeting': return 'bg-purple-100 text-purple-800';
      case 'On Break': return 'bg-blue-100 text-blue-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Performance color
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Format date to time ago
  const formatTimeAgo = (dateString) => {
    return dateString; // In a real app, you would calculate time difference
  };

  // Handle assigning a ticket to an agent
  const handleAssignTicket = (ticketId, agentId) => {
    // In a real app, you would make an API call to assign the ticket
    console.log(`Assigning ticket ${ticketId} to agent ${agentId}`);
    
    // For demo purposes, just remove the ticket from unassigned list
    setUnassignedTickets(unassignedTickets.filter(ticket => ticket.id !== ticketId));
    
    // And update the agent's active ticket count
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, activeTickets: agent.activeTickets + 1 }
        : agent
    ));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaUsers className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Support Agent Management</h1>
            <p className="text-gray-500">Assign tickets and manage support team workload</p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Agents</p>
                <h3 className="text-2xl font-bold text-indigo-600">4</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaUsers className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Unassigned Tickets</p>
                <h3 className="text-2xl font-bold text-red-600">{unassignedTickets.length}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FaExclamationTriangle className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Resolved Today</p>
                <h3 className="text-2xl font-bold text-green-600">25</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg. Response Time</p>
                <h3 className="text-2xl font-bold text-yellow-600">13m</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Unassigned Tickets */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Unassigned Tickets</h2>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {unassignedTickets.length} Pending
            </span>
          </div>
          
          {unassignedTickets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wait Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assign To
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unassignedTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.waitTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          className="border border-gray-300 rounded-lg px-3 py-1 bg-white focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          onChange={(e) => handleAssignTicket(ticket.id, parseInt(e.target.value))}
                          defaultValue=""
                        >
                          <option value="" disabled>Assign to...</option>
                          {agents
                            .filter(agent => agent.status === 'Available' || agent.status === 'Busy')
                            .map(agent => (
                              <option key={agent.id} value={agent.id}>
                                {agent.name} ({agent.activeTickets} active)
                              </option>
                            ))
                          }
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No unassigned tickets at the moment.
            </div>
          )}
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-indigo-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search agents by name, email, or role..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="In Meeting">In Meeting</option>
                <option value="On Break">On Break</option>
                <option value="Offline">Offline</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                <option value="All">All Specialties</option>
                <option value="Billing">Billing</option>
                <option value="Technical">Technical</option>
                <option value="Refunds">Refunds</option>
                <option value="Booking">Booking</option>
                <option value="Provider Issues">Provider Issues</option>
                <option value="Escalations">Escalations</option>
                <option value="VIP Customers">VIP Customers</option>
                <option value="Complaints">Complaints</option>
                <option value="Pet Health">Pet Health</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Account Issues">Account Issues</option>
                <option value="General Inquiries">General Inquiries</option>
                <option value="Password Reset">Password Reset</option>
              </select>
              
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <FaUserPlus size={14} /> Add Agent
              </button>
            </div>
          </div>
        </div>
        
        {/* Agents Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Tickets
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved Today
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Response
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAgents.length > 0 ? (
                  filteredAgents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={agent.avatar} alt={agent.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {agent.specialties.map((specialty, index) => (
                            <span 
                              key={index} 
                              className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.activeTickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.resolvedToday}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent.avgResponseTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              agent.performance >= 90 ? 'bg-green-600' : 
                              agent.performance >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${agent.performance}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900" title="View Performance">
                            <FaChartBar />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900" title="Edit Agent">
                            <FaUserEdit />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-900" title="Change Status">
                            <FaUserClock />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                      No agents found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketAssignment;