import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  FaChartLine, 
  FaDownload,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaDollarSign,
  FaPercent,
  FaArrowUp,
  FaArrowDown,
  FaUsers,
  FaShoppingCart,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaFilter,
  FaEye,
  FaPrint,
  FaShare,
  FaEquals,
  FaChartPie,
  FaChartBar,
  FaTable,
  FaCalendarCheck,
  FaExchangeAlt,
  FaArrowRight
} from 'react-icons/fa';

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  // Sample financial data
  const financialMetrics = {
    totalRevenue: 245780.50,
    totalTransactions: 3247,
    averageTransactionValue: 75.68,
    platformFees: 24578.05,
    providerPayouts: 196624.40,
    refundsIssued: 8456.25,
    disputeRefunds: 2340.80,
    monthlyGrowth: 12.5,
    customerAcquisitionCost: 28.50,
    lifetimeValue: 485.75
  };

  // Revenue breakdown by service
  const revenueByService = [
    { service: 'Veterinary', revenue: 98312.20, percentage: 40, transactions: 1158, growth: 15.2 },
    { service: 'Pet Grooming', revenue: 73734.15, percentage: 30, transactions: 1229, growth: 8.7 },
    { service: 'Dog Walking', revenue: 36889.08, percentage: 15, transactions: 1475, growth: 22.1 },
    { service: 'Pet Sitting', revenue: 24578.05, percentage: 10, transactions: 613, growth: -3.4 },
    { service: 'Training', revenue: 12267.02, percentage: 5, transactions: 163, growth: 5.8 }
  ];

  // Monthly revenue trend
  const monthlyTrend = [
    { month: 'Jan', revenue: 198650, transactions: 2847, providers: 156 },
    { month: 'Feb', revenue: 212340, transactions: 3012, providers: 162 },
    { month: 'Mar', revenue: 235670, transactions: 3321, providers: 178 },
    { month: 'Apr', revenue: 245780, transactions: 3456, providers: 185 },
    { month: 'May', revenue: 258930, transactions: 3578, providers: 192 },
    { month: 'Jun', revenue: 267450, transactions: 3689, providers: 198 }
  ];

  // Top performing providers
  const topProviders = [
    { name: 'Dr. Sarah Wilson', revenue: 45670, transactions: 234, rating: 4.9, commission: 4567.00 },
    { name: 'PetCare Plus Clinic', revenue: 38920, transactions: 189, rating: 4.8, commission: 3892.00 },
    { name: 'Mike Thompson', revenue: 23450, transactions: 567, rating: 4.7, commission: 2345.00 },
    { name: 'Lisa Chen Grooming', revenue: 19870, transactions: 298, rating: 4.9, commission: 1987.00 },
    { name: 'James Rodriguez', revenue: 15680, transactions: 345, rating: 4.6, commission: 1568.00 }
  ];

  // Payment methods breakdown
  const paymentMethods = [
    { method: 'Credit Card', amount: 196624.40, percentage: 80, transactions: 2598 },
    { method: 'Debit Card', amount: 36889.08, percentage: 15, transactions: 487 },
    { method: 'Digital Wallet', amount: 9222.27, percentage: 3.75, transactions: 98 },
    { method: 'Bank Transfer', amount: 3068.76, percentage: 1.25, transactions: 23 }
  ];

  const generateReport = (type) => {
    const reportData = {
      type: type,
      period: selectedPeriod,
      dateRange: dateRange,
      generatedAt: new Date().toISOString(),
      metrics: financialMetrics,
      breakdown: type === 'revenue' ? revenueByService : 
                type === 'providers' ? topProviders :
                type === 'payments' ? paymentMethods : monthlyTrend
    };

    // Convert to CSV
    const csvContent = `PawsIQ Financial Report - ${type}\nGenerated: ${new Date().toLocaleDateString()}\n\n` +
      `Total Revenue,$${financialMetrics.totalRevenue.toLocaleString()}\n` +
      `Total Transactions,${financialMetrics.totalTransactions.toLocaleString()}\n` +
      `Average Transaction,$${financialMetrics.averageTransactionValue}\n` +
      `Platform Fees,$${financialMetrics.platformFees.toLocaleString()}\n` +
      `Provider Payouts,$${financialMetrics.providerPayouts.toLocaleString()}\n\n`;

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `pawsiq-${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaChartLine className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Financial Reports & Analytics</h1>
            </div>
            <p className="text-gray-500 mt-1">Comprehensive financial insights and reporting</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => generateReport(selectedReport)}
              className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FaDownload /> Export Report
            </button>
            <Link 
              to="/transactions"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Back to Transactions <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Report Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="revenue">Revenue Analysis</option>
                <option value="providers">Provider Performance</option>
                <option value="payments">Payment Methods</option>
                <option value="trends">Trend Analysis</option>
                <option value="customer">Customer Analytics</option>
              </select>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-green-600">
                  ${financialMetrics.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <FaArrowUp className="mr-1" />
                  +{financialMetrics.monthlyGrowth}%
                </div>
              </div>
              <FaDollarSign className="text-green-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <p className="text-xl font-bold text-blue-600">
                  {financialMetrics.totalTransactions.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-blue-600 mt-1">
                  <FaArrowUp className="mr-1" />
                  +8.5%
                </div>
              </div>
              <FaExchangeAlt className="text-blue-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Transaction</p>
                <p className="text-xl font-bold text-purple-600">
                  ${financialMetrics.averageTransactionValue}
                </p>
                <div className="flex items-center text-sm text-purple-600 mt-1">
                  <FaArrowUp className="mr-1" />
                  +3.2%
                </div>
              </div>
              <FaMoneyBillWave className="text-purple-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Platform Fees</p>
                <p className="text-xl font-bold text-indigo-600">
                  ${financialMetrics.platformFees.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-indigo-600 mt-1">
                  <FaPercent className="mr-1" />
                  10%
                </div>
              </div>
              <FaPercent className="text-indigo-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Payouts</p>
                <p className="text-xl font-bold text-orange-600">
                  ${financialMetrics.providerPayouts.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-orange-600 mt-1">
                  <FaArrowUp className="mr-1" />
                  +12.8%
                </div>
              </div>
              <FaCreditCard className="text-orange-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <FaChartBar className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <FaChartLine className="text-indigo-600" />
                </button>
              </div>
            </div>
            
            {/* Simple chart representation */}
            <div className="space-y-3">
              {monthlyTrend.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(month.revenue / 300000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    ${month.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Revenue Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Revenue by Service</h3>
              <FaChartPie className="text-gray-500" />
            </div>
            
            <div className="space-y-4">
              {revenueByService.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{service.service}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{service.percentage}%</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${service.revenue.toLocaleString()}
                    </span>
                    <div className={`flex items-center text-xs ${
                      service.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {service.growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(service.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Providers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Top Performing Providers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProviders.map((provider, index) => (
                    <tr key={provider.name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">{index + 1}</span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ${provider.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Commission: ${provider.commission.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {provider.transactions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Payment Methods Breakdown</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={method.method} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: `hsl(${index * 90}, 60%, 50%)` }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">{method.method}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${method.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {method.transactions} transactions ({method.percentage}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => generateReport('revenue')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <FaChartLine className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Revenue Report</h4>
                <p className="text-sm text-gray-500">Detailed revenue analysis</p>
              </div>
            </button>
            
            <button 
              onClick={() => generateReport('providers')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Provider Report</h4>
                <p className="text-sm text-gray-500">Provider performance data</p>
              </div>
            </button>
            
            <button 
              onClick={() => generateReport('payments')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCreditCard className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Payment Report</h4>
                <p className="text-sm text-gray-500">Payment methods analysis</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Opening advanced analytics dashboard...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaChartPie className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Advanced Analytics</h4>
                <p className="text-sm text-gray-500">Deep dive analysis</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialReports;