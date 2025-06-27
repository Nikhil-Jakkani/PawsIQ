import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaCreditCard, 
  FaUniversity, 
  FaMoneyBillWave, 
  FaLock, 
  FaShieldAlt, 
  FaIdCard,
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const PaymentInfo = () => {
  const navigate = useNavigate();
  
  // Check if registration data exists
  useEffect(() => {
    const registrationData = localStorage.getItem('provider_registration');
    if (!registrationData) {
      // Redirect to sign up if no registration data
      navigate('/provider/signup');
      return;
    }
    
    // Load existing data if available
    const paymentData = localStorage.getItem('provider_payment_info');
    if (paymentData) {
      setFormData(JSON.parse(paymentData));
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    paymentMethod: 'bankAccount', // 'bankAccount' or 'creditCard'
    
    // Bank Account Information
    bankAccount: {
      accountHolderName: '',
      accountType: 'checking', // 'checking' or 'savings'
      routingNumber: '',
      accountNumber: '',
      confirmAccountNumber: ''
    },
    
    // Credit Card Information
    creditCard: {
      cardHolderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: ''
    },
    
    // Tax Information
    taxInformation: {
      taxIdType: 'ssn', // 'ssn' or 'ein'
      taxId: '',
      businessType: 'individual', // 'individual', 'soleProprietor', 'llc', 'corporation'
      legalBusinessName: '',
      businessAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    
    // Agreements
    agreements: {
      termsAccepted: false,
      electronicCommunicationAccepted: false
    }
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (child.includes('.')) {
        const [subParent, subChild] = child.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [subParent]: {
              ...prev[parent][subParent],
              [subChild]: type === 'checkbox' ? checked : value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when field is edited
    if (name.includes('.')) {
      const errorKey = name.replace(/\./g, '_');
      if (errors[errorKey]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    } else if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Format credit card number with spaces
  const formatCreditCardNumber = (value) => {
    if (!value) return value;
    
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };
  
  // Handle credit card number input
  const handleCreditCardNumberChange = (e) => {
    const { value } = e.target;
    const formatted = formatCreditCardNumber(value);
    
    setFormData(prev => ({
      ...prev,
      creditCard: {
        ...prev.creditCard,
        cardNumber: formatted
      }
    }));
    
    // Clear error when field is edited
    if (errors.creditCard_cardNumber) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.creditCard_cardNumber;
        return newErrors;
      });
    }
  };
  
  // Format tax ID (SSN or EIN)
  const formatTaxId = (value, type) => {
    if (!value) return value;
    
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    
    if (type === 'ssn') {
      // Format as SSN: XXX-XX-XXXX
      if (v.length <= 3) return v;
      if (v.length <= 5) return `${v.slice(0, 3)}-${v.slice(3)}`;
      return `${v.slice(0, 3)}-${v.slice(3, 5)}-${v.slice(5, 9)}`;
    } else {
      // Format as EIN: XX-XXXXXXX
      if (v.length <= 2) return v;
      return `${v.slice(0, 2)}-${v.slice(2, 9)}`;
    }
  };
  
  // Handle tax ID input
  const handleTaxIdChange = (e) => {
    const { value } = e.target;
    const type = formData.taxInformation.taxIdType;
    const formatted = formatTaxId(value, type);
    
    setFormData(prev => ({
      ...prev,
      taxInformation: {
        ...prev.taxInformation,
        taxId: formatted
      }
    }));
    
    // Clear error when field is edited
    if (errors.taxInformation_taxId) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.taxInformation_taxId;
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate based on payment method
    if (formData.paymentMethod === 'bankAccount') {
      // Bank Account validation
      if (!formData.bankAccount.accountHolderName) {
        newErrors.bankAccount_accountHolderName = 'Account holder name is required';
      }
      
      if (!formData.bankAccount.routingNumber) {
        newErrors.bankAccount_routingNumber = 'Routing number is required';
      } else if (!/^\d{9}$/.test(formData.bankAccount.routingNumber.replace(/\D/g, ''))) {
        newErrors.bankAccount_routingNumber = 'Routing number must be 9 digits';
      }
      
      if (!formData.bankAccount.accountNumber) {
        newErrors.bankAccount_accountNumber = 'Account number is required';
      } else if (formData.bankAccount.accountNumber.replace(/\D/g, '').length < 4) {
        newErrors.bankAccount_accountNumber = 'Account number is too short';
      }
      
      if (!formData.bankAccount.confirmAccountNumber) {
        newErrors.bankAccount_confirmAccountNumber = 'Please confirm account number';
      } else if (formData.bankAccount.confirmAccountNumber !== formData.bankAccount.accountNumber) {
        newErrors.bankAccount_confirmAccountNumber = 'Account numbers do not match';
      }
    } else {
      // Credit Card validation
      if (!formData.creditCard.cardHolderName) {
        newErrors.creditCard_cardHolderName = 'Cardholder name is required';
      }
      
      if (!formData.creditCard.cardNumber) {
        newErrors.creditCard_cardNumber = 'Card number is required';
      } else if (formData.creditCard.cardNumber.replace(/\D/g, '').length < 13) {
        newErrors.creditCard_cardNumber = 'Card number is invalid';
      }
      
      if (!formData.creditCard.expirationMonth) {
        newErrors.creditCard_expirationMonth = 'Expiration month is required';
      }
      
      if (!formData.creditCard.expirationYear) {
        newErrors.creditCard_expirationYear = 'Expiration year is required';
      }
      
      if (!formData.creditCard.cvv) {
        newErrors.creditCard_cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.creditCard.cvv)) {
        newErrors.creditCard_cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    // Tax Information validation
    if (!formData.taxInformation.taxId) {
      newErrors.taxInformation_taxId = `${formData.taxInformation.taxIdType === 'ssn' ? 'SSN' : 'EIN'} is required`;
    } else {
      const taxIdDigits = formData.taxInformation.taxId.replace(/\D/g, '');
      if (formData.taxInformation.taxIdType === 'ssn' && taxIdDigits.length !== 9) {
        newErrors.taxInformation_taxId = 'SSN must be 9 digits';
      } else if (formData.taxInformation.taxIdType === 'ein' && taxIdDigits.length !== 9) {
        newErrors.taxInformation_taxId = 'EIN must be 9 digits';
      }
    }
    
    if (formData.taxInformation.businessType !== 'individual') {
      if (!formData.taxInformation.legalBusinessName) {
        newErrors.taxInformation_legalBusinessName = 'Legal business name is required';
      }
      
      if (!formData.taxInformation.businessAddress.street) {
        newErrors.taxInformation_businessAddress_street = 'Street address is required';
      }
      
      if (!formData.taxInformation.businessAddress.city) {
        newErrors.taxInformation_businessAddress_city = 'City is required';
      }
      
      if (!formData.taxInformation.businessAddress.state) {
        newErrors.taxInformation_businessAddress_state = 'State is required';
      }
      
      if (!formData.taxInformation.businessAddress.zipCode) {
        newErrors.taxInformation_businessAddress_zipCode = 'ZIP code is required';
      }
    }
    
    // Agreements validation
    if (!formData.agreements.termsAccepted) {
      newErrors.agreements_termsAccepted = 'You must accept the terms';
    }
    
    if (!formData.agreements.electronicCommunicationAccepted) {
      newErrors.agreements_electronicCommunicationAccepted = 'You must accept electronic communications';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving payment info as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_payment_info', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 6
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
      console.log('Submitting payment info:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_payment_info', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 6
      }));
      
      // Navigate to the review page
      navigate('/provider/onboarding/review');
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
  
  // Generate years for expiration date dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 20; i++) {
      years.push(currentYear + i);
    }
    return years;
  };
  
  // Generate months for expiration date dropdown
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' }
  ];
  
  // US States for dropdown
  const usStates = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'DC', label: 'District of Columbia' }
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
            <div className="text-sm text-indigo-600 font-medium">Step 6 of 8</div>
            <div className="text-sm text-gray-500">Payment Information</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Set up how you'll receive payments for your services
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
            {/* Security Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaLock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Secure Payment Information</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Your payment information is encrypted and securely stored. We use industry-standard security measures to protect your data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    formData.paymentMethod === 'bankAccount'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                  onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'bankAccount' } })}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full ${
                      formData.paymentMethod === 'bankAccount' ? 'bg-indigo-600' : 'border border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'bankAccount' && (
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Bank Account (Recommended)</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FaUniversity className="mr-2 text-gray-400" />
                    <span>Direct deposit to your bank account</span>
                  </div>
                </div>
                
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${
                    formData.paymentMethod === 'creditCard'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                  onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'creditCard' } })}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full ${
                      formData.paymentMethod === 'creditCard' ? 'bg-indigo-600' : 'border border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'creditCard' && (
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Credit Card</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FaCreditCard className="mr-2 text-gray-400" />
                    <span>Debit or credit card</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bank Account Information */}
            {formData.paymentMethod === 'bankAccount' && (
              <div className="space-y-6 border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Bank Account Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="accountHolderName"
                        name="bankAccount.accountHolderName"
                        value={formData.bankAccount.accountHolderName}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.bankAccount_accountHolderName ? 'border-red-300' : ''
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.bankAccount_accountHolderName && (
                      <p className="mt-1 text-sm text-red-600">{errors.bankAccount_accountHolderName}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Account Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="accountTypeChecking"
                          name="bankAccount.accountType"
                          type="radio"
                          value="checking"
                          checked={formData.bankAccount.accountType === 'checking'}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="accountTypeChecking" className="ml-2 block text-sm text-gray-700">
                          Checking
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="accountTypeSavings"
                          name="bankAccount.accountType"
                          type="radio"
                          value="savings"
                          checked={formData.bankAccount.accountType === 'savings'}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="accountTypeSavings" className="ml-2 block text-sm text-gray-700">
                          Savings
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
                      Routing Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="routingNumber"
                        name="bankAccount.routingNumber"
                        value={formData.bankAccount.routingNumber}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.bankAccount_routingNumber ? 'border-red-300' : ''
                        }`}
                        placeholder="123456789"
                        maxLength="9"
                      />
                    </div>
                    {errors.bankAccount_routingNumber ? (
                      <p className="mt-1 text-sm text-red-600">{errors.bankAccount_routingNumber}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">9-digit number found on the bottom of your check</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="accountNumber"
                        name="bankAccount.accountNumber"
                        value={formData.bankAccount.accountNumber}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.bankAccount_accountNumber ? 'border-red-300' : ''
                        }`}
                        placeholder="••••••••••"
                      />
                    </div>
                    {errors.bankAccount_accountNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.bankAccount_accountNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmAccountNumber" className="block text-sm font-medium text-gray-700">
                      Confirm Account Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="confirmAccountNumber"
                        name="bankAccount.confirmAccountNumber"
                        value={formData.bankAccount.confirmAccountNumber}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.bankAccount_confirmAccountNumber ? 'border-red-300' : ''
                        }`}
                        placeholder="••••••••••"
                      />
                    </div>
                    {errors.bankAccount_confirmAccountNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.bankAccount_confirmAccountNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Credit Card Information */}
            {formData.paymentMethod === 'creditCard' && (
              <div className="space-y-6 border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Credit Card Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                      Cardholder Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cardHolderName"
                        name="creditCard.cardHolderName"
                        value={formData.creditCard.cardHolderName}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.creditCard_cardHolderName ? 'border-red-300' : ''
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.creditCard_cardHolderName && (
                      <p className="mt-1 text-sm text-red-600">{errors.creditCard_cardHolderName}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCreditCard className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="cardNumber"
                        name="creditCard.cardNumber"
                        value={formData.creditCard.cardNumber}
                        onChange={handleCreditCardNumberChange}
                        className={`pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.creditCard_cardNumber ? 'border-red-300' : ''
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    {errors.creditCard_cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.creditCard_cardNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="expirationMonth" className="block text-sm font-medium text-gray-700">
                      Expiration Month <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="expirationMonth"
                        name="creditCard.expirationMonth"
                        value={formData.creditCard.expirationMonth}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.creditCard_expirationMonth ? 'border-red-300' : ''
                        }`}
                      >
                        <option value="">Select Month</option>
                        {months.map(month => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                    </div>
                    {errors.creditCard_expirationMonth && (
                      <p className="mt-1 text-sm text-red-600">{errors.creditCard_expirationMonth}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="expirationYear" className="block text-sm font-medium text-gray-700">
                      Expiration Year <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="expirationYear"
                        name="creditCard.expirationYear"
                        value={formData.creditCard.expirationYear}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.creditCard_expirationYear ? 'border-red-300' : ''
                        }`}
                      >
                        <option value="">Select Year</option>
                        {generateYears().map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {errors.creditCard_expirationYear && (
                      <p className="mt-1 text-sm text-red-600">{errors.creditCard_expirationYear}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="cvv"
                        name="creditCard.cvv"
                        value={formData.creditCard.cvv}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.creditCard_cvv ? 'border-red-300' : ''
                        }`}
                        placeholder="•••"
                        maxLength="4"
                      />
                    </div>
                    {errors.creditCard_cvv ? (
                      <p className="mt-1 text-sm text-red-600">{errors.creditCard_cvv}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">3 or 4 digit security code on the back of your card</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Tax Information */}
            <div className="space-y-6 border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 pb-2 border-b border-gray-200">
                Tax Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="taxIdTypeSsn"
                        name="taxInformation.taxIdType"
                        type="radio"
                        value="ssn"
                        checked={formData.taxInformation.taxIdType === 'ssn'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="taxIdTypeSsn" className="ml-2 block text-sm text-gray-700">
                        Social Security Number (SSN)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="taxIdTypeEin"
                        name="taxInformation.taxIdType"
                        type="radio"
                        value="ein"
                        checked={formData.taxInformation.taxIdType === 'ein'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="taxIdTypeEin" className="ml-2 block text-sm text-gray-700">
                        Employer Identification Number (EIN)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                    {formData.taxInformation.taxIdType === 'ssn' ? 'Social Security Number (SSN)' : 'Employer Identification Number (EIN)'} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="taxId"
                      name="taxInformation.taxId"
                      value={formData.taxInformation.taxId}
                      onChange={handleTaxIdChange}
                      className={`pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.taxInformation_taxId ? 'border-red-300' : ''
                      }`}
                      placeholder={formData.taxInformation.taxIdType === 'ssn' ? '123-45-6789' : '12-3456789'}
                      maxLength={formData.taxInformation.taxIdType === 'ssn' ? 11 : 10}
                    />
                  </div>
                  {errors.taxInformation_taxId ? (
                    <p className="mt-1 text-sm text-red-600">{errors.taxInformation_taxId}</p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500">
                      This information is required for tax reporting purposes. Your information is secure and encrypted.
                    </p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="flex items-center">
                      <input
                        id="businessTypeIndividual"
                        name="taxInformation.businessType"
                        type="radio"
                        value="individual"
                        checked={formData.taxInformation.businessType === 'individual'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="businessTypeIndividual" className="ml-2 block text-sm text-gray-700">
                        Individual
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="businessTypeSoleProprietor"
                        name="taxInformation.businessType"
                        type="radio"
                        value="soleProprietor"
                        checked={formData.taxInformation.businessType === 'soleProprietor'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="businessTypeSoleProprietor" className="ml-2 block text-sm text-gray-700">
                        Sole Proprietor
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="businessTypeLlc"
                        name="taxInformation.businessType"
                        type="radio"
                        value="llc"
                        checked={formData.taxInformation.businessType === 'llc'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="businessTypeLlc" className="ml-2 block text-sm text-gray-700">
                        LLC
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="businessTypeCorporation"
                        name="taxInformation.businessType"
                        type="radio"
                        value="corporation"
                        checked={formData.taxInformation.businessType === 'corporation'}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="businessTypeCorporation" className="ml-2 block text-sm text-gray-700">
                        Corporation
                      </label>
                    </div>
                  </div>
                </div>
                
                {formData.taxInformation.businessType !== 'individual' && (
                  <>
                    <div className="sm:col-span-2">
                      <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700">
                        Legal Business Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="legalBusinessName"
                          name="taxInformation.legalBusinessName"
                          value={formData.taxInformation.legalBusinessName}
                          onChange={handleChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                            errors.taxInformation_legalBusinessName ? 'border-red-300' : ''
                          }`}
                          placeholder="Your Business Name, LLC"
                        />
                      </div>
                      {errors.taxInformation_legalBusinessName && (
                        <p className="mt-1 text-sm text-red-600">{errors.taxInformation_legalBusinessName}</p>
                      )}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Address <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="street" className="sr-only">Street Address</label>
                          <input
                            type="text"
                            id="street"
                            name="taxInformation.businessAddress.street"
                            value={formData.taxInformation.businessAddress.street}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.taxInformation_businessAddress_street ? 'border-red-300' : ''
                            }`}
                            placeholder="Street Address"
                          />
                          {errors.taxInformation_businessAddress_street && (
                            <p className="mt-1 text-sm text-red-600">{errors.taxInformation_businessAddress_street}</p>
                          )}
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor="city" className="sr-only">City</label>
                          <input
                            type="text"
                            id="city"
                            name="taxInformation.businessAddress.city"
                            value={formData.taxInformation.businessAddress.city}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.taxInformation_businessAddress_city ? 'border-red-300' : ''
                            }`}
                            placeholder="City"
                          />
                          {errors.taxInformation_businessAddress_city && (
                            <p className="mt-1 text-sm text-red-600">{errors.taxInformation_businessAddress_city}</p>
                          )}
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="sr-only">State</label>
                          <select
                            id="state"
                            name="taxInformation.businessAddress.state"
                            value={formData.taxInformation.businessAddress.state}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.taxInformation_businessAddress_state ? 'border-red-300' : ''
                            }`}
                          >
                            <option value="">Select State</option>
                            {usStates.map(state => (
                              <option key={state.value} value={state.value}>{state.label}</option>
                            ))}
                          </select>
                          {errors.taxInformation_businessAddress_state && (
                            <p className="mt-1 text-sm text-red-600">{errors.taxInformation_businessAddress_state}</p>
                          )}
                        </div>
                        
                        <div className="sm:col-span-1">
                          <label htmlFor="zipCode" className="sr-only">ZIP Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="taxInformation.businessAddress.zipCode"
                            value={formData.taxInformation.businessAddress.zipCode}
                            onChange={handleChange}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.taxInformation_businessAddress_zipCode ? 'border-red-300' : ''
                            }`}
                            placeholder="ZIP"
                          />
                          {errors.taxInformation_businessAddress_zipCode && (
                            <p className="mt-1 text-sm text-red-600">{errors.taxInformation_businessAddress_zipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Agreements */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="agreements.termsAccepted"
                    type="checkbox"
                    checked={formData.agreements.termsAccepted}
                    onChange={handleChange}
                    className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                      errors.agreements_termsAccepted ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                    Payment Terms <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    I certify that the information provided is accurate and complete. I understand that PawsIQ will use this information to process payments and for tax reporting purposes.
                  </p>
                  {errors.agreements_termsAccepted && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreements_termsAccepted}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="electronicCommunicationAccepted"
                    name="agreements.electronicCommunicationAccepted"
                    type="checkbox"
                    checked={formData.agreements.electronicCommunicationAccepted}
                    onChange={handleChange}
                    className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                      errors.agreements_electronicCommunicationAccepted ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="electronicCommunicationAccepted" className="font-medium text-gray-700">
                    Electronic Communication <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    I consent to receive electronic communications from PawsIQ regarding payments, tax documents, and other financial information.
                  </p>
                  {errors.agreements_electronicCommunicationAccepted && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreements_electronicCommunicationAccepted}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link
                to="/provider/onboarding/terms"
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

export default PaymentInfo;