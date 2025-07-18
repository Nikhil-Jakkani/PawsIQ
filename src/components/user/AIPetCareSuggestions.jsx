import React, { useState, useEffect } from 'react';
import { 
  FaRobot, 
  FaHeartbeat, 
  FaCut, 
  FaSyringe, 
  FaUtensils, 
  FaRunning, 
  FaBrain, 
  FaShieldAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaSyncAlt,
  FaChevronDown,
  FaChevronUp,
  FaTable,
  FaList
} from 'react-icons/fa';
import { generatePetCareSuggestions } from '../../services/geminiService';
import PetCareTable from './PetCareTable';

const AIPetCareSuggestions = ({ selectedPet }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    health: true,
    grooming: false,
    vaccinations: false,
    nutrition: false,
    exercise: false,
    behavioral: false,
    preventive: false
  });

  const categoryIcons = {
    health: { icon: FaHeartbeat, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    grooming: { icon: FaCut, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    vaccinations: { icon: FaSyringe, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    nutrition: { icon: FaUtensils, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    exercise: { icon: FaRunning, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    behavioral: { icon: FaBrain, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    preventive: { icon: FaShieldAlt, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' }
  };

  const categoryTitles = {
    health: 'Health Recommendations',
    grooming: 'Grooming Care',
    vaccinations: 'Vaccination Schedule',
    nutrition: 'Nutrition Plan',
    exercise: 'Exercise & Activity',
    behavioral: 'Behavioral Care',
    preventive: 'Preventive Care'
  };

  const fetchSuggestions = async () => {
    if (!selectedPet) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const aiSuggestions = await generatePetCareSuggestions(selectedPet);
      setSuggestions(aiSuggestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [selectedPet]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderRecommendationItem = (item, index) => (
    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
      <FaStar className="text-yellow-500 mt-1 flex-shrink-0" size={10} />
      <span>{item}</span>
    </li>
  );

  const renderCategoryContent = (category, data) => {
    const { icon: Icon, color, bg, border } = categoryIcons[category];
    
    return (
      <div key={category} className={`border rounded-lg ${border} ${bg} overflow-hidden`}>
        <button
          onClick={() => toggleSection(category)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-opacity-80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white ${border}`}>
              <Icon className={color} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">{categoryTitles[category]}</h3>
              {category === 'health' && data.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(data.priority)}`}>
                  {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)} Priority
                </span>
              )}
            </div>
          </div>
          {expandedSections[category] ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {expandedSections[category] && (
          <div className="px-4 pb-4 bg-white bg-opacity-50">
            {/* Main recommendations */}
            {data.recommendations && data.recommendations.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {data.recommendations.map(renderRecommendationItem)}
                </ul>
              </div>
            )}
            
            {/* Category-specific content */}
            {category === 'health' && (
              <>
                {data.nextCheckup && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span><strong>Next Checkup:</strong> {data.nextCheckup}</span>
                  </div>
                )}
              </>
            )}
            
            {category === 'grooming' && (
              <>
                {data.frequency && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock className="text-blue-500" />
                    <span><strong>Frequency:</strong> {data.frequency}</span>
                  </div>
                )}
                {data.specialCare && data.specialCare.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Special Care:</h4>
                    <ul className="space-y-1">
                      {data.specialCare.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            {category === 'vaccinations' && (
              <>
                {data.schedule && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaCalendarAlt className="text-green-500" />
                    <span><strong>Schedule:</strong> {data.schedule}</span>
                  </div>
                )}
                {data.upcoming && data.upcoming.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Upcoming Vaccines:</h4>
                    <ul className="space-y-1">
                      {data.upcoming.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
                {data.boosters && data.boosters.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Boosters:</h4>
                    <ul className="space-y-1">
                      {data.boosters.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            {category === 'nutrition' && (
              <>
                {data.dailyCalories && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaUtensils className="text-orange-500" />
                    <span><strong>Daily Calories:</strong> {data.dailyCalories}</span>
                  </div>
                )}
                {data.feedingSchedule && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock className="text-orange-500" />
                    <span><strong>Feeding Schedule:</strong> {data.feedingSchedule}</span>
                  </div>
                )}
              </>
            )}
            
            {category === 'exercise' && (
              <>
                {data.duration && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaClock className="text-purple-500" />
                    <span><strong>Duration:</strong> {data.duration}</span>
                  </div>
                )}
                {data.activities && data.activities.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Recommended Activities:</h4>
                    <ul className="space-y-1">
                      {data.activities.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            {category === 'behavioral' && (
              <>
                {data.training && data.training.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Training Tips:</h4>
                    <ul className="space-y-1">
                      {data.training.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
                {data.enrichment && data.enrichment.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Enrichment Activities:</h4>
                    <ul className="space-y-1">
                      {data.enrichment.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
              </>
            )}
            
            {category === 'preventive' && (
              <>
                {data.seasonalCare && data.seasonalCare.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Seasonal Care:</h4>
                    <ul className="space-y-1">
                      {data.seasonalCare.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
                {data.emergencyTips && data.emergencyTips.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800 mb-1">Emergency Tips:</h4>
                    <ul className="space-y-1">
                      {data.emergencyTips.map(renderRecommendationItem)}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!selectedPet) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
        <div className="text-center py-8">
          <FaRobot className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Pet</h3>
          <p className="text-gray-500">Choose a pet to get AI-powered care recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-pink-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <FaRobot className="text-pink-600 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                AI Care Recommendations for {selectedPet.name}
              </h2>
              <p className="text-sm text-gray-600">
                Personalized suggestions powered by AI
              </p>
            </div>
          </div>
          <button
            onClick={fetchSuggestions}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors disabled:opacity-50"
          >
            <FaSyncAlt className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading && (
          <div className="text-center py-8">
            <FaSpinner className="text-pink-600 text-3xl mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Generating Recommendations</h3>
            <p className="text-gray-500">Our AI is analyzing {selectedPet.name}'s profile...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <FaExclamationTriangle />
              <span className="font-medium">Error generating recommendations</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={fetchSuggestions}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {suggestions && !loading && (
          <div className="space-y-4">
            {Object.entries(suggestions).map(([category, data]) => 
              renderCategoryContent(category, data)
            )}
            
            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="text-yellow-600 mt-1 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Disclaimer</p>
                  <p>
                    These AI-generated recommendations are for informational purposes only and should not replace professional veterinary advice. 
                    Always consult with a qualified veterinarian for your pet's specific health needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPetCareSuggestions;