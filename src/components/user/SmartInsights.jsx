import React from 'react';
import { FaBrain, FaChartLine, FaLightbulb, FaExclamationTriangle, FaHeart } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const SmartInsights = () => {
  const insights = [
    {
      id: 1,
      type: 'health',
      title: 'Max needs more exercise',
      description: 'Based on his breed and age, Max should get 60-90 minutes of exercise daily. Consider adding an evening walk.',
      petName: 'Max',
      petType: 'dog',
      priority: 'medium',
      icon: FaHeart,
      color: 'blue',
      actionable: true,
      suggestion: 'Schedule daily walks'
    },
    {
      id: 2,
      type: 'behavior',
      title: 'Luna\'s eating pattern changed',
      description: 'Luna has been eating 20% less than usual over the past week. This could indicate stress or health issues.',
      petName: 'Luna',
      petType: 'cat',
      priority: 'high',
      icon: FaExclamationTriangle,
      color: 'red',
      actionable: true,
      suggestion: 'Schedule vet consultation'
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Great vaccination compliance!',
      description: 'Both your pets are up to date with their vaccinations. Keep up the excellent pet care!',
      petName: 'All pets',
      petType: 'paw',
      priority: 'positive',
      icon: FaChartLine,
      color: 'green',
      actionable: false,
      suggestion: null
    },
    // {
    //   id: 4,
    //   type: 'prediction',
    //   title: 'Grooming reminder',
    //   description: 'Based on Max\'s coat type and last grooming session, he\'ll need grooming in about 2 weeks.',
    //   petName: 'Max',
    //   petType: 'dog',
    //   priority: 'low',
    //   icon: FaLightbulb,
    //   color: 'yellow',
    //   actionable: true,
    //   suggestion: 'Pre-book grooming appointment'
    // }
  ];

  const getColorClasses = (color, priority) => {
    const baseClasses = {
      red: 'border-red-200 bg-red-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50'
    };

    const iconClasses = {
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600'
    };

    const badgeClasses = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
      positive: 'bg-green-100 text-green-800'
    };

    return {
      card: baseClasses[color] || 'border-gray-200 bg-gray-50',
      icon: iconClasses[color] || 'bg-gray-100 text-gray-600',
      badge: badgeClasses[priority] || 'bg-gray-100 text-gray-800'
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaBrain className="text-pink-600" />
          Smart Insights
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
            AI-Powered
          </span>
          <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
            View All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const IconComponent = insight.icon;
          const colors = getColorClasses(insight.color, insight.priority);
          
          return (
            <div 
              key={insight.id}
              className={`border rounded-lg p-4 ${colors.card} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${colors.icon}`}>
                  <IconComponent className="text-sm" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors.badge}`}>
                      {insight.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <PetIcon type={insight.petType} className={`text-sm ${
                      insight.petType === 'cat' ? 'text-purple-600' : 
                      insight.petType === 'paw' ? 'text-pink-600' : 'text-pink-600'
                    }`} />
                    <span className="text-sm text-gray-600">{insight.petName}</span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{insight.description}</p>

                  {insight.actionable && insight.suggestion && (
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-2">
                        <FaLightbulb className="text-yellow-500 text-sm" />
                        <span className="text-sm font-medium text-gray-700">Suggestion:</span>
                        <span className="text-sm text-gray-600">{insight.suggestion}</span>
                      </div>
                      <button className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                        Take Action
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights Summary */}
      {/* <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-100">
        <div className="flex items-center gap-3">
          <div className="bg-pink-100 rounded-full p-2">
            <FaChartLine className="text-pink-600 text-sm" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Weekly Pet Health Score</h3>
            <p className="text-sm text-gray-600">Your pets are doing great! Overall health score: 85/100</p>
          </div>
          <div className="ml-auto">
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">85</div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div> */}
    </div>
  );
};

export default SmartInsights;