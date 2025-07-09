import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaPhone, 
  FaStethoscope, 
  FaGraduationCap, 
  FaCut, 
  FaDog, 
  FaInfoCircle, 
  FaCheck, 
  FaTimes,
  FaPaw
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const ProviderSignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    providerType: '',
    referralSource: '',
    marketingOptIn: false,
    termsAccepted: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: 'Password strength'
  });
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/provider/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  // Check password strength
  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';
    
    if (password.length === 0) {
      message = 'Password strength';
    } else if (password.length < 8) {
      message = 'Weak - Too short';
      score = 1;
    } else {
      // Add score for length
      score += Math.min(2, Math.floor(password.length / 8));
      
      // Add score for complexity
      if (/[A-Z]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[0-9]/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
      
      // Set message based on score
      if (score < 3) {
        message = 'Weak';
      } else if (score < 5) {
        message = 'Medium';
      } else {
        message = 'Strong';
      }
    }
    
    setPasswordStrength({ score, message });
  };
  
  // Get color for password strength indicator
  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score === 0) return 'bg-gray-200';
    if (score < 3) return 'bg-red-500';
    if (score < 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Phone validation - Updated for Indian mobile numbers
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    // Provider type validation
    if (!formData.providerType) {
      newErrors.providerType = 'Please select a provider type';
    }
    
    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms of service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to register the user
      console.log('Submitting provider registration:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, store in localStorage
      localStorage.setItem('provider_registration', JSON.stringify({
        ...formData,
        registrationStep: 1,
        registrationDate: new Date().toISOString()
      }));
      
      // Navigate to the next step
      navigate('/provider/onboarding/professional-info');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        form: 'An error occurred during registration. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <img src={logoImage} alt="PawsIQ Logo" className="w-16 h-16" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Join PawsIQ as a Provider
        </h2>
        <p className="mt-2 text-center text-sm text-indigo-100">
          Connect with pet owners and grow your business
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-xs text-indigo-600 font-medium">Step 1 of 8</div>
              <div className="text-xs text-gray-500">Registration</div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '12.5%' }}></div>
            </div>
          </div>
          
          {/* Form error message */}
          {errors.form && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaTimes className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.form}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 block w-full pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 block w-full pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {/* Password strength indicator */}
              <div className="mt-1">
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`${getPasswordStrengthColor()} h-2 rounded-full transition-all duration-300`} 
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{passwordStrength.message}</span>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters and include a mix of letters, numbers, and special characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 block w-full pr-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-2 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`pl-10 block w-full pr-3 py-2 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`pl-10 block w-full pr-3 py-2 border ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="9876543210"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter your 10-digit Indian mobile number (starting with 6, 7, 8, or 9)
              </p>
            </div>

            {/* Provider Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div 
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.providerType === 'Veterinarian' 
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                  onClick={() => handleChange({ target: { name: 'providerType', value: 'Veterinarian' } })}
                >
                  <FaStethoscope className={`text-2xl mb-2 ${formData.providerType === 'Veterinarian' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${formData.providerType === 'Veterinarian' ? 'text-indigo-700' : 'text-gray-700'}`}>
                    Veterinarian
                  </span>
                </div>
                <div 
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.providerType === 'Trainer' 
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                  onClick={() => handleChange({ target: { name: 'providerType', value: 'Trainer' } })}
                >
                  <FaGraduationCap className={`text-2xl mb-2 ${formData.providerType === 'Trainer' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${formData.providerType === 'Trainer' ? 'text-indigo-700' : 'text-gray-700'}`}>
                    Trainer
                  </span>
                </div>
                <div 
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.providerType === 'Groomer' 
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                  onClick={() => handleChange({ target: { name: 'providerType', value: 'Groomer' } })}
                >
                  <FaCut className={`text-2xl mb-2 ${formData.providerType === 'Groomer' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${formData.providerType === 'Groomer' ? 'text-indigo-700' : 'text-gray-700'}`}>
                    Groomer
                  </span>
                </div>
                <div 
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.providerType === 'Pet Sitter' 
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                  onClick={() => handleChange({ target: { name: 'providerType', value: 'Pet Sitter' } })}
                >
                  <FaDog className={`text-2xl mb-2 ${formData.providerType === 'Pet Sitter' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${formData.providerType === 'Pet Sitter' ? 'text-indigo-700' : 'text-gray-700'}`}>
                    Pet Sitter
                  </span>
                </div>
              </div>
              {errors.providerType && (
                <p className="mt-1 text-sm text-red-600">{errors.providerType}</p>
              )}
            </div>

            {/* Referral Source */}
            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700">
                How did you hear about us?
              </label>
              <select
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select an option</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend or Colleague">Friend or Colleague</option>
                <option value="Pet Owner">Pet Owner</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Marketing Opt-in */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="marketingOptIn"
                  name="marketingOptIn"
                  type="checkbox"
                  checked={formData.marketingOptIn}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="marketingOptIn" className="font-medium text-gray-700">
                  Marketing communications
                </label>
                <p className="text-gray-500">
                  I'd like to receive updates about new features, promotions, and pet care tips.
                </p>
              </div>
            </div>

            {/* Terms of Service */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                    errors.termsAccepted ? 'border-red-300' : ''
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  Terms of Service <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                </p>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                <FaPaw size={12} />
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="text-white opacity-10 text-9xl">
          <FaPaw className="absolute bottom-10 left-10 transform rotate-12" />
          <FaPaw className="absolute bottom-40 left-1/4 transform -rotate-12" />
          <FaPaw className="absolute bottom-20 left-1/2 transform rotate-45" />
          <FaPaw className="absolute bottom-60 left-3/4 transform -rotate-45" />
          <FaPaw className="absolute bottom-5 right-10 transform rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default ProviderSignUp;