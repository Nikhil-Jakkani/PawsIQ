import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaShoppingCart, FaPaw, FaDog, FaCat, FaBone, FaRobot, FaStethoscope, FaHeart, FaStar, FaBell, FaChartLine, FaMagic, FaArrowRight, FaRunning, FaUtensils, FaCut, FaHeartbeat, FaBrain, FaThermometerHalf, FaClock, FaTint, FaPlay } from 'react-icons/fa';
import { PetIcon, PetIconButton } from '../../components/layout/PetIcons';
// import UserStatCard from '../../components/user/UserStatCard';

import PetProfiles from '../../components/user/PetProfiles';
import AIPetCareSuggestions from '../../components/user/AIPetCareSuggestions';
import PetSelector from '../../components/user/PetSelector';
import PetHealthCard from '../../components/user/PetHealthCard';
import SmartInsights from '../../components/user/SmartInsights';

import WeatherWidget from '../../components/user/WeatherWidget';

import AIAssistantPopup from '../../components/user/AIAssistantPopup';
import UpcomingSchedule from '../../components/user/UpcomingSchedule';
import CareReminders from '../../components/user/CareReminders';
import PetActivityTracker from '../../components/user/PetActivityTracker';
import UserLayout from '../../components/layout/UserLayout';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [activeService, setActiveService] = useState('suggestions');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
  };

  const getAIPetCareTips = () => {
    const tips = [];
    const currentDate = new Date();
    const currentSeason = getCurrentSeason();
    const currentHour = currentDate.getHours();
    
    pets.forEach(pet => {
      const petAge = parseInt(pet.age);
      const petWeight = parseInt(pet.weight);
      
      // Exercise & Activity Tips
      if (pet.type === 'dog') {
        const exerciseTime = pet.breed === 'Golden Retriever' ? '90-120' : 
                           pet.breed === 'Labrador' ? '60-90' : '45-60';
        tips.push({
          id: `exercise-${pet.id}`,
          petName: pet.name,
          petType: pet.type,
          icon: FaRunning,
          color: 'pink',
          title: `${pet.name}'s Daily Exercise Plan`,
          tip: `${pet.breed}s like ${pet.name} (${pet.age}) need ${exerciseTime} minutes of exercise daily. ${currentSeason === 'summer' ? 'Exercise during cooler morning/evening hours to prevent overheating.' : currentSeason === 'winter' ? 'Indoor activities and shorter outdoor walks are recommended.' : 'Perfect weather for outdoor activities!'}`,
          aiGenerated: true
        });
      } else if (pet.type === 'cat') {
        tips.push({
          id: `activity-${pet.id}`,
          petName: pet.name,
          petType: pet.type,
          icon: FaCat,
          color: 'purple',
          title: `${pet.name}'s Mental Stimulation`,
          tip: `${pet.breed} cats like ${pet.name} are ${petAge < 3 ? 'young and energetic' : petAge > 7 ? 'mature and need gentle activities' : 'in their prime'}. Provide 15-20 minutes of interactive play ${currentHour < 12 ? 'this morning' : currentHour < 18 ? 'this afternoon' : 'this evening'} with feather toys or laser pointers.`,
          aiGenerated: true
        });
      }

      // Nutrition Tips
      const feedingSchedule = pet.type === 'dog' ? (petAge < 1 ? '3-4 times daily' : '2 times daily') : 
                             pet.type === 'cat' ? (petAge < 1 ? '3-4 times daily' : '2-3 times daily') : '2 times daily';
      tips.push({
        id: `nutrition-${pet.id}`,
        petName: pet.name,
        petType: pet.type,
        icon: FaUtensils,
        color: 'green',
        title: `${pet.name}'s Nutrition Guide`,
        tip: `For a ${petAge}-year-old ${pet.breed} weighing ${pet.weight}, feed ${feedingSchedule}. ${petWeight > 70 ? 'Monitor portion sizes to maintain healthy weight.' : petWeight < 10 ? 'Small frequent meals are ideal.' : 'Current weight seems optimal.'} ${currentSeason === 'winter' ? 'Pets may need slightly more calories in cold weather.' : 'Ensure fresh water is always available.'}`,
        aiGenerated: true
      });

      // Health & Grooming Tips
      const groomingFreq = pet.type === 'dog' ? (pet.breed.includes('Retriever') ? 'weekly' : 'bi-weekly') : 'daily';
      tips.push({
        id: `grooming-${pet.id}`,
        petName: pet.name,
        petType: pet.type,
        icon: FaCut,
        color: 'pink',
        title: `${pet.name}'s Grooming Schedule`,
        tip: `${pet.breed}s require ${groomingFreq} brushing. ${pet.type === 'dog' ? 'Check ears weekly and trim nails monthly.' : 'Daily brushing prevents matting and reduces shedding.'} ${currentSeason === 'spring' ? 'Shedding season - brush more frequently!' : currentSeason === 'summer' ? 'Consider a summer trim for comfort.' : 'Regular grooming maintains healthy coat.'}`,
        aiGenerated: true
      });

      // Health Monitoring
      const lastCheckupDate = new Date(pet.lastCheckup);
      const daysSinceCheckup = Math.floor((currentDate - lastCheckupDate) / (1000 * 60 * 60 * 24));
      tips.push({
        id: `health-${pet.id}`,
        petName: pet.name,
        petType: pet.type,
        icon: FaHeartbeat,
        color: 'green',
        title: `${pet.name}'s Health Monitoring`,
        tip: `Last checkup was ${daysSinceCheckup} days ago. ${daysSinceCheckup > 365 ? 'Annual checkup is overdue!' : daysSinceCheckup > 180 ? 'Consider scheduling next checkup soon.' : 'Health checkup is up to date.'} ${petAge > 7 ? 'Senior pets need bi-annual checkups.' : 'Watch for changes in appetite, energy, or behavior.'} Vaccinations: ${pet.vaccinations}.`,
        aiGenerated: true
      });

      // Behavioral & Training Tips
      if (pet.type === 'dog') {
        tips.push({
          id: `training-${pet.id}`,
          petName: pet.name,
          petType: pet.type,
          icon: FaBrain,
          color: 'purple',
          title: `${pet.name}'s Training Focus`,
          tip: `${petAge < 2 ? 'Young dogs benefit from basic obedience training and socialization.' : petAge < 5 ? 'Perfect age for advanced training and new tricks.' : 'Maintain mental stimulation with puzzle games.'} ${pet.breed === 'Golden Retriever' ? 'Retrievers excel at fetch and water activities.' : pet.breed === 'Labrador' ? 'Labs love learning new commands and tasks.' : 'Consistent positive reinforcement works best.'}`,
          aiGenerated: true
        });
      }

      // Seasonal Care Tips
      tips.push({
        id: `seasonal-${pet.id}`,
        petName: pet.name,
        petType: pet.type,
        icon: FaThermometerHalf,
        color: 'green',
        title: `${currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Care for ${pet.name}`,
        tip: getSeasonalTip(pet, currentSeason),
        aiGenerated: true
      });
    });

    // Multi-pet household tips
    if (pets.length > 1) {
      tips.push({
        id: 'multi-pet-harmony',
        petName: 'All Pets',
        petType: 'general',
        icon: FaHeart,
        color: 'pink',
        title: 'Multi-Pet Household Harmony',
        tip: `Managing ${pets.length} pets requires individual attention and resources. Ensure separate feeding areas, provide multiple water sources, and create individual safe spaces. ${pets.some(p => p.type === 'dog') && pets.some(p => p.type === 'cat') ? 'Dogs and cats can coexist peacefully with proper introduction and supervision.' : 'Similar pets may compete for attention - rotate one-on-one time.'}`,
        aiGenerated: true
      });

      tips.push({
        id: 'multi-pet-schedule',
        petName: 'All Pets',
        petType: 'general',
        icon: FaClock,
        color: 'purple',
        title: 'Daily Routine Management',
        tip: `With multiple pets, establish consistent daily routines. ${currentHour < 8 ? 'Morning feeding time approaching!' : currentHour < 12 ? 'Mid-morning activity time.' : currentHour < 18 ? 'Afternoon play session recommended.' : 'Evening wind-down time.'} Stagger activities to give each pet individual attention and prevent overwhelming.`,
        aiGenerated: true
      });
    }

    return tips.slice(0, 9); // Limit to 9 tips for better UI
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const getSeasonalTip = (pet, season) => {
    const seasonTips = {
      spring: `Spring is shedding season for ${pet.name}! Increase brushing frequency and watch for seasonal allergies. Perfect time for outdoor activities and fresh air.`,
      summer: `Keep ${pet.name} cool and hydrated. ${pet.type === 'dog' ? 'Avoid hot pavement and provide shade during walks.' : 'Ensure cool indoor spaces and fresh water.'} Never leave pets in cars.`,
      fall: `Prepare ${pet.name} for cooler weather. ${pet.type === 'dog' ? 'Consider a light jacket for short-haired breeds.' : 'Indoor cats may become more active as temperatures drop.'} Check heating systems are pet-safe.`,
      winter: `Winter care for ${pet.name}: ${pet.type === 'dog' ? 'Protect paws from salt and ice, limit outdoor time in extreme cold.' : 'Provide warm sleeping areas and maintain indoor humidity.'} Watch for dry skin and static.`
    };
    return seasonTips[season];
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
    },
  ];

  return (
    <UserLayout>
      <div className="space-y-4">
        {/* Modern Header with Dynamic Greeting */}
        {/* <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-3xl p-8 border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-500"> */}
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
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {getGreeting()}
                  </h1>
                  <p className="text-gray-600 text-lg">Your furry friends are excited to see you!</p>
                  <div className="flex items-center gap-2 mt-1">
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
              {/* Advertisement Section */}
              <div className="hidden md:flex items-center gap-4">
                {/* Premium Pet Food Ad */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <FaBone className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-800">Premium Pet Food</div>
                      <div className="text-xs text-green-600">20% OFF Today!</div>
                    </div>
                  </div>
                </div>

                {/* Vet Services Ad */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <FaStethoscope className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-800">Vet Checkup</div>
                      <div className="text-xs text-blue-600">Book Now!</div>
                    </div>
                  </div>
                </div>

                {/* Pet Toys Ad */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <FaStar className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-purple-800">New Toys</div>
                      <div className="text-xs text-purple-600">Free Shipping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}

        {/* Compact Quick Actions Overview */}
        {/* <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-4 border border-pink-100 shadow-md hover:shadow-lg transition-all duration-300"> */}
          {/* <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              
            </div>
            
          </div> */}
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <button 
              onClick={() => navigate('/user/pets/add')}
              className="group bg-white rounded-xl p-3 text-center border border-pink-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-pink-200"
            >
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                <PetIcon type="dog" className="text-pink-600 text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Add Pet</h3>
            </button>
            
            <button 
              onClick={() => navigate('/user/appointments/new')}
              className="group bg-white rounded-xl p-3 text-center border border-purple-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-purple-200"
            >
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                <FaCalendarCheck className="text-purple-600 text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Book Service</h3>
            </button>
            
            <button 
              onClick={() => navigate('/user/marketplace')}
              className="group bg-white rounded-xl p-3 text-center border border-blue-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-blue-200"
            >
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                <FaShoppingCart className="text-blue-600 text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Shop</h3>
            </button>
            
            <button 
              onClick={() => {
                setShowAIPopup(true);
                // Set active service to suggestions when opening AI Care
                setActiveService('suggestions');
              }}
              className="group bg-white rounded-xl p-3 text-center border border-green-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-green-200"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                <FaHeart className="text-green-600 text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">AI Care</h3>
            </button>
            
            <button 
              onClick={() => {
                setShowAIPopup(true);
                // Set active service to symptom-checker when opening Symptom Checker
                setActiveService('symptom-checker');
              }}
              className="group bg-white rounded-xl p-3 text-center border border-red-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-red-200"
            >
              <div className="bg-gradient-to-br from-red-100 to-red-200 w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                <FaStethoscope className="text-red-600 text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Symptom Checker</h3>
            </button>
          </div>
        {/* </div> */}

        {/* Main Content Grid with Enhanced Styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Left Column - Pet Health Cards */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-50">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-500 to-red-500 p-2 rounded-xl">
                  <FaHeart className="text-white text-lg" />
                </div>
                My Pets Health
                <div className="ml-auto bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {pets.length} pets
                </div>
              </h2>
              <div className="space-y-3">
                {pets.map((pet) => (
                  <div key={pet.id} className="transform hover:scale-105 transition-transform duration-200">
                    <PetHealthCard pet={pet} />
                  </div>
                ))}
              </div>
            </div>


          </div>



          {/* Middle Column - Schedule and Reminders */}
          <div className="lg:col-span-1 space-y-3">
            {/* Today's Schedule */}
            <UpcomingSchedule />

            {/* Care Reminders */}
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-50">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
                  <FaBell className="text-white text-lg" />
                </div>
                Care Reminders
                <div className="ml-auto bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Upcoming
                </div>
              </h2>
              <CareReminders pets={pets} />
            </div>

          </div>

          {/* Right Column - Pet Activity Tracker */}
          <div className="lg:col-span-1 space-y-3">
            {/* Enhanced Pet Activity Tracker with Carousel */}
            <PetActivityTracker />

            {/* Enhanced Smart Insights */}
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-50">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-xl">
                  <FaChartLine className="text-white text-lg" />
                </div>
                Smart Insights
                <div className="ml-auto bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  AI Powered
                </div>
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-green-800">Health Status</span>
                  </div>
                  <p className="text-sm text-green-700">All pets are healthy and up-to-date with vaccinations</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-blue-800">Activity Trend</span>
                  </div>
                  <p className="text-sm text-blue-700">Exercise levels are optimal for {pets.length} pets this week</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-purple-800">Care Reminder</span>
                  </div>
                  <p className="text-sm text-purple-700">Next grooming session recommended in 2 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="space-y-4">


          {/* AI-Powered Pet Care Tips */}
          <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 rounded-3xl p-8 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-4 rounded-2xl shadow-lg">
                  <FaRobot className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    AI Pet Care Tips
                  </h2>
                  <p className="text-gray-600 mt-1">Personalized recommendations for your pets 🤖</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <FaMagic className="text-orange-500 text-sm animate-pulse" />
                <span className="text-sm font-medium text-gray-700">AI Generated</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getAIPetCareTips().map((tip) => {
                const IconComponent = tip.icon;
                const colorClasses = {
                  pink: {
                    bg: 'from-pink-100 to-pink-200',
                    text: 'text-pink-600',
                    border: 'hover:border-pink-200',
                    gradient: 'from-pink-400 to-pink-600'
                  },
                  purple: {
                    bg: 'from-purple-100 to-purple-200',
                    text: 'text-purple-600',
                    border: 'hover:border-purple-200',
                    gradient: 'from-purple-400 to-purple-600'
                  },
                  green: {
                    bg: 'from-green-100 to-green-200',
                    text: 'text-green-600',
                    border: 'hover:border-green-200',
                    gradient: 'from-green-400 to-green-600'
                  }
                };
                const colors = colorClasses[tip.color];
                
                return (
                  <div key={tip.id} className={`group bg-white rounded-2xl p-6 shadow-lg border border-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 ${colors.border}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`bg-gradient-to-br ${colors.bg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`${colors.text} text-xl`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-sm">{tip.title}</h3>
                          {tip.aiGenerated && (
                            <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                              AI
                            </div>
                          )}
                        </div>
                        <div className={`w-12 h-1 bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{tip.tip}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">For: {tip.petName}</span>
                      <div className={`flex items-center ${colors.text} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                        <span className="text-xs">Learn more</span>
                        <FaArrowRight className="ml-2 text-xs" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => {
              setShowAIPopup(true);
              setActiveService('suggestions');
            }}
            className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
            title="AI Pet Care"
          >
            <div className="relative">
              <FaHeart className="text-2xl" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              AI Pet Care
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </button>
        </div>

        {/* AI Assistant Popup */}
        <AIAssistantPopup 
          isOpen={showAIPopup}
          onClose={() => setShowAIPopup(false)}
          pets={pets}
          initialActiveService={activeService}
        />
      </div>
    </UserLayout>
  );
};

export default UserDashboard;