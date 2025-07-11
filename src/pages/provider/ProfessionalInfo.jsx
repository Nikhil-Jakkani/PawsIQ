import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaGlobe, 
  FaClock, 
  FaImage, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "/1.svg";

const ProfessionalInfo = () => {
  const navigate = useNavigate();
  
  // Check if registration data exists
  useEffect(() => {
    const registrationData = localStorage.getItem('provider_registration');
    if (!registrationData) {
      // Redirect to sign up if no registration data
      navigate('/provider/signup');
    } else {
      // Load existing data if available
      const professionalData = localStorage.getItem('provider_professional_info');
      if (professionalData) {
        setFormData(JSON.parse(professionalData));
      }
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Professional Information
    displayName: '',
    professionalTitle: '',
    yearsOfExperience: '',
    bio: '',
    profilePhoto: null,
    profilePhotoPreview: null,
    
    // Provider Type (Business or Freelancer)
    providerCategory: 'freelancer', // 'business' or 'freelancer'
    
    // Business Information
    businessName: '',
    businessAddress: {
      street: '',
      city: '',
      state: '',
      pinCode: '',
      country: 'India'
    },
    businessPhone: '',
    businessWebsite: '',
    businessHours: {
      monday: { open: '09:00', close: '17:00', isClosed: false },
      tuesday: { open: '09:00', close: '17:00', isClosed: false },
      wednesday: { open: '09:00', close: '17:00', isClosed: false },
      thursday: { open: '09:00', close: '17:00', isClosed: false },
      friday: { open: '09:00', close: '17:00', isClosed: false },
      saturday: { open: '10:00', close: '15:00', isClosed: false },
      sunday: { open: '10:00', close: '15:00', isClosed: true }
    },
    serviceRadius: 10,
    
    // Social Media
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
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
  
  // Handle business hours changes
  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };
  
  // Handle business address changes
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      businessAddress: {
        ...prev.businessAddress,
        [field]: value
      }
    }));
  };
  
  // Handle social media changes
  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };
  
  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size must be less than 5MB'
        }));
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File must be JPG, PNG, or GIF'
        }));
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.profilePhoto) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: ''
        }));
      }
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Get provider type from registration data
    const registrationData = JSON.parse(localStorage.getItem('provider_registration') || '{}');
    const isVeterinarian = registrationData.providerType === 'Veterinarian';
    
    // Professional Information validation
    if (!formData.displayName) {
      newErrors.displayName = 'Professional name is required';
    }
    
    if (!formData.professionalTitle) {
      newErrors.professionalTitle = 'Professional title is required';
    }
    
    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } else if (formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Years of experience cannot be negative';
    }
    
    if (!formData.bio) {
      newErrors.bio = 'Professional bio is required';
    } else if (formData.bio.length < 50) {
      newErrors.bio = 'Bio must be at least 50 characters';
    }
    
    // Business Information validation - Only required for veterinarians or if provider category is 'business'
    if (isVeterinarian || formData.providerCategory === 'business') {
      if (!formData.businessName) {
        newErrors.businessName = 'Business name is required';
      }
      
      if (!formData.businessAddress.street) {
        newErrors['businessAddress.street'] = 'Street address is required';
      }
      
      if (!formData.businessAddress.city) {
        newErrors['businessAddress.city'] = 'City is required';
      }
      
      if (!formData.businessAddress.state) {
        newErrors['businessAddress.state'] = 'State is required';
      }
      
      if (!formData.businessAddress.pinCode) {
        newErrors['businessAddress.pinCode'] = 'PIN code is required';
      }
      
      if (!formData.businessPhone && !formData.businessWebsite) {
        newErrors.businessPhone = 'At least one contact method is required';
        newErrors.businessWebsite = 'At least one contact method is required';
      }
    }
    
    // Check if at least one day has business hours
    const hasBusinessHours = Object.values(formData.businessHours).some(day => !day.isClosed);
    if (!hasBusinessHours) {
      newErrors.businessHours = 'Business hours must be set for at least one day';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving professional info as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_professional_info', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 2
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
      console.log('Submitting professional info:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_professional_info', JSON.stringify(formData));
      
      // Get registration data and provider type
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      const providerType = registrationData.providerType;
      
      // Update registration step
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 2
      }));
      
      // Navigate to the appropriate service-specific page based on provider type
      switch (providerType) {
        case 'Veterinarian':
          navigate('/provider/onboarding/veterinarian-details');
          break;
        case 'Trainer':
          navigate('/provider/onboarding/trainer-details');
          break;
        case 'Groomer':
          navigate('/provider/onboarding/groomer-details');
          break;
        case 'Pet Sitter':
          navigate('/provider/onboarding/pet-sitter-details');
          break;
        default:
          // Default to document upload if provider type is unknown
          navigate('/provider/onboarding/document-upload');
      }
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
  
  // Days of the week for business hours
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
            <div className="text-sm text-indigo-600 font-medium">Step 2 of 8</div>
            <div className="text-sm text-gray-500">Professional Information</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Professional Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your professional background and business details
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
            {/* Professional Information Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Professional Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                    Professional Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.displayName ? 'border-red-300' : ''
                      }`}
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  {errors.displayName && (
                    <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    This is how your name will appear to pet owners
                  </p>
                </div>
                
                <div>
                  <label htmlFor="professionalTitle" className="block text-sm font-medium text-gray-700">
                    Professional Title <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="professionalTitle"
                      name="professionalTitle"
                      value={formData.professionalTitle}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.professionalTitle ? 'border-red-300' : ''
                      }`}
                      placeholder="Veterinarian, Dog Trainer, etc."
                    />
                  </div>
                  {errors.professionalTitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.professionalTitle}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      min="0"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.yearsOfExperience ? 'border-red-300' : ''
                      }`}
                      placeholder="5"
                    />
                  </div>
                  {errors.yearsOfExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border ${
                        formData.profilePhotoPreview ? 'border-indigo-500' : 'border-gray-300'
                      }`}>
                        {formData.profilePhotoPreview ? (
                          <img 
                            src={formData.profilePhotoPreview} 
                            alt="Profile Preview" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaUser className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="photo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload a photo</span>
                        <input 
                          id="photo-upload" 
                          name="photo-upload" 
                          type="file" 
                          className="sr-only"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG or GIF. Max 5MB.
                      </p>
                    </div>
                  </div>
                  {errors.profilePhoto && (
                    <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Professional Bio <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.bio ? 'border-red-300' : ''
                    }`}
                    placeholder="Tell pet owners about your experience, qualifications, and approach to pet care..."
                  />
                </div>
                <div className="mt-1 flex justify-between">
                  {errors.bio ? (
                    <p className="text-sm text-red-600">{errors.bio}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Minimum 50 characters. Be sure to highlight your expertise and what makes your services unique.
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.bio.length} characters
                  </p>
                </div>
              </div>
            </section>
            
            {/* Provider Category Selection */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Provider Category
              </h3>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How would you like to operate?
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div 
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.providerCategory === 'freelancer' 
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, providerCategory: 'freelancer' }))}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="freelancer"
                          name="providerCategory"
                          type="radio"
                          value="freelancer"
                          checked={formData.providerCategory === 'freelancer'}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="freelancer" className="font-medium text-gray-700">
                          Individual/Freelancer
                        </label>
                        <p className="text-gray-500">
                          Work independently without a business setup
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.providerCategory === 'business' 
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, providerCategory: 'business' }))}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="business"
                          name="providerCategory"
                          type="radio"
                          value="business"
                          checked={formData.providerCategory === 'business'}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="business" className="font-medium text-gray-700">
                          Business/Clinic
                        </label>
                        <p className="text-gray-500">
                          Operate as a registered business entity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Information Section */}
            {(formData.providerCategory === 'business' || (() => {
              const registrationData = JSON.parse(localStorage.getItem('provider_registration') || '{}');
              return registrationData.providerType === 'Veterinarian';
            })()) && (
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.businessName ? 'border-red-300' : ''
                      }`}
                      placeholder="Happy Paws Veterinary Clinic"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="street" className="sr-only">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.businessAddress.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['businessAddress.street'] ? 'border-red-300' : ''
                        }`}
                        placeholder="Street Address"
                      />
                      {errors['businessAddress.street'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['businessAddress.street']}</p>
                      )}
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="city" className="sr-only">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.businessAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['businessAddress.city'] ? 'border-red-300' : ''
                        }`}
                        placeholder="City"
                      />
                      {errors['businessAddress.city'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['businessAddress.city']}</p>
                      )}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="sr-only">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.businessAddress.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['businessAddress.state'] ? 'border-red-300' : ''
                        }`}
                        placeholder="State"
                      />
                      {errors['businessAddress.state'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['businessAddress.state']}</p>
                      )}
                    </div>
                    
                    <div className="sm:col-span-1">
                      <label htmlFor="pinCode" className="sr-only">PIN Code</label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={formData.businessAddress.pinCode}
                        onChange={(e) => handleAddressChange('pinCode', e.target.value)}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors['businessAddress.pinCode'] ? 'border-red-300' : ''
                        }`}
                        placeholder="PIN Code"
                      />
                      {errors['businessAddress.pinCode'] && (
                        <p className="mt-1 text-sm text-red-600">{errors['businessAddress.pinCode']}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700">
                    Business Phone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="businessPhone"
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleChange}
                      className={`pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.businessPhone ? 'border-red-300' : ''
                      }`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  {errors.businessPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessPhone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="businessWebsite" className="block text-sm font-medium text-gray-700">
                    Business Website
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="businessWebsite"
                      name="businessWebsite"
                      value={formData.businessWebsite}
                      onChange={handleChange}
                      className={`pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.businessWebsite ? 'border-red-300' : ''
                      }`}
                      placeholder="https://www.example.com"
                    />
                  </div>
                  {errors.businessWebsite && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessWebsite}</p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Hours <span className="text-red-500">*</span>
                  </label>
                  
                  {errors.businessHours && (
                    <p className="mb-2 text-sm text-red-600">{errors.businessHours}</p>
                  )}
                  
                  <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Day
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Closed
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
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={formData.businessHours[day.id].open}
                                  onChange={(e) => handleHoursChange(day.id, 'open', e.target.value)}
                                  disabled={formData.businessHours[day.id].isClosed}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                />
                                <span>to</span>
                                <input
                                  type="time"
                                  value={formData.businessHours[day.id].close}
                                  onChange={(e) => handleHoursChange(day.id, 'close', e.target.value)}
                                  disabled={formData.businessHours[day.id].isClosed}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              <input
                                type="checkbox"
                                checked={formData.businessHours[day.id].isClosed}
                                onChange={(e) => handleHoursChange(day.id, 'isClosed', e.target.checked)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="serviceRadius" className="block text-sm font-medium text-gray-700">
                    Service Area Radius (miles) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="serviceRadius"
                      name="serviceRadius"
                      min="1"
                      max="100"
                      value={formData.serviceRadius}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    How far are you willing to travel to provide services?
                  </p>
                </div>
              </div>
            </section>
            )}
            {/* Social Media Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Social Media (Optional)
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFacebook className="h-4 w-4 text-blue-600" />
                    </div>
                    <input
                      type="url"
                      id="facebook"
                      name="facebook"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      className="pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInstagram className="h-4 w-4 text-pink-600" />
                    </div>
                    <input
                      type="url"
                      id="instagram"
                      name="instagram"
                      value={formData.socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      className="pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                    Twitter/X
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTwitter className="h-4 w-4 text-blue-400" />
                    </div>
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      className="pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://twitter.com/yourbusiness"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLinkedin className="h-4 w-4 text-blue-700" />
                    </div>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                      className="pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://linkedin.com/in/yourbusiness"
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link
                to="/provider/signup"
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

export default ProfessionalInfo;