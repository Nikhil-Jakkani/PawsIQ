import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaShoppingCart, FaPaw, FaDog, FaCat, FaBone, FaRobot, FaStethoscope, FaHeart, FaStar, FaBell, FaChartLine, FaMagic, FaArrowRight } from 'react-icons/fa';
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const scrollToSymptomChecker = () => {
    const element = document.getElementById('symptom-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
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
      <div className="space-y-8">
        {/* Modern Header with Dynamic Greeting */}
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-3xl p-8 border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-purple-100/20 to-indigo-100/20"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <FaPaw className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 animate-bounce">
                    <FaMagic className="text-yellow-800 text-xs" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {getGreeting()}
                  </h1>
                  <p className="text-gray-600 text-lg">Your furry friends are excited to see you!</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      {pets.map((pet, index) => (
                        <div key={pet.id} className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden transform hover:scale-110 transition-transform duration-200" style={{zIndex: pets.length - index}}>
                          <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">{pets.length} pets waiting for you</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-sm text-gray-500 mb-1">Today is</div>
                  <div className="font-bold text-gray-800 text-lg">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                  <FaStar className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Overview */}
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <QuickStats />
        </div>

        {/* Main Content Grid with Enhanced Styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Pet Health Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-50">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-500 to-red-500 p-2 rounded-xl">
                  <FaHeart className="text-white text-lg" />
                </div>
                My Pets Health
                <div className="ml-auto bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {pets.length} pets
                </div>
              </h2>
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="transform hover:scale-105 transition-transform duration-200">
                    <PetHealthCard pet={pet} />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Weather Widget */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <WeatherWidget />
            </div>
          </div>

          {/* Middle Column - Schedule & Appointments */}
          <div className="lg:col-span-1 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <UpcomingSchedule />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <PetCareReminders />
            </div>
          </div>

          {/* Right Column - Insights & AI */}
          <div className="lg:col-span-1 space-y-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <SmartInsights />
            </div>
            
            {/* Enhanced Quick Actions */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-pink-900 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
                    <FaPaw className="text-white text-lg" />
                  </div>
                  Quick Actions
                </h2>
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                  NEW
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/user/pets/add')}
                  className="group bg-white rounded-xl p-4 text-center border border-pink-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-pink-200"
                >
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    <PetIcon type="dog" className="text-pink-600 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Add Pet</h3>
                  <p className="text-xs text-gray-500">Register new friend</p>
                  <FaArrowRight className="text-pink-500 text-xs mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button 
                  onClick={() => navigate('/user/appointments/new')}
                  className="group bg-white rounded-xl p-4 text-center border border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-200"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    <FaCalendarCheck className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Book Service</h3>
                  <p className="text-xs text-gray-500">Schedule appointment</p>
                  <FaArrowRight className="text-purple-500 text-xs mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button 
                  onClick={() => navigate('/user/marketplace')}
                  className="group bg-white rounded-xl p-4 text-center border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-200"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    <FaShoppingCart className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Shop</h3>
                  <p className="text-xs text-gray-500">Browse products</p>
                  <FaArrowRight className="text-blue-500 text-xs mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button 
                  onClick={() => navigate('/user/ai-pet-care')}
                  className="group bg-white rounded-xl p-4 text-center border border-indigo-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-200"
                >
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    <FaRobot className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">AI Care</h3>
                  <p className="text-xs text-gray-500">Smart assistance</p>
                  <FaArrowRight className="text-indigo-500 text-xs mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="space-y-8">
          {/* Enhanced AI Pet Care Section */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <FaRobot className="text-white text-2xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-400 rounded-full p-1 animate-pulse">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AI Pet Care Assistant
                  </h2>
                  <p className="text-gray-600 mt-1">Get personalized care recommendations powered by AI 🤖</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Online</span>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <PetSelector 
                  pets={pets}
                  selectedPet={selectedPetForAI}
                  onPetSelect={setSelectedPetForAI}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <AIPetCareSuggestions selectedPet={selectedPetForAI} />
                </div>
                <div id="symptom-checker" className="transform hover:scale-105 transition-transform duration-300">
                  <AISymptomChecker selectedPet={selectedPetForAI} />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Pet Activity Tracker */}
          <div className="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 rounded-3xl p-8 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                  <FaChartLine className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    Pet Activity Tracker
                  </h2>
                  <p className="text-gray-600 mt-1">Monitor your pets' daily activities and health metrics 📊</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <FaMagic className="text-green-500 text-sm" />
                <span className="text-sm font-medium text-gray-700">Live Data</span>
              </div>
            </div>
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <PetActivityTracker />
            </div>
          </div>
          
          {/* Enhanced Pet Care Tips */}
          <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 rounded-3xl p-8 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-2xl shadow-lg">
                  <FaPaw className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Daily Pet Care Tips
                  </h2>
                  <p className="text-gray-600 mt-1">Expert advice to keep your pets happy and healthy 💡</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <FaMagic className="text-orange-500 text-sm animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Daily Tips</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-pink-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <FaDog className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Dogs</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">Regular exercise is crucial for a dog's physical and mental health. Aim for at least 30 minutes of activity daily to keep them happy and healthy! 🐕</p>
                <div className="mt-4 flex items-center text-pink-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 text-xs" />
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <FaCat className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Cats</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">Provide vertical spaces for cats to climb and perch. This satisfies their natural instinct to observe from heights and keeps them mentally stimulated! 🐱</p>
                <div className="mt-4 flex items-center text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 text-xs" />
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <PetIcon type="rabbit" className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Small Pets</h3>
                    <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">Small pets need daily handling to stay socialized. Spend at least 15-20 minutes interacting with them each day to build trust and bonding! 🐰</p>
                <div className="mt-4 flex items-center text-yellow-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToSymptomChecker}
            className="group bg-gradient-to-br from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
            title="Quick AI Health Check"
          >
            <div className="relative">
              <FaRobot className="text-2xl" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              AI Health Check
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;