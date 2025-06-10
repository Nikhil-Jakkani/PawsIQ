import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaCheck,
  FaTimes,
  FaPaw,
  FaDog,
  FaCat,
  FaFeather,
  FaFish,
  FaRabbit,
  FaUserCircle,
  FaCalendarAlt,
  FaImage,
  FaExclamationTriangle,
  FaFlag,
  FaShieldAlt,
  FaCamera,
  FaCommentAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaEllipsisH
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PetModeration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showContentModal, setShowContentModal] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  
  // Sample data for content moderation
  const contentData = [
    { 
      id: 1, 
      petName: 'Max', 
      petSpecies: 'Dog',
      petBreed: 'Golden Retriever',
      ownerName: 'John Smith',
      ownerEmail: 'john.smith@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      caption: 'Max enjoying his day at the park!',
      dateSubmitted: '2023-12-05',
      status: 'pending',
      flags: 0,
      reports: [],
      notes: ''
    },
    { 
      id: 2, 
      petName: 'Luna', 
      petSpecies: 'Cat',
      petBreed: 'Siamese',
      ownerName: 'Sarah Johnson',
      ownerEmail: 'sarah.j@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      caption: 'Luna looking regal as always',
      dateSubmitted: '2023-12-03',
      status: 'approved',
      flags: 0,
      reports: [],
      notes: 'Approved on 2023-12-04'
    },
    { 
      id: 3, 
      petName: 'Charlie', 
      petSpecies: 'Dog',
      petBreed: 'Beagle',
      ownerName: 'Michael Brown',
      ownerEmail: 'michael.b@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      caption: 'Charlie found something interesting on our walk!',
      dateSubmitted: '2023-12-01',
      status: 'rejected',
      flags: 2,
      reports: [
        { reportedBy: 'User123', reason: 'Inappropriate content', details: 'This image shows the dog digging in a protected garden area.' }
      ],
      notes: 'Rejected due to showing destructive behavior in a public space.'
    },
    { 
      id: 4, 
      petName: 'Oliver', 
      petSpecies: 'Cat',
      petBreed: 'Maine Coon',
      ownerName: 'Emily Davis',
      ownerEmail: 'emily.d@example.com',
      contentType: 'comment',
      contentURL: '',
      caption: '',
      content: 'Oliver just had his first visit to the vet and was so well-behaved! The vet said he\'s the biggest Maine Coon kitten they\'ve seen. #proudcatmom',
      dateSubmitted: '2023-11-28',
      status: 'approved',
      flags: 0,
      reports: [],
      notes: 'Approved on 2023-11-29'
    },
    { 
      id: 5, 
      petName: 'Bella', 
      petSpecies: 'Dog',
      petBreed: 'Labrador Retriever',
      ownerName: 'David Wilson',
      ownerEmail: 'david.w@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwbGFicmFkb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      caption: 'Bella after her swimming lesson. She loves the water!',
      dateSubmitted: '2023-11-25',
      status: 'pending',
      flags: 1,
      reports: [
        { reportedBy: 'User456', reason: 'Safety concern', details: 'Dog appears to be unsupervised near water.' }
      ],
      notes: 'Under review for safety concerns.'
    },
    { 
      id: 6, 
      petName: 'Coco', 
      petSpecies: 'Bird',
      petBreed: 'Cockatiel',
      ownerName: 'Jessica Taylor',
      ownerEmail: 'jessica.t@example.com',
      contentType: 'video',
      contentURL: 'https://example.com/videos/coco-singing.mp4',
      caption: 'Coco singing her favorite tune!',
      videoThumbnail: 'https://images.unsplash.com/photo-1591198936750-16d8e15edc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja2F0aWVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateSubmitted: '2023-11-22',
      status: 'approved',
      flags: 0,
      reports: [],
      notes: 'Approved on 2023-11-23'
    },
    { 
      id: 7, 
      petName: 'Rocky', 
      petSpecies: 'Dog',
      petBreed: 'Boxer',
      ownerName: 'Robert Martinez',
      ownerEmail: 'robert.m@example.com',
      contentType: 'comment',
      contentURL: '',
      caption: '',
      content: 'Rocky is having trouble with his arthritis medication. Has anyone tried natural supplements for joint pain? Looking for recommendations.',
      dateSubmitted: '2023-11-20',
      status: 'pending',
      flags: 0,
      reports: [],
      notes: 'Reviewing for medical advice concerns.'
    },
    { 
      id: 8, 
      petName: 'Nemo', 
      petSpecies: 'Fish',
      petBreed: 'Betta',
      ownerName: 'Lisa Anderson',
      ownerEmail: 'lisa.a@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmV0dGElMjBmaXNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      caption: 'Nemo\'s new tank setup. What do you think?',
      dateSubmitted: '2023-11-18',
      status: 'approved',
      flags: 0,
      reports: [],
      notes: 'Approved on 2023-11-19'
    },
    { 
      id: 9, 
      petName: 'Daisy', 
      petSpecies: 'Rabbit',
      petBreed: 'Holland Lop',
      ownerName: 'Kevin Thomas',
      ownerEmail: 'kevin.t@example.com',
      contentType: 'photo',
      contentURL: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9sbGFuZCUyMGxvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      caption: 'Daisy enjoying her new chew toys from PetSupplies.com - they have the best deals!',
      dateSubmitted: '2023-11-15',
      status: 'rejected',
      flags: 3,
      reports: [
        { reportedBy: 'User789', reason: 'Spam/Advertising', details: 'This post contains promotional content.' }
      ],
      notes: 'Rejected for promotional content without proper disclosure.'
    },
    { 
      id: 10, 
      petName: 'Shadow', 
      petSpecies: 'Cat',
      petBreed: 'Bombay',
      ownerName: 'Amanda White',
      ownerEmail: 'amanda.w@example.com',
      contentType: 'video',
      contentURL: 'https://example.com/videos/shadow-playing.mp4',
      caption: 'Shadow playing with his new toy mouse!',
      videoThumbnail: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBjYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      dateSubmitted: '2023-11-12',
      status: 'approved',
      flags: 0,
      reports: [],
      notes: 'Approved on 2023-11-13'
    }
  ];

  // Get content type icon
  const getContentTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'photo':
        return <FaImage className="text-blue-500" />;
      case 'video':
        return <FaCamera className="text-red-500" />;
      case 'comment':
        return <FaCommentAlt className="text-green-500" />;
      default:
        return <FaEllipsisH className="text-gray-500" />;
    }
  };

  // Get species icon
  const getSpeciesIcon = (species) => {
    switch (species.toLowerCase()) {
      case 'dog':
        return <FaDog className="text-amber-600" />;
      case 'cat':
        return <FaCat className="text-gray-600" />;
      case 'bird':
        return <FaFeather className="text-blue-500" />;
      case 'fish':
        return <FaFish className="text-indigo-500" />;
      case 'rabbit':
        return <FaRabbit className="text-brown-500" />;
      default:
        return <FaPaw className="text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1"><FaCheck size={10} /> Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1"><FaTimes size={10} /> Rejected</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 flex items-center gap-1"><FaExclamationTriangle size={10} /> Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Filter and sort content
  const filteredAndSortedContent = contentData
    .filter(content => {
      const matchesSearch = 
        content.petName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        content.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (content.caption && content.caption.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (content.content && content.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || content.contentType === filterType;
      const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.dateSubmitted) - new Date(b.dateSubmitted);
      } else if (sortField === 'petName') {
        comparison = a.petName.localeCompare(b.petName);
      } else if (sortField === 'ownerName') {
        comparison = a.ownerName.localeCompare(b.ownerName);
      } else if (sortField === 'flags') {
        comparison = a.flags - b.flags;
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

  // Handle view content details
  const handleViewContent = (content) => {
    setCurrentContent(content);
    setShowContentModal(true);
  };

  // Handle content status change
  const handleStatusChange = (contentId, newStatus) => {
    // In a real app, you would call an API to update the content status
    console.log(`Changing content ${contentId} status to ${newStatus}`);
    alert(`Content status changed to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/pets" className="text-gray-500 hover:text-indigo-600">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Content Moderation</h1>
              <p className="text-gray-500">Review and moderate user-generated pet content</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Report
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
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Content Type Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Content Types</option>
              <option value="photo">Photos</option>
              <option value="video">Videos</option>
              <option value="comment">Comments</option>
            </select>
            
            {/* Status Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('petName')}
                  >
                    <div className="flex items-center">
                      Pet {getSortIcon('petName')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ownerName')}
                  >
                    <div className="flex items-center">
                      Owner {getSortIcon('ownerName')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
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
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('flags')}
                  >
                    <div className="flex items-center">
                      Flags {getSortIcon('flags')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedContent.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          {getSpeciesIcon(content.petSpecies)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{content.petName}</div>
                          <div className="text-xs text-gray-500">{content.petBreed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{content.ownerName}</div>
                      <div className="text-xs text-gray-500">{content.ownerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getContentTypeIcon(content.contentType)}
                        <span className="text-sm text-gray-900 capitalize">{content.contentType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {content.contentType === 'photo' && (
                        <div className="h-12 w-12 rounded overflow-hidden">
                          <img src={content.contentURL} alt={content.caption} className="h-full w-full object-cover" />
                        </div>
                      )}
                      {content.contentType === 'video' && (
                        <div className="h-12 w-12 rounded overflow-hidden relative">
                          <img src={content.videoThumbnail} alt={content.caption} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <FaCamera className="text-white" />
                          </div>
                        </div>
                      )}
                      {content.contentType === 'comment' && (
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {content.content}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {content.flags > 0 ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                          <FaFlag size={10} /> {content.flags} {content.flags === 1 ? 'Flag' : 'Flags'}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(content.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewContent(content)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {content.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(content.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve Content"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusChange(content.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Reject Content"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Details Modal */}
        {showContentModal && currentContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Content Review</h2>
                  <button 
                    onClick={() => setShowContentModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Content Preview */}
                  <div className="md:w-1/2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Content Preview</h3>
                    {currentContent.contentType === 'photo' && (
                      <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                        <img 
                          src={currentContent.contentURL} 
                          alt={currentContent.caption} 
                          className="w-full h-auto object-cover"
                        />
                        {currentContent.caption && (
                          <div className="p-3 bg-gray-50">
                            <p className="text-sm text-gray-700">{currentContent.caption}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {currentContent.contentType === 'video' && (
                      <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                        <div className="relative">
                          <img 
                            src={currentContent.videoThumbnail} 
                            alt={currentContent.caption} 
                            className="w-full h-auto object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="h-16 w-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                              <FaCamera className="text-indigo-600 text-2xl" />
                            </div>
                          </div>
                        </div>
                        {currentContent.caption && (
                          <div className="p-3 bg-gray-50">
                            <p className="text-sm text-gray-700">{currentContent.caption}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {currentContent.contentType === 'comment' && (
                      <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 p-4 bg-gray-50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            {getSpeciesIcon(currentContent.petSpecies)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{currentContent.petName}</p>
                            <p className="text-xs text-gray-500">{currentContent.dateSubmitted}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{currentContent.content}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span className="text-sm text-gray-600">Submitted: {currentContent.dateSubmitted}</span>
                      </div>
                      <div>
                        {getStatusBadge(currentContent.status)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Details */}
                  <div className="md:w-1/2 space-y-6">
                    {/* Pet & Owner Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Pet & Owner Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            {getSpeciesIcon(currentContent.petSpecies)}
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900">{currentContent.petName}</p>
                            <p className="text-sm text-gray-500">{currentContent.petBreed}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <FaUserCircle className="text-indigo-600" size={20} />
                            </div>
                            <div>
                              <p className="text-base font-medium text-gray-900">{currentContent.ownerName}</p>
                              <p className="text-sm text-gray-500">{currentContent.ownerEmail}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Flags & Reports */}
                    {(currentContent.flags > 0 || currentContent.reports.length > 0) && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Flags & Reports</h3>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <FaFlag className="text-red-500" />
                            <span className="text-base font-medium text-red-700">
                              {currentContent.flags} {currentContent.flags === 1 ? 'Flag' : 'Flags'} Received
                            </span>
                          </div>
                          
                          {currentContent.reports.length > 0 && (
                            <div className="space-y-3">
                              {currentContent.reports.map((report, index) => (
                                <div key={index} className="bg-white p-3 rounded border border-red-200">
                                  <div className="flex justify-between mb-1">
                                    <p className="text-sm font-medium text-gray-900">Reported by: {report.reportedBy}</p>
                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">{report.reason}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{report.details}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Moderation Notes */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Moderation Notes</h3>
                      {currentContent.notes ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">{currentContent.notes}</p>
                        </div>
                      ) : (
                        <textarea
                          rows="4"
                          placeholder="Add moderation notes here..."
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                      )}
                    </div>
                    
                    {/* Moderation Actions */}
                    {currentContent.status === 'pending' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Moderation Actions</h3>
                        <div className="flex flex-wrap gap-3">
                          <button
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                            onClick={() => {
                              handleStatusChange(currentContent.id, 'approved');
                              setShowContentModal(false);
                            }}
                          >
                            <FaCheck /> Approve Content
                          </button>
                          <button
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                            onClick={() => {
                              handleStatusChange(currentContent.id, 'rejected');
                              setShowContentModal(false);
                            }}
                          >
                            <FaTimes /> Reject Content
                          </button>
                          <button
                            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center gap-2"
                            onClick={() => alert('This would send a warning to the user')}
                          >
                            <FaExclamationTriangle /> Warn User
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowContentModal(false)}
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

export default PetModeration;