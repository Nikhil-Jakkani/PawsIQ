import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserAppointmentConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const appointment = state?.appointment || null;

  // Generate a lightweight confirmation code for display
  const confirmationCode = useMemo(() => {
    const base = Date.now().toString(36).toUpperCase();
    return `PAW-${base.slice(-6)}`;
  }, []);

  const handleGoToAppointments = () => {
    navigate('/user/appointments');
  };

  const handleBookAnother = () => {
    navigate('/user/appointments/new');
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-green-500">
              <FaCheckCircle size={56} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Appointment Confirmed</h1>
          <p className="text-gray-600 mt-2">Thank you! Your booking has been successfully scheduled.</p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1 border border-green-100">
            <span className="text-xs font-semibold text-green-700">Confirmation</span>
            <span className="text-xs font-mono text-green-800">{confirmationCode}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Pet</h3>
                {appointment?.pet ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment.pet.image}
                      alt={appointment.pet.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{appointment.pet.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{appointment.pet.breed || appointment.pet.type}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPaw className="text-gray-500" />
                    <span>Pet details unavailable</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Service</h3>
                {appointment?.service ? (
                  <div>
                    <p className="font-medium text-gray-800">{appointment.service.name}</p>
                    <p className="text-sm text-gray-600">Duration: {appointment.service.duration}</p>
                  </div>
                ) : (
                  <p className="text-gray-700">Service details unavailable</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Provider</h3>
                {appointment?.provider ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment.provider.image}
                      alt={appointment.provider.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{appointment.provider.name}</p>
                      <p className="text-sm text-gray-600">{appointment.provider.title}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700">Provider details unavailable</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
                {appointment?.date ? (
                  <div className="flex items-center gap-4 text-gray-800">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500" />
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-500" />
                      <span>{appointment.timeSlot}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700">Date and time unavailable</p>
                )}
              </div>

              {appointment?.provider && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                  <div className="flex items-start gap-2 text-gray-800">
                    <FaMapMarkerAlt className="text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">{appointment.provider.location}</p>
                      <p className="text-sm text-gray-600">{appointment.provider.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-purple-800">${appointment?.total?.toFixed ? appointment.total.toFixed(2) : (appointment?.total || 0)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoToAppointments}
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              View My Appointments
            </button>
            <button
              onClick={handleBookAnother}
              className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserAppointmentConfirmation;