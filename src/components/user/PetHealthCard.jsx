import React, { useState } from 'react';
import { FaHeart, FaWeight, FaBirthdayCake, FaSyringe, FaStethoscope, FaCalendarCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const PetHealthCard = ({ pet }) => {
  const [showInsights, setShowInsights] = useState(false);
  
  const getHealthStatus = (pet) => {
    const today = new Date();
    const lastCheckup = new Date(pet.lastCheckup);
    const daysSinceCheckup = Math.floor((today - lastCheckup) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCheckup < 90) return { status: 'excellent', color: 'green', message: 'Great health!', score: 95 };
    if (daysSinceCheckup < 180) return { status: 'good', color: 'yellow', message: 'Checkup due soon', score: 75 };
    return { status: 'needs-attention', color: 'red', message: 'Checkup overdue', score: 50 };
  };

  const getHealthScore = (pet) => {
    const today = new Date();
    const lastCheckup = new Date(pet.lastCheckup);
    const daysSinceCheckup = Math.floor((today - lastCheckup) / (1000 * 60 * 60 * 24));
    
    // Base score calculation
    let score = 100;
    
    // Deduct points based on days since checkup
    if (daysSinceCheckup > 90) score -= Math.min(40, (daysSinceCheckup - 90) / 3);
    
    // Age factor (older pets might need more attention)
    const age = parseInt(pet.age);
    if (age > 7) score -= 5;
    if (age > 10) score -= 10;
    
    // Vaccination status
    if (pet.vaccinations !== 'Up to date') score -= 15;
    
    return Math.max(50, Math.round(score));
  };

  const healthStatus = getHealthStatus(pet);
  const healthScore = getHealthScore(pet);
  
  // Calculate days since checkup for insights
  const today = new Date();
  const lastCheckupDate = new Date(pet.lastCheckup);
  const daysSinceCheckup = Math.floor((today - lastCheckupDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Pet Image */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
            healthStatus.color === 'green' ? 'bg-green-400' : 
            healthStatus.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
          }`}>
            <FaHeart className="w-3 h-3 text-white m-auto mt-1" />
          </div>
        </div>

        {/* Pet Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
            <PetIcon type={pet.type} className={`text-lg ${pet.type === 'cat' ? 'text-purple-600' : 'text-pink-600'}`} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">{pet.age}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm font-medium text-gray-700">{pet.weight}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <p className="text-sm text-gray-600">{pet.breed}</p>
            <span className="text-gray-400">•</span>
            <p className="text-sm text-gray-600">Last checkup: {new Date(pet.lastCheckup).toLocaleDateString()}</p>
          </div>
          
          {/* Health Score Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Health Score</span>
              <span className="text-xs font-bold text-gray-800">{healthScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  healthScore >= 85 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                  healthScore >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${healthScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
            healthStatus.color === 'green' ? 'bg-green-100 text-green-800' :
            healthStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            <FaHeart />
            {healthStatus.message}
          </div>
        </div>
      </div>

      {/* Health Stats Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <FaSyringe className="text-sm" />
            <span className="text-xs font-medium">Vaccines</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{pet.vaccinations}</p>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <FaStethoscope className="text-sm" />
            <span className="text-xs font-medium">Last Checkup</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {new Date(pet.lastCheckup).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* View More Insights Button */}
      <div className="mt-4">
        <button 
          onClick={() => setShowInsights(!showInsights)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-lg p-3 border border-indigo-100 hover:border-indigo-200 transition-all duration-200"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-1.5 rounded-lg">
            <FaStethoscope className="text-white text-xs" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {showInsights ? 'Hide' : 'View'} AI Insights
          </span>
          <div className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
            AI
          </div>
          {showInsights ? 
            <FaChevronUp className="text-gray-500 text-sm ml-auto" /> : 
            <FaChevronDown className="text-gray-500 text-sm ml-auto" />
          }
        </button>
        
        {/* Pet Insights (Collapsible) */}
        {showInsights && (
          <div className="mt-3 space-y-2">
            {/* Health Status Insight */}
            <div className={`bg-gradient-to-r ${
              daysSinceCheckup < 90 ? 'from-green-50 to-emerald-50 border-green-100' : 
              daysSinceCheckup < 180 ? 'from-yellow-50 to-orange-50 border-yellow-100' : 
              'from-red-50 to-pink-50 border-red-100'
            } rounded-lg p-3 border`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 ${
                  daysSinceCheckup < 90 ? 'bg-green-400' : 
                  daysSinceCheckup < 180 ? 'bg-yellow-400' : 
                  'bg-red-400'
                } rounded-full animate-pulse`}></div>
                <span className={`font-semibold ${
                  daysSinceCheckup < 90 ? 'text-green-800' : 
                  daysSinceCheckup < 180 ? 'text-yellow-800' : 
                  'text-red-800'
                } text-sm flex items-center gap-2`}>
                  Health Status
                </span>
              </div>
              <p className={`text-xs ${
                daysSinceCheckup < 90 ? 'text-green-700' : 
                daysSinceCheckup < 180 ? 'text-yellow-700' : 
                'text-red-700'
              }`}>
                {daysSinceCheckup < 90 && `${pet.name} is in excellent health! Last checkup ${daysSinceCheckup} days ago.`}
                {daysSinceCheckup >= 90 && daysSinceCheckup < 180 && `${pet.name} is healthy. Checkup due soon (${daysSinceCheckup} days ago).`}
                {daysSinceCheckup >= 180 && `${pet.name} needs attention. Checkup overdue (${daysSinceCheckup} days ago).`}
                {parseInt(pet.age) > 7 && ' Senior pet - monitor closely.'}
              </p>
            </div>

            {/* Activity Recommendation */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-blue-800 text-sm">Activity Level</span>
              </div>
              <p className="text-xs text-blue-700">
                {pet.type === 'dog' && `${pet.name} needs ${pet.breed === 'Golden Retriever' ? '90-120' : '60-90'} minutes of daily exercise.`}
                {pet.type === 'cat' && `${pet.name} benefits from 15-20 minutes of interactive play daily.`}
                {parseInt(pet.age) > 7 && ' Adjust intensity for senior pet comfort.'}
              </p>
            </div>

            {/* Nutrition Insight */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800 text-sm">Nutrition</span>
              </div>
              <p className="text-xs text-green-700">
                {parseInt(pet.age) < 1 ? `Young ${pet.name} needs 3-4 small meals daily.` : 
                 pet.type === 'cat' ? `Feed ${pet.name} 2-3 times daily.` : 
                 `Feed ${pet.name} twice daily.`}
                {parseInt(pet.weight) > 70 && ' Monitor portion sizes.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
          <FaCalendarCheck />
          Book Checkup
        </button>
        <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PetHealthCard;