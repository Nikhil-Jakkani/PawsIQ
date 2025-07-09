import React from 'react';
import { FaUser, FaCalendarCheck, FaShoppingCart, FaCommentDots } from 'react-icons/fa';

const activities = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    name: 'John Smith',
    time: '2 minutes ago',
    icon: <FaUser className="text-blue-500" />,
  },
  {
    id: 2,
    type: 'appointment',
    title: 'New appointment booked',
    name: 'Grooming for Max',
    time: '15 minutes ago',
    icon: <FaCalendarCheck className="text-green-500" />,
  },
  {
    id: 3,
    type: 'order',
    title: 'New order placed',
    name: 'Premium Dog Food',
    time: '1 hour ago',
    icon: <FaShoppingCart className="text-purple-500" />,
  },
  {
    id: 4,
    type: 'review',
    title: 'New review submitted',
    name: '5-star review for Dr. Johnson',
    time: '3 hours ago',
    icon: <FaCommentDots className="text-yellow-500" />,
  },
  {
    id: 5,
    type: 'user',
    title: 'User updated profile',
    name: 'Sarah Williams',
    time: '5 hours ago',
    icon: <FaUser className="text-blue-500" />,
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
            <div className="p-2 rounded-full bg-gray-100">
              {activity.icon}
            </div>
            <div>
              <p className="font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.name}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;