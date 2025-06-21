import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaFileContract, 
  FaCheck, 
  FaExclamationTriangle, 
  FaArrowLeft, 
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const TermsAgreement = () => {
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
    const termsData = localStorage.getItem('provider_terms_agreement');
    if (termsData) {
      setFormData(JSON.parse(termsData));
    }
    
    // Set provider type
    const parsedData = JSON.parse(registrationData);
    setProviderType(parsedData.providerType);
  }, [navigate]);
  
  // State for provider type
  const [providerType, setProviderType] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    termsAccepted: false,
    serviceAgreementAccepted: false,
    privacyPolicyAccepted: false,
    codeOfConductAccepted: false,
    paymentTermsAccepted: false,
    cancellationPolicyAccepted: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle checkbox change
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Clear error if exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle "Accept All" button
  const handleAcceptAll = () => {
    setFormData({
      termsAccepted: true,
      serviceAgreementAccepted: true,
      privacyPolicyAccepted: true,
      codeOfConductAccepted: true,
      paymentTermsAccepted: true,
      cancellationPolicyAccepted: true
    });
    
    // Clear all errors
    setErrors({});
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check if all required agreements are accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms of Service';
    }
    
    if (!formData.serviceAgreementAccepted) {
      newErrors.serviceAgreementAccepted = 'You must accept the Service Provider Agreement';
    }
    
    if (!formData.privacyPolicyAccepted) {
      newErrors.privacyPolicyAccepted = 'You must accept the Privacy Policy';
    }
    
    if (!formData.codeOfConductAccepted) {
      newErrors.codeOfConductAccepted = 'You must accept the Code of Conduct';
    }
    
    if (!formData.paymentTermsAccepted) {
      newErrors.paymentTermsAccepted = 'You must accept the Payment Terms';
    }
    
    if (!formData.cancellationPolicyAccepted) {
      newErrors.cancellationPolicyAccepted = 'You must accept the Cancellation Policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving terms agreement as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage
      localStorage.setItem('provider_terms_agreement', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 5
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
      console.log('Submitting terms agreement:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage
      localStorage.setItem('provider_terms_agreement', JSON.stringify(formData));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 5
      }));
      
      // Navigate to the payment information page
      navigate('/provider/onboarding/payment-info');
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
            <div className="text-sm text-indigo-600 font-medium">Step 5 of 8</div>
            <div className="text-sm text-gray-500">Terms & Agreements</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '62.5%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Terms & Agreements</h2>
            <p className="mt-1 text-sm text-gray-500">
              Please review and accept the following terms and agreements
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
            {/* Accept All Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaCheck className="mr-2 -ml-1 h-4 w-4" />
                Accept All Terms
              </button>
            </div>
            
            {/* Terms of Service */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Terms of Service</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Introduction</h4>
                  <p className="mb-4">
                    Welcome to PawsIQ. These Terms of Service ("Terms") govern your use of the PawsIQ platform, including our website, mobile applications, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
                  </p>
                  
                  <h4 className="font-medium mb-2">2. Eligibility</h4>
                  <p className="mb-4">
                    To use the Service as a provider, you must be at least 18 years old and able to form legally binding contracts. You represent and warrant that you meet all eligibility requirements.
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Account Registration</h4>
                  <p className="mb-4">
                    When you register for an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Provider Responsibilities</h4>
                  <p className="mb-4">
                    As a provider on PawsIQ, you agree to:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Provide accurate information about your qualifications, experience, and services</li>
                      <li>Maintain all required licenses, certifications, and insurance</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Provide services with professional care and skill</li>
                      <li>Maintain accurate availability and respond promptly to booking requests</li>
                      <li>Treat all pets with care and respect</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">5. Service Fees</h4>
                  <p className="mb-4">
                    PawsIQ charges a service fee for each booking completed through the platform. The fee structure will be provided in the Service Provider Agreement. You agree not to circumvent the platform to avoid service fees.
                  </p>
                  
                  <h4 className="font-medium mb-2">6. Termination</h4>
                  <p className="mb-4">
                    PawsIQ reserves the right to suspend or terminate your account at any time for violations of these Terms or for any other reason at our sole discretion.
                  </p>
                  
                  <h4 className="font-medium mb-2">7. Changes to Terms</h4>
                  <p className="mb-4">
                    We may modify these Terms at any time. If we make material changes, we will notify you through the Service or by other means. Your continued use of the Service after such notification constitutes acceptance of the updated Terms.
                  </p>
                  
                  <h4 className="font-medium mb-2">8. Governing Law</h4>
                  <p>
                    These Terms are governed by the laws of the state of California, without regard to its conflict of law principles.
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
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
                      I have read and agree to the Terms of Service <span className="text-red-500">*</span>
                    </label>
                    {errors.termsAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service Provider Agreement */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Service Provider Agreement</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Relationship</h4>
                  <p className="mb-4">
                    This Service Provider Agreement ("Agreement") is between you and PawsIQ. You acknowledge that you are an independent contractor and not an employee of PawsIQ. This Agreement does not create a partnership, joint venture, or agency relationship.
                  </p>
                  
                  <h4 className="font-medium mb-2">2. Services</h4>
                  <p className="mb-4">
                    As a {providerType || 'Provider'} on PawsIQ, you agree to provide pet care services to clients in accordance with the service descriptions you provide and the bookings you accept through the platform.
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Compensation</h4>
                  <p className="mb-4">
                    You set your own rates for services. PawsIQ will collect payment from clients and remit payment to you after deducting the applicable service fee. The current service fee is 15% of the total booking amount.
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Taxes</h4>
                  <p className="mb-4">
                    You are responsible for reporting and paying all applicable taxes on income earned through PawsIQ. PawsIQ will provide appropriate tax documentation as required by law.
                  </p>
                  
                  <h4 className="font-medium mb-2">5. Insurance and Liability</h4>
                  <p className="mb-4">
                    You are required to maintain appropriate insurance coverage for your services. PawsIQ offers access to liability insurance coverage for eligible providers, subject to policy terms and conditions.
                  </p>
                  
                  <h4 className="font-medium mb-2">6. Background Checks</h4>
                  <p className="mb-4">
                    You consent to background checks as part of the provider verification process. PawsIQ may periodically re-verify your background check information.
                  </p>
                  
                  <h4 className="font-medium mb-2">7. Confidentiality</h4>
                  <p className="mb-4">
                    You agree to maintain the confidentiality of client information and not to use or disclose such information except as necessary to provide services.
                  </p>
                  
                  <h4 className="font-medium mb-2">8. Term and Termination</h4>
                  <p>
                    This Agreement continues until terminated by either party. Either party may terminate this Agreement at any time, with or without cause, by providing written notice to the other party.
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="serviceAgreementAccepted"
                      name="serviceAgreementAccepted"
                      type="checkbox"
                      checked={formData.serviceAgreementAccepted}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                        errors.serviceAgreementAccepted ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="serviceAgreementAccepted" className="font-medium text-gray-700">
                      I have read and agree to the Service Provider Agreement <span className="text-red-500">*</span>
                    </label>
                    {errors.serviceAgreementAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceAgreementAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy Policy */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Privacy Policy</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Information We Collect</h4>
                  <p className="mb-4">
                    We collect information you provide when you register as a provider, including personal information, professional qualifications, and payment information. We also collect information about your use of the Service.
                  </p>
                  
                  <h4 className="font-medium mb-2">2. How We Use Your Information</h4>
                  <p className="mb-4">
                    We use your information to:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Verify your identity and qualifications</li>
                      <li>Connect you with potential clients</li>
                      <li>Process payments</li>
                      <li>Communicate with you about the Service</li>
                      <li>Improve and develop the Service</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Information Sharing</h4>
                  <p className="mb-4">
                    We share your information with:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Clients who book your services</li>
                      <li>Service providers who help us operate the platform</li>
                      <li>Legal and regulatory authorities when required</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Your Rights</h4>
                  <p className="mb-4">
                    You have the right to access, correct, and delete your personal information, subject to certain limitations. You can manage most of your information through your account settings.
                  </p>
                  
                  <h4 className="font-medium mb-2">5. Data Security</h4>
                  <p className="mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission or storage is 100% secure.
                  </p>
                  
                  <h4 className="font-medium mb-2">6. Changes to Privacy Policy</h4>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes through the Service or by other means.
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacyPolicyAccepted"
                      name="privacyPolicyAccepted"
                      type="checkbox"
                      checked={formData.privacyPolicyAccepted}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                        errors.privacyPolicyAccepted ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacyPolicyAccepted" className="font-medium text-gray-700">
                      I have read and agree to the Privacy Policy <span className="text-red-500">*</span>
                    </label>
                    {errors.privacyPolicyAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.privacyPolicyAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code of Conduct */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Code of Conduct</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Professional Standards</h4>
                  <p className="mb-4">
                    As a PawsIQ provider, you agree to:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Maintain the highest standards of professional conduct</li>
                      <li>Treat all clients and their pets with respect and dignity</li>
                      <li>Communicate clearly and promptly with clients</li>
                      <li>Provide services as described and agreed upon</li>
                      <li>Maintain a clean, safe, and welcoming environment for pets</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">2. Pet Safety and Welfare</h4>
                  <p className="mb-4">
                    You agree to:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Prioritize the safety and welfare of all pets in your care</li>
                      <li>Never use harsh or abusive methods</li>
                      <li>Follow all care instructions provided by pet owners</li>
                      <li>Promptly report any incidents or concerns to pet owners and PawsIQ</li>
                      <li>Maintain appropriate supervision of pets at all times</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Prohibited Conduct</h4>
                  <p className="mb-4">
                    The following conduct is prohibited:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Discrimination based on race, color, religion, national origin, disability, sexual orientation, or gender identity</li>
                      <li>Harassment or intimidation of clients or other providers</li>
                      <li>Misrepresentation of qualifications or services</li>
                      <li>Soliciting clients to book outside the platform</li>
                      <li>Sharing client information with third parties</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Reporting Violations</h4>
                  <p>
                    If you observe violations of this Code of Conduct, please report them to PawsIQ immediately. We take all reports seriously and will investigate appropriately.
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="codeOfConductAccepted"
                      name="codeOfConductAccepted"
                      type="checkbox"
                      checked={formData.codeOfConductAccepted}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                        errors.codeOfConductAccepted ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="codeOfConductAccepted" className="font-medium text-gray-700">
                      I have read and agree to the Code of Conduct <span className="text-red-500">*</span>
                    </label>
                    {errors.codeOfConductAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.codeOfConductAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Terms */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Payment Terms</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Service Fees</h4>
                  <p className="mb-4">
                    PawsIQ charges a service fee of 15% on all bookings. This fee is deducted from the total booking amount before payment is remitted to you.
                  </p>
                  
                  <h4 className="font-medium mb-2">2. Payment Processing</h4>
                  <p className="mb-4">
                    Payments are processed through our secure payment system. Clients pay at the time of booking, and funds are held until the service is completed.
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Payment Schedule</h4>
                  <p className="mb-4">
                    Payments for completed services are processed within 48 hours after service completion. Funds are typically deposited into your account within 3-5 business days, depending on your financial institution.
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Cancellations and Refunds</h4>
                  <p className="mb-4">
                    If a client cancels a booking, the refund amount is determined by your cancellation policy. Your share of any non-refunded amount will be paid to you according to the standard payment schedule.
                  </p>
                  
                  <h4 className="font-medium mb-2">5. Disputes</h4>
                  <p className="mb-4">
                    In the event of a payment dispute, PawsIQ will review the circumstances and make a determination in accordance with our policies. PawsIQ reserves the right to issue refunds to clients in appropriate circumstances.
                  </p>
                  
                  <h4 className="font-medium mb-2">6. Taxes</h4>
                  <p>
                    You are responsible for reporting and paying all applicable taxes on income earned through PawsIQ. We will provide appropriate tax documentation as required by law.
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="paymentTermsAccepted"
                      name="paymentTermsAccepted"
                      type="checkbox"
                      checked={formData.paymentTermsAccepted}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                        errors.paymentTermsAccepted ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="paymentTermsAccepted" className="font-medium text-gray-700">
                      I have read and agree to the Payment Terms <span className="text-red-500">*</span>
                    </label>
                    {errors.paymentTermsAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.paymentTermsAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cancellation Policy */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">Cancellation Policy</h3>
                <FaFileContract className="text-gray-400" />
              </div>
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-700">
                  <h4 className="font-medium mb-2">1. Provider Cancellation Policy</h4>
                  <p className="mb-4">
                    As a provider, you agree to honor all bookings that you accept. If you must cancel a booking, you agree to:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Notify the client and PawsIQ as soon as possible</li>
                      <li>Provide a valid reason for the cancellation</li>
                      <li>Assist in finding a replacement provider if possible</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">2. Cancellation Penalties</h4>
                  <p className="mb-4">
                    Excessive cancellations may result in:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Reduced visibility in search results</li>
                      <li>Temporary suspension of your account</li>
                      <li>Termination of your provider account</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">3. Client Cancellation Policy</h4>
                  <p className="mb-4">
                    You may choose from the following cancellation policies for your services:
                    <ul className="list-disc pl-5 mt-2">
                      <li><strong>Flexible:</strong> Full refund if cancelled 24 hours before service start time</li>
                      <li><strong>Moderate:</strong> Full refund if cancelled 48 hours before service start time; 50% refund if cancelled 24-48 hours before</li>
                      <li><strong>Strict:</strong> Full refund if cancelled 7 days before service start time; 50% refund if cancelled 3-7 days before</li>
                    </ul>
                  </p>
                  
                  <h4 className="font-medium mb-2">4. Extenuating Circumstances</h4>
                  <p>
                    PawsIQ's Extenuating Circumstances Policy may override the standard cancellation policy in certain situations, such as:
                    <ul className="list-disc pl-5 mt-2">
                      <li>Serious illness or injury</li>
                      <li>Death of a family member</li>
                      <li>Natural disasters</li>
                      <li>Government-mandated obligations</li>
                    </ul>
                  </p>
                </div>
                
                <div className="mt-4 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cancellationPolicyAccepted"
                      name="cancellationPolicyAccepted"
                      type="checkbox"
                      checked={formData.cancellationPolicyAccepted}
                      onChange={handleChange}
                      className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                        errors.cancellationPolicyAccepted ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cancellationPolicyAccepted" className="font-medium text-gray-700">
                      I have read and agree to the Cancellation Policy <span className="text-red-500">*</span>
                    </label>
                    {errors.cancellationPolicyAccepted && (
                      <p className="mt-1 text-sm text-red-600">{errors.cancellationPolicyAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link
                to="/provider/onboarding/document-upload"
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

export default TermsAgreement;