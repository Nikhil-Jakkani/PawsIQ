import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaUsers, FaChartLine, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const UserMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const userData = {
    totalUsers: 12458,
    activeUsers: 8743,
    newUsers: {
      day: 42,
      week: 287,
      month: 1243,
      year: 5621
    },
    retentionRate: 76,
    userGrowth: 18.7,
    demographics: {
      age: [
        { group: '18-24', percentage: 22 },
        { group: '25-34', percentage: 38 },
        { group: '35-44', percentage: 24 },
        { group: '45-54', percentage: 10 },
        { group: '55+', percentage: 6 }
      ],
      gender: [
        { type: 'Male', percentage: 48 },
        { type: 'Female', percentage: 51 },
        { type: 'Other', percentage: 1 }
      ]
    }
  };

  // Helper function to get new users based on selected time range
  const getNewUsers = () => {
    return userData.newUsers[timeRange];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaUsers className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Metrics</h1>
              <p className="text-gray-500">Analyze user growth, engagement, and demographics</p>
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
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{userData.totalUsers.toLocaleString()}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaUsers className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{userData.activeUsers.toLocaleString()}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaUsers className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">New Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{getNewUsers().toLocaleString()}</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaUsers className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Retention Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{userData.retentionRate}%</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaChartLine className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  User growth chart visualization would appear here.
                  <br />
                  Current growth rate: <span className="text-green-600 font-semibold">+{userData.userGrowth}%</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Demographics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Demographics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Age Distribution</h4>
                <div className="space-y-2">
                  {userData.demographics.age.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.group}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Gender Distribution</h4>
                <div className="space-y-2">
                  {userData.demographics.gender.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.type}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* User Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Activity</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaCalendarAlt className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  User activity heatmap would appear here.
                  <br />
                  Showing peak usage times and patterns.
                </p>
              </div>
            </div>
          </div>
          
          {/* Geographic Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Geographic Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  User location map would appear here.
                  <br />
                  Showing distribution across regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserMetrics;