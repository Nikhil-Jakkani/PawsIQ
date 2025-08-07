import React from 'react';
import { FaHeart, FaWeight, FaBirthdayCake, FaSyringe, FaStethoscope, FaCalendarCheck } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const PetHealthCard = ({ pet }) => {
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
          <div className="flex items-center gap-2 text-pink-600 mb-1">
            <FaBirthdayCake className="text-sm" />
            <span className="text-xs font-medium">Age</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{pet.age}</p>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <FaWeight className="text-sm" />
            <span className="text-xs font-medium">Weight</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{pet.weight}</p>
        </div>
        
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