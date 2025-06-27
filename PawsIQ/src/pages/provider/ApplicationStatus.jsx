import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaExclamationCircle, 
  FaTimesCircle, 
  FaFileAlt,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaInfoCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  
  // State for application data
  const [applicationData, setApplicationData] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState('pending');
  const [submissionDate, setSubmissionDate] = useState(null);
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [missingDocuments, setMissingDocuments] = useState([]);
  
  // Load application data
  useEffect(() => {
    const registration = localStorage.getItem('provider_registration');
    if (!registration) {
      // Redirect to sign up if no registration data
      navigate('/provider/signup');
      return;
    }
    
    const parsedData = JSON.parse(registration);
    setApplicationData(parsedData);
    
    // Check if application has been submitted
    if (!parsedData.submissionDate) {
      navigate('/provider/onboarding/review');
      return;
    }
    
    // Set application status
    setApplicationStatus(parsedData.applicationStatus || 'pending');
    setSubmissionDate(parsedData.submissionDate);
    
    // Calculate estimated completion date (5 business days from submission)
    const submissionDateObj = new Date(parsedData.submissionDate);
    const estimatedDate = new Date(submissionDateObj);
    let businessDaysToAdd = 5;
    
    while (businessDaysToAdd > 0) {
      estimatedDate.setDate(estimatedDate.getDate() + 1);
      // Skip weekends
      if (estimatedDate.getDay() !== 0 && estimatedDate.getDay() !== 6) {
        businessDaysToAdd--;
      }
    }
    
    setEstimatedCompletionDate(estimatedDate.toISOString());
    
    // Mock status history
    const mockHistory = [
      {
        date: parsedData.submissionDate,
        status: 'submitted',
        message: 'Application submitted successfully'
      }
    ];
    
    // Add additional status updates based on time elapsed
    const daysSinceSubmission = Math.floor((new Date() - submissionDateObj) / (1000 * 60 * 60 * 24));
    
    if (daysSinceSubmission >= 1) {
      const reviewDate = new Date(submissionDateObj);
      reviewDate.setDate(reviewDate.getDate() + 1);
      mockHistory.push({
        date: reviewDate.toISOString(),
        status: 'in_review',
        message: 'Application is under review'
      });
    }
    
    // Simulate a request for additional documents
    if (daysSinceSubmission >= 2) {
      const docsRequestDate = new Date(submissionDateObj);
      docsRequestDate.setDate(docsRequestDate.getDate() + 2);
      mockHistory.push({
        date: docsRequestDate.toISOString(),
        status: 'documents_requested',
        message: 'Additional documents requested'
      });
      
      // Set missing documents
      setMissingDocuments([
        'Proof of professional liability insurance',
        'Additional certification documentation'
      ]);
    }
    
    setStatusHistory(mockHistory);
  }, [navigate]);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" /> Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaHourglassHalf className="mr-1" /> Pending
          </span>
        );
      case 'needs_info':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <FaExclamationCircle className="mr-1" /> Action Required
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FaHourglassHalf className="mr-1" /> Processing
          </span>
        );
    }
  };
  
  // Get status icon for timeline
  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return (
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
            <FaFileAlt className="h-4 w-4 text-white" />
          </div>
        );
      case 'in_review':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
            <FaHourglassHalf className="h-4 w-4 text-white" />
          </div>
        );
      case 'documents_requested':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-white">
            <FaExclamationCircle className="h-4 w-4 text-white" />
          </div>
        );
      case 'approved':
        return (
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
            <FaCheckCircle className="h-4 w-4 text-white" />
          </div>
        );
      case 'rejected':
        return (
          <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
            <FaTimesCircle className="h-4 w-4 text-white" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center ring-8 ring-white">
            <FaInfoCircle className="h-4 w-4 text-white" />
          </div>
        );
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
            <div className="text-sm text-indigo-600 font-medium">Step 8 of 8</div>
            <div className="text-sm text-gray-500">Application Status</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900">Application Status</h2>
              {applicationStatus && getStatusBadge(applicationStatus)}
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Application Summary */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Application ID</h3>
                <p className="mt-1 text-sm text-gray-900">PQ-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Provider Type</h3>
                <p className="mt-1 text-sm text-gray-900">{applicationData?.providerType || 'Provider'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                <p className="mt-1 text-sm text-gray-900">{submissionDate ? formatDate(submissionDate) : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estimated Completion</h3>
                <p className="mt-1 text-sm text-gray-900">{estimatedCompletionDate ? formatDate(estimatedCompletionDate) : 'N/A'}</p>
              </div>
            </div>
            
            {/* Status Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Application Status</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    {applicationStatus === 'pending' && (
                      <p>
                        Your application is currently under review. Our team is verifying your information and documents.
                        This process typically takes 3-5 business days. We'll notify you by email when there are updates.
                      </p>
                    )}
                    {applicationStatus === 'needs_info' && (
                      <p>
                        We need additional information to process your application. Please check the "Required Actions" section below
                        and provide the requested information as soon as possible.
                      </p>
                    )}
                    {applicationStatus === 'approved' && (
                      <p>
                        Congratulations! Your application has been approved. You can now set up your provider dashboard and start
                        offering your services on PawsIQ.
                      </p>
                    )}
                    {applicationStatus === 'rejected' && (
                      <p>
                        We're sorry, but your application has been rejected. Please review the feedback provided and you may
                        reapply after addressing the issues.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Required Actions (if any) */}
            {missingDocuments.length > 0 && (
              <div className="border border-yellow-200 rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-200">
                  <h3 className="text-sm font-medium text-yellow-800">Required Actions</h3>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-700 mb-3">
                    Please provide the following documents to continue with your application:
                  </p>
                  <ul className="space-y-2">
                    {missingDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start">
                        <FaExclamationCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link
                      to="/provider/onboarding/document-upload"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Upload Documents
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Application Timeline */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Application Timeline</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {statusHistory.map((item, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== statusHistory.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>{getStatusIcon(item.status)}</div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{item.message}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {formatDate(item.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Support Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Email Support</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        <a href="mailto:providers@pawsiq.com" className="text-indigo-600 hover:text-indigo-500">
                          providers@pawsiq.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Phone Support</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        <a href="tel:+18005551234" className="text-indigo-600 hover:text-indigo-500">
                          1-800-555-1234
                        </a>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Monday-Friday, 9am-5pm ET
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Provider Resources */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Provider Resources</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href="#"
                  className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 flex items-center"
                >
                  <FaFileAlt className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Provider Handbook</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Learn about policies, procedures, and best practices
                    </p>
                  </div>
                  <FaExternalLinkAlt className="ml-auto h-4 w-4 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 flex items-center"
                >
                  <FaFileAlt className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Service Guidelines</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Standards for providing quality pet care services
                    </p>
                  </div>
                  <FaExternalLinkAlt className="ml-auto h-4 w-4 text-gray-400" />
                </a>
              </div>
            </div>
            
            {/* Back Button */}
            <div className="pt-5 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaArrowLeft className="mr-2 -ml-1 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationStatus;