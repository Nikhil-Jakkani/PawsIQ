import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaDollarSign, FaChartLine, FaExchangeAlt, FaShoppingCart } from 'react-icons/fa';

const RevenueMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const revenueData = {
    totalRevenue: {
      day: 12450,
      week: 87430,
      month: 342150,
      year: 4125000
    },
    transactionCount: {
      day: 245,
      week: 1723,
      month: 7432,
      year: 89245
    },
    averageOrderValue: {
      day: 50.82,
      week: 50.74,
      month: 46.04,
      year: 46.22
    },
    revenueGrowth: 16.8,
    revenueByCategory: [
      { category: 'Pet Services', amount: 187450 },
      { category: 'Marketplace', amount: 98750 },
      { category: 'Premium Subscriptions', amount: 45320 },
      { category: 'Other', amount: 10630 }
    ],
    monthlyRevenue: [
      { month: 'Jan', amount: 285000 },
      { month: 'Feb', amount: 292000 },
      { month: 'Mar', amount: 305000 },
      { month: 'Apr', amount: 312000 },
      { month: 'May', amount: 318000 },
      { month: 'Jun', amount: 329000 },
      { month: 'Jul', amount: 342150 },
      { month: 'Aug', amount: 0 },
      { month: 'Sep', amount: 0 },
      { month: 'Oct', amount: 0 },
      { month: 'Nov', amount: 0 },
      { month: 'Dec', amount: 0 }
    ]
  };

  // Helper functions to get data based on selected time range
  const getTotalRevenue = () => {
    return revenueData.totalRevenue[timeRange];
  };

  const getTransactionCount = () => {
    return revenueData.transactionCount[timeRange];
  };

  const getAverageOrderValue = () => {
    return revenueData.averageOrderValue[timeRange];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaDollarSign className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Revenue Metrics</h1>
              <p className="text-gray-500">Analyze financial performance and revenue streams</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Time Range:</span>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">${getTotalRevenue().toLocaleString()}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaDollarSign className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Transactions</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{getTransactionCount().toLocaleString()}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaExchangeAlt className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Average Order</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">${getAverageOrderValue().toFixed(2)}</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaShoppingCart className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Growth Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">+{revenueData.revenueGrowth}%</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaChartLine className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Monthly revenue chart visualization would appear here.
                  <br />
                  Showing trend over the past 12 months.
                </p>
              </div>
            </div>
          </div>
          
          {/* Revenue by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
            <div className="space-y-3">
              {revenueData.revenueByCategory.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.category}</span>
                    <span>${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(category.amount / revenueData.totalRevenue.month) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Transaction Volume */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Volume</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaExchangeAlt className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Transaction volume chart would appear here.
                  <br />
                  Showing daily/weekly transaction patterns.
                </p>
              </div>
            </div>
          </div>
          
          {/* Revenue Forecast */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Forecast</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Revenue forecast visualization would appear here.
                  <br />
                  Projecting revenue for the next 3 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RevenueMetrics;