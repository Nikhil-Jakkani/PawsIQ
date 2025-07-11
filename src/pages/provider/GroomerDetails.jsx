import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaCut, 
  FaDog, 
  FaCat, 
  FaShower, 
  FaSprayCan, 
  FaClipboardCheck, 
  FaBuilding,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "/1.svg";

const GroomerDetails = () => {
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
    if (parsedData.providerType !== 'Groomer') {
      // Redirect to appropriate page if not a groomer
      navigate('/provider/onboarding/professional-info');
      return;
    }
    
    // Load existing data if available
    const groomerData = localStorage.getItem('provider_groomer_details');
    if (groomerData) {
      setFormData(JSON.parse(groomerData));
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Grooming Qualifications
    certifications: [],
    otherCertifications: '',
    yearsGroomingExperience: '',
    specializations: {
      basicGrooming: true,
      fullService: false,
      breedSpecific: false,
      handStripping: false,
      showGrooming: false,
      creativeGrooming: false,
      catGrooming: false,
      other: false
    },
    otherSpecializations: '',
    
    // Services Offered
    servicesOffered: {
      bath: true,
      haircut: true,
      nailTrim: true,
      earCleaning: true,
      teethBrushing: false,
      deShedding: false,
      deMat: false,
      flea: false,
      anal: false,
      other: false
    },
    otherServices: '',
    
    // Pets Serviced
    petsServiced: {
      dogs: true,
      cats: false,
      smallAnimals: false,
      other: false
    },
    otherPets: '',
    dogSizes: {
      small: true,
      medium: true,
      large: true,
      giant: false
    },
    breedSpecialties: '',
    
    // Facility Information
    serviceLocation: {
      salon: false,
      mobile: false,
      homeStudio: false,
      houseCalls: false
    },
    salonDetails: {
      cageFree: false,
      separateCatArea: false,
      separateSmallDogArea: false,
      useOfCrates: false,
      maxPetsPerDay: ''
    },
    
    // Equipment & Products
    equipmentUsed: '',
    productsUsed: ''
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
  
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.yearsGroomingExperience && formData.yearsGroomingExperience < 0) {
      newErrors.yearsGroomingExperience = 'Years of experience cannot be negative';
    }
    
    if (formData.specializations.other && !formData.otherSpecializations) {
      newErrors.otherSpecializations = 'Please specify other specializations';
    }
    

    if (formData.servicesOffered.other && !formData.otherServices) {
      newErrors.otherServices = 'Please specify other services';
    }
    
    if (formData.petsServiced.other && !formData.otherPets) {
      newErrors.otherPets = 'Please specify other pet types';
    }
    

    if (formData.serviceLocation.salon && !formData.salonDetails.maxPetsPerDay) {
      newErrors['salonDetails.maxPetsPerDay'] = 'Maximum pets per day is required for salon services';
    }
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving groomer details as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_groomer_details', JSON.stringify(formData));
      
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
      console.log('Submitting groomer details:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_groomer_details', JSON.stringify(formData));
      
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
  
  // Certification options - Updated for Indian market
  const certificationOptions = [
    'Pet Grooming Certification from Indian Institutes',
    'Professional Pet Grooming Course - India',
    'Animal Welfare Board of India (AWBI) Training',
    'Pet Care and Grooming Certification',
    'International Pet Grooming Certification',
    'Dog Grooming Workshop Certificate',
    'Cat Grooming Specialist Certificate',
    'Basic Pet Handling and Grooming Course',
    'Advanced Pet Styling and Grooming'
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
            <div className="text-sm text-gray-500">Grooming Practice Details</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Grooming Practice Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your grooming qualifications, services, and specializations
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
            {/* Grooming Qualifications Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Grooming Qualifications
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
                <label htmlFor="yearsGroomingExperience" className="block text-sm font-medium text-gray-700">
                  Years of Grooming Experience
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="yearsGroomingExperience"
                    name="yearsGroomingExperience"
                    min="0"
                    value={formData.yearsGroomingExperience}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.yearsGroomingExperience ? 'border-red-300' : ''
                    }`}
                    placeholder="5"
                  />
                </div>
                {errors.yearsGroomingExperience && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearsGroomingExperience}</p>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grooming Specializations
                </label>
                
                {errors.specializations && (
                  <p className="mb-2 text-sm text-red-600">{errors.specializations}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="spec-basic"
                      name="specializations.basicGrooming"
                      type="checkbox"
                      checked={formData.specializations.basicGrooming}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-basic" className="ml-2 text-sm text-gray-700">
                      Basic Grooming
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-full"
                      name="specializations.fullService"
                      type="checkbox"
                      checked={formData.specializations.fullService}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-full" className="ml-2 text-sm text-gray-700">
                      Full-Service Grooming
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-breed"
                      name="specializations.breedSpecific"
                      type="checkbox"
                      checked={formData.specializations.breedSpecific}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-breed" className="ml-2 text-sm text-gray-700">
                      Breed-Specific Styling
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-hand"
                      name="specializations.handStripping"
                      type="checkbox"
                      checked={formData.specializations.handStripping}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-hand" className="ml-2 text-sm text-gray-700">
                      Hand Stripping
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-show"
                      name="specializations.showGrooming"
                      type="checkbox"
                      checked={formData.specializations.showGrooming}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-show" className="ml-2 text-sm text-gray-700">
                      Show Grooming
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-creative"
                      name="specializations.creativeGrooming"
                      type="checkbox"
                      checked={formData.specializations.creativeGrooming}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-creative" className="ml-2 text-sm text-gray-700">
                      Creative Grooming
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="spec-cat"
                      name="specializations.catGrooming"
                      type="checkbox"
                      checked={formData.specializations.catGrooming}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="spec-cat" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaCat className="mr-1 text-gray-500" /> Cat Grooming
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
            </section>
            
            {/* Services Offered Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Services Offered
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grooming Services
                </label>
                
                {errors.servicesOffered && (
                  <p className="mb-2 text-sm text-red-600">{errors.servicesOffered}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="service-bath"
                      name="servicesOffered.bath"
                      type="checkbox"
                      checked={formData.servicesOffered.bath}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-bath" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaShower className="mr-1 text-gray-500" /> Bath & Brush
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-haircut"
                      name="servicesOffered.haircut"
                      type="checkbox"
                      checked={formData.servicesOffered.haircut}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-haircut" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaCut className="mr-1 text-gray-500" /> Haircut
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-nail"
                      name="servicesOffered.nailTrim"
                      type="checkbox"
                      checked={formData.servicesOffered.nailTrim}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-nail" className="ml-2 text-sm text-gray-700">
                      Nail Trim
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-ear"
                      name="servicesOffered.earCleaning"
                      type="checkbox"
                      checked={formData.servicesOffered.earCleaning}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-ear" className="ml-2 text-sm text-gray-700">
                      Ear Cleaning
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-teeth"
                      name="servicesOffered.teethBrushing"
                      type="checkbox"
                      checked={formData.servicesOffered.teethBrushing}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-teeth" className="ml-2 text-sm text-gray-700">
                      Teeth Brushing
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-deshed"
                      name="servicesOffered.deShedding"
                      type="checkbox"
                      checked={formData.servicesOffered.deShedding}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-deshed" className="ml-2 text-sm text-gray-700">
                      De-Shedding Treatment
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-demat"
                      name="servicesOffered.deMat"
                      type="checkbox"
                      checked={formData.servicesOffered.deMat}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-demat" className="ml-2 text-sm text-gray-700">
                      De-Matting
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-flea"
                      name="servicesOffered.flea"
                      type="checkbox"
                      checked={formData.servicesOffered.flea}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-flea" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaSprayCan className="mr-1 text-gray-500" /> Flea Treatment
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-anal"
                      name="servicesOffered.anal"
                      type="checkbox"
                      checked={formData.servicesOffered.anal}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-anal" className="ml-2 text-sm text-gray-700">
                      Anal Gland Expression
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
                  Pet Types
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
              
              <div className="mt-6">
                <label htmlFor="breedSpecialties" className="block text-sm font-medium text-gray-700">
                  Breed Specialties (if any)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="breedSpecialties"
                    name="breedSpecialties"
                    value={formData.breedSpecialties}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Poodles, Schnauzers, Bichon Frise, etc."
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  List any breeds you specialize in or have extensive experience with
                </p>
              </div>
            </section>
            
            {/* Facility Information Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Service Location & Facility
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Location
                </label>
                
                {errors.serviceLocation && (
                  <p className="mb-2 text-sm text-red-600">{errors.serviceLocation}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex items-center">
                    <input
                      id="location-salon"
                      name="serviceLocation.salon"
                      type="checkbox"
                      checked={formData.serviceLocation.salon}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="location-salon" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaBuilding className="mr-1 text-gray-500" /> Grooming Salon
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="location-mobile"
                      name="serviceLocation.mobile"
                      type="checkbox"
                      checked={formData.serviceLocation.mobile}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="location-mobile" className="ml-2 text-sm text-gray-700">
                      Mobile Grooming
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="location-home"
                      name="serviceLocation.homeStudio"
                      type="checkbox"
                      checked={formData.serviceLocation.homeStudio}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="location-home" className="ml-2 text-sm text-gray-700">
                      Home Studio
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="location-house"
                      name="serviceLocation.houseCalls"
                      type="checkbox"
                      checked={formData.serviceLocation.houseCalls}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="location-house" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHome className="mr-1 text-gray-500" /> House Calls
                    </label>
                  </div>
                </div>
              </div>
              
              {(formData.serviceLocation.salon || formData.serviceLocation.homeStudio) && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salon/Studio Details
                  </label>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center">
                      <input
                        id="salon-cagefree"
                        name="salonDetails.cageFree"
                        type="checkbox"
                        checked={formData.salonDetails.cageFree}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="salon-cagefree" className="ml-2 text-sm text-gray-700">
                        Cage-Free Facility
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="salon-catarea"
                        name="salonDetails.separateCatArea"
                        type="checkbox"
                        checked={formData.salonDetails.separateCatArea}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="salon-catarea" className="ml-2 text-sm text-gray-700">
                        Separate Cat Area
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="salon-smalldog"
                        name="salonDetails.separateSmallDogArea"
                        type="checkbox"
                        checked={formData.salonDetails.separateSmallDogArea}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="salon-smalldog" className="ml-2 text-sm text-gray-700">
                        Separate Small Dog Area
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="salon-crates"
                        name="salonDetails.useOfCrates"
                        type="checkbox"
                        checked={formData.salonDetails.useOfCrates}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="salon-crates" className="ml-2 text-sm text-gray-700">
                        Use of Crates/Kennels
                      </label>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="maxPetsPerDay" className="block text-sm font-medium text-gray-700">
                        Maximum Pets Per Day
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="maxPetsPerDay"
                          name="salonDetails.maxPetsPerDay"
                          min="1"
                          value={formData.salonDetails.maxPetsPerDay}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                            errors['salonDetails.maxPetsPerDay'] ? 'border-red-300' : ''
                          }`}
                          placeholder="8"
                        />
                      </div>
                      {errors['salonDetails.maxPetsPerDay'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['salonDetails.maxPetsPerDay']}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
            
            {/* Equipment & Products Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Equipment & Products
              </h3>
              
              <div>
                <label htmlFor="equipmentUsed" className="block text-sm font-medium text-gray-700">
                  Equipment Used
                </label>
                <div className="mt-1">
                  <textarea
                    id="equipmentUsed"
                    name="equipmentUsed"
                    rows={3}
                    value={formData.equipmentUsed}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.equipmentUsed ? 'border-red-300' : ''
                    }`}
                    placeholder="Describe the grooming equipment you use (clippers, scissors, dryers, etc.)"
                  />
                </div>
                {errors.equipmentUsed && (
                  <p className="mt-1 text-sm text-red-600">{errors.equipmentUsed}</p>
                )}
              </div>
              
              <div className="mt-6">
                <label htmlFor="productsUsed" className="block text-sm font-medium text-gray-700">
                  Products Used
                </label>
                <div className="mt-1">
                  <textarea
                    id="productsUsed"
                    name="productsUsed"
                    rows={3}
                    value={formData.productsUsed}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.productsUsed ? 'border-red-300' : ''
                    }`}
                    placeholder="Describe the grooming products you use (shampoos, conditioners, etc.)"
                  />
                </div>
                {errors.productsUsed && (
                  <p className="mt-1 text-sm text-red-600">{errors.productsUsed}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Include information about any specialty, natural, or hypoallergenic products you use
                </p>
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

export default GroomerDetails;