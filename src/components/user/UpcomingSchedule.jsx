import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const UpcomingSchedule = () => {
  const scheduleItems = [
    {
      id: 1,
      type: 'appointment',
      title: 'Vet Checkup',
      petName: 'Max',
      petType: 'dog',
      time: '10:00 AM',
      date: 'Today',
      location: 'Happy Paws Clinic',
      status: 'confirmed',
      urgent: false
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Medication Time',
      petName: 'Luna',
      petType: 'cat',
      time: '2:00 PM',
      date: 'Today',
      medication: 'Antibiotics',
      status: 'pending',
      urgent: true
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Grooming Session',
      petName: 'Max',
      petType: 'dog',
      time: '3:30 PM',
      date: 'Tomorrow',
      location: 'Fluffy Tails Spa',
      status: 'confirmed',
      urgent: false
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Feeding Time',
      petName: 'Luna',
      petType: 'cat',
      time: '6:00 PM',
      date: 'Today',
      food: 'Special Diet',
      status: 'pending',
      urgent: false
    }
  ];

  const getItemIcon = (type) => {
    return type === 'appointment' ? FaCalendarAlt : FaBell;
  };

  const getStatusColor = (status, urgent) => {
    if (urgent) return 'border-l-red-400 bg-red-50';
    if (status === 'confirmed') return 'border-l-green-400 bg-green-50';
    return 'border-l-yellow-400 bg-yellow-50';
  };

  // Filter only today's items
  const todayItems = scheduleItems.filter(item => item.date === 'Today');

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-pink-600" />
          Today's Schedule
        </h2>
        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
          {todayItems.length} items
        </span>
      </div>

      <div className="space-y-2">
        {todayItems.map((item) => {
          const IconComponent = getItemIcon(item.type);
          
          return (
            <div 
              key={item.id}
              className={`border-l-4 rounded-lg p-3 ${getStatusColor(item.status, item.urgent)} hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-1.5 ${
                  item.urgent ? 'bg-red-100' : 
                  item.petType === 'cat' ? 'bg-purple-100' : 'bg-pink-100'
                }`}>
                  <IconComponent className={`text-xs ${
                    item.urgent ? 'text-red-600' :
                    item.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 text-sm truncate flex items-center gap-1">
                      {item.title}
                      {item.urgent && (
                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                          !
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">{item.time}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <PetIcon type={item.petType} className={`text-xs ${
                      item.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                    }`} />
                    <span className="text-xs text-gray-600">{item.petName}</span>
                    {item.location && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-500 truncate">{item.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs font-medium text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default UpcomingSchedule;