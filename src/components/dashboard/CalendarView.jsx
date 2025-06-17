import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaDog, FaCat, FaCalendarAlt } from 'react-icons/fa';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample appointments with dates
  const appointments = [
    {
      id: 1,
      date: new Date(2025, 5, 15), 
      petName: 'Max',
      petType: 'dog',
      service: 'Grooming',
      time: '10:00 AM',
      status: 'pending'
    },
    {
      id: 2,
      date: new Date(2025, 5, 16), 
      petName: 'Luna',
      petType: 'cat', 
      service: 'Vaccination',
      time: '2:00 PM',
      status: 'confirmed'
    },
    {
      id: 3,
      date: new Date(2025, 5, 17), 
      petName: 'Buddy',
      petType: 'dog',
      service: 'Check-up',
      time: '11:00 AM',
      status: 'pending'
    }
  ];

  // Get calendar days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();
  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" />
          Appointment Calendar
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          <h3 className="text-lg font-medium text-gray-800 min-w-48 text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 border-b">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          const dayAppointments = getAppointmentsForDate(date);
          const isToday = date && date.toDateString() === today.toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-24 p-1 border border-gray-100 ${
                date ? 'hover:bg-gray-50 cursor-pointer' : ''
              } ${isToday ? 'bg-indigo-50 border-indigo-200' : ''}`}
              onClick={() => {
                if (date && dayAppointments.length > 0) {
                  const appointmentDetails = dayAppointments.map(apt => 
                    `${apt.time} - ${apt.petName} (${apt.service})`
                  ).join('\n');
                  alert(`Appointments for ${date.toLocaleDateString()}:\n\n${appointmentDetails}`);
                }
              }}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-indigo-600' : 'text-gray-800'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  {/* Appointment indicators */}
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div
                        key={apt.id}
                        className={`text-xs px-1 py-0.5 rounded text-white truncate ${
                          apt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        title={`${apt.time} - ${apt.petName} (${apt.service})`}
                      >
                        <div className="flex items-center gap-1">
                          {apt.petType === 'dog' ? <FaDog /> : <FaCat />}
                          <span className="truncate">{apt.petName}</span>
                        </div>
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 px-1">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-200 rounded"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{appointments.length}</div>
          <div className="text-sm text-gray-500">Total Appointments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {appointments.filter(apt => apt.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-500">Confirmed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {appointments.filter(apt => apt.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;