import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaHandHoldingHeart, FaChartLine, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const ServiceMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const serviceData = {
    totalServices: 8745,
    activeProviders: 1243,
    completedServices: {
      day: 124,
      week: 876,
      month: 3542,
      year: 42156
    },
    averageRating: 4.7,
    serviceGrowth: 22.4,
    popularServices: [
      { name: 'Dog Walking', percentage: 35 },
      { name: 'Pet Sitting', percentage: 28 },
      { name: 'Grooming', percentage: 18 },
      { name: 'Training', percentage: 12 },
      { name: 'Veterinary', percentage: 7 }
    ],
    servicesByRegion: [
      { region: 'North', count: 2345 },
      { region: 'South', count: 1987 },
      { region: 'East', count: 2156 },
      { region: 'West', count: 2257 }
    ]
  };

  // Helper function to get completed services based on selected time range
  const getCompletedServices = () => {
    return serviceData.completedServices[timeRange];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaHandHoldingHeart className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Service Metrics</h1>
              <p className="text-gray-500">Analyze service performance, ratings, and distribution</p>
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
                <p className="text-gray-500 text-sm">Total Services</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{serviceData.totalServices.toLocaleString()}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaHandHoldingHeart className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Active Providers</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{serviceData.activeProviders.toLocaleString()}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaHandHoldingHeart className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Completed Services</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{getCompletedServices().toLocaleString()}</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaHandHoldingHeart className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Average Rating</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{serviceData.averageRating}/5</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaStar className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Growth</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaChartLine className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Service growth chart visualization would appear here.
                  <br />
                  Current growth rate: <span className="text-green-600 font-semibold">+{serviceData.serviceGrowth}%</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Popular Services */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Services</h3>
            <div className="space-y-3">
              {serviceData.popularServices.map((service, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{service.name}</span>
                    <span>{service.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Service Ratings */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Ratings</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <FaStar className="text-indigo-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  Service ratings distribution would appear here.
                  <br />
                  Showing breakdown of 1-5 star ratings.
                </p>
              </div>
            </div>
          </div>
          
          {/* Regional Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Distribution</h3>
            <div className="space-y-3">
              {serviceData.servicesByRegion.map((region, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{region.region} Region</span>
                    <span>{region.count.toLocaleString()} services</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(region.count / serviceData.totalServices) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceMetrics;