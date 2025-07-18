import React from 'react';
import { 
  FaHeartbeat, 
  FaCut, 
  FaSyringe, 
  FaUtensils, 
  FaRunning, 
  FaBrain, 
  FaShieldAlt,
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';

const PetCareTable = ({ suggestions, petName }) => {
  if (!suggestions) return null;

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return <FaExclamationTriangle className="text-red-500" />;
      case 'medium': return <FaInfoCircle className="text-yellow-500" />;
      case 'low': return <FaCheckCircle className="text-green-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const tableData = [
    {
      category: 'Health',
      icon: <FaHeartbeat className="text-red-600" />,
      priority: suggestions.health?.priority || 'medium',
      recommendations: suggestions.health?.recommendations || [],
      details: [
        { label: 'Next Checkup', value: suggestions.health?.nextCheckup, icon: <FaCalendarAlt /> }
      ]
    },
    {
      category: 'Grooming',
      icon: <FaCut className="text-blue-600" />,
      priority: 'medium',
      recommendations: suggestions.grooming?.recommendations || [],
      details: [
        { label: 'Frequency', value: suggestions.grooming?.frequency, icon: <FaClock /> },
        { label: 'Special Care', value: suggestions.grooming?.specialCare?.join(', '), icon: <FaInfoCircle /> }
      ]
    },
    {
      category: 'Vaccinations',
      icon: <FaSyringe className="text-green-600" />,
      priority: 'high',
      recommendations: suggestions.vaccinations?.upcoming || [],
      details: [
        { label: 'Schedule', value: suggestions.vaccinations?.schedule, icon: <FaCalendarAlt /> },
        { label: 'Boosters', value: suggestions.vaccinations?.boosters?.join(', '), icon: <FaSyringe /> }
      ]
    },
    {
      category: 'Nutrition',
      icon: <FaUtensils className="text-orange-600" />,
      priority: 'medium',
      recommendations: suggestions.nutrition?.recommendations || [],
      details: [
        { label: 'Daily Calories', value: suggestions.nutrition?.dailyCalories, icon: <FaUtensils /> },
        { label: 'Feeding Schedule', value: suggestions.nutrition?.feedingSchedule, icon: <FaClock /> }
      ]
    },
    {
      category: 'Exercise',
      icon: <FaRunning className="text-purple-600" />,
      priority: 'medium',
      recommendations: suggestions.exercise?.recommendations || [],
      details: [
        { label: 'Duration', value: suggestions.exercise?.duration, icon: <FaClock /> },
        { label: 'Activities', value: suggestions.exercise?.activities?.join(', '), icon: <FaRunning /> }
      ]
    },
    {
      category: 'Behavioral',
      icon: <FaBrain className="text-indigo-600" />,
      priority: 'low',
      recommendations: suggestions.behavioral?.recommendations || [],
      details: [
        { label: 'Training', value: suggestions.behavioral?.training?.join(', '), icon: <FaBrain /> },
        { label: 'Enrichment', value: suggestions.behavioral?.enrichment?.join(', '), icon: <FaInfoCircle /> }
      ]
    },
    {
      category: 'Preventive Care',
      icon: <FaShieldAlt className="text-teal-600" />,
      priority: 'medium',
      recommendations: suggestions.preventive?.recommendations || [],
      details: [
        { label: 'Seasonal Care', value: suggestions.preventive?.seasonalCare?.join(', '), icon: <FaShieldAlt /> },
        { label: 'Emergency Tips', value: suggestions.preventive?.emergencyTips?.join(', '), icon: <FaExclamationTriangle /> }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-pink-100">
        <h2 className="text-xl font-bold text-gray-800">
          Complete Care Guide for {petName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Comprehensive AI-generated recommendations across all care categories
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Care Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Recommendations
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Important Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${getPriorityColor(row.priority)} border-l-4`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-white rounded-lg flex items-center justify-center border">
                      {row.icon}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{row.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getPriorityIcon(row.priority)}
                    <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                      {row.priority}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    {row.recommendations.length > 0 ? (
                      <ul className="space-y-1">
                        {row.recommendations.slice(0, 3).map((rec, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-pink-500 mr-2">•</span>
                            <span className="text-xs">{rec}</span>
                          </li>
                        ))}
                        {row.recommendations.length > 3 && (
                          <li className="text-xs text-gray-500 italic">
                            +{row.recommendations.length - 3} more recommendations
                          </li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-gray-500 text-xs">No specific recommendations</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {row.details.map((detail, idx) => (
                      detail.value && (
                        <div key={idx} className="flex items-center mb-2 last:mb-0">
                          <span className="text-gray-400 mr-2">{detail.icon}</span>
                          <span className="text-xs">
                            <strong>{detail.label}:</strong> {detail.value}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Categories:</span> {tableData.length} | 
            <span className="font-medium ml-2">High Priority Items:</span> {tableData.filter(item => item.priority === 'high').length}
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCareTable;