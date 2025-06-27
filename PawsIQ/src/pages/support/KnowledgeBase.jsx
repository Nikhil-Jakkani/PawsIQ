import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaBook, FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaFolder, FaFileAlt, FaTags, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(['general']);
  const [activeArticle, setActiveArticle] = useState(null);

  // Sample knowledge base categories and articles
  const categories = [
    {
      id: 'general',
      name: 'General Information',
      articles: [
        { 
          id: 1, 
          title: 'Getting Started with PawsIQ', 
          tags: ['basics', 'introduction'],
          lastUpdated: '2025-05-15',
          content: `
            <h2>Welcome to PawsIQ!</h2>
            <p>This guide will help you get started with the PawsIQ platform and understand its core features.</p>
            
            <h3>What is PawsIQ?</h3>
            <p>PawsIQ is a comprehensive pet care platform that connects pet owners with service providers, offers marketplace functionality, and provides tools for managing pet health and activities.</p>
            
            <h3>Key Features</h3>
            <ul>
              <li><strong>Service Booking:</strong> Schedule appointments with veterinarians, groomers, trainers, and more.</li>
              <li><strong>Pet Profiles:</strong> Create detailed profiles for your pets with health records, preferences, and care instructions.</li>
              <li><strong>Marketplace:</strong> Shop for pet products and services from verified sellers.</li>
              <li><strong>Community:</strong> Connect with other pet owners, share experiences, and get advice.</li>
            </ul>
            
            <h3>Getting Started</h3>
            <ol>
              <li>Create an account using your email or social media login.</li>
              <li>Set up profiles for each of your pets with relevant details.</li>
              <li>Browse service providers in your area and book appointments.</li>
              <li>Explore the marketplace for pet products and services.</li>
            </ol>
            
            <p>For more detailed information on specific features, please refer to the relevant sections in our knowledge base.</p>
          `
        },
        { 
          id: 2, 
          title: 'PawsIQ Subscription Plans', 
          tags: ['pricing', 'subscription'],
          lastUpdated: '2025-06-01',
          content: `
            <h2>PawsIQ Subscription Plans</h2>
            <p>This article outlines the different subscription plans available on the PawsIQ platform.</p>
            
            <h3>Available Plans</h3>
            
            <h4>Free Plan</h4>
            <ul>
              <li>Basic pet profile management</li>
              <li>Limited booking capabilities</li>
              <li>Access to marketplace</li>
              <li>Community forum access</li>
            </ul>
            
            <h4>Premium Plan ($9.99/month)</h4>
            <ul>
              <li>All Free Plan features</li>
              <li>Unlimited pet profiles</li>
              <li>Priority booking with service providers</li>
              <li>Discounts on marketplace purchases</li>
              <li>Health reminders and notifications</li>
              <li>24/7 chat support</li>
            </ul>
            
            <h4>Family Plan ($14.99/month)</h4>
            <ul>
              <li>All Premium Plan features</li>
              <li>Up to 5 user accounts for family members</li>
              <li>Shared pet profiles and management</li>
              <li>Enhanced discounts on services and products</li>
              <li>Emergency support line</li>
            </ul>
            
            <h3>Billing and Payment</h3>
            <p>All subscriptions are billed monthly or annually (with a 15% discount for annual billing). Payment can be made using credit/debit cards, PayPal, or Apple Pay.</p>
            
            <h3>Cancellation Policy</h3>
            <p>Subscriptions can be canceled at any time. When canceled, the subscription remains active until the end of the current billing period.</p>
          `
        }
      ]
    },
    {
      id: 'booking',
      name: 'Booking & Appointments',
      articles: [
        { 
          id: 3, 
          title: 'How to Book a Service', 
          tags: ['booking', 'appointments'],
          lastUpdated: '2025-05-20',
          content: `
            <h2>How to Book a Service on PawsIQ</h2>
            <p>This guide walks you through the process of booking pet care services on the PawsIQ platform.</p>
            
            <h3>Step-by-Step Booking Process</h3>
            <ol>
              <li><strong>Find a Service Provider:</strong> Use the search function to find service providers in your area. You can filter by service type, location, availability, and ratings.</li>
              <li><strong>View Provider Profile:</strong> Click on a provider to view their profile, services offered, pricing, and reviews from other pet owners.</li>
              <li><strong>Select a Service:</strong> Choose the specific service you need from the provider's list of offerings.</li>
              <li><strong>Choose Date and Time:</strong> Select an available date and time slot from the provider's calendar.</li>
              <li><strong>Select Pet(s):</strong> Choose which of your pets will be receiving the service.</li>
              <li><strong>Add Special Instructions:</strong> Provide any specific instructions or notes for the service provider.</li>
              <li><strong>Review and Confirm:</strong> Review all details and confirm your booking.</li>
              <li><strong>Payment:</strong> Complete the payment process to secure your booking.</li>
            </ol>
            
            <h3>Booking Policies</h3>
            <ul>
              <li><strong>Cancellation:</strong> Bookings can be canceled up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may be subject to a cancellation fee.</li>
              <li><strong>Rescheduling:</strong> You can reschedule appointments through the platform, subject to provider availability.</li>
              <li><strong>No-shows:</strong> Failure to show up for a confirmed appointment may result in a charge for the full service amount.</li>
            </ul>
            
            <h3>Troubleshooting</h3>
            <p>If you encounter any issues during the booking process, please contact our support team through the in-app chat or email support@pawsiq.com.</p>
          `
        },
        { 
          id: 4, 
          title: 'Cancellation and Refund Policy', 
          tags: ['cancellation', 'refunds', 'policy'],
          lastUpdated: '2025-05-25',
          content: `
            <h2>Cancellation and Refund Policy</h2>
            <p>This article explains PawsIQ's policies regarding cancellations, rescheduling, and refunds for booked services.</p>
            
            <h3>Cancellation Policy</h3>
            <ul>
              <li><strong>More than 24 hours notice:</strong> Full refund of the service amount.</li>
              <li><strong>12-24 hours notice:</strong> 75% refund of the service amount.</li>
              <li><strong>6-12 hours notice:</strong> 50% refund of the service amount.</li>
              <li><strong>Less than 6 hours notice:</strong> No refund provided.</li>
            </ul>
            
            <h3>Rescheduling Policy</h3>
            <p>Appointments can be rescheduled without penalty if done at least 12 hours before the scheduled time. Rescheduling with less than 12 hours notice may incur a rescheduling fee of 25% of the service cost.</p>
            
            <h3>Refund Processing</h3>
            <p>Refunds are processed back to the original payment method within 3-5 business days. For credit card payments, it may take an additional 2-3 business days for the refund to appear on your statement.</p>
            
            <h3>Provider Cancellations</h3>
            <p>If a service provider cancels an appointment, you will receive a full refund plus a 10% credit toward your next booking as compensation for the inconvenience.</p>
            
            <h3>Disputes</h3>
            <p>If you have a dispute regarding a cancellation or refund, please contact our support team within 7 days of the scheduled service date. Our team will review the case and work to resolve the issue fairly.</p>
          `
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payments & Billing',
      articles: [
        { 
          id: 5, 
          title: 'Payment Methods Accepted', 
          tags: ['payment', 'billing'],
          lastUpdated: '2025-06-05',
          content: `
            <h2>Payment Methods Accepted on PawsIQ</h2>
            <p>This article outlines the various payment methods accepted on the PawsIQ platform for services, products, and subscriptions.</p>
            
            <h3>Accepted Payment Methods</h3>
            <ul>
              <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, American Express, Discover</li>
              <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay, Samsung Pay</li>
              <li><strong>Online Payment Services:</strong> PayPal, Venmo</li>
              <li><strong>Bank Transfers:</strong> ACH (US only)</li>
              <li><strong>PawsIQ Credits:</strong> Platform credits earned through referrals or promotions</li>
            </ul>
            
            <h3>Adding a Payment Method</h3>
            <ol>
              <li>Go to your Account Settings</li>
              <li>Select "Payment Methods"</li>
              <li>Click "Add Payment Method"</li>
              <li>Choose the type of payment method you want to add</li>
              <li>Enter the required information</li>
              <li>Set as default payment method if desired</li>
            </ol>
            
            <h3>Payment Security</h3>
            <p>PawsIQ uses industry-standard encryption and security protocols to protect your payment information. We do not store complete credit card numbers on our servers. All transactions are processed through PCI-compliant payment processors.</p>
            
            <h3>International Payments</h3>
            <p>For users outside the United States, payments are processed in local currency where available. Currency conversion fees may apply depending on your payment method and issuing bank.</p>
          `
        }
      ]
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      articles: [
        { 
          id: 6, 
          title: 'Purchasing Products', 
          tags: ['marketplace', 'shopping'],
          lastUpdated: '2025-05-30',
          content: `
            <h2>Purchasing Products on PawsIQ Marketplace</h2>
            <p>This guide explains how to browse, select, and purchase products from the PawsIQ Marketplace.</p>
            
            <h3>Browsing the Marketplace</h3>
            <p>The PawsIQ Marketplace offers a wide range of pet products from verified sellers. You can browse products by:</p>
            <ul>
              <li>Categories (Food, Toys, Accessories, etc.)</li>
              <li>Pet type (Dog, Cat, Bird, etc.)</li>
              <li>Brand</li>
              <li>Price range</li>
              <li>Ratings and reviews</li>
            </ul>
            
            <h3>Making a Purchase</h3>
            <ol>
              <li><strong>Select a Product:</strong> Browse the marketplace and click on a product to view details.</li>
              <li><strong>Review Product Information:</strong> Check product description, specifications, pricing, shipping options, and reviews.</li>
              <li><strong>Add to Cart:</strong> Click "Add to Cart" for the items you wish to purchase.</li>
              <li><strong>Review Cart:</strong> Review your cart contents, quantities, and total cost.</li>
              <li><strong>Checkout:</strong> Click "Proceed to Checkout" when ready.</li>
              <li><strong>Shipping Information:</strong> Enter or select your shipping address and preferred shipping method.</li>
              <li><strong>Payment:</strong> Select your payment method and enter payment details.</li>
              <li><strong>Place Order:</strong> Review all information and click "Place Order" to complete your purchase.</li>
            </ol>
            
            <h3>Order Tracking</h3>
            <p>After placing an order, you can track its status in the "My Orders" section of your account. You'll receive email notifications when your order is confirmed, shipped, and delivered.</p>
            
            <h3>Returns and Exchanges</h3>
            <p>Most products on the PawsIQ Marketplace can be returned within 30 days of delivery if unused and in original packaging. Specific return policies may vary by seller, so please check the product listing for details.</p>
          `
        }
      ]
    },
    {
      id: 'account',
      name: 'Account Management',
      articles: [
        { 
          id: 7, 
          title: 'Updating Account Information', 
          tags: ['account', 'profile'],
          lastUpdated: '2025-06-10',
          content: `
            <h2>Updating Your Account Information</h2>
            <p>This guide explains how to update your personal information, contact details, and account preferences on PawsIQ.</p>
            
            <h3>Accessing Account Settings</h3>
            <p>To access your account settings:</p>
            <ol>
              <li>Log in to your PawsIQ account</li>
              <li>Click on your profile picture in the top-right corner</li>
              <li>Select "Account Settings" from the dropdown menu</li>
            </ol>
            
            <h3>Updating Personal Information</h3>
            <p>In the Account Settings page, you can update:</p>
            <ul>
              <li><strong>Name:</strong> First and last name</li>
              <li><strong>Email Address:</strong> Your primary email (requires verification)</li>
              <li><strong>Phone Number:</strong> Your contact number</li>
              <li><strong>Address:</strong> Your home or billing address</li>
              <li><strong>Profile Picture:</strong> Upload or change your profile image</li>
            </ul>
            
            <h3>Security Settings</h3>
            <p>In the Security section, you can:</p>
            <ul>
              <li>Change your password</li>
              <li>Enable/disable two-factor authentication</li>
              <li>Manage connected social accounts</li>
              <li>View active sessions and log out remotely</li>
            </ul>
            
            <h3>Notification Preferences</h3>
            <p>In the Notifications section, you can customize which notifications you receive and how:</p>
            <ul>
              <li>Email notifications</li>
              <li>Push notifications</li>
              <li>SMS notifications</li>
              <li>In-app notifications</li>
            </ul>
            
            <h3>Privacy Settings</h3>
            <p>In the Privacy section, you can control:</p>
            <ul>
              <li>Who can see your profile</li>
              <li>Data sharing preferences</li>
              <li>Marketing communication opt-in/out</li>
            </ul>
            
            <p>Remember to click "Save Changes" after making any updates to your account information.</p>
          `
        }
      ]
    }
  ];

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  // Filter articles based on search term
  const filteredCategories = categories.map(category => {
    const filteredArticles = category.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return {
      ...category,
      articles: filteredArticles
    };
  }).filter(category => category.articles.length > 0);

  // Get article by ID
  const getArticleById = (articleId) => {
    for (const category of categories) {
      const article = category.articles.find(a => a.id === articleId);
      if (article) return article;
    }
    return null;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaBook className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Knowledge Base</h1>
            <p className="text-gray-500">Manage help articles and documentation</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
          <div className="flex h-[calc(100vh-220px)]">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-700">Categories</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                    <FaPlus size={12} /> Add Category
                  </button>
                </div>
                
                {filteredCategories.length > 0 ? (
                  <div className="space-y-2">
                    {filteredCategories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div 
                          className="bg-gray-50 px-4 py-2 flex items-center justify-between cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <div className="flex items-center gap-2">
                            <FaFolder className="text-indigo-500" />
                            <span className="font-medium text-gray-700">{category.name}</span>
                          </div>
                          {expandedCategories.includes(category.id) ? (
                            <FaChevronDown size={12} className="text-gray-500" />
                          ) : (
                            <FaChevronRight size={12} className="text-gray-500" />
                          )}
                        </div>
                        
                        {expandedCategories.includes(category.id) && (
                          <div className="p-2 bg-white">
                            <div className="flex justify-end mb-2">
                              <button className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1">
                                <FaPlus size={10} /> Add Article
                              </button>
                            </div>
                            <ul className="space-y-1">
                              {category.articles.map((article) => (
                                <li key={article.id}>
                                  <button
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                                      activeArticle === article.id 
                                        ? 'bg-indigo-50 text-indigo-700' 
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                    onClick={() => setActiveArticle(article.id)}
                                  >
                                    <FaFileAlt className={activeArticle === article.id ? 'text-indigo-500' : 'text-gray-400'} />
                                    <span>{article.title}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No articles found matching your search.
                  </div>
                )}
              </div>
            </div>
            
            {/* Article Content */}
            <div className="w-2/3 flex flex-col">
              {activeArticle ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      {getArticleById(activeArticle)?.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm">
                        <FaEdit size={14} /> Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm">
                        <FaTrash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaTags className="text-gray-400" />
                        <div className="flex gap-1">
                          {getArticleById(activeArticle)?.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Last updated: {formatDate(getArticleById(activeArticle)?.lastUpdated)}
                      </div>
                    </div>
                    
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: getArticleById(activeArticle)?.content }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <FaBook className="text-indigo-300 text-5xl mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No article selected</h3>
                    <p className="text-gray-500 mt-1">Select an article from the sidebar to view its content</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBase;