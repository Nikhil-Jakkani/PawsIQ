import React, { useState, useEffect } from 'react';
import { FaRobot, FaPaw, FaArrowLeft, FaStethoscope, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserLayout from '../../components/layout/UserLayout';
import AIPetCareSuggestions from '../../components/user/AIPetCareSuggestions';
import AISymptomChecker from '../../components/user/AISymptomChecker';
import PetSelector from '../../components/user/PetSelector';

const API_URL = import.meta?.env?.VITE_API_URL || '/api/v1';

const AIPetCare = () => {
  const [selectedPetForAI, setSelectedPetForAI] = useState(null);
  const [activeTab, setActiveTab] = useState('suggestions');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem('pawsiq_user'));
        const token = user?.tokens?.access?.token;

        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        // helper to fetch profile with provided access token
        const getProfile = async (access) => {
          return fetch(`${API_URL}/user/profile`, {
            headers: {
              'Authorization': `Bearer ${access}`,
            },
          });
        };

        let response = await getProfile(token);

        // Attempt a one-time silent refresh if unauthorized
        if (response.status === 401) {
          const refreshToken = user?.tokens?.refresh?.token;
          if (refreshToken) {
            const refreshResp = await fetch(`${API_URL}/user/auth/refresh-tokens`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });
            if (refreshResp.ok) {
              const newTokens = await refreshResp.json();
              const updatedUser = { ...user, tokens: newTokens };
              localStorage.setItem('pawsiq_user', JSON.stringify(updatedUser));
              response = await getProfile(newTokens?.access?.token);
            }
          }
        }

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Your session has expired. Please log out and log in again.');
          }
          throw new Error('Failed to fetch user profile.');
        }

        const userData = await response.json();
        const userPets = userData.pets || [];
        setPets(userPets);

        if (userPets.length > 0 && !selectedPetForAI) {
          setSelectedPetForAI(userPets[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, []);

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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-red-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FaStethoscope className="text-red-600 text-lg" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Symptom Analysis</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 text-xl">🏥</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Health Monitoring</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
              <div className="bg-purple-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <span className="text-purple-600 text-xl">✂️</span>
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
        {loading && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Loading your pets...</p>
          </div>
        )}
        {error && (
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && (
          <PetSelector 
            pets={pets}
            selectedPet={selectedPetForAI}
            onPetSelect={(pet) => {
            setSelectedPetForAI(pet);
          }}
          />
        )}

        {/* AI Services Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'suggestions'
                    ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaHeart className="text-lg" />
                  <span>Care Suggestions</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('symptom-checker')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'symptom-checker'
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaStethoscope className="text-lg" />
                  <span>Symptom Checker</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'suggestions' && (
              <AIPetCareSuggestions selectedPet={selectedPetForAI} />
            )}
            {activeTab === 'symptom-checker' && (
              <AISymptomChecker selectedPet={selectedPetForAI} />
            )}
          </div>
        </div>

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