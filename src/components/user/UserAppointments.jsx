import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const UserAppointments = () => {
  // Mock data for upcoming appointments
  const appointments = [
    {
      id: 1,
      type: 'Veterinary Checkup',
      petName: 'Max',
      petType: 'dog',
      provider: 'Dr. Sarah Johnson',
      date: '2025-06-18',
      time: '10:00 AM',
      location: 'Happy Paws Veterinary Clinic',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'Grooming Session',
      petName: 'Luna',
      petType: 'cat',
      provider: 'Fluffy Tails Grooming',
      date: '2025-06-20',
      time: '2:30 PM',
      location: 'Fluffy Tails Pet Spa',
      status: 'confirmed'
    },
    {
      id: 3,
      type: 'Training Session',
      petName: 'Max',
      petType: 'dog',
      provider: 'Paws & Train',
      date: '2025-06-25',
      time: '4:00 PM',
      location: 'Central Park Training Area',
      status: 'pending'
    }
  ];

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-pink-600" />
          Upcoming Appointments
        </h2>
        <Link 
          to="/user/appointments"
          className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1"
        >
          View All <FaArrowRight size={12} />
        </Link>
      </div>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id}
            className="border border-pink-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-3 ${appointment.petType === 'cat' ? 'bg-purple-100' : 'bg-pink-100'}`}>
                <PetIcon type={appointment.petType} className={appointment.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{appointment.type}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  For {appointment.petName} with {appointment.provider}
                </p>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-pink-500" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock className="text-pink-500" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
                    <FaMapMarkerAlt className="text-pink-500" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Link 
                    to={`/user/appointments/${appointment.id}`}
                    className="text-xs font-medium px-3 py-1 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    View Details
                  </Link>
                  {appointment.status === 'confirmed' && (
                    <button 
                      className="text-xs font-medium px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                    >
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointments;