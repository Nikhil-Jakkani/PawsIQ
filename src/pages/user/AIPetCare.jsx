import React, { useState } from 'react';
import { FaRobot, FaPaw, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserLayout from '../../components/layout/UserLayout';
import AIPetCareSuggestions from '../../components/user/AIPetCareSuggestions';
import PetSelector from '../../components/user/PetSelector';

const AIPetCare = () => {
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
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'dog',
      breed: 'Labrador',
      age: '5 years',
      weight: '70 lbs',
      gender: 'male',
      birthday: '2020-03-20',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFicmFkb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      lastCheckup: '2025-03-10',
      vaccinations: 'Due for boosters'
    }
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link 
                to="/user/dashboard"
                className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
              >
                <FaArrowLeft />
              </Link>
              <div className="bg-pink-100 p-2 rounded-lg">
                <FaRobot className="text-pink-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">AI Pet Care Assistant</h1>
            </div>
            <p className="text-gray-500 ml-16">
              Get personalized care recommendations powered by artificial intelligence
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
          <h2 className="text-lg font-semibold text-pink-900 mb-4 flex items-center gap-2">
            <FaPaw className="text-pink-600" />
            What Our AI Can Help With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-red-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-red-600 text-xl">🏥</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Health Monitoring</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 text-xl">✂️</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Grooming Care</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-green-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-green-600 text-xl">💉</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Vaccination Schedule</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-orange-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-orange-600 text-xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Nutrition Planning</h3>
            </div>
          </div>
        </div>

        {/* Pet Selector */}
        <PetSelector 
          pets={pets}
          selectedPet={selectedPetForAI}
          onPetSelect={setSelectedPetForAI}
        />

        {/* AI Suggestions */}
        <AIPetCareSuggestions selectedPet={selectedPetForAI} />

        {/* Additional Information */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Select Your Pet</h3>
              <p className="text-blue-700 text-sm">Choose the pet you want recommendations for from your profile</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">AI Analysis</h3>
              <p className="text-blue-700 text-sm">Our AI analyzes your pet's breed, age, health history, and more</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Get Recommendations</h3>
              <p className="text-blue-700 text-sm">Receive personalized care suggestions across multiple categories</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AIPetCare;