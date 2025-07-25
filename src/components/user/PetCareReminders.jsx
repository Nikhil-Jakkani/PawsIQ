import React, { useState } from 'react';
import { FaBell, FaSyringe, FaBone, FaBath, FaHeart, FaPlus, FaCheck, FaClock } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const PetCareReminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'vaccination',
      title: 'Annual Vaccination Due',
      petName: 'Max',
      petType: 'dog',
      dueDate: '2025-06-25',
      priority: 'high',
      completed: false,
      description: 'DHPP and Rabies vaccines'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Heartworm Prevention',
      petName: 'Luna',
      petType: 'cat',
      dueDate: '2025-06-20',
      priority: 'medium',
      completed: false,
      description: 'Monthly heartworm prevention dose'
    },
    {
      id: 3,
      type: 'grooming',
      title: 'Nail Trimming',
      petName: 'Max',
      petType: 'dog',
      dueDate: '2025-06-18',
      priority: 'low',
      completed: true,
      description: 'Regular nail maintenance'
    },
    {
      id: 4,
      type: 'feeding',
      title: 'Special Diet Check',
      petName: 'Luna',
      petType: 'cat',
      dueDate: '2025-06-22',
      priority: 'medium',
      completed: false,
      description: 'Review special dietary requirements'
    }
  ]);

  const getReminderIcon = (type) => {
    switch (type) {
      case 'vaccination': return FaSyringe;
      case 'medication': return FaHeart;
      case 'grooming': return FaBath;
      case 'feeding': return FaBone;
      default: return FaBell;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `In ${diffDays} days`;
  };

  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaBell className="text-pink-600" />
          Care Reminders
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
            {activeReminders.length} active
          </span>
          <button className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" />
            Add Reminder
          </button>
        </div>
      </div>

      {/* Active Reminders */}
      <div className="space-y-3 mb-6">
        {activeReminders.map((reminder) => {
          const IconComponent = getReminderIcon(reminder.type);
          
          return (
            <div 
              key={reminder.id}
              className={`border rounded-lg p-4 ${getPriorityColor(reminder.priority)} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  reminder.petType === 'cat' ? 'bg-purple-100' : 'bg-pink-100'
                }`}>
                  <IconComponent className={`text-sm ${
                    reminder.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadge(reminder.priority)}`}>
                        {reminder.priority.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaClock />
                        {formatDate(reminder.dueDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <PetIcon type={reminder.petType} className={`text-sm ${
                      reminder.petType === 'cat' ? 'text-purple-600' : 'text-pink-600'
                    }`} />
                    <span className="text-sm text-gray-600">{reminder.petName}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleReminder(reminder.id)}
                      className="flex items-center gap-1 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-medium transition-colors"
                    >
                      <FaCheck />
                      Mark Complete
                    </button>
                    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <FaCheck className="text-green-500" />
            Recently Completed ({completedReminders.length})
          </h3>
          <div className="space-y-2">
            {completedReminders.slice(0, 2).map((reminder) => {
              const IconComponent = getReminderIcon(reminder.type);
              
              return (
                <div 
                  key={reminder.id}
                  className="border border-gray-100 rounded-lg p-3 bg-gray-50 opacity-75"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-1.5 bg-green-100">
                      <IconComponent className="text-xs text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 line-through">
                          {reminder.title}
                        </span>
                        <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <PetIcon type={reminder.petType} className="text-xs text-gray-500" />
                        <span className="text-xs text-gray-500">{reminder.petName}</span>
                      </div>
                    </div>
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

export default PetCareReminders;