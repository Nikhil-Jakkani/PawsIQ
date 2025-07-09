import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  FaCreditCard, 
  FaSearch, 
  FaFilter, 
  FaDownload,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCheck,
  FaClock,
  FaTimes,
  FaUndo,
  FaPlus,
  FaMinus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaUserPlus,
  FaCogs,
  FaChartLine,
  FaWallet,
  FaExchangeAlt
} from 'react-icons/fa';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample financial data
  const financialStats = {
    totalRevenue: 45780.50,
    monthlyRevenue: 12450.75,
    pendingPayouts: 8920.25,
    refundsIssued: 1250.00,
    failedTransactions: 15,
    outstandingBalance: 2340.80
  };

  // Sample subscription tiers
  const subscriptionTiers = [
    { id: 1, name: 'Basic', price: 9.99, features: ['5 Pet Profiles', 'Basic Support', '10 Bookings/month'] },
    { id: 2, name: 'Premium', price: 19.99, features: ['15 Pet Profiles', 'Priority Support', '50 Bookings/month', 'Advanced Analytics'] },
    { id: 3, name: 'Professional', price: 39.99, features: ['Unlimited Profiles', '24/7 Support', 'Unlimited Bookings', 'Custom Reports', 'API Access'] }
  ];

  // Sample transactions data
  const transactionsData = [
    {
      id: 'TXN001',
      type: 'Payment',
      customer: 'Sarah Johnson',
      provider: 'Mike Thompson',
      service: 'Dog Walking',
      amount: 25.00,
      fee: 2.50,
      net: 22.50,
      status: 'Completed',
      date: '2024-01-15 10:30 AM',
      paymentMethod: 'Credit Card (**** 4532)',
      transactionId: 'pi_1234567890'
    },
    {
      id: 'TXN002',
      type: 'Payout',
      customer: 'System',
      provider: 'Pet Spa Plus',
      service: 'Weekly Payout',
      amount: 340.00,
      fee: 5.10,
      net: 334.90,
      status: 'Pending',
      date: '2024-01-15 09:00 AM',
      paymentMethod: 'Bank Transfer',
      transactionId: 'po_0987654321'
    },
    {
      id: 'TXN003',
      type: 'Refund',
      customer: 'John Smith',
      provider: 'Dr. Anderson',
      service: 'Veterinary Checkup',
      amount: -120.00,
      fee: -3.60,
      net: -116.40,
      status: 'Completed',
      date: '2024-01-14 03:45 PM',
      paymentMethod: 'Credit Card (**** 1234)',
      transactionId: 're_1122334455'
    },
    {
      id: 'TXN004',
      type: 'Payment',
      customer: 'Emily Davis',
      provider: 'Maria Rodriguez',
      service: 'Pet Sitting',
      amount: 60.00,
      fee: 6.00,
      net: 54.00,
      status: 'Failed',
      date: '2024-01-14 11:20 AM',
      paymentMethod: 'Credit Card (**** 9876)',
      transactionId: 'pi_5566778899'
    },
    {
      id: 'TXN005',
      type: 'Subscription',
      customer: 'David Wilson',
      provider: 'PawsIQ',
      service: 'Premium Plan',
      amount: 19.99,
      fee: 0.60,
      net: 19.39,
      status: 'Completed',
      date: '2024-01-13 02:15 PM',
      paymentMethod: 'Credit Card (**** 5555)',
      transactionId: 'sub_9988776655'
    },
    {
      id: 'TXN006',
      type: 'Payment',
      customer: 'Lisa Anderson',
      provider: 'Training Pro',
      service: 'Dog Training',
      amount: 75.00,
      fee: 7.50,
      net: 67.50,
      status: 'Processing',
      date: '2024-01-15 04:30 PM',
      paymentMethod: 'PayPal',
      transactionId: 'pi_4433221100'
    }
  ];

  // Filter and sort transactions
  const filteredAndSortedTransactions = transactionsData
    .filter(transaction => {
      const matchesSearch = 
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.service.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || transaction.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesType = filterType === 'all' || transaction.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortField === 'customer') {
        comparison = a.customer.localeCompare(b.customer);
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'type') {
        comparison = a.type.localeCompare(b.type);
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

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Completed': { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheck },
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      'Processing': { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaClock },
      'Failed': { bg: 'bg-red-100', text: 'text-red-800', icon: FaTimes },
      'Refunded': { bg: 'bg-purple-100', text: 'text-purple-800', icon: FaUndo }
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

  // Get type badge
  const getTypeBadge = (type) => {
    const typeConfig = {
      'Payment': { bg: 'bg-green-100', text: 'text-green-800', icon: FaArrowDown },
      'Payout': { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaArrowUp },
      'Refund': { bg: 'bg-red-100', text: 'text-red-800', icon: FaUndo },
      'Subscription': { bg: 'bg-purple-100', text: 'text-purple-800', icon: FaCreditCard }
    };
    
    const config = typeConfig[type] || typeConfig['Payment'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {type}
      </span>
    );
  };

  // Handle issue refund
  const handleIssueRefund = (transaction) => {
    setSelectedTransaction(transaction);
    setShowRefundModal(true);
  };

  // Handle process payout
  const handleProcessPayout = (providerId) => {
    setShowPayoutModal(true);
  };

  // Handle subscription pricing
  const handleSubscriptionPricing = () => {
    setShowSubscriptionModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaCreditCard className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Payments & Transactions</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage payments, payouts, and financial reporting</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Export financial report
                const headers = ['Transaction ID', 'Type', 'Customer', 'Provider', 'Service', 'Amount', 'Fee', 'Net', 'Status', 'Date', 'Payment Method'];
                const csvRows = [headers];
                
                filteredAndSortedTransactions.forEach(txn => {
                  csvRows.push([
                    txn.id,
                    txn.type,
                    txn.customer,
                    txn.provider,
                    txn.service,
                    `$${txn.amount}`,
                    `$${txn.fee}`,
                    `$${txn.net}`,
                    txn.status,
                    txn.date,
                    txn.paymentMethod
                  ]);
                });
                
                const csvString = csvRows.map(row => row.join(',')).join('\n');
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `financial-report-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FaDownload /> Export Report
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={() => handleProcessPayout('all')}
            >
              <FaMoneyBillWave /> Process Payouts
            </button>
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center gap-2 hover:bg-purple-700 transition-colors"
              onClick={handleSubscriptionPricing}
            >
              <FaCogs /> Subscription Settings
            </button>
          </div>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-green-600">${financialStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaChartLine className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-xl font-bold text-blue-600">${financialStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaMoneyBillWave className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
                <p className="text-xl font-bold text-yellow-600">${financialStats.pendingPayouts.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <FaWallet className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Refunds Issued</p>
                <p className="text-xl font-bold text-purple-600">${financialStats.refundsIssued.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaUndo className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Failed Transactions</p>
                <p className="text-xl font-bold text-red-600">{financialStats.failedTransactions}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaExclamationTriangle className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Outstanding Balance</p>
                <p className="text-xl font-bold text-orange-600">${financialStats.outstandingBalance.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <FaExchangeAlt className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Current Subscription Tiers</h2>
            <button
              onClick={handleSubscriptionPricing}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
            >
              Edit Pricing
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionTiers.map((tier) => (
              <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-3">${tier.price}<span className="text-sm text-gray-500">/month</span></p>
                <ul className="space-y-1">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions, customers, providers..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
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
                <option value="payment">Payments</option>
                <option value="payout">Payouts</option>
                <option value="refund">Refunds</option>
                <option value="subscription">Subscriptions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTransactions(filteredAndSortedTransactions.map(t => t.id));
                        } else {
                          setSelectedTransactions([]);
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center">
                      Type
                      {getSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('customer')}
                  >
                    <div className="flex items-center">
                      Customer / Provider
                      {getSortIcon('customer')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center">
                      Amount
                      {getSortIcon('amount')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTransactions([...selectedTransactions, transaction.id]);
                          } else {
                            setSelectedTransactions(selectedTransactions.filter(id => id !== transaction.id));
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                      <div className="text-xs text-gray-400">#{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                      <div className="text-sm text-gray-500">{transaction.provider}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.service}</div>
                      <div className="text-xs text-gray-400">{transaction.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Fee: ${Math.abs(transaction.fee).toFixed(2)} | Net: ${Math.abs(transaction.net).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            alert(`Transaction Details:\n\nID: ${transaction.id}\nType: ${transaction.type}\nCustomer: ${transaction.customer}\nProvider: ${transaction.provider}\nService: ${transaction.service}\nAmount: $${transaction.amount}\nStatus: ${transaction.status}\nDate: ${transaction.date}\nPayment Method: ${transaction.paymentMethod}\nTransaction ID: ${transaction.transactionId}`);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {transaction.status === 'Completed' && transaction.type === 'Payment' && (
                          <button
                            onClick={() => handleIssueRefund(transaction)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                            title="Issue Refund"
                          >
                            <FaUndo />
                          </button>
                        )}
                        {transaction.status === 'Failed' && (
                          <button
                            onClick={() => {
                              if (window.confirm('Retry this transaction?')) {
                                alert(`Retrying transaction ${transaction.id}`);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                            title="Retry Transaction"
                          >
                            <FaEdit />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund Modal */}
        {showRefundModal && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Issue Refund</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Details</label>
                  <p className="text-sm text-gray-600">#{selectedTransaction.id} - ${selectedTransaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{selectedTransaction.customer} - {selectedTransaction.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refund Amount</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={selectedTransaction.amount.toFixed(2)}
                    max={selectedTransaction.amount}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Refund</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    placeholder="Enter reason for refund..."
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifyCustomer"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="notifyCustomer" className="ml-2 text-sm text-gray-700">
                    Notify customer via email
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Refund has been processed for transaction ${selectedTransaction.id}!`);
                    setShowRefundModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Process Payouts</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payout Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="weekly">Weekly Payouts</option>
                    <option value="monthly">Monthly Payouts</option>
                    <option value="manual">Manual Payout</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Payout Amount</label>
                  <p className="text-lg font-semibold text-green-600">${financialStats.pendingPayouts.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processing Fee</label>
                  <p className="text-sm text-gray-600">$5.10 (0.5% + $0.30 per payout)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Payout</label>
                  <p className="text-lg font-semibold text-blue-600">$8,915.15</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="confirmPayout"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="confirmPayout" className="ml-2 text-sm text-gray-700">
                    I confirm this payout is accurate
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Payouts have been processed successfully!');
                    setShowPayoutModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Process Payouts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Settings Modal */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Pricing Settings</h3>
              <div className="space-y-6">
                {subscriptionTiers.map((tier, index) => (
                  <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800">{tier.name} Plan</h4>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTimes />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          defaultValue={tier.price}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="2"
                        defaultValue={tier.features.join(', ')}
                      ></textarea>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <FaPlus className="mx-auto mb-2" />
                  Add New Pricing Tier
                </button>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Subscription pricing has been updated successfully!');
                    setShowSubscriptionModal(false);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
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

export default Transactions;