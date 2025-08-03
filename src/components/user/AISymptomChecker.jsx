import React, { useState } from 'react';
import { FaRobot, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaStethoscope, FaEye, FaHome, FaHospital } from 'react-icons/fa';
import { analyzePetSymptoms } from '../../services/geminiService';

const AISymptomChecker = ({ selectedPet }) => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Common pet symptoms
  const commonSymptoms = [
    'Vomiting', 'Diarrhea', 'Loss of appetite', 'Lethargy', 'Excessive thirst',
    'Frequent urination', 'Difficulty breathing', 'Coughing', 'Sneezing',
    'Limping', 'Scratching excessively', 'Hair loss', 'Bad breath',
    'Drooling', 'Hiding or unusual behavior', 'Fever', 'Shaking or trembling',
    'Difficulty walking', 'Swollen areas', 'Discharge from eyes or nose',
    'Constipation', 'Bloated stomach', 'Pale gums', 'Yellow eyes or gums',
    'Seizures', 'Loss of balance', 'Excessive panting', 'Restlessness'
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

  const getUrgencyIcon = (level) => {
    switch (level) {
      case 'emergency':
        return <FaTimesCircle className="text-red-500" />;
      case 'urgent':
        return <FaExclamationTriangle className="text-orange-500" />;
      case 'moderate':
        return <FaInfoCircle className="text-yellow-500" />;
      case 'mild':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const getUrgencyBgColor = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-200';
      case 'orange':
        return 'bg-orange-50 border-orange-200';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200';
      case 'green':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const reset = () => {
    setSymptoms('');
    setSelectedSymptoms([]);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="space-y-6">

      {!selectedPet ? (
        <div className="text-center py-8">
          <FaStethoscope className="text-gray-300 text-4xl mx-auto mb-4" />
          <p className="text-gray-500">Please select a pet to use the symptom checker</p>
        </div>
      ) : (
        <div className="space-y-6">
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
              placeholder="Describe any other symptoms, behaviors, or concerns you've noticed..."
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
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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
              onClick={reset}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Reset
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <FaTimesCircle />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4">
              {/* Urgency Level */}
              <div className={`rounded-lg p-4 border ${getUrgencyBgColor(analysis.urgencyColor)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {getUrgencyIcon(analysis.urgencyLevel)}
                  <h3 className="font-semibold text-gray-800 capitalize">
                    {analysis.urgencyLevel} Priority
                  </h3>
                </div>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              {/* Vet Visit Recommendation */}
              {analysis.vetVisit && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaHospital className="text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Veterinary Consultation</h3>
                  </div>
                  <p className="text-blue-700 mb-2">
                    <strong>Recommended:</strong> {analysis.vetVisit.recommended ? 'Yes' : 'No'}
                  </p>
                  <p className="text-blue-700 mb-2">
                    <strong>Timeframe:</strong> {analysis.vetVisit.timeframe}
                  </p>
                  <p className="text-blue-700">{analysis.vetVisit.reason}</p>
                </div>
              )}

              {/* Possible Causes */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaEye className="text-gray-600" />
                  Possible Causes
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.possibleCauses?.map((cause, index) => (
                    <li key={index} className="text-gray-700">{cause}</li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Immediate Actions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.recommendations?.immediate?.map((action, index) => (
                      <li key={index} className="text-green-700 text-sm">{action}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Monitor For</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.recommendations?.monitoring?.map((item, index) => (
                      <li key={index} className="text-yellow-700 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Home Care Tips */}
              {analysis.homeCareTips && analysis.homeCareTips.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <FaHome className="text-purple-600" />
                    Home Care Tips
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.homeCareTips.map((tip, index) => (
                      <li key={index} className="text-purple-700 text-sm">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Red Flags */}
              {analysis.redFlags && analysis.redFlags.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-600" />
                    Seek Immediate Help If You Notice
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.redFlags.map((flag, index) => (
                      <li key={index} className="text-red-700 text-sm font-medium">{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <p className="text-xs text-gray-600 italic">
                  <strong>Disclaimer:</strong> {analysis.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISymptomChecker;