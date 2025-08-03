import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaShoppingCart, FaPaw, FaDog, FaCat, FaBone, FaRobot, FaStethoscope, FaHeart, FaStar, FaBell } from 'react-icons/fa';
import { PetIcon, PetIconButton } from '../../components/layout/PetIcons';
import UserStatCard from '../../components/user/UserStatCard';

import PetProfiles from '../../components/user/PetProfiles';
import AIPetCareSuggestions from '../../components/user/AIPetCareSuggestions';
import AISymptomChecker from '../../components/user/AISymptomChecker';
import PetSelector from '../../components/user/PetSelector';
import PetHealthCard from '../../components/user/PetHealthCard';
import UpcomingSchedule from '../../components/user/UpcomingSchedule';
import PetCareReminders from '../../components/user/PetCareReminders';
import SmartInsights from '../../components/user/SmartInsights';
import QuickStats from '../../components/user/QuickStats';
import WeatherWidget from '../../components/user/WeatherWidget';
import PetActivityTracker from '../../components/user/PetActivityTracker';
import UserLayout from '../../components/layout/UserLayout';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedPetForAI, setSelectedPetForAI] = useState(null);

  const scrollToSymptomChecker = () => {
    const element = document.getElementById('symptom-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock data for pets (in a real app, this would come from your state management or API)
  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'dog',
      breed: 'Golden Retriever',
      age: '3 years',
      weight: '65 lbs',
      gender: 'male',
      birthday: '2022-05-15',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      lastCheckup: '2025-05-01',
      vaccinations: 'Up to date'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'cat',
      breed: 'Siamese',
      age: '2 years',
      weight: '9 lbs',
      gender: 'female',
      birthday: '2023-02-10',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      lastCheckup: '2025-04-15',
      vaccinations: 'Up to date'
    }
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header with cute greeting */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 rounded-2xl p-6 border border-pink-200 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-3 rounded-xl shadow-lg">
                  <FaPaw className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome Back! 🐾
                  </h1>
                  <p className="text-gray-600 mt-1">Your furry friends are happy to see you!</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm text-gray-500">Today is</div>
                <div className="font-semibold text-gray-800">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaStar className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <QuickStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pet Health Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaHeart className="text-pink-600" />
                My Pets Health
              </h2>
              <div className="space-y-4">
                {pets.map((pet) => (
                  <PetHealthCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <WeatherWidget />
          </div>

          {/* Middle Column - Schedule & Appointments */}
          <div className="lg:col-span-1 space-y-6">
            <UpcomingSchedule />  
            <PetCareReminders />
          </div>

          {/* Right Column - Insights & AI */}
          <div className="lg:col-span-1 space-y-6">
            <SmartInsights />
            
            {/* Quick Actions - Compact Version */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 shadow-sm">
              <h2 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
                <FaPaw className="text-pink-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/user/pets/add')}
                  className="bg-white rounded-lg p-3 text-center border border-pink-100 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-pink-50 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                    <PetIcon type="dog" className="text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Add Pet</h3>
                </button>
                <button 
                  onClick={() => navigate('/user/appointments/new')}
                  className="bg-white rounded-lg p-3 text-center border border-pink-100 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-purple-50 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                    <FaCalendarCheck className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Book Service</h3>
                </button>
                <button 
                  onClick={() => navigate('/user/marketplace')}
                  className="bg-white rounded-lg p-3 text-center border border-pink-100 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-blue-50 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                    <FaShoppingCart className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">Shop</h3>
                </button>
                <button 
                  onClick={() => navigate('/user/ai-pet-care')}
                  className="bg-white rounded-lg p-3 text-center border border-pink-100 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-indigo-50 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                    <FaRobot className="text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">AI Care</h3>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="space-y-6">
          {/* Pet Activity Tracker */}
          <PetActivityTracker />
          
          {/* AI Pet Care Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
              <FaRobot className="text-indigo-600" />
              AI Pet Care Assistant 🤖
            </h2>
            <div className="space-y-6">
              <PetSelector 
                pets={pets}
                selectedPet={selectedPetForAI}
                onPetSelect={setSelectedPetForAI}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIPetCareSuggestions selectedPet={selectedPetForAI} />
                <div id="symptom-checker">
                  <AISymptomChecker selectedPet={selectedPetForAI} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Pet Care Tips - Enhanced */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              <FaPaw className="text-green-600" />
              Daily Pet Care Tips 💡
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-50 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <FaDog className="text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Dogs</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">Regular exercise is crucial for a dog's physical and mental health. Aim for at least 30 minutes of activity daily to keep them happy and healthy! 🐕</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-50 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FaCat className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Cats</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">Provide vertical spaces for cats to climb and perch. This satisfies their natural instinct to observe from heights and keeps them mentally stimulated! 🐱</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-50 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <PetIcon type="rabbit" className="text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Small Pets</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">Small pets need daily handling to stay socialized. Spend at least 15-20 minutes interacting with them each day to build trust and bonding! 🐰</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;