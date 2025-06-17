import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaArrowLeft, FaUpload, FaCalendarAlt, FaDog, FaCat, FaFish, FaHorse } from 'react-icons/fa';
import { FaDove } from 'react-icons/fa6';
import UserLayout from '../../components/layout/UserLayout';

const UserAddPet = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    gender: '',
    birthdate: '',
    weight: '',
    color: '',
    microchipped: false,
    microchipNumber: '',
    neutered: false,
    allergies: '',
    medicalConditions: '',
    medications: '',
    dietaryNeeds: '',
    vetName: '',
    vetPhone: '',
    notes: ''
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/user/pets');
    }, 1500);
  };
  
  // Pet type options with icons
  const petTypes = [
    { value: 'dog', label: 'Dog', icon: <FaDog /> },
    { value: 'cat', label: 'Cat', icon: <FaCat /> },
    { value: 'bird', label: 'Bird', icon: <FaDove /> },
    { value: 'rabbit', label: 'Rabbit', icon: <FaPaw /> },
    { value: 'fish', label: 'Fish', icon: <FaFish /> },
    { value: 'horse', label: 'Horse', icon: <FaHorse /> },
    { value: 'other', label: 'Other', icon: <FaPaw /> }
  ];
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/user/pets')}
            className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-pink-600 transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-lg">
                <FaPaw className="text-pink-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Add a New Pet</h1>
            </div>
            <p className="text-gray-500 mt-1">Enter your pet's information to create a profile</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Pet Photo Upload */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                {previewImage ? (
                  <img src={previewImage} alt="Pet preview" className="w-full h-full object-cover" />
                ) : (
                  <FaPaw className="text-gray-400 text-4xl" />
                )}
                <input 
                  type="file" 
                  id="pet-photo" 
                  accept="image/*" 
                  className="opacity-0 absolute inset-0 cursor-pointer" 
                  onChange={handleImageChange}
                />
              </div>
              <label htmlFor="pet-photo" className="mt-2 flex items-center gap-1 text-sm text-pink-600 cursor-pointer">
                <FaUpload />
                Upload Photo
              </label>
            </div>
            
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter pet name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Type*
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {petTypes.map((type) => (
                      <label 
                        key={type.value}
                        className={`flex flex-col items-center justify-center p-2 border rounded-lg cursor-pointer transition-colors
                          ${formData.type === type.value 
                            ? 'bg-pink-50 border-pink-500 text-pink-700' 
                            : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <div className="text-xl mb-1">
                          {type.icon}
                        </div>
                        <span className="text-xs">{type.label}</span>
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter breed"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                    Birth Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter weight"
                  />
                </div>
                
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter color"
                  />
                </div>
              </div>
            </div>
            
            {/* Health Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="microchipped"
                    name="microchipped"
                    checked={formData.microchipped}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="microchipped" className="ml-2 block text-sm text-gray-700">
                    Microchipped
                  </label>
                </div>
                
                {formData.microchipped && (
                  <div>
                    <label htmlFor="microchipNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Microchip Number
                    </label>
                    <input
                      type="text"
                      id="microchipNumber"
                      name="microchipNumber"
                      value={formData.microchipNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Enter microchip number"
                    />
                  </div>
                )}
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="neutered"
                    name="neutered"
                    checked={formData.neutered}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="neutered" className="ml-2 block text-sm text-gray-700">
                    Spayed/Neutered
                  </label>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                  </label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="List any allergies"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Conditions
                  </label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="List any medical conditions"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="List any current medications"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="dietaryNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                    Dietary Needs
                  </label>
                  <textarea
                    id="dietaryNeeds"
                    name="dietaryNeeds"
                    value={formData.dietaryNeeds}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Special dietary requirements"
                  />
                </div>
              </div>
            </div>
            
            {/* Veterinarian Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Veterinarian Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vetName" className="block text-sm font-medium text-gray-700 mb-1">
                    Veterinarian Name
                  </label>
                  <input
                    type="text"
                    id="vetName"
                    name="vetName"
                    value={formData.vetName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter veterinarian name"
                  />
                </div>
                
                <div>
                  <label htmlFor="vetPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Veterinarian Phone
                  </label>
                  <input
                    type="tel"
                    id="vetPhone"
                    name="vetPhone"
                    value={formData.vetPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter veterinarian phone"
                  />
                </div>
              </div>
            </div>
            
            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Any additional information about your pet"
              />
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/user/pets')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaPaw />
                  <span>Save Pet Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default UserAddPet;