import React, { useState, useEffect } from 'react';
import { FaTimes, FaRobot, FaStethoscope, FaHeart, FaPaw, FaSpinner } from 'react-icons/fa';
import { analyzePetSymptoms } from '../../services/geminiService';

const AIAssistantPopup = ({ isOpen, onClose, pets, initialActiveService = 'suggestions' }) => {
  const [activeService, setActiveService] = useState(initialActiveService);
  const [selectedPet, setSelectedPet] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update activeService when initialActiveService prop changes
  useEffect(() => {
    setActiveService(initialActiveService);
  }, [initialActiveService]);

  // Common pet symptoms
  const commonSymptoms = [
    'Vomiting', 'Diarrhea', 'Loss of appetite', 'Lethargy', 'Excessive thirst',
    'Frequent urination', 'Difficulty breathing', 'Coughing', 'Sneezing',
    'Limping', 'Scratching excessively', 'Hair loss', 'Bad breath',
    'Drooling', 'Hiding or unusual behavior', 'Fever', 'Shaking or trembling'
  ];

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (!selectedPet) {
      setError('Please select a pet first');
      return;
    }

    const allSymptoms = [...selectedSymptoms];
    if (symptoms.trim()) {
      allSymptoms.push(symptoms.trim());
    }

    if (allSymptoms.length === 0) {
      setError('Please describe or select at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzePetSymptoms(selectedPet, allSymptoms.join(', '));
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSymptoms('');
    setSelectedSymptoms([]);
    setAnalysis(null);
    setError(null);
    setSelectedPet(null);
    setActiveService('suggestions');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const generateCareSuggestions = () => {
    if (!selectedPet) return [];

    const suggestions = [];
    const currentDate = new Date();
    const currentSeason = getCurrentSeason();
    const currentHour = currentDate.getHours();
    const petAge = parseInt(selectedPet.age);
    const petWeight = parseInt(selectedPet.weight);
    
    // Exercise & Activity
    if (selectedPet.type === 'dog') {
      const exerciseTime = selectedPet.breed === 'Golden Retriever' ? '90-120' : 
                          selectedPet.breed === 'Labrador' ? '60-90' : '45-60';
      suggestions.push({
        title: `${selectedPet.name}'s Exercise Plan`,
        tip: `${selectedPet.breed}s need ${exerciseTime} minutes of exercise daily. ${currentSeason === 'summer' ? 'Exercise during cooler hours to prevent overheating.' : currentSeason === 'winter' ? 'Indoor activities and shorter walks recommended.' : 'Perfect weather for outdoor activities!'}`,
        category: 'Exercise',
        color: 'bg-blue-50 border-blue-200 text-blue-800'
      });
    } else if (selectedPet.type === 'cat') {
      suggestions.push({
        title: `${selectedPet.name}'s Activity Time`,
        tip: `${selectedPet.breed} cats are ${petAge < 3 ? 'young and energetic' : petAge > 7 ? 'mature - gentle activities recommended' : 'in their prime'}. Provide 15-20 minutes of interactive play ${currentHour < 12 ? 'this morning' : currentHour < 18 ? 'this afternoon' : 'this evening'}.`,
        category: 'Activity',
        color: 'bg-purple-50 border-purple-200 text-purple-800'
      });
    }

    // Nutrition
    const feedingSchedule = selectedPet.type === 'dog' ? (petAge < 1 ? '3-4 times daily' : '2 times daily') : 
                           selectedPet.type === 'cat' ? (petAge < 1 ? '3-4 times daily' : '2-3 times daily') : '2 times daily';
    suggestions.push({
      title: `${selectedPet.name}'s Nutrition`,
      tip: `For a ${petAge}-year-old ${selectedPet.breed} weighing ${selectedPet.weight}, feed ${feedingSchedule}. ${petWeight > 70 ? 'Monitor portions to maintain healthy weight.' : petWeight < 10 ? 'Small frequent meals are ideal.' : 'Current weight seems optimal.'}`,
      category: 'Nutrition',
      color: 'bg-green-50 border-green-200 text-green-800'
    });

    // Grooming
    const groomingFreq = selectedPet.type === 'dog' ? (selectedPet.breed.includes('Retriever') ? 'weekly' : 'bi-weekly') : 'daily';
    suggestions.push({
      title: `${selectedPet.name}'s Grooming`,
      tip: `${selectedPet.breed}s require ${groomingFreq} brushing. ${selectedPet.type === 'dog' ? 'Check ears weekly and trim nails monthly.' : 'Daily brushing prevents matting.'} ${currentSeason === 'spring' ? 'Shedding season - brush more frequently!' : 'Regular grooming maintains healthy coat.'}`,
      category: 'Grooming',
      color: 'bg-pink-50 border-pink-200 text-pink-800'
    });

    // Health Monitoring
    if (selectedPet.lastCheckup) {
      const lastCheckupDate = new Date(selectedPet.lastCheckup);
      const daysSinceCheckup = Math.floor((currentDate - lastCheckupDate) / (1000 * 60 * 60 * 24));
      suggestions.push({
        title: `${selectedPet.name}'s Health Check`,
        tip: `Last checkup was ${daysSinceCheckup} days ago. ${daysSinceCheckup > 365 ? 'Annual checkup is overdue!' : daysSinceCheckup > 180 ? 'Consider scheduling next checkup soon.' : 'Health checkup is up to date.'} ${petAge > 7 ? 'Senior pets need bi-annual checkups.' : 'Monitor for changes in behavior or appetite.'}`,
        category: 'Health',
        color: 'bg-red-50 border-red-200 text-red-800'
      });
    }

    // Training (for dogs)
    if (selectedPet.type === 'dog') {
      suggestions.push({
        title: `${selectedPet.name}'s Training`,
        tip: `${petAge < 2 ? 'Young dogs benefit from basic obedience and socialization.' : petAge < 5 ? 'Perfect age for advanced training and new tricks.' : 'Maintain mental stimulation with puzzle games.'} ${selectedPet.breed === 'Golden Retriever' ? 'Retrievers excel at fetch and water activities.' : 'Consistent positive reinforcement works best.'}`,
        category: 'Training',
        color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
      });
    }

    // Seasonal Care
    suggestions.push({
      title: `${currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Care`,
      tip: getSeasonalTip(selectedPet, currentSeason),
      category: 'Seasonal',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    });

    return suggestions;
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
      spring: `Spring shedding season for ${pet.name}! Increase brushing and watch for allergies. Great time for outdoor activities.`,
      summer: `Keep ${pet.name} cool and hydrated. ${pet.type === 'dog' ? 'Avoid hot pavement during walks.' : 'Ensure cool indoor spaces.'} Never leave pets in cars.`,
      fall: `Prepare ${pet.name} for cooler weather. ${pet.type === 'dog' ? 'Consider a jacket for short-haired breeds.' : 'Indoor cats may become more active.'} Check heating systems.`,
      winter: `Winter care: ${pet.type === 'dog' ? 'Protect paws from salt and ice.' : 'Provide warm sleeping areas.'} Watch for dry skin and maintain humidity.`
    };
    return seasonTips[season];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                {activeService === 'suggestions' ? (
                  <FaHeart className="text-2xl" />
                ) : (
                  <FaStethoscope className="text-2xl" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {activeService === 'suggestions' ? 'AI Pet Care' : 'Pet Symptom Checker'}
                </h2>
                <p className="text-pink-100">
                  {activeService === 'suggestions' 
                    ? 'Smart care suggestions for your furry friends' 
                    : 'AI-powered health analysis for your pets'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Service Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveService('suggestions')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeService === 'suggestions'
                    ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaHeart />
                  <span>AI Care</span>
                </div>
              </button>
              <button
                onClick={() => setActiveService('symptom-checker')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeService === 'symptom-checker'
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaStethoscope />
                  <span>Symptom Checker</span>
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Pet Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Your Pet</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pets.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPet?.id === pet.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-gray-800">{pet.name}</div>
                        <div className="text-sm text-gray-500">{pet.breed}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Content */}
            {activeService === 'suggestions' && selectedPet && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaPaw className="text-pink-600" />
                  Personalized Care Tips for {selectedPet.name}
                </h3>
                <div className="grid gap-4">
                  {generateCareSuggestions().map((suggestion, index) => (
                    <div key={index} className={`rounded-xl p-4 border ${suggestion.color}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <span className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded-full">
                          {suggestion.category}
                        </span>
                      </div>
                      <p className="text-sm">{suggestion.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeService === 'symptom-checker' && (
              <div className="space-y-6">
                {!selectedPet ? (
                  <div className="text-center py-8">
                    <FaStethoscope className="text-gray-300 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500">Please select a pet to use the symptom checker</p>
                  </div>
                ) : (
                  <>
                    {/* Selected Pet Info */}
                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                      <h3 className="font-medium text-red-900 mb-2">Analyzing symptoms for:</h3>
                      <div className="flex items-center gap-3">
                        <img 
                          src={selectedPet.image} 
                          alt={selectedPet.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-red-800">{selectedPet.name}</p>
                          <p className="text-sm text-red-600">{selectedPet.breed} • {selectedPet.age}</p>
                        </div>
                      </div>
                    </div>

                    {/* Common Symptoms */}
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Common Symptoms (select all that apply):</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonSymptoms.map((symptom) => (
                          <button
                            key={symptom}
                            onClick={() => handleSymptomToggle(symptom)}
                            className={`text-sm p-2 rounded-lg border transition-colors ${
                              selectedSymptoms.includes(symptom)
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Symptoms */}
                    <div>
                      <label className="block font-medium text-gray-800 mb-2">
                        Additional Symptoms or Details:
                      </label>
                      <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Describe any other symptoms, behaviors, or concerns..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        rows="3"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <FaRobot />
                            Analyze Symptoms
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSymptoms('');
                          setSelectedSymptoms([]);
                          setAnalysis(null);
                          setError(null);
                        }}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Reset
                      </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    )}

                    {/* Analysis Results */}
                    {analysis && (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
                          <h3 className="font-semibold text-red-800 mb-2 capitalize">
                            {analysis.urgencyLevel} Priority
                          </h3>
                          <p className="text-red-700">{analysis.summary}</p>
                        </div>

                        {analysis.vetVisit && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">Veterinary Consultation</h3>
                            <p className="text-blue-700 mb-1">
                              <strong>Recommended:</strong> {analysis.vetVisit.recommended ? 'Yes' : 'No'}
                            </p>
                            <p className="text-blue-700 mb-1">
                              <strong>Timeframe:</strong> {analysis.vetVisit.timeframe}
                            </p>
                            <p className="text-blue-700">{analysis.vetVisit.reason}</p>
                          </div>
                        )}

                        {analysis.recommendations?.immediate && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="font-semibold text-green-800 mb-2">Immediate Actions</h3>
                            <ul className="list-disc list-inside space-y-1">
                              {analysis.recommendations.immediate.map((action, index) => (
                                <li key={index} className="text-green-700 text-sm">{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeService === 'suggestions' && !selectedPet && (
              <div className="text-center py-8">
                <FaPaw className="text-gray-300 text-4xl mx-auto mb-4" />
                <p className="text-gray-500">Please select a pet to get personalized care suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPopup;