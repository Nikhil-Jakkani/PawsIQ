import React, { useState } from 'react';
import { FaRunning, FaBone, FaPlay, FaChartLine, FaChevronLeft, FaChevronRight, FaPaw } from 'react-icons/fa';

const PetActivityTracker = () => {
  const [selectedPet, setSelectedPet] = useState('Max');
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  
  const pets = [
    { 
      name: 'Max', 
      breed: 'Golden Retriever', 
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      color: 'from-amber-500 to-orange-600'
    },
    { 
      name: 'Luna', 
      breed: 'Siamese Cat', 
      type: 'cat',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      color: 'from-purple-500 to-pink-600'
    }
  ];
  
  const activities = {
    Max: {
      today: {
        exercise: { value: 45, goal: 60, unit: 'min' },
        food: { value: 2, goal: 3, unit: 'meals' },
        play: { value: 30, goal: 45, unit: 'min' }
      },
      week: [
        { day: 'Mon', exercise: 60, food: 3, play: 45 },
        { day: 'Tue', exercise: 45, food: 3, play: 30 },
        { day: 'Wed', exercise: 55, food: 2, play: 40 },
        { day: 'Thu', exercise: 40, food: 3, play: 35 },
        { day: 'Fri', exercise: 50, food: 3, play: 50 },
        { day: 'Sat', exercise: 70, food: 3, play: 60 },
        { day: 'Sun', exercise: 45, food: 2, play: 30 }
      ]
    },
    Luna: {
      today: {
        exercise: { value: 20, goal: 30, unit: 'min' },
        food: { value: 2, goal: 2, unit: 'meals' },
        play: { value: 25, goal: 30, unit: 'min' }
      },
      week: [
        { day: 'Mon', exercise: 30, food: 2, play: 30 },
        { day: 'Tue', exercise: 25, food: 2, play: 25 },
        { day: 'Wed', exercise: 35, food: 2, play: 35 },
        { day: 'Thu', exercise: 20, food: 2, play: 20 },
        { day: 'Fri', exercise: 30, food: 2, play: 40 },
        { day: 'Sat', exercise: 40, food: 2, play: 45 },
        { day: 'Sun', exercise: 20, food: 2, play: 25 }
      ]
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'exercise': return FaRunning;
      case 'food': return FaBone;
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

  const currentPet = pets[currentPetIndex];
  const currentPetData = activities[currentPet.name];

  const nextPet = () => {
    const nextIndex = (currentPetIndex + 1) % pets.length;
    setCurrentPetIndex(nextIndex);
    setSelectedPet(pets[nextIndex].name);
  };

  const prevPet = () => {
    const prevIndex = currentPetIndex === 0 ? pets.length - 1 : currentPetIndex - 1;
    setCurrentPetIndex(prevIndex);
    setSelectedPet(pets[prevIndex].name);
  };

  const selectPet = (index) => {
    setCurrentPetIndex(index);
    setSelectedPet(pets[index].name);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 border border-gray-100">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-1.5 rounded-lg shadow-sm flex-shrink-0">
            <FaChartLine className="text-white text-sm" />
          </div>
          <div className="min-w-0">
            <h2 className="text-md font-bold text-gray-800">Activity Tracker</h2>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
          Live
        </div>
      </div>

      {/* Pet Carousel Header */}
      <div className="mb-4">

        {/* Compact Pet Selector */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={currentPet.image} 
                  alt={currentPet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">{currentPet.name}</h3>
                <p className="text-xs text-gray-500">{currentPet.breed}</p>
              </div>
            </div>
            
            {pets.length > 1 && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={prevPet}
                  className="p-1 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <FaChevronLeft className="text-gray-600 text-xs" />
                </button>
                <span className="text-xs text-gray-500 px-2">{currentPetIndex + 1}/{pets.length}</span>
                <button 
                  onClick={nextPet}
                  className="p-1 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <FaChevronRight className="text-gray-600 text-xs" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Today's Progress</h3>
        
        <div className="space-y-2">
          {Object.entries(currentPetData.today).map(([activity, data]) => {
            const IconComponent = getActivityIcon(activity);
            const percentage = Math.min((data.value / data.goal) * 100, 100);
            
            return (
              <div key={activity} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity)} flex-shrink-0`}>
                    <IconComponent className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800 capitalize">{activity}</span>
                      <span className="text-xs text-gray-500">{data.value}/{data.goal} {data.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                    percentage >= 100 ? 'bg-green-100 text-green-700' : 
                    percentage >= 75 ? 'bg-yellow-100 text-yellow-700' : 
                    percentage >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Compact Daily Summary */}
        <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-800">Daily Summary</h4>
              <p className="text-xs text-gray-600">{currentPet.name}'s progress</p>
            </div>
            <div className="text-right">
              {(() => {
                const totalActivities = Object.keys(currentPetData.today).length;
                const completedActivities = Object.values(currentPetData.today).filter(
                  data => (data.value / data.goal) >= 1
                ).length;
                const overallPercentage = Math.round(
                  Object.values(currentPetData.today).reduce(
                    (sum, data) => sum + Math.min((data.value / data.goal) * 100, 100), 0
                  ) / totalActivities
                );
                
                return (
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {completedActivities}/{totalActivities}
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      overallPercentage >= 80 ? 'bg-green-100 text-green-700' :
                      overallPercentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {overallPercentage}%
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PetActivityTracker;