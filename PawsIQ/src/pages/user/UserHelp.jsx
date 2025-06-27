import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaSearch, FaChevronDown, FaChevronUp, FaHeadset, FaEnvelope, FaCommentAlt, FaTicketAlt, FaFileAlt, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserHelp = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Mock FAQ data
  const faqCategories = [
    {
      id: 'account',
      title: 'Account & Profile',
      faqs: [
        {
          id: 1,
          question: 'How do I reset my password?',
          answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.'
        },
        {
          id: 2,
          question: 'How do I update my personal information?',
          answer: 'You can update your personal information by going to Settings > Profile. From there, you can edit your name, email, phone number, and other details. Don\'t forget to click "Save Changes" when you\'re done.'
        },
        {
          id: 3,
          question: 'Can I have multiple pets on my account?',
          answer: 'Yes, you can add multiple pets to your account. Go to the "My Pets" section and click on "Add New Pet" to create profiles for all your furry friends.'
        }
      ]
    },
    {
      id: 'appointments',
      title: 'Appointments & Bookings',
      faqs: [
        {
          id: 4,
          question: 'How do I book an appointment?',
          answer: 'To book an appointment, go to the "Appointments" section and click "Book New Appointment". Follow the steps to select your pet, service type, provider, and preferred date and time.'
        },
        {
          id: 5,
          question: 'How can I cancel or reschedule an appointment?',
          answer: 'You can cancel or reschedule an appointment by going to "My Appointments", finding the appointment you want to modify, and clicking on "Cancel" or "Reschedule". Please note that some providers may have cancellation policies.'
        },
        {
          id: 6,
          question: 'Will I receive a reminder before my appointment?',
          answer: 'Yes, we send appointment reminders via email and push notifications (if enabled) 24 hours before your scheduled appointment. You can adjust your notification preferences in Settings > Notifications.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Orders & Payments',
      faqs: [
        {
          id: 7,
          question: 'How can I track my order?',
          answer: 'You can track your order by going to "My Orders" and selecting the order you want to track. Click on "Track Shipment" to see the current status and location of your package.'
        },
        {
          id: 8,
          question: 'What payment methods do you accept?',
          answer: 'We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. You can manage your payment methods in Settings > Payment Methods.'
        },
        {
          id: 9,
          question: 'How do I request a refund?',
          answer: 'To request a refund, go to "My Orders", find the order in question, and click on "Request Refund". Fill out the form with the reason for your refund request, and our customer service team will review it within 1-2 business days.'
        }
      ]
    },
    {
      id: 'pets',
      title: 'Pet Care & Services',
      faqs: [
        {
          id: 10,
          question: 'How do I add my pet\'s medical records?',
          answer: 'You can add your pet\'s medical records by going to "My Pets", selecting your pet, and clicking on "Health Records". From there, you can upload documents or manually enter vaccination and treatment information.'
        },
        {
          id: 11,
          question: 'What types of pet services do you offer?',
          answer: 'We offer a wide range of pet services including veterinary care, grooming, training, boarding, daycare, and dog walking. You can explore all available services in the "Find Services" section.'
        },
        {
          id: 12,
          question: 'How are service providers vetted?',
          answer: 'All service providers on our platform undergo a thorough verification process, including license verification, background checks, and customer reviews. We only partner with qualified professionals who meet our quality standards.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search term
  const filteredFaqs = searchTerm 
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;
  
  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };
  
  // Contact options
  const contactOptions = [
    {
      icon: <FaHeadset className="text-indigo-600" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      available: true,
      hours: 'Available 24/7'
    },
    {
      icon: <FaEnvelope className="text-indigo-600" />,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'Send Email',
      available: true,
      hours: 'Response within 24 hours'
    },
    {
      icon: <FaTicketAlt className="text-indigo-600" />,
      title: 'Support Ticket',
      description: 'Create a ticket for complex issues',
      action: 'Create Ticket',
      available: true,
      hours: 'Response within 48 hours'
    },
    {
      icon: <FaCommentAlt className="text-indigo-600" />,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      action: 'Call Now',
      available: false,
      hours: 'Mon-Fri, 9AM-5PM EST'
    }
  ];
  
  // Help resources
  const helpResources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using PawsIQ',
      icon: <FaFileAlt className="text-indigo-600" />,
      link: '/user/help/guides/getting-started'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: <FaExternalLinkAlt className="text-indigo-600" />,
      link: 'https://www.youtube.com/pawsiq'
    },
    {
      title: 'Pet Care Blog',
      description: 'Tips and advice for pet owners',
      icon: <FaExternalLinkAlt className="text-indigo-600" />,
      link: 'https://blog.pawsiq.com'
    }
  ];
  
  return (
    <UserLayout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <FaQuestionCircle className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
              <p className="text-gray-500 mt-1">Find answers to common questions or contact our support team</p>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-900 mb-3">How can we help you today?</h2>
          <div className="relative max-w-2xl">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        {/* Contact Options */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactOptions.map((option, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${option.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {option.hours}
                  </span>
                  <button 
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      option.available 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                    disabled={!option.available}
                  >
                    {option.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          
          {filteredFaqs.length > 0 ? (
            <div className="space-y-6">
              {filteredFaqs.map(category => (
                <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">{category.title}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.faqs.map(faq => (
                      <div key={faq.id} className="px-6 py-4">
                        <button 
                          onClick={() => toggleFaq(faq.id)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h4 className="font-medium text-gray-800">{faq.question}</h4>
                          {expandedFaq === faq.id ? <FaChevronUp className="text-indigo-600" /> : <FaChevronDown className="text-gray-500" />}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="mt-3 text-gray-600">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaQuestionCircle className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any FAQs matching "{searchTerm}". Try a different search term or contact our support team.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <FaSearch />
                Clear Search
              </button>
            </div>
          )}
        </div>
        
        {/* Help Resources */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpResources.map((resource, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                <a 
                  href={resource.link}
                  target={resource.link.startsWith('http') ? '_blank' : '_self'}
                  rel={resource.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <FaArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Community Support */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-indigo-900 mb-2">Join Our Pet Owner Community</h2>
              <p className="text-indigo-700">
                Connect with other pet owners, share experiences, and get advice from our community forums.
              </p>
            </div>
            <button 
              onClick={() => navigate('/user/community')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              Visit Community
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHelp;