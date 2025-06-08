import React from 'react';
import { FaPaw } from 'react-icons/fa';

const StatCard = ({ title, value, icon, change, changeType = 'increase', bgColor = 'bg-indigo-600' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-indigo-50 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium flex items-center gap-1">
          <FaPaw className="text-indigo-400 w-3 h-3" />
          {title}
        </h3>
        <div className={`${bgColor} text-white p-3 rounded-full shadow-md`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              <span className={`mr-1 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {changeType === 'increase' ? '↑' : '↓'}
              </span>
              {change}
            </p>
          )}
        </div>
        
        {/* Decorative paw prints */}
        <div className="flex items-center gap-1 opacity-20">
          <FaPaw className="w-3 h-3 transform rotate-12" />
          <FaPaw className="w-2 h-2 transform -rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;