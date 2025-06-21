import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaFileUpload, 
  FaIdCard, 
  FaFileAlt, 
  FaFileInvoice, 
  FaFileContract, 
  FaFileImage, 
  FaFilePdf,
  FaTrashAlt,
  FaCheck,
  FaExclamationTriangle,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaInfoCircle
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const DocumentUpload = () => {
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
    const documentData = localStorage.getItem('provider_document_upload');
    if (documentData) {
      setFormData(JSON.parse(documentData));
    }
    
    // Set required documents based on provider type
    const parsedData = JSON.parse(registrationData);
    const providerType = parsedData.providerType;
    
    let requiredDocs = [
      { id: 'identification', label: 'Government-Issued ID', required: true, description: 'Driver\'s license, passport, or other government-issued ID' },
      { id: 'businessLicense', label: 'Business License', required: false, description: 'If you operate as a registered business' }
    ];
    
    // Add provider-specific required documents
    switch (providerType) {
      case 'Veterinarian':
        requiredDocs = [
          ...requiredDocs,
          { id: 'veterinaryLicense', label: 'Veterinary License', required: true, description: 'Your current veterinary license' },
          { id: 'deaRegistration', label: 'DEA Registration', required: false, description: 'If you prescribe controlled substances' },
          { id: 'professionalLiability', label: 'Professional Liability Insurance', required: true, description: 'Proof of current malpractice insurance' }
        ];
        break;
      case 'Trainer':
        requiredDocs = [
          ...requiredDocs,
          { id: 'certifications', label: 'Training Certifications', required: false, description: 'Any professional training certifications you hold' },
          { id: 'liabilityInsurance', label: 'Liability Insurance', required: true, description: 'Proof of current liability insurance' }
        ];
        break;
      case 'Groomer':
        requiredDocs = [
          ...requiredDocs,
          { id: 'groomerCertifications', label: 'Grooming Certifications', required: false, description: 'Any professional grooming certifications you hold' },
          { id: 'liabilityInsurance', label: 'Liability Insurance', required: true, description: 'Proof of current liability insurance' }
        ];
        break;
      case 'Pet Sitter':
        requiredDocs = [
          ...requiredDocs,
          { id: 'bondingInsurance', label: 'Bonding Insurance', required: false, description: 'If you are bonded' },
          { id: 'liabilityInsurance', label: 'Liability Insurance', required: true, description: 'Proof of current liability insurance' },
          { id: 'backgroundCheck', label: 'Background Check', required: false, description: 'Recent background check results if available' }
        ];
        break;
      default:
        break;
    }
    
    // Add common documents for all providers
    requiredDocs = [
      ...requiredDocs,
      { id: 'w9Form', label: 'W-9 Form', required: true, description: 'For tax purposes' },
      { id: 'additionalDocuments', label: 'Additional Documents', required: false, description: 'Any other relevant documents' }
    ];
    
    setRequiredDocuments(requiredDocs);
  }, [navigate]);
  
  // State for required documents
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    documents: {},
    acknowledgement: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (documentId, files) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [documentId]: 'File size must be less than 5MB'
      }));
      return;
    }
    
    // Check file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [documentId]: 'File must be PDF, JPG, or PNG'
      }));
      return;
    }
    
    // Create file preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentId]: {
            file: file,
            name: file.name,
            type: file.type,
            size: file.size,
            preview: reader.result,
            uploadDate: new Date().toISOString()
          }
        }
      }));
      
      // Clear error if exists
      if (errors[documentId]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[documentId];
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Handle file removal
  const handleFileRemove = (documentId) => {
    setFormData(prev => {
      const newDocuments = { ...prev.documents };
      delete newDocuments[documentId];
      return {
        ...prev,
        documents: newDocuments
      };
    });
  };
  
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
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check if required documents are uploaded
    requiredDocuments.forEach(doc => {
      if (doc.required && !formData.documents[doc.id]) {
        newErrors[doc.id] = `${doc.label} is required`;
      }
    });
    
    // Check acknowledgement
    if (!formData.acknowledgement) {
      newErrors.acknowledgement = 'You must acknowledge that all documents are accurate';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would call an API to save the draft
      console.log('Saving document upload as draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage (note: in a real app, files would be uploaded to a server)
      // For this demo, we'll just store the file metadata
      const documentsMetadata = {};
      Object.keys(formData.documents).forEach(key => {
        const doc = formData.documents[key];
        documentsMetadata[key] = {
          name: doc.name,
          type: doc.type,
          size: doc.size,
          uploadDate: doc.uploadDate
        };
      });
      
      localStorage.setItem('provider_document_upload', JSON.stringify({
        documents: documentsMetadata,
        acknowledgement: formData.acknowledgement
      }));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 4
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
      // In a real app, this would call an API to upload the files
      console.log('Submitting document upload:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage (note: in a real app, files would be uploaded to a server)
      // For this demo, we'll just store the file metadata
      const documentsMetadata = {};
      Object.keys(formData.documents).forEach(key => {
        const doc = formData.documents[key];
        documentsMetadata[key] = {
          name: doc.name,
          type: doc.type,
          size: doc.size,
          uploadDate: doc.uploadDate
        };
      });
      
      localStorage.setItem('provider_document_upload', JSON.stringify({
        documents: documentsMetadata,
        acknowledgement: formData.acknowledgement
      }));
      
      // Update registration step
      const registrationData = JSON.parse(localStorage.getItem('provider_registration'));
      localStorage.setItem('provider_registration', JSON.stringify({
        ...registrationData,
        registrationStep: 4
      }));
      
      // Navigate to the terms and conditions page
      navigate('/provider/onboarding/terms');
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
  
  // Get back link based on provider type
  const getBackLink = () => {
    const registrationData = localStorage.getItem('provider_registration');
    if (!registrationData) return '/provider/onboarding/professional-info';
    
    const parsedData = JSON.parse(registrationData);
    const providerType = parsedData.providerType;
    
    switch (providerType) {
      case 'Veterinarian':
        return '/provider/onboarding/veterinarian-details';
      case 'Trainer':
        return '/provider/onboarding/trainer-details';
      case 'Groomer':
        return '/provider/onboarding/groomer-details';
      case 'Pet Sitter':
        return '/provider/onboarding/pet-sitter-details';
      default:
        return '/provider/onboarding/professional-info';
    }
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('image')) return <FaFileImage className="text-blue-500" />;
    return <FaFileAlt className="text-gray-500" />;
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
            <div className="text-sm text-indigo-600 font-medium">Step 4 of 8</div>
            <div className="text-sm text-gray-500">Document Upload</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Document Upload</h2>
            <p className="mt-1 text-sm text-gray-500">
              Please upload the required documents to verify your identity and qualifications
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
            {/* Document Upload Instructions */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Document Upload Instructions</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All documents must be in PDF, JPG, or PNG format</li>
                      <li>Maximum file size is 5MB per document</li>
                      <li>Documents must be clear, legible, and complete</li>
                      <li>Required documents are marked with an asterisk (*)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Document Upload Section */}
            <div className="space-y-6">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <label htmlFor={doc.id} className="block text-sm font-medium text-gray-700">
                        {doc.label} {doc.required && <span className="text-red-500">*</span>}
                      </label>
                      <p className="mt-1 text-xs text-gray-500">{doc.description}</p>
                      
                      {errors[doc.id] && (
                        <p className="mt-1 text-sm text-red-600">{errors[doc.id]}</p>
                      )}
                    </div>
                    
                    {formData.documents[doc.id] ? (
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md">
                          {getFileIcon(formData.documents[doc.id].type)}
                          <div className="text-sm">
                            <p className="font-medium text-gray-900 truncate max-w-xs">
                              {formData.documents[doc.id].name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {formatFileSize(formData.documents[doc.id].size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleFileRemove(doc.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor={doc.id}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <FaFileUpload className="text-gray-400" />
                            <span>Upload {doc.label}</span>
                            <input
                              id={doc.id}
                              name={doc.id}
                              type="file"
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                            />
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Acknowledgement */}
            <div className="mt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acknowledgement"
                    name="acknowledgement"
                    type="checkbox"
                    checked={formData.acknowledgement}
                    onChange={handleChange}
                    className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                      errors.acknowledgement ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acknowledgement" className="font-medium text-gray-700">
                    Document Acknowledgement <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    I acknowledge that all documents provided are accurate, current, and complete. I understand that providing false information may result in rejection of my application or termination of my provider account.
                  </p>
                  {errors.acknowledgement && (
                    <p className="mt-1 text-sm text-red-600">{errors.acknowledgement}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link
                to={getBackLink()}
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

export default DocumentUpload;