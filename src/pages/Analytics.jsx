import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FaChartBar, FaUsers, FaHandHoldingHeart, FaDollarSign, FaChartLine } from 'react-icons/fa';

const Analytics = () => {
  // Analytics card data
  const analyticsCards = [
    {
      title: 'User Metrics',
      description: 'Analyze user growth, engagement, and demographics',
      icon: <FaUsers className="text-indigo-600 text-xl" />,
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/analytics/users'
    },
    {
      title: 'Service Metrics',
      description: 'Track service performance, ratings, and distribution',
      icon: <FaHandHoldingHeart className="text-indigo-600 text-xl" />,
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/analytics/services'
    },
    {
      title: 'Revenue Metrics',
      description: 'Monitor financial performance and revenue streams',
      icon: <FaDollarSign className="text-indigo-600 text-xl" />,
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/analytics/revenue'
    },
    {
      title: 'Performance Dashboard',
      description: 'View comprehensive platform performance metrics',
      icon: <FaChartLine className="text-indigo-600 text-xl" />,
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      link: '/analytics/performance'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaChartBar className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
            <p className="text-gray-500">View platform metrics and performance analytics</p>
          </div>
        </div>
        
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className={`${card.bgColor} rounded-xl shadow-sm p-6 border border-indigo-100 transition-transform hover:scale-105 hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className={`${card.iconBg} p-3 rounded-lg`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Recent Analytics Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Analytics Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">User Growth</h3>
                <FaUsers className="text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">+18.7%</div>
              <p className="text-sm text-gray-500">Compared to last month</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Service Bookings</h3>
                <FaHandHoldingHeart className="text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">+22.4%</div>
              <p className="text-sm text-gray-500">Compared to last month</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Revenue</h3>
                <FaDollarSign className="text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">+16.8%</div>
              <p className="text-sm text-gray-500">Compared to last month</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platform Health */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Platform Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">System Uptime</h3>
                <p className="text-sm text-gray-500">99.98% this month</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Response Time</h3>
                <p className="text-sm text-gray-500">245ms average</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Error Rate</h3>
                <p className="text-sm text-gray-500">0.12% of requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;