import React from 'react';
import { FaCut, FaSyringe, FaStethoscope, FaBone, FaBath, FaCalendarCheck } from 'react-icons/fa';

const CareReminders = ({ pets }) => {
  const generateCareReminders = () => {
    const reminders = [];
    const today = new Date();
    
    pets.forEach(pet => {
      const petAge = parseInt(pet.age);
      const lastCheckup = new Date(pet.lastCheckup);
      const daysSinceCheckup = Math.floor((today - lastCheckup) / (1000 * 60 * 60 * 24));
      
      // Grooming reminders
      const groomingFreq = pet.type === 'dog' ? 14 : 7; // days
      reminders.push({
        id: `grooming-${pet.id}`,
        title: 'Grooming',
        value: `${Math.ceil(groomingFreq - (daysSinceCheckup % groomingFreq))}`,
        subtitle: 'days left',
        petName: pet.name,
        icon: FaCut,
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-600',
        priority: daysSinceCheckup % groomingFreq > groomingFreq - 3 ? 'high' : 'normal'
      });

      // Vaccination reminders (yearly)
      const vaccineDate = new Date(lastCheckup);
      vaccineDate.setFullYear(vaccineDate.getFullYear() + 1);
      const daysToVaccine = Math.ceil((vaccineDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysToVaccine <= 90 && daysToVaccine > 0) {
        reminders.push({
          id: `vaccine-${pet.id}`,
          title: 'Vaccination',
          value: `${daysToVaccine}`,
          subtitle: 'days left',
          petName: pet.name,
          icon: FaSyringe,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          priority: daysToVaccine <= 30 ? 'high' : 'normal'
        });
      }

      // Health checkup reminders
      const nextCheckup = petAge > 7 ? 180 : 365; // Senior pets need more frequent checkups
      const daysToCheckup = nextCheckup - daysSinceCheckup;
      
      if (daysToCheckup <= 60 && daysToCheckup > 0) {
        reminders.push({
          id: `checkup-${pet.id}`,
          title: 'Health Checkup',
          value: `${daysToCheckup}`,
          subtitle: 'days left',
          petName: pet.name,
          icon: FaStethoscope,
          color: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          priority: daysToCheckup <= 14 ? 'high' : 'normal'
        });
      }

      // Dental care reminders (every 6 months for dogs, yearly for cats)
      const dentalFreq = pet.type === 'dog' ? 180 : 365;
      const daysToDental = dentalFreq - (daysSinceCheckup % dentalFreq);
      
      if (daysToDental <= 30) {
        reminders.push({
          id: `dental-${pet.id}`,
          title: 'Dental Care',
          value: `${daysToDental}`,
          subtitle: 'days left',
          petName: pet.name,
          icon: FaBone,
          color: 'from-yellow-500 to-yellow-600',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          priority: daysToDental <= 7 ? 'high' : 'normal'
        });
      }

      // Flea/Tick prevention (monthly)
      const fleaDate = new Date(today);
      fleaDate.setDate(1); // First of current month
      fleaDate.setMonth(fleaDate.getMonth() + 1); // Next month
      const daysToFlea = Math.ceil((fleaDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysToFlea <= 7) {
        reminders.push({
          id: `flea-${pet.id}`,
          title: 'Flea Prevention',
          value: `${daysToFlea}`,
          subtitle: 'days left',
          petName: pet.name,
          icon: FaBath,
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          priority: daysToFlea <= 2 ? 'high' : 'normal'
        });
      }
    });

    // Sort by priority and limit to 6 items
    return reminders
      .sort((a, b) => {
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (b.priority === 'high' && a.priority !== 'high') return 1;
        return parseInt(a.value) - parseInt(b.value);
      })
      .slice(0, 6);
  };

  const reminders = generateCareReminders();

  if (reminders.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaCalendarCheck className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">All Caught Up!</h3>
          <p className="text-sm text-gray-600">No upcoming care reminders for your pets.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Priority Reminders */}
      {reminders.filter(r => r.priority === 'high').length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-bold text-red-800">Urgent Care Needed</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {reminders.filter(r => r.priority === 'high').map((reminder) => {
              const IconComponent = reminder.icon;
              return (
                <div 
                  key={reminder.id}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-red-100 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${reminder.bgColor} rounded-lg p-2 group-hover:scale-105 transition-transform duration-200 flex-shrink-0`}>
                      <IconComponent className={`text-sm ${reminder.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold bg-gradient-to-r ${reminder.color} bg-clip-text text-transparent`}>
                            {reminder.value}
                          </span>
                          <span className="text-xs text-gray-500 truncate">{reminder.subtitle}</span>
                        </div>
                        <div className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                          Urgent
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-800 truncate mb-1">
                        {reminder.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                          <img 
                            src={`https://images.unsplash.com/photo-${reminder.petName === 'Max' ? '1552053831-71594a27632d' : '1592194996308-7b43878e84a6'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60`} 
                            alt={reminder.petName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-600 font-medium truncate">{reminder.petName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Reminders */}
      {reminders.filter(r => r.priority !== 'high').length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-700">Upcoming Care</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reminders.filter(r => r.priority !== 'high').map((reminder) => {
              const IconComponent = reminder.icon;
              return (
                <div 
                  key={reminder.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${reminder.bgColor} rounded-lg p-2 group-hover:scale-105 transition-transform duration-200 shadow-sm flex-shrink-0`}>
                      <IconComponent className={`text-lg ${reminder.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`text-xl font-bold bg-gradient-to-r ${reminder.color} bg-clip-text text-transparent`}>
                          {reminder.value}
                        </span>
                        <span className="text-xs text-gray-500 truncate">{reminder.subtitle}</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-800 truncate">
                        {reminder.title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                        <img 
                          src={`https://images.unsplash.com/photo-${reminder.petName === 'Max' ? '1552053831-71594a27632d' : '1592194996308-7b43878e84a6'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60`} 
                          alt={reminder.petName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium truncate">{reminder.petName}</span>
                    </div>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium transition-colors flex-shrink-0">
                      Schedule
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareReminders;