import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaBell className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500">Manage system notifications and user communications</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
          <div className="text-center py-12">
            <FaBell className="text-indigo-300 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Notification Management</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              This page will contain notification management features including system alerts,
              user notifications, email templates, and communication settings.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;