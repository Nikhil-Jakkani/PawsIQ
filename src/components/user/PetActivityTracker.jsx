import React, { useState } from 'react';
import { FaRunning, FaBone, FaTint, FaBed, FaPlay, FaChartLine, FaPlus } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const PetActivityTracker = () => {
  const [selectedPet, setSelectedPet] = useState('Max');
  
  const pets = ['Max', 'Luna'];
  
  const activities = {
    Max: {
      today: {
        exercise: { value: 45, goal: 60, unit: 'min' },
        food: { value: 2, goal: 3, unit: 'meals' },
        water: { value: 1.2, goal: 1.5, unit: 'L' },
        sleep: { value: 8, goal: 12, unit: 'hrs' },
        play: { value: 30, goal: 45, unit: 'min' }
      },
      week: [
        { day: 'Mon', exercise: 60, food: 3, water: 1.5, sleep: 12, play: 45 },
        { day: 'Tue', exercise: 45, food: 3, water: 1.3, sleep: 11, play: 30 },
        { day: 'Wed', exercise: 55, food: 2, water: 1.4, sleep: 12, play: 40 },
        { day: 'Thu', exercise: 40, food: 3, water: 1.2, sleep: 10, play: 35 },
        { day: 'Fri', exercise: 50, food: 3, water: 1.6, sleep: 12, play: 50 },
        { day: 'Sat', exercise: 70, food: 3, water: 1.8, sleep: 13, play: 60 },
        { day: 'Sun', exercise: 45, food: 2, water: 1.2, sleep: 8, play: 30 }
      ]
    },
    Luna: {
      today: {
        exercise: { value: 20, goal: 30, unit: 'min' },
        food: { value: 2, goal: 2, unit: 'meals' },
        water: { value: 0.3, goal: 0.4, unit: 'L' },
        sleep: { value: 14, goal: 16, unit: 'hrs' },
        play: { value: 25, goal: 30, unit: 'min' }
      },
      week: [
        { day: 'Mon', exercise: 30, food: 2, water: 0.4, sleep: 16, play: 30 },
        { day: 'Tue', exercise: 25, food: 2, water: 0.35, sleep: 15, play: 25 },
        { day: 'Wed', exercise: 35, food: 2, water: 0.4, sleep: 16, play: 35 },
        { day: 'Thu', exercise: 20, food: 2, water: 0.3, sleep: 14, play: 20 },
        { day: 'Fri', exercise: 30, food: 2, water: 0.45, sleep: 16, play: 40 },
        { day: 'Sat', exercise: 40, food: 2, water: 0.5, sleep: 17, play: 45 },
        { day: 'Sun', exercise: 20, food: 2, water: 0.3, sleep: 14, play: 25 }
      ]
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'exercise': return FaRunning;
      case 'food': return FaBone;
      case 'water': return FaTint;
      case 'sleep': return FaBed;
      case 'play': return FaPlay;
      default: return FaRunning;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'exercise': return 'text-red-600 bg-red-100';
      case 'food': return 'text-orange-600 bg-orange-100';
      case 'water': return 'text-blue-600 bg-blue-100';
      case 'sleep': return 'text-purple-600 bg-purple-100';
      case 'play': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const currentPetData = activities[selectedPet];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaChartLine className="text-pink-600" />
          Activity Tracker
        </h2>
        <div className="flex items-center gap-2">
          <select 
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className="text-sm border border-pink-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {pets.map(pet => (
              <option key={pet} value={pet}>{pet}</option>
            ))}
          </select>
          <button className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" />
            Log Activity
          </button>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Today's Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(currentPetData.today).map(([activity, data]) => {
            const IconComponent = getActivityIcon(activity);
            const percentage = Math.min((data.value / data.goal) * 100, 100);
            
            return (
              <div key={activity} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-full ${getActivityColor(activity)}`}>
                    <IconComponent className="text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{activity}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      {data.value}{data.unit}
                    </span>
                    <span className="text-xs text-gray-500">
                      /{data.goal}{data.unit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-center">
                    <span className={`font-medium ${
                      percentage >= 100 ? 'text-green-600' : 
                      percentage >= 75 ? 'text-yellow-600' : 
                      percentage >= 50 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {Math.round(percentage)}% Complete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Overview */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4">This Week's Overview</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {currentPetData.week.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs font-medium text-gray-600 mb-2">{day.day}</div>
                <div className="space-y-1">
                  <div className="h-2 bg-red-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(day.exercise / 70) * 100}%` }}
                    ></div>
                  </div>
                  <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(day.food / 3) * 100}%` }}
                    ></div>
                  </div>
                  <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${selectedPet === 'Max' ? (day.water / 2) * 100 : (day.water / 0.5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Exercise</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">Food</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Water</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-2 flex-wrap">
        <button className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1">
          <FaRunning />
          Log Exercise
        </button>
        <button className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1">
          <FaBone />
          Record Meal
        </button>
        <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1">
          <FaTint />
          Track Water
        </button>
        <button className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1">
          <FaPlay />
          Log Playtime
        </button>
      </div>
    </div>
  );
};

export default PetActivityTracker;