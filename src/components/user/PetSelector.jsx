import React from 'react';
import { FaPaw, FaChevronDown } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';

const PetSelector = ({ pets, selectedPet, onPetSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-pink-100 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-pink-100 p-2 rounded-lg">
          <FaPaw className="text-pink-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Select Pet for AI Recommendations</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => onPetSelect(pet)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedPet?.id === pet.id
                ? 'border-pink-500 bg-pink-50 shadow-md'
                : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={pet.image} 
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800 truncate">{pet.name}</h4>
                  <PetIcon 
                    type={pet.type} 
                    className={`text-sm ${pet.type === 'cat' ? 'text-purple-600' : 'text-pink-600'}`} 
                  />
                </div>
                <p className="text-sm text-gray-600 truncate">{pet.breed}</p>
                <p className="text-xs text-gray-500">{pet.age} • {pet.weight}</p>
              </div>
              {selectedPet?.id === pet.id && (
                <div className="text-pink-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {pets.length === 0 && (
        <div className="text-center py-8">
          <PetIcon type="paw" className="text-gray-400 text-3xl mx-auto mb-3" />
          <p className="text-gray-500">No pets found. Add a pet to get AI recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default PetSelector;