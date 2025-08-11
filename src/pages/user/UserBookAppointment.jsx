import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft, FaPaw, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaCheck, FaChevronRight, FaCalendarCheck } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';
import { useAuth } from '../../context/AuthContext';

const UserBookAppointment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    petId: '',
    serviceType: '',
    serviceId: '',
    providerId: '',
    date: '',
    timeSlot: '',
    notes: ''
  });

  // Auth and pets from backend
  const { currentUser } = useAuth();
  const accessToken = currentUser?.tokens?.access?.token;
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      if (!accessToken) return;
      setLoadingPets(true);
      setError('');
      try {
        const res = await fetch('/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || 'Failed to load pets');
        const mapped = (data?.pets || []).map((p) => ({
          id: Number(p.pet_id),
          name: p.pet_name || 'Pet',
          type: (p.pet_type || '').toLowerCase(),
          breed: p.pet_breed || '',
          image: p.pet_image || 'https://placehold.co/600x400?text=Pet',
        }));
        setPets(mapped);
      } catch (e) {
        setError(e.message || 'Failed to load pets');
      } finally {
        setLoadingPets(false);
      }
    };
    fetchPets();
  }, [accessToken]);

  const serviceTypes = [
    { id: 'vet', name: 'Veterinary Care', icon: '🩺', description: 'Health checkups, vaccinations, and medical treatments' },
    { id: 'grooming', name: 'Grooming', icon: '✂️', description: 'Bathing, haircuts, nail trimming, and more' },
    { id: 'training', name: 'Training', icon: '🦮', description: 'Obedience training, behavior modification, and socialization' },
    { id: 'boarding', name: 'Boarding', icon: '🏠', description: 'Overnight pet care in a safe and comfortable environment' },
    { id: 'daycare', name: 'Daycare', icon: '🐾', description: 'Supervised play and care during the day' },
    { id: 'walking', name: 'Dog Walking', icon: '🚶', description: 'Regular exercise and bathroom breaks for your dog' }
  ];

  const services = {
    vet: [
      { id: 'vet1', name: 'Routine Checkup', price: 50, duration: '30 min' },
      { id: 'vet2', name: 'Vaccination', price: 35, duration: '20 min' },
      { id: 'vet3', name: 'Dental Cleaning', price: 120, duration: '60 min' },
      { id: 'vet4', name: 'Spay/Neuter', price: 200, duration: '90 min' }
    ],
    grooming: [
      { id: 'groom1', name: 'Basic Bath & Brush', price: 40, duration: '45 min' },
      { id: 'groom2', name: 'Full Grooming', price: 70, duration: '90 min' },
      { id: 'groom3', name: 'Nail Trimming', price: 15, duration: '15 min' },
      { id: 'groom4', name: 'De-shedding Treatment', price: 55, duration: '60 min' }
    ],
    training: [
      { id: 'train1', name: 'Basic Obedience', price: 60, duration: '45 min' },
      { id: 'train2', name: 'Advanced Training', price: 80, duration: '60 min' },
      { id: 'train3', name: 'Puppy Socialization', price: 50, duration: '45 min' },
      { id: 'train4', name: 'Behavior Modification', price: 90, duration: '60 min' }
    ],
    boarding: [
      { id: 'board1', name: 'Standard Boarding', price: 45, duration: '24 hours' },
      { id: 'board2', name: 'Luxury Suite', price: 75, duration: '24 hours' },
      { id: 'board3', name: 'Extended Stay (3+ days)', price: 40, duration: '24 hours' }
    ],
    daycare: [
      { id: 'day1', name: 'Full Day Care', price: 35, duration: '8 hours' },
      { id: 'day2', name: 'Half Day Care', price: 20, duration: '4 hours' },
      { id: 'day3', name: 'Weekly Package', price: 150, duration: '5 days' }
    ],
    walking: [
      { id: 'walk1', name: '30-Minute Walk', price: 20, duration: '30 min' },
      { id: 'walk2', name: '60-Minute Walk', price: 35, duration: '60 min' },
      { id: 'walk3', name: 'Group Walk', price: 15, duration: '45 min' }
    ]
  };

  const providers = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      title: 'Veterinarian',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: 'Happy Paws Veterinary Clinic',
      address: '123 Pet Care Lane, Pawsville',
      rating: 4.9,
      reviewCount: 128,
      services: ['vet1', 'vet2', 'vet3', 'vet4']
    },
    { 
      id: 2, 
      name: 'Fluffy Paws Grooming', 
      title: 'Professional Groomer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'Fluffy Paws Pet Salon',
      address: '456 Grooming Street, Pawsville',
      rating: 4.7,
      reviewCount: 95,
      services: ['groom1', 'groom2', 'groom3', 'groom4']
    },
    { 
      id: 3, 
      name: 'John Smith', 
      title: 'Certified Dog Trainer',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      location: 'Obedient Paws Training Center',
      address: '789 Training Road, Pawsville',
      rating: 4.8,
      reviewCount: 76,
      services: ['train1', 'train2', 'train3', 'train4']
    }
  ];

  const availableDates = React.useMemo(() => {
    const dates = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
  }, []);

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle pet selection
  const handlePetSelect = (petId) => {
    setFormData({
      ...formData,
      petId
    });
  };

  // Handle service type selection
  const handleServiceTypeSelect = (serviceType) => {
    setFormData({
      ...formData,
      serviceType,
      serviceId: '',
      providerId: ''
    });
  };

  // Handle specific service selection
  const handleServiceSelect = (serviceId) => {
    setFormData({
      ...formData,
      serviceId
    });
  };

  // Handle provider selection
  const handleProviderSelect = (providerId) => {
    setFormData({
      ...formData,
      providerId
    });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setFormData({
      ...formData,
      date
    });
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot) => {
    setFormData({
      ...formData,
      timeSlot
    });
  };

  // Move to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  // Move to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Combine date and time to ISO string
  const combineDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return '';
    const [time, meridiem] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (meridiem && meridiem.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (meridiem && meridiem.toUpperCase() === 'AM' && hours === 12) hours = 0;
    const d = new Date(`${dateStr}T00:00:00`);
    d.setHours(hours, minutes || 0, 0, 0);
    return d.toISOString();
  };

  // Map selected service to backend enum
  const mapToAppointmentType = () => {
    const st = formData.serviceType;
    const sid = formData.serviceId;
    if (st === 'grooming') return 'Grooming';
    if (st === 'training') return 'Training';
    if (st === 'vet') {
      if (sid === 'vet2') return 'Vaccination';
      return 'Checkup';
    }
    return 'Others';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) return;
    setIsSubmitting(true);
    try {
      const appointment_date = combineDateTime(formData.date, formData.timeSlot);
      const payload = {
        pet_id: Number(formData.petId),
        appointment_type: mapToAppointmentType(),
        appointment_date,
        appointment_comments: formData.notes?.trim() || undefined,
      };
      const res = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Failed to create appointment');
      navigate('/user/appointments');
    } catch (err) {
      alert(err.message || 'Failed to create appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected service details
  const getSelectedService = () => {
    if (!formData.serviceType || !formData.serviceId) return null;
    return services[formData.serviceType].find(service => service.id === formData.serviceId);
  };
  
  // Get selected provider details
  const getSelectedProvider = () => {
    if (!formData.providerId) return null;
    return providers.find(provider => provider.id === parseInt(formData.providerId));
  };
  
  // Get selected pet details
  const getSelectedPet = () => {
    if (!formData.petId) return null;
    return pets.find(pet => pet.id === parseInt(formData.petId));
  };
  
  // Render step content
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Your Pet</h2>
            <p className="text-gray-600">Choose which pet needs an appointment</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pets.map(pet => (
                <div 
                  key={pet.id}
                  onClick={() => handlePetSelect(pet.id)}
                  className={`bg-white rounded-xl overflow-hidden border cursor-pointer transition-all
                    ${formData.petId === pet.id 
                      ? 'border-purple-500 ring-2 ring-purple-200 shadow-md' 
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'}`}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                    <p className="text-gray-600">{pet.breed}</p>
                    <p className="text-gray-500 text-sm capitalize">{pet.type}</p>
                    
                    {formData.petId === pet.id && (
                      <div className="mt-2 text-purple-600 flex items-center gap-1">
                        <FaCheck />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div 
                onClick={() => navigate('/user/pets/add')}
                className="bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                  <FaPaw className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Add a New Pet</h3>
                <p className="text-gray-500 text-sm text-center mt-1">
                  Don't see your pet? Add a new pet profile
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!formData.petId}
                className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2
                  ${!formData.petId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Continue</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Find a Service</h2>
            <p className="text-gray-600">Search and select a service to continue booking</p>

            {/* Inline Find Services (merged) */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services (e.g., vaccination, grooming, training)"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    onChange={(e) => {
                      const q = e.target.value.toLowerCase();
                      // if user types, soft-select the first matching type
                      const typeMatch = serviceTypes.find(t => t.name.toLowerCase().includes(q));
                      if (typeMatch) {
                        handleServiceTypeSelect(typeMatch.id);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-500" />
                  <select
                    value={formData.serviceType}
                    onChange={(e) => handleServiceTypeSelect(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Types</option>
                    {serviceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Type quick-picks */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {serviceTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleServiceTypeSelect(type.id)}
                    className={`text-left p-3 rounded-lg border transition-all hover:shadow-sm ${formData.serviceType === type.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                  >
                    <div className="text-xl">{type.icon}</div>
                    <div className="text-sm font-medium mt-1">{type.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{type.description}</div>
                  </button>
                ))}
              </div>

              {/* Specific services list */}
              {formData.serviceType && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Select Specific Service</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services[formData.serviceType].map(service => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`bg-white rounded-lg p-4 border cursor-pointer transition-all ${formData.serviceId === service.id ? 'border-purple-500 ring-2 ring-purple-200 shadow-sm' : 'border-gray-200 hover:border-purple-300'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{service.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <FaClock />
                                <span>{service.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaMoneyBillWave />
                                <span>${service.price}</span>
                              </div>
                            </div>
                          </div>
                          {formData.serviceId === service.id && (
                            <div className="text-purple-600">
                              <FaCheck />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.serviceId}
                className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2 ${!formData.serviceId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Continue</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Provider</h2>
            <p className="text-gray-600">Choose a service provider for your appointment</p>
            
            <div className="space-y-4">
              {providers
                .filter(provider => provider.services.includes(formData.serviceId))
                .map(provider => (
                  <div 
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`bg-white rounded-xl p-4 border cursor-pointer transition-all
                      ${formData.providerId === provider.id 
                        ? 'border-purple-500 ring-2 ring-purple-200 shadow-md' 
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={provider.image} 
                          alt={provider.name} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
                        <p className="text-gray-600">{provider.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{provider.rating} ({provider.reviewCount} reviews)</span>
                        </div>
                      </div>
                      
                      {formData.providerId === provider.id && (
                        <div className="text-purple-600">
                          <FaCheck size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-500 mt-1" />
                      <div>
                        <p>{provider.location}</p>
                        <p className="text-gray-500">{provider.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.providerId}
                className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2
                  ${!formData.providerId ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Continue</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Date & Time</h2>
            <p className="text-gray-600">Choose when you'd like to schedule your appointment</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Select Date</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDates.map(date => {
                    const dateObj = new Date(date);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    });
                    
                    return (
                      <div 
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 border rounded-lg text-center cursor-pointer transition-colors
                          ${formData.date === date 
                            ? 'bg-purple-100 border-purple-500 text-purple-700' 
                            : 'border-gray-200 hover:border-purple-300'}`}
                      >
                        <p className="text-sm font-medium">{formattedDate}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {formData.date && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Select Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <div 
                        key={time}
                        onClick={() => handleTimeSlotSelect(time)}
                        className={`p-3 border rounded-lg text-center cursor-pointer transition-colors
                          ${formData.timeSlot === time 
                            ? 'bg-purple-100 border-purple-500 text-purple-700' 
                            : 'border-gray-200 hover:border-purple-300'}`}
                      >
                        <p className="text-sm font-medium">{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Any special instructions or information for the provider"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.date || !formData.timeSlot}
                className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2
                  ${(!formData.date || !formData.timeSlot) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>Review & Confirm</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        );
        
      case 5:
        const selectedPet = getSelectedPet();
        const selectedService = getSelectedService();
        const selectedProvider = getSelectedProvider();
        const appointmentDate = formData.date ? new Date(formData.date) : null;
        
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Review & Confirm</h2>
            <p className="text-gray-600">Please review your appointment details before confirming</p>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaCalendarCheck className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Appointment Summary</h3>
                    <p className="text-gray-600 text-sm">Please review the details below</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Pet</h4>
                      {selectedPet && (
                        <div className="flex items-center gap-3">
                          <img 
                            src={selectedPet.image} 
                            alt={selectedPet.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{selectedPet.name}</p>
                            <p className="text-sm text-gray-600">{selectedPet.breed}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Service</h4>
                      {selectedService && (
                        <div>
                          <p className="font-medium text-gray-800">{selectedService.name}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FaClock />
                              <span>{selectedService.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaMoneyBillWave />
                              <span>${selectedService.price}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Provider</h4>
                      {selectedProvider && (
                        <div className="flex items-center gap-3">
                          <img 
                            src={selectedProvider.image} 
                            alt={selectedProvider.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{selectedProvider.name}</p>
                            <p className="text-sm text-gray-600">{selectedProvider.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h4>
                      {appointmentDate && (
                        <div>
                          <p className="font-medium text-gray-800">
                            {appointmentDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-600">{formData.timeSlot}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                  {selectedProvider && (
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800">{selectedProvider.location}</p>
                        <p className="text-sm text-gray-600">{selectedProvider.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {formData.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Additional Notes</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{formData.notes}</p>
                  </div>
                )}
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-purple-800 mb-2">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium text-gray-800">${selectedService?.price || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium text-gray-800">${Math.round((selectedService?.price || 0) * 0.08 * 100) / 100}</span>
                    </div>
                    <div className="border-t border-purple-200 my-2 pt-2 flex justify-between">
                      <span className="font-medium text-gray-800">Total</span>
                      <span className="font-bold text-purple-800">${Math.round((selectedService?.price || 0) * 1.08 * 100) / 100}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      <span>Confirm Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/user/appointments')}
            className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-500 hover:text-purple-600 transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaCalendarAlt className="text-purple-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Book an Appointment</h1>
            </div>
            <p className="text-gray-500 mt-1">Schedule a service for your pet</p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between">
            {['Pet', 'Service', 'Provider', 'Date & Time', 'Confirm'].map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              
              return (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${isActive 
                        ? 'bg-purple-600 text-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'}`}
                  >
                    {isCompleted ? <FaCheck size={12} /> : stepNumber}
                  </div>
                  <span className={`text-xs mt-1 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded-full"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 25}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          {renderStepContent()}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserBookAppointment;