import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaStethoscope, 
  FaGraduationCap, 
  FaHospital, 
  FaDog, 
  FaCat, 
  FaKiwiBird, 
  FaDragon, 
  FaHorse,
  FaSyringe,
  FaTooth,
  FaAmbulance,
  FaVideo,
  FaHome,
  FaXRay,
  FaVial,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "/1.svg";

const VeterinarianDetails = () => {
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
    if (parsedData.providerType !== 'Veterinarian') {
      // Redirect to appropriate page if not a veterinarian
      navigate('/provider/onboarding/professional-info');
      return;
    }
    
    // Load existing data if available
    const vetData = localStorage.getItem('provider_veterinarian_details');
    if (vetData) {
      setFormData(JSON.parse(vetData));
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    // Veterinary Qualifications
    vciRegistrationNumber: '',
    stateVeterinaryCouncilNumber: '',
    stateCouncilName: '',
    veterinaryCollege: '',
    universityName: '',
    graduationYear: '',
    additionalQualifications: [],
    professionalMemberships: [],
    otherMemberships: '',
    
    // Practice Details
    practiceType: '',
    speciesTreated: {
      dogs: true,
      cats: true,
      birds: false,
      cattle: false,
      buffalo: false,
      sheep: false,
      goats: false,
      poultry: false,
      exoticPets: false,
      other: false
    },
    otherSpecies: '',
    servicesOffered: {
      wellnessExams: true,
      vaccinations: true,
      surgery: false,
      dentalCare: false,
      emergencyServices: false,
      livestockTreatment: false,
      ayurvedicTreatments: false,
      telemedicine: false,
      houseCalls: false,
      other: false
    },
    specializedTreatmentsDetails: '',
    otherServicesDetails: '',
    
    // Facility Information
    facilityType: '',
    equipment: {
      xray: false,
      ultrasound: false,
      laboratory: false,
      surgerySuite: false,
      inPatientWards: false,
      livestockFacilities: false,
      other: false
    },
    otherEquipment: '',
    
    // Regulatory Compliance
    drugLicenseNumber: '',
    shopEstablishmentNumber: '',
    biomedicalWasteRegistration: false
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
        [name]: value
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
    
    // Veterinary Qualifications validation
    if (!formData.vciRegistrationNumber) {
      newErrors.vciRegistrationNumber = 'VCI registration number is required';
    } else if (!/^\d{1,6}\/\d{2,4}$/.test(formData.vciRegistrationNumber)) {
      newErrors.vciRegistrationNumber = 'Please enter a valid VCI registration number (format: XXXXXX/YYYY)';
    }
    
    if (!formData.stateVeterinaryCouncilNumber) {
      newErrors.stateVeterinaryCouncilNumber = 'State Veterinary Council registration number is required';
    }
    
    if (!formData.stateCouncilName) {
      newErrors.stateCouncilName = 'State Veterinary Council name is required';
    }
    
    if (!formData.veterinaryCollege) {
      newErrors.veterinaryCollege = 'Veterinary college name is required';
    }
    
    if (!formData.universityName) {
      newErrors.universityName = 'University name is required';
    }
    
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    } else if (formData.graduationYear < 1950 || formData.graduationYear > new Date().getFullYear()) {
      newErrors.graduationYear = 'Please enter a valid graduation year';
    }
    
    // Practice Details validation
    if (!formData.practiceType) {
      newErrors.practiceType = 'Practice type is required';
    }
    
    // Check if at least one species is selected
    const hasSpecies = Object.values(formData.speciesTreated).some(value => value === true);
    if (!hasSpecies) {
      newErrors.speciesTreated = 'At least one species must be selected';
    }
    
    // Check if "other" species is selected but no details provided
    if (formData.speciesTreated.other && !formData.otherSpecies) {
      newErrors.otherSpecies = 'Please specify other species';
    }
    
    // Check if at least one service is selected
    const hasServices = Object.values(formData.servicesOffered).some(value => value === true);
    if (!hasServices) {
      newErrors.servicesOffered = 'At least one service must be selected';
    }
    
    // Check if "ayurvedic treatments" is selected but no details provided
    if (formData.servicesOffered.ayurvedicTreatments && !formData.specializedTreatmentsDetails) {
      newErrors.specializedTreatmentsDetails = 'Please specify ayurvedic treatments offered';
    }
    
    // Check if "other services" is selected but no details provided
    if (formData.servicesOffered.other && !formData.otherServicesDetails) {
      newErrors.otherServicesDetails = 'Please specify other services';
    }
    
    // Facility Information validation
    if (!formData.facilityType) {
      newErrors.facilityType = 'Facility type is required';
    }
    
    // Check if "other equipment" is selected but no details provided
    if (formData.equipment.other && !formData.otherEquipment) {
      newErrors.otherEquipment = 'Please specify other equipment';
    }
    
    // Regulatory Compliance validation
    if (formData.facilityType !== 'Mobile' && formData.facilityType !== 'Home visits only' && !formData.shopEstablishmentNumber) {
      newErrors.shopEstablishmentNumber = 'Shop & Establishment registration number is required for clinic/hospital facilities';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving veterinarian details as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_veterinarian_details', JSON.stringify(formData));
      
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
      console.log('Submitting veterinarian details:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_veterinarian_details', JSON.stringify(formData));
      
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
  
  // Additional qualifications options
  const boardCertificationOptions = [
    'MVSc (Master of Veterinary Science)',
    'PhD in Veterinary Science',
    'Diploma in Animal Husbandry',
    'PG Diploma in Wildlife Health Management',
    'Certificate in Veterinary Acupuncture',
    'Certificate in Veterinary Ayurveda',
    'Specialization in Veterinary Surgery',
    'Specialization in Veterinary Medicine',
    'Specialization in Animal Reproduction',
    'Specialization in Veterinary Pathology',
    'Specialization in Veterinary Public Health'
  ];
  
  // Professional membership options
  const professionalMembershipOptions = [
    'Indian Veterinary Association (IVA)',
    'Veterinary Council of India (VCI)',
    'Indian Society for Veterinary Surgery (ISVS)',
    'Indian Association for the Advancement of Veterinary Research (IAAVR)',
    'Indian Society of Veterinary Medicine (ISVM)',
    'Pet Practitioners Association of India (PPAI)',
    'Indian Association of Veterinary Pathologists (IAVP)',
    'Indian Society for Study of Animal Reproduction (ISSAR)',
    'Indian Society of Veterinary Pharmacology and Toxicology (ISVPT)',
    'Association of Indian Zoo and Wildlife Veterinarians (AIZWV)'
  ];
  
  // Practice type options
  const practiceTypeOptions = [
    'Small Animal Practice',
    'Large Animal Practice',
    'Mixed Practice',
    'Poultry Practice',
    'Dairy Practice',
    'Exotic Pet Practice',
    'Emergency Care',
    'Mobile Veterinary Unit',
    'Government Veterinary Hospital',
    'Ayurvedic Veterinary Practice',
    'Veterinary Polyclinic'
  ];
  
  // Facility type options
  const facilityTypeOptions = [
    'Private Clinic',
    'Veterinary Hospital',
    'Mobile Practice',
    'Home visits only',
    'Government Veterinary Hospital',
    'Veterinary Polyclinic',
    'Teaching Veterinary Hospital',
    'Animal Birth Control Center',
    'Gau Shala Veterinary Unit'
  ];
  
  // State Veterinary Council options
  const stateCouncilOptions = [
    'Andhra Pradesh Veterinary Council',
    'Arunachal Pradesh Veterinary Council',
    'Assam Veterinary Council',
    'Bihar Veterinary Council',
    'Chhattisgarh Veterinary Council',
    'Delhi Veterinary Council',
    'Goa Veterinary Council',
    'Gujarat Veterinary Council',
    'Haryana Veterinary Council',
    'Himachal Pradesh Veterinary Council',
    'Jammu & Kashmir Veterinary Council',
    'Jharkhand Veterinary Council',
    'Karnataka Veterinary Council',
    'Kerala Veterinary Council',
    'Madhya Pradesh Veterinary Council',
    'Maharashtra Veterinary Council',
    'Manipur Veterinary Council',
    'Meghalaya Veterinary Council',
    'Mizoram Veterinary Council',
    'Nagaland Veterinary Council',
    'Odisha Veterinary Council',
    'Punjab Veterinary Council',
    'Rajasthan Veterinary Council',
    'Sikkim Veterinary Council',
    'Tamil Nadu Veterinary Council',
    'Telangana Veterinary Council',
    'Tripura Veterinary Council',
    'Uttar Pradesh Veterinary Council',
    'Uttarakhand Veterinary Council',
    'West Bengal Veterinary Council'
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
            <div className="text-sm text-gray-500">Veterinary Practice Details</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '37.5%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Veterinary Practice Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your veterinary qualifications, practice, and facilities
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
            {/* Veterinary Qualifications Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Veterinary Qualifications
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="vciRegistrationNumber" className="block text-sm font-medium text-gray-700">
                    VCI Registration Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="vciRegistrationNumber"
                      name="vciRegistrationNumber"
                      value={formData.vciRegistrationNumber}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.vciRegistrationNumber ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., 123456/2020"
                    />
                  </div>
                  {errors.vciRegistrationNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.vciRegistrationNumber}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Format: XXXXXX/YYYY</p>
                </div>
                
                <div>
                  <label htmlFor="stateVeterinaryCouncilNumber" className="block text-sm font-medium text-gray-700">
                    State Veterinary Council Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="stateVeterinaryCouncilNumber"
                      name="stateVeterinaryCouncilNumber"
                      value={formData.stateVeterinaryCouncilNumber}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.stateVeterinaryCouncilNumber ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., SVC/KA/12345/2020"
                    />
                  </div>
                  {errors.stateVeterinaryCouncilNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.stateVeterinaryCouncilNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="stateCouncilName" className="block text-sm font-medium text-gray-700">
                    State Veterinary Council <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="stateCouncilName"
                      name="stateCouncilName"
                      value={formData.stateCouncilName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.stateCouncilName ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select State Council</option>
                      {stateCouncilOptions.map(council => (
                        <option key={council} value={council}>{council}</option>
                      ))}
                    </select>
                  </div>
                  {errors.stateCouncilName && (
                    <p className="mt-1 text-sm text-red-600">{errors.stateCouncilName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="veterinaryCollege" className="block text-sm font-medium text-gray-700">
                    Veterinary College <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="veterinaryCollege"
                      name="veterinaryCollege"
                      value={formData.veterinaryCollege}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.veterinaryCollege ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., Bombay Veterinary College"
                    />
                  </div>
                  {errors.veterinaryCollege && (
                    <p className="mt-1 text-sm text-red-600">{errors.veterinaryCollege}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                    University Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="universityName"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.universityName ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., Maharashtra Animal & Fishery Sciences University"
                    />
                  </div>
                  {errors.universityName && (
                    <p className="mt-1 text-sm text-red-600">{errors.universityName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                    Year of Graduation <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="graduationYear"
                      name="graduationYear"
                      min="1950"
                      max={new Date().getFullYear()}
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.graduationYear ? 'border-red-300' : ''
                      }`}
                      placeholder={new Date().getFullYear().toString()}
                    />
                  </div>
                  {errors.graduationYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Qualifications (if applicable)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {boardCertificationOptions.map((certification) => (
                    <div key={certification} className="flex items-center">
                      <input
                        id={`cert-${certification}`}
                        name={`cert-${certification}`}
                        type="checkbox"
                        checked={formData.additionalQualifications.includes(certification)}
                        onChange={() => handleMultiSelectChange('additionalQualifications', certification)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`cert-${certification}`} className="ml-2 text-sm text-gray-700">
                        {certification}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Memberships
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {professionalMembershipOptions.map((membership) => (
                    <div key={membership} className="flex items-center">
                      <input
                        id={`mem-${membership}`}
                        name={`mem-${membership}`}
                        type="checkbox"
                        checked={formData.professionalMemberships.includes(membership)}
                        onChange={() => handleMultiSelectChange('professionalMemberships', membership)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`mem-${membership}`} className="ml-2 text-sm text-gray-700">
                        {membership}
                      </label>
                    </div>
                  ))}
                  
                  <div className="sm:col-span-2 mt-2">
                    <label htmlFor="otherMemberships" className="block text-sm font-medium text-gray-700">
                      Other Memberships
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="otherMemberships"
                        name="otherMemberships"
                        value={formData.otherMemberships}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="List any other professional memberships"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Practice Details Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Practice Details
              </h3>
              
              <div>
                <label htmlFor="practiceType" className="block text-sm font-medium text-gray-700">
                  Practice Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="practiceType"
                    name="practiceType"
                    value={formData.practiceType}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.practiceType ? 'border-red-300' : ''
                    }`}
                  >
                    <option value="">Select practice type</option>
                    {practiceTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.practiceType && (
                  <p className="mt-1 text-sm text-red-600">{errors.practiceType}</p>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species Treated <span className="text-red-500">*</span>
                </label>
                
                {errors.speciesTreated && (
                  <p className="mb-2 text-sm text-red-600">{errors.speciesTreated}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex items-center">
                    <input
                      id="species-dogs"
                      name="speciesTreated.dogs"
                      type="checkbox"
                      checked={formData.speciesTreated.dogs}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-dogs" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaDog className="mr-1 text-gray-500" /> Dogs
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-cats"
                      name="speciesTreated.cats"
                      type="checkbox"
                      checked={formData.speciesTreated.cats}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-cats" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaCat className="mr-1 text-gray-500" /> Cats
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-birds"
                      name="speciesTreated.birds"
                      type="checkbox"
                      checked={formData.speciesTreated.birds}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-birds" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaKiwiBird className="mr-1 text-gray-500" /> Birds
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-cattle"
                      name="speciesTreated.cattle"
                      type="checkbox"
                      checked={formData.speciesTreated.cattle}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-cattle" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHorse className="mr-1 text-gray-500" /> Cattle
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-buffalo"
                      name="speciesTreated.buffalo"
                      type="checkbox"
                      checked={formData.speciesTreated.buffalo}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-buffalo" className="ml-2 text-sm text-gray-700">
                      Buffalo
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-sheep"
                      name="speciesTreated.sheep"
                      type="checkbox"
                      checked={formData.speciesTreated.sheep}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-sheep" className="ml-2 text-sm text-gray-700">
                      Sheep
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-goats"
                      name="speciesTreated.goats"
                      type="checkbox"
                      checked={formData.speciesTreated.goats}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-goats" className="ml-2 text-sm text-gray-700">
                      Goats
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-poultry"
                      name="speciesTreated.poultry"
                      type="checkbox"
                      checked={formData.speciesTreated.poultry}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-poultry" className="ml-2 text-sm text-gray-700">
                      Poultry
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-exotic-pets"
                      name="speciesTreated.exoticPets"
                      type="checkbox"
                      checked={formData.speciesTreated.exoticPets}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-exotic-pets" className="ml-2 text-sm text-gray-700">
                      Exotic Pets
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="species-other"
                      name="speciesTreated.other"
                      type="checkbox"
                      checked={formData.speciesTreated.other}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="species-other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                
                {formData.speciesTreated.other && (
                  <div className="mt-2">
                    <label htmlFor="otherSpecies" className="sr-only">
                      Other Species
                    </label>
                    <input
                      type="text"
                      id="otherSpecies"
                      name="otherSpecies"
                      value={formData.otherSpecies}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherSpecies ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other species"
                    />
                    {errors.otherSpecies && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherSpecies}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Offered <span className="text-red-500">*</span>
                </label>
                
                {errors.servicesOffered && (
                  <p className="mb-2 text-sm text-red-600">{errors.servicesOffered}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="service-wellness"
                      name="servicesOffered.wellnessExams"
                      type="checkbox"
                      checked={formData.servicesOffered.wellnessExams}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-wellness" className="ml-2 text-sm text-gray-700">
                      Wellness Exams
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-vaccinations"
                      name="servicesOffered.vaccinations"
                      type="checkbox"
                      checked={formData.servicesOffered.vaccinations}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-vaccinations" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaSyringe className="mr-1 text-gray-500" /> Vaccinations
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-surgery"
                      name="servicesOffered.surgery"
                      type="checkbox"
                      checked={formData.servicesOffered.surgery}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-surgery" className="ml-2 text-sm text-gray-700">
                      Surgery
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-dental"
                      name="servicesOffered.dentalCare"
                      type="checkbox"
                      checked={formData.servicesOffered.dentalCare}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-dental" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaTooth className="mr-1 text-gray-500" /> Dental Care
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-emergency"
                      name="servicesOffered.emergencyServices"
                      type="checkbox"
                      checked={formData.servicesOffered.emergencyServices}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-emergency" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaAmbulance className="mr-1 text-gray-500" /> Emergency Services
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-livestock"
                      name="servicesOffered.livestockTreatment"
                      type="checkbox"
                      checked={formData.servicesOffered.livestockTreatment}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-livestock" className="ml-2 text-sm text-gray-700">
                      Livestock Treatment
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-ayurvedic"
                      name="servicesOffered.ayurvedicTreatments"
                      type="checkbox"
                      checked={formData.servicesOffered.ayurvedicTreatments}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-ayurvedic" className="ml-2 text-sm text-gray-700">
                      Ayurvedic Treatments
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-telemedicine"
                      name="servicesOffered.telemedicine"
                      type="checkbox"
                      checked={formData.servicesOffered.telemedicine}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-telemedicine" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaVideo className="mr-1 text-gray-500" /> Telemedicine
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="service-housecalls"
                      name="servicesOffered.houseCalls"
                      type="checkbox"
                      checked={formData.servicesOffered.houseCalls}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="service-housecalls" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaHome className="mr-1 text-gray-500" /> House Calls
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
                
                {formData.servicesOffered.ayurvedicTreatments && (
                  <div className="mt-2">
                    <label htmlFor="specializedTreatmentsDetails" className="block text-sm font-medium text-gray-700">
                      Ayurvedic Treatments Details
                    </label>
                    <input
                      type="text"
                      id="specializedTreatmentsDetails"
                      name="specializedTreatmentsDetails"
                      value={formData.specializedTreatmentsDetails}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.specializedTreatmentsDetails ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., Panchagavya therapy, herbal treatments, etc."
                    />
                    {errors.specializedTreatmentsDetails && (
                      <p className="mt-1 text-sm text-red-600">{errors.specializedTreatmentsDetails}</p>
                    )}
                  </div>
                )}
                
                {formData.servicesOffered.other && (
                  <div className="mt-2">
                    <label htmlFor="otherServicesDetails" className="block text-sm font-medium text-gray-700">
                      Other Services Details
                    </label>
                    <input
                      type="text"
                      id="otherServicesDetails"
                      name="otherServicesDetails"
                      value={formData.otherServicesDetails}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherServicesDetails ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other services"
                    />
                    {errors.otherServicesDetails && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherServicesDetails}</p>
                    )}
                  </div>
                )}
              </div>
            </section>
            
            {/* Facility Information Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Facility Information
              </h3>
              
              <div>
                <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700">
                  Facility Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.facilityType ? 'border-red-300' : ''
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
                {errors.facilityType && (
                  <p className="mt-1 text-sm text-red-600">{errors.facilityType}</p>
                )}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment/Capabilities
                </label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center">
                    <input
                      id="equipment-xray"
                      name="equipment.xray"
                      type="checkbox"
                      checked={formData.equipment.xray}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-xray" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaXRay className="mr-1 text-gray-500" /> X-ray
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-ultrasound"
                      name="equipment.ultrasound"
                      type="checkbox"
                      checked={formData.equipment.ultrasound}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-ultrasound" className="ml-2 text-sm text-gray-700">
                      Ultrasound
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-laboratory"
                      name="equipment.laboratory"
                      type="checkbox"
                      checked={formData.equipment.laboratory}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-laboratory" className="ml-2 flex items-center text-sm text-gray-700">
                      <FaVial className="mr-1 text-gray-500" /> Laboratory
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-surgery-suite"
                      name="equipment.surgerySuite"
                      type="checkbox"
                      checked={formData.equipment.surgerySuite}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-surgery-suite" className="ml-2 text-sm text-gray-700">
                      Surgery Suite
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-inpatient"
                      name="equipment.inPatientWards"
                      type="checkbox"
                      checked={formData.equipment.inPatientWards}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-inpatient" className="ml-2 text-sm text-gray-700">
                      In-Patient Wards
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-livestock"
                      name="equipment.livestockFacilities"
                      type="checkbox"
                      checked={formData.equipment.livestockFacilities}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-livestock" className="ml-2 text-sm text-gray-700">
                      Livestock Facilities
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="equipment-other"
                      name="equipment.other"
                      type="checkbox"
                      checked={formData.equipment.other}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="equipment-other" className="ml-2 text-sm text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                
                {formData.equipment.other && (
                  <div className="mt-2">
                    <label htmlFor="otherEquipment" className="block text-sm font-medium text-gray-700">
                      Other Equipment
                    </label>
                    <input
                      type="text"
                      id="otherEquipment"
                      name="otherEquipment"
                      value={formData.otherEquipment}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.otherEquipment ? 'border-red-300' : ''
                      }`}
                      placeholder="Please specify other equipment"
                    />
                    {errors.otherEquipment && (
                      <p className="mt-1 text-sm text-red-600">{errors.otherEquipment}</p>
                    )}
                  </div>
                )}
              </div>
            </section>
            
            {/* Regulatory Compliance Section */}
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Regulatory Compliance
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="drugLicenseNumber" className="block text-sm font-medium text-gray-700">
                    Drug License Number (if applicable)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="drugLicenseNumber"
                      name="drugLicenseNumber"
                      value={formData.drugLicenseNumber}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., DL-XX-XX-XXXXX"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Required if you dispense medications</p>
                </div>
                
                <div>
                  <label htmlFor="shopEstablishmentNumber" className="block text-sm font-medium text-gray-700">
                    Shop & Establishment Registration Number {formData.facilityType !== 'Mobile' && formData.facilityType !== 'Home visits only' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="shopEstablishmentNumber"
                      name="shopEstablishmentNumber"
                      value={formData.shopEstablishmentNumber}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.shopEstablishmentNumber ? 'border-red-300' : ''
                      }`}
                      placeholder="e.g., SE-XXXX-XX-XXXXX"
                    />
                  </div>
                  {errors.shopEstablishmentNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.shopEstablishmentNumber}</p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="biomedicalWasteRegistration"
                      name="biomedicalWasteRegistration"
                      type="checkbox"
                      checked={formData.biomedicalWasteRegistration}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="biomedicalWasteRegistration" className="ml-2 text-sm text-gray-700">
                      I confirm that my facility has proper biomedical waste management as per Biomedical Waste Management Rules
                    </label>
                  </div>
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

export default VeterinarianDetails;