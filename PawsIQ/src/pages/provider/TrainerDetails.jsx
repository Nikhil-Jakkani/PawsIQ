import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaDog, 
  FaCertificate, 
  FaClipboardCheck, 
  FaUsers, 
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const TrainerDetails = () => {
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
    if (parsedData.providerType !== 'Trainer') {
      // Redirect to appropriate page if not a trainer
      navigate('/provider/onboarding/professional-info');
      return;
    }
    
    // Load existing data if available
    const trainerData = localStorage.getItem('provider_trainer_details');
    if (trainerData) {
      setFormData(JSON.parse(trainerData));
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Training Qualifications
    certifications: [],
    otherCertifications: '',
    trainingMethodology: '',
    yearsTrainingExperience: '',
    specializations: {
      obedienceTraining: false,
      behaviorModification: false,
      puppyTraining: false,
      agility: false,
      serviceAnimalTraining: false,
      therapy: false,
      protection: false,
      other: false
    },
    otherSpecializations: '',
    
    // Training Details
    trainingSettings: {
      inHome: false,
      groupClasses: false,
      boardAndTrain: false,
      dayTraining: false,
      virtual: false
    },
    ageGroups: {
      puppies: false,
      adolescent: false,
      adult: false,
      senior: false
    },
    dogSizes: {
      small: false,
      medium: false,
      large: false,
      giant: false
    },
    
    // Facility Information (if applicable)
    hasFacility: false,
    facilityDetails: {
      facilityType: '',
      facilitySize: '',
      indoorTrainingArea: false,
      outdoorTrainingArea: false,
      maxGroupSize: ''
    },
    
    // Training Philosophy
    trainingPhilosophy: ''
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
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Training Qualifications validation
    if (!formData.trainingMethodology) {
      newErrors.trainingMethodology = 'Training methodology is required';
    }
    
    if (!formData.yearsTrainingExperience) {
      newErrors.yearsTrainingExperience = 'Years of training experience is required';
    } else if (formData.yearsTrainingExperience < 0) {
      newErrors.yearsTrainingExperience = 'Years of experience cannot be negative';
    }
    
    // Check if at least one specialization is selected
    const hasSpecializations = Object.values(formData.specializations).some(value => value === true);
    if (!hasSpecializations) {
      newErrors.specializations = 'At least one specialization must be selected';
    }
    
    // Check if "other" specialization is selected but no details provided
    if (formData.specializations.other && !formData.otherSpecializations) {
      newErrors.otherSpecializations = 'Please specify other specializations';
    }
    
    // Check if at least one training setting is selected
    const hasTrainingSettings = Object.values(formData.trainingSettings).some(value => value === true);
    if (!hasTrainingSettings) {
      newErrors.trainingSettings = 'At least one training setting must be selected';
    }
    
    // Check if at least one age group is selected
    const hasAgeGroups = Object.values(formData.ageGroups).some(value => value === true);
    if (!hasAgeGroups) {
      newErrors.ageGroups = 'At least one age group must be selected';
    }
    
    // Check if at least one dog size is selected
    const hasDogSizes = Object.values(formData.dogSizes).some(value => value === true);
    if (!hasDogSizes) {
      newErrors.dogSizes = 'At least one dog size must be selected';
    }
    
    // Facility validation (if applicable)
    if (formData.hasFacility) {
      if (!formData.facilityDetails.facilityType) {
        newErrors['facilityDetails.facilityType'] = 'Facility type is required';
      }
      
      if (!formData.facilityDetails.facilitySize) {
        newErrors['facilityDetails.facilitySize'] = 'Facility size is required';
      }
      
      if (formData.facilityDetails.maxGroupSize === '') {
        newErrors['facilityDetails.maxGroupSize'] = 'Maximum group size is required';
      } else if (formData.facilityDetails.maxGroupSize < 1) {
        newErrors['facilityDetails.maxGroupSize'] = 'Maximum group size must be at least 1';
      }
    }
    
    // Training Philosophy validation
    if (!formData.trainingPhilosophy) {
      newErrors.trainingPhilosophy = 'Training philosophy is required';
    } else if (formData.trainingPhilosophy.length < 50) {
      newErrors.trainingPhilosophy = 'Training philosophy must be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving trainer details as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_trainer_details', JSON.stringify(formData));
      
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
      console.log('Submitting trainer details:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_trainer_details', JSON.stringify(formData));
      
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
    'Certified Professional Dog Trainer (CPDT-KA)',
    'Certified Dog Behavior Consultant (CDBC)',
    'Karen Pryor Academy Certified Training Partner (KPA CTP)',
    'International Association of Animal Behavior Consultants (IAABC)',
    'Association of Professional Dog Trainers (APDT)',
    'Animal Behavior College Certified Dog Trainer (ABCDT)',
    'Victoria Stilwell Academy for Dog Training & Behavior',
    'Certification Council for Professional Dog Trainers (CCPDT)',
    'AKC Canine Good Citizen Evaluator'
  ];
  
  // Training methodology options
  const methodologyOptions = [
    'Positive Reinforcement',
    'Clicker Training',
    'Balanced Training',
    'Relationship-Based Training',
    'Science-Based Training',
    'E-Collar Training',
    'Other'
  ];
  
  // Facility type options
  const facilityTypeOptions = [
    'Training Center',
    'Indoor Facility',
    'Outdoor Training Area',
    'Boarding & Training Facility',
    'Retail Store with Training Area',
    'Other'
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
            <div className="text-sm text-gray-500">Training Practice Details</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Training Practice Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your training qualifications, methods, and specializations
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
            {/* Training Qualifications Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Training Qualifications
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
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                  <label htmlFor="trainingMethodology" className="block text-sm font-medium text-gray-700">
                    Primary Training Methodology <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="trainingMethodology"
                      name="trainingMethodology"
                      value={formData.trainingMethodology}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.trainingMethodology ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select primary methodology</option>
                      {methodologyOptions.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.trainingMethodology && (
                    <p className="mt-1 text-sm text-red-600">{errors.trainingMethodology}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="yearsTrainingExperience" className="block text-sm font-medium text-gray-700">
                    Years of Training Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="yearsTrainingExperience"
                      name="yearsTrainingExperience"
                      min="0"
                      value={formData.yearsTrainingExperience}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.yearsTrainingExperience ? 'border-red-300' : ''
                      }`}
                      placeholder="5"
                    />
                  </div>
                  {errors.yearsTrainingExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.yearsTrainingExperience}</p>
                  )}
                </div>
              </div>
            </section>
            
            {/* Training Specializations Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Training Specializations & Services
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations <span className="text-red-500">*</span>
                </label>
                
                {errors.specializations && (
                  <p className="mb-2 text-sm text-red-600">{errors.specializations}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="spec-obedience"
                      name="specializations.obedienceTraining"
                      type="checkbox"
                      checked={formData.specializations.obedienceTraining}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-obedience" className="ml-2 text-sm text-gray-700">
                      Obedience Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-behavior"
                      name="specializations.behaviorModification"
                      type="checkbox"
                      checked={formData.specializations.behaviorModification}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-behavior" className="ml-2 text-sm text-gray-700">
                      Behavior Modification
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-puppy"
                      name="specializations.puppyTraining"
                      type="checkbox"
                      checked={formData.specializations.puppyTraining}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-puppy" className="ml-2 text-sm text-gray-700">
                      Puppy Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-agility"
                      name="specializations.agility"
                      type="checkbox"
                      checked={formData.specializations.agility}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-agility" className="ml-2 text-sm text-gray-700">
                      Agility Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-service"
                      name="specializations.serviceAnimalTraining"
                      type="checkbox"
                      checked={formData.specializations.serviceAnimalTraining}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-service" className="ml-2 text-sm text-gray-700">
                      Service Animal Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-therapy"
                      name="specializations.therapy"
                      type="checkbox"
                      checked={formData.specializations.therapy}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-therapy" className="ml-2 text-sm text-gray-700">
                      Therapy Dog Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-protection"
                      name="specializations.protection"
                      type="checkbox"
                      checked={formData.specializations.protection}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-protection" className="ml-2 text-sm text-gray-700">
                      Protection Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-other"
                      name="specializations.other"
                      type="checkbox"
                      checked={formData.specializations.other}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                
                {formData.specializations.other && (
                  <div className="mt-2">
                    <label htmlFor="otherSpecializations" className="block text-sm font-medium text-gray-700">
                      Other Specializations
                    </label>
                    <input
                      type="text"
                      id="otherSpecializations"
                      name="otherSpecializations"
                      value={formData.otherSpecializations}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherSpecializations ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other specializations"
                    />
                    {errors.otherSpecializations && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherSpecializations}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Settings <span className="text-red-500">*</span>
                </label>
                
                {errors.trainingSettings && (
                  <p className="mb-2 text-sm text-red-600">{errors.trainingSettings}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="setting-inhome"
                      name="trainingSettings.inHome"
                      type="checkbox"
                      checked={formData.trainingSettings.inHome}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setting-inhome" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHome className="mr-1 text-gray-500" /> In-Home Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="setting-group"
                      name="trainingSettings.groupClasses"
                      type="checkbox"
                      checked={formData.trainingSettings.groupClasses}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setting-group" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaUsers className="mr-1 text-gray-500" /> Group Classes
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="setting-board"
                      name="trainingSettings.boardAndTrain"
                      type="checkbox"
                      checked={formData.trainingSettings.boardAndTrain}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setting-board" className="ml-2 text-sm text-gray-700">
                      Board & Train
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="setting-day"
                      name="trainingSettings.dayTraining"
                      type="checkbox"
                      checked={formData.trainingSettings.dayTraining}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setting-day" className="ml-2 text-sm text-gray-700">
                      Day Training
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="setting-virtual"
                      name="trainingSettings.virtual"
                      type="checkbox"
                      checked={formData.trainingSettings.virtual}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="setting-virtual" className="ml-2 text-sm text-gray-700">
                      Virtual Training
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Groups <span className="text-red-500">*</span>
                  </label>
                  
                  {errors.ageGroups && (
                    <p className="mb-2 text-sm text-red-600">{errors.ageGroups}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="age-puppies"
                        name="ageGroups.puppies"
                        type="checkbox"
                        checked={formData.ageGroups.puppies}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="age-puppies" className="ml-2 text-sm text-gray-700">
                        Puppies (0-6 months)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="age-adolescent"
                        name="ageGroups.adolescent"
                        type="checkbox"
                        checked={formData.ageGroups.adolescent}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="age-adolescent" className="ml-2 text-sm text-gray-700">
                        Adolescent (6-18 months)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="age-adult"
                        name="ageGroups.adult"
                        type="checkbox"
                        checked={formData.ageGroups.adult}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="age-adult" className="ml-2 text-sm text-gray-700">
                        Adult (18 months-7 years)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="age-senior"
                        name="ageGroups.senior"
                        type="checkbox"
                        checked={formData.ageGroups.senior}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="age-senior" className="ml-2 text-sm text-gray-700">
                        Senior (7+ years)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dog Sizes <span className="text-red-500">*</span>
                  </label>
                  
                  {errors.dogSizes && (
                    <p className="mb-2 text-sm text-red-600">{errors.dogSizes}</p>
                  )}
                  
                  <div className="space-y-2">
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
              </div>
            </section>
            
            {/* Facility Information Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Facility Information (if applicable)
              </h3>
              
              <div className="flex items-center mb-4">
                <input
                  id="hasFacility"
                  name="hasFacility"
                  type="checkbox"
                  checked={formData.hasFacility}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="hasFacility" className="ml-2 text-sm text-gray-700">
                  I have a dedicated training facility
                </label>
              </div>
              
              {formData.hasFacility && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700">
                      Facility Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="facilityType"
                        name="facilityDetails.facilityType"
                        value={formData.facilityDetails.facilityType}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['facilityDetails.facilityType'] ? 'border-red-300' : ''
                        }`}
                      >
                        <option value="">Select facility type</option>
                        {facilityTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors['facilityDetails.facilityType'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['facilityDetails.facilityType']}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="facilitySize" className="block text-sm font-medium text-gray-700">
                      Facility Size <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="facilitySize"
                        name="facilityDetails.facilitySize"
                        value={formData.facilityDetails.facilitySize}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['facilityDetails.facilitySize'] ? 'border-red-300' : ''
                        }`}
                        placeholder="e.g., 2,000 sq ft"
                      />
                    </div>
                    {errors['facilityDetails.facilitySize'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['facilityDetails.facilitySize']}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <input
                          id="indoorTrainingArea"
                          name="facilityDetails.indoorTrainingArea"
                          type="checkbox"
                          checked={formData.facilityDetails.indoorTrainingArea}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="indoorTrainingArea" className="ml-2 text-sm text-gray-700">
                          Indoor Training Area
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="outdoorTrainingArea"
                          name="facilityDetails.outdoorTrainingArea"
                          type="checkbox"
                          checked={formData.facilityDetails.outdoorTrainingArea}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="outdoorTrainingArea" className="ml-2 text-sm text-gray-700">
                          Outdoor Training Area
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="maxGroupSize" className="block text-sm font-medium text-gray-700">
                      Maximum Group Class Size <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="maxGroupSize"
                        name="facilityDetails.maxGroupSize"
                        min="1"
                        value={formData.facilityDetails.maxGroupSize}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['facilityDetails.maxGroupSize'] ? 'border-red-300' : ''
                        }`}
                        placeholder="8"
                      />
                    </div>
                    {errors['facilityDetails.maxGroupSize'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['facilityDetails.maxGroupSize']}</p>
                    )}
                  </div>
                </div>
              )}
            </section>
            
            {/* Training Philosophy Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Training Philosophy
              </h3>
              
              <div>
                <label htmlFor="trainingPhilosophy" className="block text-sm font-medium text-gray-700">
                  Training Philosophy & Approach <span className="text-red-500">*</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  Describe your training philosophy, approach, and what makes your training services unique.
                </p>
                <div className="mt-1">
                  <textarea
                    id="trainingPhilosophy"
                    name="trainingPhilosophy"
                    rows={4}
                    value={formData.trainingPhilosophy}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.trainingPhilosophy ? 'border-red-300' : ''
                    }`}
                    placeholder="Describe your training philosophy, methods, and what pet owners can expect..."
                  />
                </div>
                <div className="mt-1 flex justify-between">
                  {errors.trainingPhilosophy ? (
                    <p className="text-sm text-red-600">{errors.trainingPhilosophy}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Minimum 50 characters. Be sure to highlight your approach and what makes your training unique.
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.trainingPhilosophy.length} characters
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

export default TrainerDetails;