import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaCheck,
  FaTimes,
  FaFlag,
  FaComment,
  FaThumbsUp,
  FaThumbsDown,
  FaUserCircle
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ProviderPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  
  // Sample data for provider reviews
  const reviewsData = [
    { 
      id: 1, 
      providerName: 'Happy Paws Veterinary Clinic', 
      providerEmail: 'info@happypawsvet.com',
      customerName: 'John Smith',
      customerEmail: 'john.smith@example.com',
      rating: 5, 
      title: 'Excellent care for my dog',
      review: 'Dr. Johnson was amazing with my anxious dog. Very patient and thorough with the examination. The clinic was clean and the staff was friendly. Highly recommend!',
      date: '2023-12-05',
      status: 'published',
      response: 'Thank you for your kind words! We strive to provide the best care for all our furry patients.',
      responseDate: '2023-12-06',
      helpful: 12,
      unhelpful: 1,
      flagged: false,
      serviceType: 'Veterinary Check-up'
    },
    { 
      id: 2, 
      providerName: 'Fluffy Cuts Grooming', 
      providerEmail: 'appointments@fluffycuts.com',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      rating: 4, 
      title: 'Great grooming service',
      review: 'My cat looks amazing after her grooming session. The groomer was gentle and professional. Only giving 4 stars because the wait time was longer than expected.',
      date: '2023-12-03',
      status: 'published',
      response: 'Thank you for your feedback, Sarah! We apologize for the wait time and are working to improve our scheduling.',
      responseDate: '2023-12-04',
      helpful: 8,
      unhelpful: 2,
      flagged: false,
      serviceType: 'Full Grooming'
    },
    { 
      id: 3, 
      providerName: 'Paws & Play Pet Sitting', 
      providerEmail: 'care@pawsandplay.com',
      customerName: 'Michael Brown',
      customerEmail: 'michael.b@example.com',
      rating: 2, 
      title: 'Disappointed with the service',
      review: 'The pet sitter arrived late and didn\'t follow the feeding instructions I left. My cat seemed stressed when I returned home.',
      date: '2023-12-01',
      status: 'published',
      response: 'We sincerely apologize for your experience. We would like to make this right. Please contact our customer service team so we can address your concerns.',
      responseDate: '2023-12-02',
      helpful: 5,
      unhelpful: 1,
      flagged: false,
      serviceType: 'Pet Sitting'
    },
    { 
      id: 4, 
      providerName: 'Canine Academy', 
      providerEmail: 'training@canineacademy.com',
      customerName: 'Emily Davis',
      customerEmail: 'emily.d@example.com',
      rating: 5, 
      title: 'Amazing training results',
      review: 'The training program worked wonders for my hyperactive puppy. The trainer was patient and used positive reinforcement techniques. My puppy is now well-behaved and responds to commands!',
      date: '2023-11-28',
      status: 'published',
      response: 'Thank you for your wonderful review, Emily! We\'re so happy to hear about your puppy\'s progress.',
      responseDate: '2023-11-29',
      helpful: 15,
      unhelpful: 0,
      flagged: false,
      serviceType: 'Puppy Training'
    },
    { 
      id: 5, 
      providerName: 'Pet Paradise Boarding', 
      providerEmail: 'reservations@petparadise.com',
      customerName: 'David Wilson',
      customerEmail: 'david.w@example.com',
      rating: 3, 
      title: 'Average boarding experience',
      review: 'The facility was clean, but my dog didn\'t seem to enjoy his stay. The staff was friendly but I think they were understaffed during my dog\'s stay.',
      date: '2023-11-25',
      status: 'published',
      response: 'Thank you for your feedback, David. We appreciate your honesty and will use your comments to improve our services.',
      responseDate: '2023-11-26',
      helpful: 7,
      unhelpful: 3,
      flagged: false,
      serviceType: 'Overnight Boarding'
    },
    { 
      id: 6, 
      providerName: 'Whiskers & Paws Clinic', 
      providerEmail: 'appointments@whiskerspaws.com',
      customerName: 'Jessica Taylor',
      customerEmail: 'jessica.t@example.com',
      rating: 1, 
      title: 'Terrible experience',
      review: 'The vet was rude and dismissive of my concerns. The clinic was overcrowded and we had to wait for over an hour past our appointment time.',
      date: '2023-11-22',
      status: 'under review',
      response: '',
      responseDate: '',
      helpful: 3,
      unhelpful: 1,
      flagged: true,
      serviceType: 'Veterinary Check-up'
    },
    { 
      id: 7, 
      providerName: 'Pawfect Walkers', 
      providerEmail: 'schedule@pawfectwalkers.com',
      customerName: 'Robert Martinez',
      customerEmail: 'robert.m@example.com',
      rating: 5, 
      title: 'Reliable dog walking service',
      review: 'My dog walker is always on time and sends me updates during their walks. My dog loves her walks and comes back happy and tired!',
      date: '2023-11-20',
      status: 'published',
      response: 'Thank you for your kind review, Robert! We\'re happy to provide reliable service for you and your furry friend.',
      responseDate: '2023-11-21',
      helpful: 9,
      unhelpful: 0,
      flagged: false,
      serviceType: 'Dog Walking'
    },
    { 
      id: 8, 
      providerName: 'Elite Pet Grooming', 
      providerEmail: 'bookings@elitepetgrooming.com',
      customerName: 'Lisa Anderson',
      customerEmail: 'lisa.a@example.com',
      rating: 4, 
      title: 'Good grooming but pricey',
      review: 'My dog looks great after his grooming session. The groomer did an excellent job with his coat. The only downside is the price, which is a bit high compared to other groomers in the area.',
      date: '2023-11-18',
      status: 'published',
      response: 'Thank you for your feedback, Lisa. We pride ourselves on quality grooming and use premium products, which is reflected in our pricing. We do offer loyalty discounts for regular customers!',
      responseDate: '2023-11-19',
      helpful: 6,
      unhelpful: 2,
      flagged: false,
      serviceType: 'Full Grooming'
    },
    { 
      id: 9, 
      providerName: 'Healthy Paws Veterinary', 
      providerEmail: 'care@healthypaws.com',
      customerName: 'Kevin Thomas',
      customerEmail: 'kevin.t@example.com',
      rating: 5, 
      title: 'Compassionate care',
      review: 'Dr. Smith was incredibly compassionate when we had to make a difficult decision for our aging pet. The entire staff was supportive and caring during a tough time.',
      date: '2023-11-15',
      status: 'published',
      response: 'Thank you for sharing your experience, Kevin. We aim to provide compassionate care during all stages of your pet\'s life.',
      responseDate: '2023-11-16',
      helpful: 18,
      unhelpful: 0,
      flagged: false,
      serviceType: 'Veterinary Care'
    },
    { 
      id: 10, 
      providerName: 'Home Pet Care', 
      providerEmail: 'service@homepetcare.com',
      customerName: 'Amanda White',
      customerEmail: 'amanda.w@example.com',
      rating: 2, 
      title: 'Unprofessional service',
      review: 'The pet sitter canceled last minute, leaving me scrambling to find a replacement. Very unprofessional and unreliable.',
      date: '2023-11-12',
      status: 'under review',
      response: '',
      responseDate: '',
      helpful: 4,
      unhelpful: 1,
      flagged: true,
      serviceType: 'Pet Sitting'
    }
  ];

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-400" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = reviewsData
    .filter(review => {
      const matchesSearch = 
        review.providerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterRating === 'all' || 
        (filterRating === '5' && review.rating === 5) ||
        (filterRating === '4' && review.rating === 4) ||
        (filterRating === '3' && review.rating === 3) ||
        (filterRating === '2' && review.rating === 2) ||
        (filterRating === '1' && review.rating === 1);
      
      const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
      
      return matchesSearch && matchesRating && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortField === 'providerName') {
        comparison = a.providerName.localeCompare(b.providerName);
      } else if (sortField === 'helpful') {
        comparison = a.helpful - b.helpful;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1 text-indigo-600" /> : <FaSortDown className="ml-1 text-indigo-600" />;
  };

  // Handle view review details
  const handleViewReview = (review) => {
    setCurrentReview(review);
    setShowReviewModal(true);
  };

  // Handle review status change
  const handleStatusChange = (reviewId, newStatus) => {
    // In a real app, you would call an API to update the review status
    console.log(`Changing review ${reviewId} status to ${newStatus}`);
    alert(`Review status changed to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/providers" className="text-gray-500 hover:text-indigo-600">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Ratings & Reviews</h1>
              <p className="text-gray-500">Monitor and manage provider ratings and customer reviews</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Reviews
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search reviews..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Rating Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            
            {/* Status Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="under review">Under Review</option>
            </select>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('providerName')}
                  >
                    <div className="flex items-center">
                      Provider {getSortIcon('providerName')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('rating')}
                  >
                    <div className="flex items-center">
                      Rating {getSortIcon('rating')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date {getSortIcon('date')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('helpful')}
                  >
                    <div className="flex items-center">
                      Helpful {getSortIcon('helpful')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{review.providerName}</div>
                      <div className="text-xs text-gray-500">{review.serviceType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{review.customerName}</div>
                      <div className="text-xs text-gray-500">{review.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStarRating(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{review.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{review.review}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {review.status === 'published' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Published</span>
                      ) : review.status === 'under review' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Under Review</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>
                      )}
                      {review.flagged && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Flagged</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FaThumbsUp className="text-green-500" />
                        <span className="text-sm text-gray-900">{review.helpful}</span>
                        <FaThumbsDown className="text-red-500 ml-2" />
                        <span className="text-sm text-gray-900">{review.unhelpful}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewReview(review)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {review.status === 'under review' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(review.id, 'published')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve Review"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusChange(review.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Reject Review"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        {!review.flagged && (
                          <button
                            onClick={() => alert(`Review ${review.id} flagged for review`)}
                            className="text-amber-600 hover:text-amber-900"
                            title="Flag Review"
                          >
                            <FaFlag />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Details Modal */}
        {showReviewModal && currentReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Review Details</h2>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Provider Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-base font-medium text-gray-900">{currentReview.providerName}</p>
                      <p className="text-sm text-gray-500">{currentReview.providerEmail}</p>
                      <p className="text-sm text-gray-500 mt-1">Service: {currentReview.serviceType}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaUserCircle className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-900">{currentReview.customerName}</p>
                          <p className="text-sm text-gray-500">{currentReview.customerEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Review</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {renderStarRating(currentReview.rating)}
                        <span className="text-lg font-bold text-gray-900 ml-2">{currentReview.rating}/5</span>
                      </div>
                      <p className="text-sm text-gray-500">{currentReview.date}</p>
                    </div>
                    <h4 className="text-base font-medium text-gray-900 mb-2">{currentReview.title}</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{currentReview.review}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaThumbsUp className="text-green-500" />
                        <span>{currentReview.helpful} helpful</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaThumbsDown className="text-red-500" />
                        <span>{currentReview.unhelpful} unhelpful</span>
                      </div>
                    </div>
                  </div>
                </div>

                {currentReview.response && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Provider Response</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="text-base font-medium text-gray-900">Response from {currentReview.providerName}</p>
                        <p className="text-sm text-gray-500">{currentReview.responseDate}</p>
                      </div>
                      <p className="text-sm text-gray-700">{currentReview.response}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Status</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-700">Current status:</p>
                      {currentReview.status === 'published' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Published</span>
                      ) : currentReview.status === 'under review' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Under Review</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>
                      )}
                      {currentReview.flagged && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Flagged</span>
                      )}
                    </div>
                    
                    {currentReview.status === 'under review' && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            handleStatusChange(currentReview.id, 'published');
                            setShowReviewModal(false);
                          }}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-700 transition-colors"
                        >
                          <FaCheck size={12} /> Approve Review
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(currentReview.id, 'rejected');
                            setShowReviewModal(false);
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-red-700 transition-colors"
                        >
                          <FaTimes size={12} /> Reject Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!currentReview.response && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Add Provider Response</h3>
                    <textarea
                      rows="4"
                      placeholder="Enter provider's response to this review..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                    <button
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => alert('Response would be saved and sent to the provider')}
                    >
                      Save Response
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProviderPerformance;