import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaShoppingCart, FaPaw, FaDog, FaCat, FaBone, FaRobot } from 'react-icons/fa';
import { PetIcon, PetIconButton } from '../../components/layout/PetIcons';
import UserStatCard from '../../components/user/UserStatCard';
import UserAppointments from '../../components/user/UserAppointments';
import PetProfiles from '../../components/user/PetProfiles';
import AIPetCareSuggestions from '../../components/user/AIPetCareSuggestions';
import PetSelector from '../../components/user/PetSelector';
import UserLayout from '../../components/layout/UserLayout';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedPetForAI, setSelectedPetForAI] = useState(null);

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
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-lg">
                <FaPaw className="text-pink-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">My Pet Dashboard</h1>
            </div>
            <p className="text-gray-500 mt-1">Welcome to your PawsIQ dashboard!</p>
          </div>
          
        </div>
      
        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 shadow-sm">
          <h2 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
            <FaPaw className="text-pink-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button 
              onClick={() => navigate('/user/pets/add')}
              className="bg-white rounded-lg p-4 text-center border border-pink-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-pink-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <PetIcon type="dog" className="text-pink-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Add a Pet</h3>
            </button>
            <button 
              onClick={() => navigate('/user/appointments/new')}
              className="bg-white rounded-lg p-4 text-center border border-pink-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FaCalendarCheck className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Book Service</h3>
            </button>
            <button 
              onClick={() => navigate('/user/marketplace')}
              className="bg-white rounded-lg p-4 text-center border border-pink-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FaShoppingCart className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Shop Products</h3>
            </button>
            <button 
              onClick={() => navigate('/user/services')}
              className="bg-white rounded-lg p-4 text-center border border-pink-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-green-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FaBone className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Find Services</h3>
            </button>
            <button 
              onClick={() => navigate('/user/ai-pet-care')}
              className="bg-white rounded-lg p-4 text-center border border-pink-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-indigo-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FaRobot className="text-indigo-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">AI Pet Care</h3>
            </button>
          </div>
        </div>
      
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserStatCard 
            title="My Pets" 
            value="2" 
            icon={<PetIcon type="paw" size="lg" className="text-white" />} 
            bgColor="bg-gradient-to-br from-pink-500 to-pink-600"
            linkText="Manage Pets"
            linkUrl="/user/pets"
          />
          <UserStatCard 
            title="Upcoming Appointments" 
            value="3" 
            icon={<PetIcon type="cat" size="lg" className="text-white" />} 
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            linkText="View All"
            linkUrl="/user/appointments"
          />
          <UserStatCard 
            title="Recent Orders" 
            value="1" 
            icon={<PetIcon type="dog" size="lg" className="text-white" />} 
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            linkText="Order History"
            linkUrl="/user/orders"
          />
        </div>
        
        {/* Pet Profiles
        <PetProfiles /> */}
        
        {/* Upcoming Appointments */}
        <UserAppointments />
        
        {/* AI Pet Care Suggestions */}
        <div className="space-y-6">
          <PetSelector 
            pets={pets}
            selectedPet={selectedPetForAI}
            onPetSelect={setSelectedPetForAI}
          />
          <AIPetCareSuggestions selectedPet={selectedPetForAI} />
        </div>
        
        {/* Pet Care Tips */}
        <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
          <h2 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
            <FaPaw className="text-pink-600" />
            Pet Care Tips of the Day
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-50">
              <div className="flex items-center gap-2 mb-2 text-pink-600">
                <FaDog />
                <h3 className="font-medium">Dogs</h3>
              </div>
              <p className="text-gray-600 text-sm">Regular exercise is crucial for a dog's physical and mental health. Aim for at least 30 minutes of activity daily.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-50">
              <div className="flex items-center gap-2 mb-2 text-pink-600">
                <FaCat />
                <h3 className="font-medium">Cats</h3>
              </div>
              <p className="text-gray-600 text-sm">Provide vertical spaces for cats to climb and perch. This satisfies their natural instinct to observe from heights.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-50">
              <div className="flex items-center gap-2 mb-2 text-pink-600">
                <PetIcon type="rabbit" />
                <h3 className="font-medium">Small Pets</h3>
              </div>
              <p className="text-gray-600 text-sm">Small pets need daily handling to stay socialized. Spend at least 15-20 minutes interacting with them each day.</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;