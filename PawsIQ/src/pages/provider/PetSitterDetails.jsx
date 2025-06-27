import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaDog, 
  FaCat, 
  FaHome, 
  FaHotel, 
  FaWalking, 
  FaKey, 
  FaFirstAid, 
  FaCalendarAlt,
  FaClipboardCheck,
  FaShieldAlt,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const PetSitterDetails = () => {
  const navigate = useNavigate();
  
  // Check if registration data exists
  useEffect(() => {
    const registrationData = localStorage.getItem('provider_registration');
    if (!registrationData) {
      // Redirect to sign up if no registration data
      navigate('/provider/signup');
      return;
    }
    
    const parsedData = JSON.parse(registrationData);
    if (parsedData.providerType !== 'Pet Sitter') {
      // Redirect to appropriate page if not a pet sitter
      navigate('/provider/onboarding/professional-info');
      return;
    }
    
    // Load existing data if available
    const sitterData = localStorage.getItem('provider_petsitter_details');
    if (sitterData) {
      setFormData(JSON.parse(sitterData));
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Pet Sitting Qualifications
    certifications: [],
    otherCertifications: '',
    yearsPetSittingExperience: '',
    petFirstAid: false,
    petCPR: false,
    backgroundCheck: false,
    insurance: false,
    bonded: false,
    
    // Services Offered
    servicesOffered: {
      inHomePetSitting: true,
      petBoarding: false,
      dogWalking: true,
      dropInVisits: true,
      dayCare: false,
      houseSitting: false,
      petTaxi: false,
      medicationAdmin: false,
      other: false
    },
    otherServices: '',
    
    // Pets Serviced
    petsServiced: {
      dogs: true,
      cats: true,
      birds: false,
      smallAnimals: false,
      reptiles: false,
      farmAnimals: false,
      other: false
    },
    otherPets: '',
    dogSizes: {
      small: true,
      medium: true,
      large: true,
      giant: false
    },
    
    // Availability & Scheduling
    availability: {
      monday: { available: true, startTime: '08:00', endTime: '20:00' },
      tuesday: { available: true, startTime: '08:00', endTime: '20:00' },
      wednesday: { available: true, startTime: '08:00', endTime: '20:00' },
      thursday: { available: true, startTime: '08:00', endTime: '20:00' },
      friday: { available: true, startTime: '08:00', endTime: '20:00' },
      saturday: { available: true, startTime: '09:00', endTime: '18:00' },
      sunday: { available: true, startTime: '09:00', endTime: '18:00' }
    },
    overnightAvailable: false,
    holidaysAvailable: false,
    maxPetsPerDay: '',
    maxPetsOvernight: '',
    
    // Additional Information
    homeEnvironment: '',
    petSittingApproach: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle nested checkboxes
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      // Handle regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle multi-select changes
  const handleMultiSelectChange = (field, value) => {
    setFormData(prev => {
      const currentValues = [...prev[field]];
      
      if (currentValues.includes(value)) {
        // Remove value if already selected
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      } else {
        // Add value if not already selected
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };
  
  // Handle availability changes
  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Pet Sitting Qualifications validation
    if (!formData.yearsPetSittingExperience) {
      newErrors.yearsPetSittingExperience = 'Years of pet sitting experience is required';
    } else if (formData.yearsPetSittingExperience < 0) {
      newErrors.yearsPetSittingExperience = 'Years of experience cannot be negative';
    }
    
    // Check if at least one service is selected
    const hasServices = Object.values(formData.servicesOffered).some(value => value === true);
    if (!hasServices) {
      newErrors.servicesOffered = 'At least one service must be selected';
    }
    
    // Check if "other" service is selected but no details provided
    if (formData.servicesOffered.other && !formData.otherServices) {
      newErrors.otherServices = 'Please specify other services';
    }
    
    // Check if at least one pet type is selected
    const hasPets = Object.values(formData.petsServiced).some(value => value === true);
    if (!hasPets) {
      newErrors.petsServiced = 'At least one pet type must be selected';
    }
    
    // Check if "other" pet type is selected but no details provided
    if (formData.petsServiced.other && !formData.otherPets) {
      newErrors.otherPets = 'Please specify other pet types';
    }
    
    // Check if at least one day is available
    const hasAvailability = Object.values(formData.availability).some(day => day.available === true);
    if (!hasAvailability) {
      newErrors.availability = 'You must be available on at least one day';
    }
    
    // Validate max pets per day
    if (!formData.maxPetsPerDay) {
      newErrors.maxPetsPerDay = 'Maximum pets per day is required';
    } else if (formData.maxPetsPerDay < 1) {
      newErrors.maxPetsPerDay = 'Maximum pets per day must be at least 1';
    }
    
    // Validate max pets overnight (if overnight is available)
    if (formData.overnightAvailable && !formData.maxPetsOvernight) {
      newErrors.maxPetsOvernight = 'Maximum pets for overnight is required';
    } else if (formData.overnightAvailable && formData.maxPetsOvernight < 1) {
      newErrors.maxPetsOvernight = 'Maximum pets for overnight must be at least 1';
    }
    
    // Additional Information validation
    if (!formData.petSittingApproach) {
      newErrors.petSittingApproach = 'Pet sitting approach is required';
    } else if (formData.petSittingApproach.length < 50) {
      newErrors.petSittingApproach = 'Pet sitting approach must be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving pet sitter details as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_petsitter_details', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 3
      }));
      
      // Show success message
      alert('Your information has been saved as a draft.');
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-600');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to save the data
      console.log('Submitting pet sitter details:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_petsitter_details', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 3
      }));
      
      // Navigate to the document upload page
      navigate('/provider/onboarding/document-upload');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({
        ...prev,
        form: 'An error occurred during submission. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Certification options
  const certificationOptions = [
    'Pet Sitters International (PSI)',
    'National Association of Professional Pet Sitters (NAPPS)',
    'Professional Pet Sitters Certification',
    'Pet First Aid & CPR Certification',
    'Fear Free Certification',
    'Dog Behavior Certification',
    'Cat Behavior Certification'
  ];
  
  // Days of the week for availability
  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logoImage} alt="PawsIQ Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">PawsIQ Provider Onboarding</h1>
          </div>
          <div className="text-sm text-gray-500">
            Need help? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact Support</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-indigo-600 font-medium">Step 3 of 8</div>
            <div className="text-sm text-gray-500">Pet Sitting Details</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Pet Sitting Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your pet sitting qualifications, services, and availability
            </p>
          </div>
          
          {/* Form error message */}
          {errors.form && (
            <div className="m-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.form}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Pet Sitting Qualifications Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Pet Sitting Qualifications
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications & Credentials
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {certificationOptions.map((certification) => (
                    <div key={certification} className="flex items-center">
                      <input
                        id={`cert-${certification}`}
                        name={`cert-${certification}`}
                        type="checkbox"
                        checked={formData.certifications.includes(certification)}
                        onChange={() => handleMultiSelectChange('certifications', certification)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`cert-${certification}`} className="ml-2 text-sm text-gray-700">
                        {certification}
                      </label>
                    </div>
                  ))}
                  
                  <div className="sm:col-span-2 mt-2">
                    <label htmlFor="otherCertifications" className="block text-sm font-medium text-gray-700">
                      Other Certifications
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="otherCertifications"
                        name="otherCertifications"
                        value={formData.otherCertifications}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List any other certifications or credentials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="yearsPetSittingExperience" className="block text-sm font-medium text-gray-700">
                  Years of Pet Sitting Experience <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="yearsPetSittingExperience"
                    name="yearsPetSittingExperience"
                    min="0"
                    value={formData.yearsPetSittingExperience}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.yearsPetSittingExperience ? 'border-red-300' : ''
                    }`}
                    placeholder="5"
                  />
                </div>
                {errors.yearsPetSittingExperience && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearsPetSittingExperience}</p>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety & Trust Credentials
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="flex items-center">
                    <input
                      id="petFirstAid"
                      name="petFirstAid"
                      type="checkbox"
                      checked={formData.petFirstAid}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="petFirstAid" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaFirstAid className="mr-1 text-gray-500" /> Pet First Aid Certified
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="petCPR"
                      name="petCPR"
                      type="checkbox"
                      checked={formData.petCPR}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="petCPR" className="ml-2 text-sm text-gray-700">
                      Pet CPR Certified
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="backgroundCheck"
                      name="backgroundCheck"
                      type="checkbox"
                      checked={formData.backgroundCheck}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="backgroundCheck" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaShieldAlt className="mr-1 text-gray-500" /> Background Checked
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="insurance"
                      name="insurance"
                      type="checkbox"
                      checked={formData.insurance}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
                      Insured
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="bonded"
                      name="bonded"
                      type="checkbox"
                      checked={formData.bonded}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bonded" className="ml-2 text-sm text-gray-700">
                      Bonded
                    </label>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Services Offered Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Services Offered
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Sitting Services <span className="text-red-500">*</span>
                </label>
                
                {errors.servicesOffered && (
                  <p className="mb-2 text-sm text-red-600">{errors.servicesOffered}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="service-inhome"
                      name="servicesOffered.inHomePetSitting"
                      type="checkbox"
                      checked={formData.servicesOffered.inHomePetSitting}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-inhome" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHome className="mr-1 text-gray-500" /> In-Home Pet Sitting
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-boarding"
                      name="servicesOffered.petBoarding"
                      type="checkbox"
                      checked={formData.servicesOffered.petBoarding}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-boarding" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHotel className="mr-1 text-gray-500" /> Pet Boarding
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-walking"
                      name="servicesOffered.dogWalking"
                      type="checkbox"
                      checked={formData.servicesOffered.dogWalking}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-walking" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaWalking className="mr-1 text-gray-500" /> Dog Walking
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-dropin"
                      name="servicesOffered.dropInVisits"
                      type="checkbox"
                      checked={formData.servicesOffered.dropInVisits}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-dropin" className="ml-2 text-sm text-gray-700">
                      Drop-In Visits
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-daycare"
                      name="servicesOffered.dayCare"
                      type="checkbox"
                      checked={formData.servicesOffered.dayCare}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-daycare" className="ml-2 text-sm text-gray-700">
                      Day Care
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-housesitting"
                      name="servicesOffered.houseSitting"
                      type="checkbox"
                      checked={formData.servicesOffered.houseSitting}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-housesitting" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaKey className="mr-1 text-gray-500" /> House Sitting
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-taxi"
                      name="servicesOffered.petTaxi"
                      type="checkbox"
                      checked={formData.servicesOffered.petTaxi}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-taxi" className="ml-2 text-sm text-gray-700">
                      Pet Taxi
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-medication"
                      name="servicesOffered.medicationAdmin"
                      type="checkbox"
                      checked={formData.servicesOffered.medicationAdmin}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-medication" className="ml-2 text-sm text-gray-700">
                      Medication Administration
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-other"
                      name="servicesOffered.other"
                      type="checkbox"
                      checked={formData.servicesOffered.other}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                
                {formData.servicesOffered.other && (
                  <div className="mt-2">
                    <label htmlFor="otherServices" className="block text-sm font-medium text-gray-700">
                      Other Services
                    </label>
                    <input
                      type="text"
                      id="otherServices"
                      name="otherServices"
                      value={formData.otherServices}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherServices ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other services"
                    />
                    {errors.otherServices && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherServices}</p>
                    )}
                  </div>
                )}
              </div>
            </section>
            
            {/* Pets Serviced Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Pets Serviced
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Types <span className="text-red-500">*</span>
                </label>
                
                {errors.petsServiced && (
                  <p className="mb-2 text-sm text-red-600">{errors.petsServiced}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex items-center">
                    <input
                      id="pet-dogs"
                      name="petsServiced.dogs"
                      type="checkbox"
                      checked={formData.petsServiced.dogs}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-dogs" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaDog className="mr-1 text-gray-500" /> Dogs
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-cats"
                      name="petsServiced.cats"
                      type="checkbox"
                      checked={formData.petsServiced.cats}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-cats" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaCat className="mr-1 text-gray-500" /> Cats
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-birds"
                      name="petsServiced.birds"
                      type="checkbox"
                      checked={formData.petsServiced.birds}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-birds" className="ml-2 text-sm text-gray-700">
                      Birds
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-small"
                      name="petsServiced.smallAnimals"
                      type="checkbox"
                      checked={formData.petsServiced.smallAnimals}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-small" className="ml-2 text-sm text-gray-700">
                      Small Animals
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-reptiles"
                      name="petsServiced.reptiles"
                      type="checkbox"
                      checked={formData.petsServiced.reptiles}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-reptiles" className="ml-2 text-sm text-gray-700">
                      Reptiles
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-farm"
                      name="petsServiced.farmAnimals"
                      type="checkbox"
                      checked={formData.petsServiced.farmAnimals}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-farm" className="ml-2 text-sm text-gray-700">
                      Farm Animals
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pet-other"
                      name="petsServiced.other"
                      type="checkbox"
                      checked={formData.petsServiced.other}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pet-other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                
                {formData.petsServiced.other && (
                  <div className="mt-2">
                    <label htmlFor="otherPets" className="block text-sm font-medium text-gray-700">
                      Other Pet Types
                    </label>
                    <input
                      type="text"
                      id="otherPets"
                      name="otherPets"
                      value={formData.otherPets}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherPets ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other pet types"
                    />
                    {errors.otherPets && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherPets}</p>
                    )}
                  </div>
                )}
              </div>
              
              {formData.petsServiced.dogs && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dog Sizes
                  </label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex items-center">
                      <input
                        id="size-small"
                        name="dogSizes.small"
                        type="checkbox"
                        checked={formData.dogSizes.small}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="size-small" className="ml-2 text-sm text-gray-700">
                        Small (0-20 lbs)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="size-medium"
                        name="dogSizes.medium"
                        type="checkbox"
                        checked={formData.dogSizes.medium}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="size-medium" className="ml-2 text-sm text-gray-700">
                        Medium (21-50 lbs)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="size-large"
                        name="dogSizes.large"
                        type="checkbox"
                        checked={formData.dogSizes.large}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="size-large" className="ml-2 text-sm text-gray-700">
                        Large (51-90 lbs)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="size-giant"
                        name="dogSizes.giant"
                        type="checkbox"
                        checked={formData.dogSizes.giant}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="size-giant" className="ml-2 text-sm text-gray-700">
                        Giant (91+ lbs)
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </section>
            
            {/* Availability & Scheduling Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Availability & Scheduling
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Availability <span className="text-red-500">*</span>
                </label>
                
                {errors.availability && (
                  <p className="mb-2 text-sm text-red-600">{errors.availability}</p>
                )}
                
                <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {daysOfWeek.map((day) => (
                        <tr key={day.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day.label}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="checkbox"
                              checked={formData.availability[day.id].available}
                              onChange={(e) => handleAvailabilityChange(day.id, 'available', e.target.checked)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <input
                                type="time"
                                value={formData.availability[day.id].startTime}
                                onChange={(e) => handleAvailabilityChange(day.id, 'startTime', e.target.value)}
                                disabled={!formData.availability[day.id].available}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                              />
                              <span>to</span>
                              <input
                                type="time"
                                value={formData.availability[day.id].endTime}
                                onChange={(e) => handleAvailabilityChange(day.id, 'endTime', e.target.value)}
                                disabled={!formData.availability[day.id].available}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center">
                    <input
                      id="overnightAvailable"
                      name="overnightAvailable"
                      type="checkbox"
                      checked={formData.overnightAvailable}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="overnightAvailable" className="ml-2 text-sm text-gray-700">
                      Available for Overnight Stays
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      id="holidaysAvailable"
                      name="holidaysAvailable"
                      type="checkbox"
                      checked={formData.holidaysAvailable}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="holidaysAvailable" className="ml-2 text-sm text-gray-700">
                      Available on Holidays
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="maxPetsPerDay" className="block text-sm font-medium text-gray-700">
                    Maximum Pets Per Day <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="maxPetsPerDay"
                      name="maxPetsPerDay"
                      min="1"
                      value={formData.maxPetsPerDay}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.maxPetsPerDay ? 'border-red-300' : ''
                      }`}
                      placeholder="5"
                    />
                  </div>
                  {errors.maxPetsPerDay && (
                    <p className="mt-1 text-sm text-red-600">{errors.maxPetsPerDay}</p>
                  )}
                </div>
                
                {formData.overnightAvailable && (
                  <div>
                    <label htmlFor="maxPetsOvernight" className="block text-sm font-medium text-gray-700">
                      Maximum Pets for Overnight <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="maxPetsOvernight"
                        name="maxPetsOvernight"
                        min="1"
                        value={formData.maxPetsOvernight}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.maxPetsOvernight ? 'border-red-300' : ''
                        }`}
                        placeholder="2"
                      />
                    </div>
                    {errors.maxPetsOvernight && (
                      <p className="mt-1 text-sm text-red-600">{errors.maxPetsOvernight}</p>
                    )}
                  </div>
                )}
              </div>
            </section>
            
            {/* Additional Information Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Additional Information
              </h3>
              
              {formData.servicesOffered.petBoarding && (
                <div className="mt-6">
                  <label htmlFor="homeEnvironment" className="block text-sm font-medium text-gray-700">
                    Home Environment for Boarding
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="homeEnvironment"
                      name="homeEnvironment"
                      rows={3}
                      value={formData.homeEnvironment}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe your home environment for pet boarding (e.g., fenced yard, pet-free furniture, etc.)"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <label htmlFor="petSittingApproach" className="block text-sm font-medium text-gray-700">
                  Pet Sitting Approach & Philosophy <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="petSittingApproach"
                    name="petSittingApproach"
                    rows={4}
                    value={formData.petSittingApproach}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.petSittingApproach ? 'border-red-300' : ''
                    }`}
                    placeholder="Describe your approach to pet sitting, how you handle different situations, and what makes your service unique..."
                  />
                </div>
                <div className="mt-1 flex justify-between">
                  {errors.petSittingApproach ? (
                    <p className="text-sm text-red-600">{errors.petSittingApproach}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Minimum 50 characters. Be sure to highlight your approach and what makes your pet sitting service unique.
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.petSittingApproach.length} characters
                  </p>
                </div>
              </div>
            </section>
            
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link
                to="/provider/onboarding/professional-info"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaArrowLeft className="mr-2 -ml-1 h-4 w-4" />
                Back
              </Link>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleSaveAsDraft}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2 -ml-1 h-4 w-4" />
                      Save as Draft
                    </>
                  )}
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      Save and Continue
                      <FaArrowRight className="ml-2 -mr-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PetSitterDetails;