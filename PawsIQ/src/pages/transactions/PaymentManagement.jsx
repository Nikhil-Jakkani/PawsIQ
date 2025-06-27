import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
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
  FaEye,
  FaEdit,
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaArrowRight
} from 'react-icons/fa';

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Sample financial data
  const paymentStats = {
    todayRevenue: 2450.75,
    weeklyRevenue: 12450.75,
    monthlyRevenue: 45780.50,
    pendingPayments: 1250.25,
    failedPayments: 15,
    refundsProcessed: 8
  };

  // Sample recent payments
  const recentPayments = [
    {
      id: 'PAY001',
      type: 'Payment',
      customer: 'Sarah Johnson',
      provider: 'Mike Thompson',
      service: 'Dog Walking',
      amount: 25.00,
      fee: 2.50,
      net: 22.50,
      status: 'Completed',
      date: '2024-01-15 10:30 AM',
      paymentMethod: 'Credit Card (**** 4532)'
    },
    {
      id: 'PAY002',
      type: 'Refund',
      customer: 'John Smith',
      provider: 'Dr. Anderson',
      service: 'Veterinary Checkup',
      amount: -120.00,
      fee: -3.60,
      net: -116.40,
      status: 'Completed',
      date: '2024-01-14 03:45 PM',
      paymentMethod: 'Credit Card (**** 1234)'
    },
    {
      id: 'PAY003',
      type: 'Payment',
      customer: 'Emily Davis',
      provider: 'Maria Rodriguez',
      service: 'Pet Sitting',
      amount: 60.00,
      fee: 6.00,
      net: 54.00,
      status: 'Failed',
      date: '2024-01-14 11:20 AM',
      paymentMethod: 'Credit Card (**** 9876)'
    }
  ];

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
      'Refund': { bg: 'bg-red-100', text: 'text-red-800', icon: FaUndo },
      'Payout': { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaArrowUp }
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
              <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Track and manage all payment transactions</p>
          </div>
          <Link 
            to="/transactions"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            View All Transactions <FaArrowRight />
          </Link>
        </div>

        {/* Payment Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Revenue</p>
                <p className="text-xl font-bold text-green-600">${paymentStats.todayRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaChartLine className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Weekly Revenue</p>
                <p className="text-xl font-bold text-blue-600">${paymentStats.weeklyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaMoneyBillWave className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-xl font-bold text-indigo-600">${paymentStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <FaWallet className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-xl font-bold text-yellow-600">${paymentStats.pendingPayments.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Failed Payments</p>
                <p className="text-xl font-bold text-red-600">{paymentStats.failedPayments}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaExclamationTriangle className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Refunds Processed</p>
                <p className="text-xl font-bold text-purple-600">{paymentStats.refundsProcessed}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaUndo className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => alert('Processing manual payment...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Process Payment</h3>
                <p className="text-sm text-gray-500">Manually process a payment</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Issuing refund...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <div className="bg-red-100 p-3 rounded-full">
                <FaUndo className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Issue Refund</h3>
                <p className="text-sm text-gray-500">Process customer refund</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Retry failed payments...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
            >
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaExclamationTriangle className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Retry Failed</h3>
                <p className="text-sm text-gray-500">Retry failed payments</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Generating payment report...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Payment Report</h3>
                <p className="text-sm text-gray-500">Generate payment report</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Payments</h2>
              <Link 
                to="/transactions"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">#{payment.id}</div>
                      <div className="text-xs text-gray-400">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(payment.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                      <div className="text-sm text-gray-500">{payment.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.service}</div>
                      <div className="text-sm text-gray-500">{payment.provider}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${payment.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(payment.amount).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Net: ${Math.abs(payment.net).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Viewing payment details for ${payment.id}`)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {payment.status === 'Failed' && (
                          <button
                            onClick={() => alert(`Retrying payment ${payment.id}`)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                            title="Retry Payment"
                          >
                            <FaEdit />
                          </button>
                        )}
                        {payment.status === 'Completed' && payment.type === 'Payment' && (
                          <button
                            onClick={() => alert(`Issuing refund for ${payment.id}`)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                            title="Issue Refund"
                          >
                            <FaUndo />
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
      </div>
    </DashboardLayout>
  );
};

export default PaymentManagement;