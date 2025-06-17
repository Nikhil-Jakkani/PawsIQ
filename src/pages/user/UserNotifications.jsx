import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCalendarAlt, FaShoppingCart, FaPaw, FaTag, FaExclamationCircle, FaInfoCircle, FaCheck, FaTrash, FaEllipsisH } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserNotifications = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  
  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment Reminder',
      message: 'Your appointment with Dr. Sarah Johnson for Max is tomorrow at 10:30 AM.',
      date: '2023-12-14T09:00:00',
      isRead: false,
      actionUrl: '/user/appointments/1'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-12346 has been shipped and is on its way to you.',
      date: '2023-12-12T14:30:00',
      isRead: true,
      actionUrl: '/user/orders/ORD-12346'
    },
    {
      id: 3,
      type: 'pet',
      title: 'Vaccination Due',
      message: 'Luna is due for her annual vaccinations. Book an appointment soon.',
      date: '2023-12-10T11:15:00',
      isRead: false,
      actionUrl: '/user/appointments/new'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on all pet grooming services this week. Use code: GROOM20',
      date: '2023-12-08T16:45:00',
      isRead: true,
      actionUrl: '/user/services'
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Security',
      message: 'We noticed a login from a new device. Please verify it was you.',
      date: '2023-12-05T08:20:00',
      isRead: false,
      actionUrl: '/user/settings/security'
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-12345 has been delivered. Enjoy your purchase!',
      date: '2023-12-02T13:10:00',
      isRead: true,
      actionUrl: '/user/orders/ORD-12345'
    },
    {
      id: 7,
      type: 'pet',
      title: 'Pet Birthday',
      message: 'Max turns 4 years old today! Celebrate with a special treat.',
      date: '2023-11-30T10:00:00',
      isRead: true,
      actionUrl: '/user/pets/1'
    }
  ]);
  
  // Filter notifications based on type
  const filteredNotifications = notifications.filter(notification => {
    return filterType === 'all' || notification.type === filterType;
  });
  
  // Get unread count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, isRead: true} : notification
    ));
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, isRead: true})));
  };
  
  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'order':
        return <FaShoppingCart className="text-blue-500" />;
      case 'pet':
        return <FaPaw className="text-pink-500" />;
      case 'promotion':
        return <FaTag className="text-yellow-500" />;
      case 'system':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaBell className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <p className="text-gray-500 mt-1">Stay updated with important information</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1"
              >
                <FaCheck size={12} />
                <span>Mark All as Read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button 
                onClick={clearAllNotifications}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                <FaTrash size={12} />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <button
              onClick={() => setFilterType('all')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'all' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaBell />
              <span>All</span>
              {unreadCount > 0 && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilterType('appointment')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'appointment' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaCalendarAlt />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => setFilterType('order')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'order' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaShoppingCart />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setFilterType('pet')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'pet' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaPaw />
              <span>Pets</span>
            </button>
            <button
              onClick={() => setFilterType('promotion')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'promotion' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaTag />
              <span>Promotions</span>
            </button>
            <button
              onClick={() => setFilterType('system')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${filterType === 'system' 
                  ? 'text-yellow-600 border-b-2 border-yellow-600' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`}
            >
              <FaExclamationCircle />
              <span>System</span>
            </button>
          </div>
        </div>
        
        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-yellow-50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${!notification.isRead ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-800'}`}>
                          {notification.title}
                        </h3>
                        <p className={`mt-1 ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(notification.date)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        )}
                        <div className="relative">
                          <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                            <FaEllipsisH />
                          </button>
                          {/* Dropdown menu would go here in a real implementation */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => navigate(notification.actionUrl)}
                        className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                      >
                        View Details
                      </button>
                      {!notification.isRead && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaBell className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-600 mb-6">
              {filterType !== 'all' 
                ? `You don't have any ${filterType} notifications at the moment.`
                : "You're all caught up! No new notifications."}
            </p>
            {filterType !== 'all' && (
              <button 
                onClick={() => setFilterType('all')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <FaBell />
                View All Notifications
              </button>
            )}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserNotifications;