import React from 'react';
import { FaPaw, FaCalendarCheck, FaShoppingBag, FaHeart, FaClock, FaTrophy } from 'react-icons/fa';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      title: 'Happy Pets',
      value: '2',
      subtitle: 'Healthy & Active',
      icon: FaPaw,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      id: 2,
      title: 'This Month',
      value: '5',
      subtitle: 'Appointments',
      icon: FaCalendarCheck,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 3,
      title: 'Orders',
      value: '12',
      subtitle: 'This Year',
      icon: FaShoppingBag,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 4,
      title: 'Health Score',
      value: '85%',
      subtitle: 'Excellent',
      icon: FaHeart,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 5,
      title: 'Care Hours',
      value: '24',
      subtitle: 'This Week',
      icon: FaClock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 6,
      title: 'Achievements',
      value: '8',
      subtitle: 'Unlocked',
      icon: FaTrophy,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <div 
            key={stat.id}
            className="bg-white rounded-xl p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`${stat.bgColor} rounded-full p-3 mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className={`text-xl ${stat.textColor}`} />
              </div>
              
              <div className="space-y-1">
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  {stat.title}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;