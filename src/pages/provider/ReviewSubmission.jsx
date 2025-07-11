import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaIdCard, 
  FaFileAlt, 
  FaMoneyBillWave, 
  FaCheck, 
  FaEdit,
  FaExclamationTriangle,
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "/1.svg";

const ReviewSubmission = () => {
  const navigate = useNavigate();
  
  // State for registration data
  const [registrationData, setRegistrationData] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [documentUpload, setDocumentUpload] = useState(null);
  const [termsAgreement, setTermsAgreement] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  
  // Check if all required data exists
  useEffect(() => {
    const registration = localStorage.getItem('provider_registration');
    if (!registration) {
      // Redirect to sign up if no registration data
      navigate('/provider/signup');
      return;
    }
    
    // Load all data from localStorage
    setRegistrationData(JSON.parse(registration));
    
    const professional = localStorage.getItem('provider_professional_info');
    if (professional) {
      setProfessionalInfo(JSON.parse(professional));
    }
    
    // Load service-specific details based on provider type
    const parsedData = JSON.parse(registration);
    const providerType = parsedData.providerType;
    
    let serviceData = null;
    switch (providerType) {
      case 'Veterinarian':
        serviceData = localStorage.getItem('provider_veterinarian_details');
        break;
      case 'Trainer':
        serviceData = localStorage.getItem('provider_trainer_details');
        break;
      case 'Groomer':
        serviceData = localStorage.getItem('provider_groomer_details');
        break;
      case 'Pet Sitter':
        serviceData = localStorage.getItem('provider_petsitter_details');
        break;
      default:
        break;
    }
    
    if (serviceData) {
      setServiceDetails(JSON.parse(serviceData));
    }
    
    const documents = localStorage.getItem('provider_document_upload');
    if (documents) {
      setDocumentUpload(JSON.parse(documents));
    }
    
    const terms = localStorage.getItem('provider_terms_agreement');
    if (terms) {
      setTermsAgreement(JSON.parse(terms));
    }
    
    const payment = localStorage.getItem('provider_payment_info');
    if (payment) {
      setPaymentInfo(JSON.parse(payment));
    }
  }, [navigate]);
  
  // Check if all required sections are complete
  const isSectionComplete = (section) => {
    switch (section) {
      case 'registration':
        return !!registrationData;
      case 'professionalInfo':
        return !!professionalInfo;
      case 'serviceDetails':
        return !!serviceDetails;
      case 'documentUpload':
        return !!documentUpload;
      case 'termsAgreement':
        return !!termsAgreement;
      case 'paymentInfo':
        return !!paymentInfo;
      default:
        return false;
    }
  };
  
  // Check if all sections are complete
  const allSectionsComplete = () => {
    return (
      isSectionComplete('registration') &&
      isSectionComplete('professionalInfo') &&
      isSectionComplete('serviceDetails') &&
      isSectionComplete('documentUpload') &&
      isSectionComplete('termsAgreement') &&
      isSectionComplete('paymentInfo')
    );
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!allSectionsComplete()) {
      alert('Please complete all sections before submitting your application.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to submit the application
      console.log('Submitting provider application:', {
        registration: registrationData,
        professionalInfo,
        serviceDetails,
        documentUpload,
        termsAgreement,
        paymentInfo
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update registration step
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 7,
        applicationStatus: 'pending',
        submissionDate: new Date().toISOString()
      }));
      
      // Show success message
      setSubmissionComplete(true);
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get section edit link
  const getSectionEditLink = (section) => {
    switch (section) {
      case 'registration':
        return '/provider/signup';
      case 'professionalInfo':
        return '/provider/onboarding/professional-info';
      case 'serviceDetails':
        if (registrationData?.providerType === 'Veterinarian') {
          return '/provider/onboarding/veterinarian-details';
        } else if (registrationData?.providerType === 'Trainer') {
          return '/provider/onboarding/trainer-details';
        } else if (registrationData?.providerType === 'Groomer') {
          return '/provider/onboarding/groomer-details';
        } else if (registrationData?.providerType === 'Pet Sitter') {
          return '/provider/onboarding/pet-sitter-details';
        }
        return '/provider/onboarding/professional-info';
      case 'documentUpload':
        return '/provider/onboarding/document-upload';
      case 'termsAgreement':
        return '/provider/onboarding/terms';
      case 'paymentInfo':
        return '/provider/onboarding/payment-info';
      default:
        return '/provider/signup';
    }
  };
  
  
  // Mask sensitive information
  const maskSensitiveInfo = (text, showLast = 4) => {
    if (!text) return '';
    
    const textStr = String(text);
    if (textStr.length <= showLast) {
      return '•'.repeat(textStr.length);
    }
    
    return '•'.repeat(textStr.length - showLast) + textStr.slice(-showLast);
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
        {submissionComplete ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-medium text-gray-900">Application Submitted Successfully!</h2>
              <p className="mt-2 text-sm text-gray-500">
                Thank you for applying to be a provider on PawsIQ. Your application has been received and is now under review.
              </p>
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="text-sm font-medium text-blue-800">What happens next?</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Our team will review your application within 3-5 business days</li>
                        <li>You may be contacted for additional information or verification</li>
                        <li>Once approved, you'll receive an email with instructions to set up your provider dashboard</li>
                        <li>You can check your application status anytime by logging in to your account</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/provider/application-status"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Application Status
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-indigo-600 font-medium">Step 7 of 8</div>
                <div className="text-sm text-gray-500">Review & Submit</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '87.5%' }}></div>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Review Your Application</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please review all information before submitting your application
                </p>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Registration Information */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">Account Information</h3>
                    <Link to={getSectionEditLink('registration')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {registrationData ? (
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{registrationData.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Provider Type</dt>
                          <dd className="mt-1 text-sm text-gray-900">{registrationData.providerType}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">First Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{registrationData.firstName}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{registrationData.lastName}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                          <dd className="mt-1 text-sm text-gray-900">{registrationData.phoneNumber}</dd>
                        </div>
                      </dl>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Registration information is incomplete. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">Professional Information</h3>
                    <Link to={getSectionEditLink('professionalInfo')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {professionalInfo ? (
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Professional Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{professionalInfo.displayName}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Professional Title</dt>
                          <dd className="mt-1 text-sm text-gray-900">{professionalInfo.professionalTitle}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Years of Experience</dt>
                          <dd className="mt-1 text-sm text-gray-900">{professionalInfo.yearsOfExperience}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{professionalInfo.businessName}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Business Address</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {professionalInfo.businessAddress.street}, {professionalInfo.businessAddress.city}, {professionalInfo.businessAddress.state} {professionalInfo.businessAddress.pinCode}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Bio</dt>
                          <dd className="mt-1 text-sm text-gray-900">{professionalInfo.bio}</dd>
                        </div>
                      </dl>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Professional information is incomplete. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Service-Specific Details */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">
                      {registrationData?.providerType || 'Service'} Details
                    </h3>
                    <Link to={getSectionEditLink('serviceDetails')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {serviceDetails ? (
                      <div className="text-sm text-green-700 bg-green-50 p-3 rounded-md flex items-start">
                        <FaCheck className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Service details have been provided and will be reviewed by our team.</span>
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Service details are incomplete. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Document Upload */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">Documents</h3>
                    <Link to={getSectionEditLink('documentUpload')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {documentUpload ? (
                      <div>
                        <p className="text-sm text-gray-700 mb-3">The following documents have been uploaded:</p>
                        <ul className="space-y-2">
                          {Object.entries(documentUpload.documents).map(([key, doc]) => (
                            <li key={key} className="flex items-center text-sm">
                              <FaFileAlt className="text-gray-400 mr-2" />
                              <span className="text-gray-900">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
                              <span className="ml-1 text-gray-500">{doc.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Required documents have not been uploaded. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Terms & Agreements */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">Terms & Agreements</h3>
                    <Link to={getSectionEditLink('termsAgreement')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {termsAgreement ? (
                      <div className="text-sm text-green-700 bg-green-50 p-3 rounded-md flex items-start">
                        <FaCheck className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>You have accepted all required terms and agreements.</span>
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Terms and agreements have not been accepted. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-md font-medium text-gray-900">Payment Information</h3>
                    <Link to={getSectionEditLink('paymentInfo')} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  </div>
                  <div className="p-4">
                    {paymentInfo ? (
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {paymentInfo.paymentMethod === 'bankAccount' ? 'Bank Account' : 'Credit Card'}
                          </dd>
                        </div>
                        
                        {paymentInfo.paymentMethod === 'bankAccount' ? (
                          <>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                              <dd className="mt-1 text-sm text-gray-900 capitalize">
                                {paymentInfo.bankAccount.accountType}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Account Holder</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {paymentInfo.bankAccount.accountHolderName}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {maskSensitiveInfo(paymentInfo.bankAccount.accountNumber)}
                              </dd>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Card Holder</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {paymentInfo.creditCard.cardHolderName}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Card Number</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {maskSensitiveInfo(paymentInfo.creditCard.cardNumber.replace(/\s/g, ''))}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">Expiration</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {paymentInfo.creditCard.expirationMonth}/{paymentInfo.creditCard.expirationYear}
                              </dd>
                            </div>
                          </>
                        )}
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Tax ID Type</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {paymentInfo.taxInformation.taxIdType === 'ssn' ? 'SSN' : 'EIN'}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Tax ID</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {maskSensitiveInfo(paymentInfo.taxInformation.taxId.replace(/\D/g, ''))}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Business Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 capitalize">
                            {paymentInfo.taxInformation.businessType.replace(/([A-Z])/g, ' $1').trim()}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md flex items-start">
                        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                        <span>Payment information is incomplete. Please complete this section.</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Submission Agreement */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Before You Submit</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>By submitting your application, you confirm that:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>All information provided is accurate and complete</li>
                          <li>You have the necessary qualifications and licenses to provide the services offered</li>
                          <li>You agree to comply with all PawsIQ policies and procedures</li>
                          <li>You understand that your application will be reviewed and may require additional verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="pt-5 border-t border-gray-200 flex justify-between">
                  <Link
                    to="/provider/onboarding/payment-info"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaArrowLeft className="mr-2 -ml-1 h-4 w-4" />
                    Back
                  </Link>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !allSectionsComplete()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ReviewSubmission;