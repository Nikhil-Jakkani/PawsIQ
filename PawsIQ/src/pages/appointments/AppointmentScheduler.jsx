import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  FaCalendarPlus, 
  FaClock, 
  FaUserMd, 
  FaPaw,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBell,
  FaSync
} from 'react-icons/fa';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [viewMode, setViewMode] = useState('week'); // week, day, month
  const [selectedProvider, setSelectedProvider] = useState('all');

  // Sample providers data
  const providers = [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Veterinarian', color: '#3B82F6', avatar: '👩‍⚕️' },
    { id: 2, name: 'Mike Thompson', specialty: 'Dog Walker', color: '#10B981', avatar: '🚶‍♂️' },
    { id: 3, name: 'Lisa Chen', specialty: 'Groomer', color: '#8B5CF6', avatar: '✂️' },
    { id: 4, name: 'James Rodriguez', specialty: 'Pet Sitter', color: '#F59E0B', avatar: '🏠' },
    { id: 5, name: 'Emma Davis', specialty: 'Trainer', color: '#EF4444', avatar: '🎾' }
  ];

  // Sample appointments
  const appointments = [
    {
      id: 1,
      providerId: 1,
      customerName: 'Sarah Johnson',
      petName: 'Max',
      petType: 'Dog',
      service: 'Health Checkup',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '09:30',
      status: 'Confirmed',
      price: 85,
      notes: 'Annual checkup, vaccination due'
    },
    {
      id: 2,
      providerId: 2,
      customerName: 'John Smith',
      petName: 'Buddy',
      petType: 'Dog',
      service: 'Dog Walking',
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '11:00',
      status: 'Confirmed',
      price: 25,
      notes: 'Regular morning walk, Central Park'
    },
    {
      id: 3,
      providerId: 3,
      customerName: 'Emily Davis',
      petName: 'Luna',
      petType: 'Cat',
      service: 'Grooming',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '15:30',
      status: 'Pending',
      price: 60,
      notes: 'Full grooming package, nail trim'
    }
  ];

  // Time slots for scheduling
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  // Get week dates
  const getWeekDates = (date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedDate);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get appointments for a specific date and provider
  const getAppointmentsForSlot = (date, providerId, timeSlot) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => 
      apt.date === dateStr && 
      apt.providerId === providerId && 
      apt.startTime === timeSlot
    );
  };

  // Navigate week
  const previousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const handleTimeSlotClick = (date, providerId, timeSlot) => {
    const existingAppointment = getAppointmentsForSlot(date, providerId, timeSlot);
    if (existingAppointment.length > 0) {
      // Show appointment details
      const apt = existingAppointment[0];
      alert(`Appointment Details:\n\nCustomer: ${apt.customerName}\nPet: ${apt.petName} (${apt.petType})\nService: ${apt.service}\nTime: ${apt.startTime} - ${apt.endTime}\nPrice: $${apt.price}\nStatus: ${apt.status}\nNotes: ${apt.notes}`);
    } else {
      // Open new appointment modal
      setSelectedTimeSlot(timeSlot);
      setShowNewAppointmentModal(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaCalendarPlus className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Appointment Scheduler</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage provider schedules and book appointments</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowNewAppointmentModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <FaPlus /> New Appointment
            </button>
            <Link 
              to="/appointments/overview"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <FaCalendarAlt /> Overview
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <div className="flex rounded-md shadow-sm">
                {['day', 'week', 'month'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-2 text-sm font-medium ${
                      viewMode === mode
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } ${mode === 'day' ? 'rounded-l-md' : mode === 'month' ? 'rounded-r-md' : ''} border border-gray-300`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={previousWeek}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <h3 className="text-lg font-medium text-gray-800 min-w-48 text-center">
                Week of {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
              </h3>
              <button
                onClick={nextWeek}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>

            {/* Provider Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Provider:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="all">All Providers</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name} - {provider.specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header with days */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-700">Provider / Time</div>
                {weekDates.map((date, index) => (
                  <div key={index} className="p-4 bg-gray-50 text-center border-l border-gray-200">
                    <div className="font-medium text-gray-700">{dayNames[date.getDay()]}</div>
                    <div className="text-sm text-gray-500">{date.getDate()}/{date.getMonth() + 1}</div>
                  </div>
                ))}
              </div>

              {/* Provider rows */}
              {providers
                .filter(provider => selectedProvider === 'all' || provider.id.toString() === selectedProvider)
                .map((provider) => (
                <div key={provider.id} className="border-b border-gray-100">
                  {/* Provider header */}
                  <div className="grid grid-cols-8 bg-gray-25">
                    <div className="p-4 border-r border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                          style={{ backgroundColor: provider.color }}
                        >
                          {provider.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{provider.name}</div>
                          <div className="text-sm text-gray-500">{provider.specialty}</div>
                        </div>
                      </div>
                    </div>
                    {weekDates.map((date, dayIndex) => (
                      <div key={dayIndex} className="border-l border-gray-200">
                        {/* Time slots for each day */}
                        <div className="divide-y divide-gray-100">
                          {timeSlots.slice(0, 6).map((timeSlot) => {
                            const appointment = getAppointmentsForSlot(date, provider.id, timeSlot);
                            const hasAppointment = appointment.length > 0;
                            
                            return (
                              <div
                                key={timeSlot}
                                className={`h-12 border-l border-gray-100 cursor-pointer transition-colors ${
                                  hasAppointment 
                                    ? 'bg-indigo-100 hover:bg-indigo-200' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => handleTimeSlotClick(date, provider.id, timeSlot)}
                                title={hasAppointment ? `${timeSlot} - ${appointment[0].customerName}` : `Available at ${timeSlot}`}
                              >
                                {hasAppointment && (
                                  <div className="p-1 text-xs">
                                    <div className="bg-indigo-600 text-white px-2 py-1 rounded text-center">
                                      <div className="font-medium">{timeSlot}</div>
                                      <div className="truncate">{appointment[0].petName}</div>
                                    </div>
                                  </div>
                                )}
                                {!hasAppointment && (
                                  <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                                    {timeSlot}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-bold text-indigo-600">12</p>
              </div>
              <FaCalendarAlt className="text-indigo-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Available Slots</p>
                <p className="text-2xl font-bold text-green-600">48</p>
              </div>
              <FaClock className="text-green-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Providers</p>
                <p className="text-2xl font-bold text-blue-600">{providers.length}</p>
              </div>
              <FaUserMd className="text-blue-400 text-2xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue Today</p>
                <p className="text-2xl font-bold text-purple-600">$1,245</p>
              </div>
              <FaDollarSign className="text-purple-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* New Appointment Modal */}
        {showNewAppointmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Schedule New Appointment</h3>
                <button
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Customer Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search customer by name or email..."
                    />
                  </div>
                </div>

                {/* Pet Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Pet</option>
                    <option value="1">Max (Dog) - Sarah Johnson</option>
                    <option value="2">Luna (Cat) - Emily Davis</option>
                    <option value="3">Buddy (Dog) - John Smith</option>
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Service</option>
                    <option value="health-checkup">Health Checkup - $85</option>
                    <option value="grooming">Pet Grooming - $60</option>
                    <option value="walking">Dog Walking - $25</option>
                    <option value="sitting">Pet Sitting - $40/day</option>
                    <option value="training">Training Session - $75</option>
                  </select>
                </div>

                {/* Provider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Provider</option>
                    {providers.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    placeholder="Special instructions or notes..."
                  ></textarea>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowNewAppointmentModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Appointment scheduled successfully!');
                      setShowNewAppointmentModal(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                  >
                    <FaSave /> Schedule Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AppointmentScheduler;