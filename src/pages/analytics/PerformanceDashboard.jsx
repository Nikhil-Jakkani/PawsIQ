import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaChartLine, FaUsers, FaHandHoldingHeart, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const performanceData = {
    kpis: {
      userGrowth: 18.7,
      serviceGrowth: 22.4,
      revenueGrowth: 16.8,
      retentionRate: 76
    },
    platformHealth: {
      uptime: 99.98,
      responseTime: 245,
      errorRate: 0.12
    },
    alerts: [
      { type: 'warning', message: 'Unusual spike in user registrations detected', time: '2 hours ago' },
      { type: 'info', message: 'New service category performance exceeding expectations', time: '5 hours ago' },
      { type: 'error', message: 'Payment processing delays detected in East region', time: '1 day ago' }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaChartLine className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Performance Dashboard</h1>
              <p className="text-gray-500">Comprehensive view of platform performance metrics</p>
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
        
        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">User Growth</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">+{performanceData.kpis.userGrowth}%</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaUsers className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Service Growth</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">+{performanceData.kpis.serviceGrowth}%</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaHandHoldingHeart className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Revenue Growth</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">+{performanceData.kpis.revenueGrowth}%</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaDollarSign className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Retention Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{performanceData.kpis.retentionRate}%</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaUsers className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Health */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>System Uptime</span>
                  <span className="text-green-600 font-medium">{performanceData.platformHealth.uptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${performanceData.platformHealth.uptime}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Time</span>
                  <span className="text-blue-600 font-medium">{performanceData.platformHealth.responseTime}ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(performanceData.platformHealth.responseTime / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Error Rate</span>
                  <span className="text-yellow-600 font-medium">{performanceData.platformHealth.errorRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full" 
                    style={{ width: `${performanceData.platformHealth.errorRate * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100 col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Alerts</h3>
            <div className="space-y-3">
              {performanceData.alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg flex items-start gap-3 ${
                    alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 
                    alert.type === 'error' ? 'bg-red-50 border border-red-200' : 
                    'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-100' : 
                    alert.type === 'error' ? 'bg-red-100' : 
                    'bg-blue-100'
                  }`}>
                    <FaExclamationTriangle className={`${
                      alert.type === 'warning' ? 'text-yellow-600' : 
                      alert.type === 'error' ? 'text-red-600' : 
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{alert.message}</p>
                    <p className="text-gray-500 text-sm">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Heatmap */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Activity Heatmap</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaUsers className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  User activity heatmap visualization would appear here.
                  <br />
                  Showing peak usage times across the platform.
                </p>
              </div>
            </div>
          </div>
          
          {/* Service Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Performance</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaHandHoldingHeart className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Service performance visualization would appear here.
                  <br />
                  Comparing different service categories.
                </p>
              </div>
            </div>
          </div>
          
          {/* Revenue Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaDollarSign className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Revenue trends visualization would appear here.
                  <br />
                  Showing revenue patterns over time.
                </p>
              </div>
            </div>
          </div>
          
          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Conversion funnel visualization would appear here.
                  <br />
                  Tracking user journey from registration to service booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PerformanceDashboard;