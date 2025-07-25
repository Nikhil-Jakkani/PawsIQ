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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-pink-600" />
          Today's Schedule
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
            {scheduleItems.filter(item => item.date === 'Today').length} items today
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {scheduleItems.map((item) => {
          const IconComponent = getItemIcon(item.type);
          
          return (
            <div 
              key={item.id}
              className={`border-l-4 rounded-lg p-4 ${getStatusColor(item.status, item.urgent)} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  item.urgent ? 'bg-red-100' : 
                  item.petType === 'cat' ? 'bg-purple-100' : 'bg-pink-100'
                }`}>
                  <IconComponent className={`text-sm ${
                    item.urgent ? 'text-red-600' :
                    item.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      {item.title}
                      {item.urgent && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          URGENT
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaClock />
                      {item.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <PetIcon type={item.petType} className={`text-sm ${
                      item.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                    }`} />
                    <span className="text-sm text-gray-600">{item.petName}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {item.date}
                    </span>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-pink-500" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {item.medication && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Medication:</span> {item.medication}
                    </div>
                  )}

                  {item.food && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Food:</span> {item.food}
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    {item.type === 'reminder' && item.status === 'pending' && (
                      <>
                        <button className="flex items-center gap-1 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                          <FaCheck />
                          Mark Done
                        </button>
                        <button className="flex items-center gap-1 text-xs bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                          <FaTimes />
                          Skip
                        </button>
                      </>
                    )}
                    {item.type === 'appointment' && (
                      <button className="text-xs bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 rounded-full font-medium transition-colors">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-lg transition-colors">
          View Full Schedule
        </button>
      </div>
    </div>
  );
};

export default UpcomingSchedule;