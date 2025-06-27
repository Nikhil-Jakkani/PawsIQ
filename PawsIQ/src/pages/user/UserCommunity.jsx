import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentAlt, FaSearch, FaFilter, FaPlus, FaHeart, FaRegHeart, FaComment, FaEye, FaCalendarAlt, FaUser, FaDog, FaCat, FaChevronDown, FaChevronUp, FaEllipsisH, FaShare, FaFlag } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserCommunity = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  
  // Mock user data
  const currentUser = {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };
  
  // Mock forum posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Tips for introducing a new cat to your dog?',
      content: 'I\'m planning to adopt a cat next week, but I already have a 3-year-old Golden Retriever. Does anyone have experience introducing cats to dogs? I want to make sure the transition goes smoothly for both pets. Any advice would be greatly appreciated!',
      author: {
        id: 2,
        name: 'Emily Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      category: 'advice',
      tags: ['cats', 'dogs', 'pet-introduction'],
      date: '2023-12-10T14:30:00',
      likes: 24,
      comments: 8,
      views: 156,
      isLiked: false
    },
    {
      id: 2,
      title: 'Best food for a senior Labrador with joint issues?',
      content: 'My 12-year-old Labrador has been showing signs of joint pain lately. The vet recommended a diet change to help with his mobility issues. Has anyone tried special senior dog food formulas that helped with joint health? Looking for brand recommendations and experiences.',
      author: {
        id: 3,
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      category: 'nutrition',
      tags: ['senior-dogs', 'joint-health', 'dog-food'],
      date: '2023-12-08T09:15:00',
      likes: 18,
      comments: 12,
      views: 203,
      isLiked: true
    },
    {
      id: 3,
      title: 'Upcoming Pet-Friendly Festival in Downtown',
      content: 'Just wanted to share that there\'s a pet-friendly festival happening downtown next weekend! There will be adoption events, pet product vendors, training demonstrations, and even a pet costume contest. I went last year and it was amazing. Anyone else planning to attend?',
      author: {
        id: 4,
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      category: 'events',
      tags: ['festival', 'pet-friendly', 'community'],
      date: '2023-12-05T16:45:00',
      likes: 32,
      comments: 15,
      views: 278,
      isLiked: false
    },
    {
      id: 4,
      title: 'How to stop my puppy from chewing furniture?',
      content: 'My 6-month-old Beagle puppy has started chewing on furniture legs and baseboards. I\'ve tried bitter apple spray and providing plenty of chew toys, but he still goes for the furniture when I\'m not looking. Any training tips or solutions that worked for your puppies?',
      author: {
        id: 5,
        name: 'David Clark',
        avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
      },
      category: 'training',
      tags: ['puppies', 'chewing', 'behavior'],
      date: '2023-12-03T11:20:00',
      likes: 15,
      comments: 20,
      views: 245,
      isLiked: false
    },
    {
      id: 5,
      title: "Success story: My rescue cat's transformation",
      content: 'I wanted to share my experience with adopting a rescue cat who was extremely shy and fearful. When I first brought Luna home 6 months ago, she would hide all day and wouldn\'t let anyone near her. With patience, love, and some techniques I learned from this community, she\'s now a confident, affectionate cat who greets me at the door! I\'ve attached before and after photos to show her amazing transformation.',
      author: {
        id: 6,
        name: 'Jennifer Lee',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg'
      },
      category: 'success-stories',
      tags: ['rescue-cats', 'transformation', 'adoption'],
      date: '2023-11-30T13:40:00',
      likes: 47,
      comments: 23,
      views: 312,
      isLiked: true
    }
  ]);
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Toggle post expansion
  const togglePostExpansion = (id) => {
    if (expandedPost === id) {
      setExpandedPost(null);
    } else {
      setExpandedPost(id);
    }
  };
  
  // Toggle like
  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likes: newIsLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };
  
  // Category options
  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'advice', label: 'Advice & Questions' },
    { value: 'nutrition', label: 'Pet Nutrition' },
    { value: 'training', label: 'Training & Behavior' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'events', label: 'Events & Meetups' },
    { value: 'success-stories', label: 'Success Stories' }
  ];
  
  // Popular tags
  const popularTags = [
    'dogs', 'cats', 'puppies', 'kittens', 'training', 'health', 'nutrition', 'adoption', 'behavior', 'grooming'
  ];
  
  // Trending topics
  const trendingTopics = [
    {
      title: 'Winter care tips for outdoor pets',
      comments: 34,
      category: 'health'
    },
    {
      title: 'Best interactive toys for cats',
      comments: 28,
      category: 'advice'
    },
    {
      title: 'How to prepare your pet for a new baby',
      comments: 42,
      category: 'training'
    }
  ];
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaCommentAlt className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Pet Owner Community</h1>
                <p className="text-gray-500 mt-1">Connect with other pet owners and share experiences</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/user/community/new-post')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus />
            New Post
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <FaFilter className="text-gray-500" />
                <span>Filters</span>
                {showFilters ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Popular Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-end justify-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                  }}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Forum Posts */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <div 
                    key={post.id} 
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize">
                            {post.category.replace('-', ' ')}
                          </span>
                          <button className="text-gray-500 hover:text-gray-700">
                            <FaEllipsisH />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h3 
                          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-purple-600 transition-colors"
                          onClick={() => togglePostExpansion(post.id)}
                        >
                          {post.title}
                        </h3>
                        
                        <div className={`mt-2 text-gray-600 ${expandedPost === post.id ? '' : 'line-clamp-2'}`}>
                          <p>{post.content}</p>
                        </div>
                        
                        {post.content.length > 150 && expandedPost !== post.id && (
                          <button 
                            onClick={() => togglePostExpansion(post.id)}
                            className="mt-1 text-purple-600 hover:text-purple-700 text-sm font-medium"
                          >
                            Read more
                          </button>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            {post.isLiked ? <FaHeart className="text-purple-600" /> : <FaRegHeart />}
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            onClick={() => navigate(`/user/community/post/${post.id}`)}
                            className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            <FaComment />
                            <span>{post.comments}</span>
                          </button>
                          <div className="flex items-center gap-1 text-gray-500">
                            <FaEye />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-500 hover:text-purple-600 transition-colors">
                            <FaShare />
                          </button>
                          <button className="text-gray-500 hover:text-red-600 transition-colors">
                            <FaFlag />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FaCommentAlt className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No discussions found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterCategory !== 'all'
                    ? "No discussions match your search criteria. Try adjusting your filters."
                    : "Be the first to start a discussion in our community!"}
                </p>
                <button 
                  onClick={() => navigate('/user/community/new-post')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <FaPlus />
                  Start a Discussion
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-purple-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Community Stats</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12,458</div>
                    <div className="text-sm text-gray-600">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">3,721</div>
                    <div className="text-sm text-gray-600">Discussions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">28,945</div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">142</div>
                    <div className="text-sm text-gray-600">Online Now</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trending Topics */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-purple-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Trending Topics</h3>
              </div>
              <div className="p-5 space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <span className="text-purple-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 hover:text-purple-600 cursor-pointer transition-colors">
                        {topic.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full capitalize">
                          {topic.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <FaComment size={12} />
                          <span>{topic.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-purple-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <FaCalendarAlt className="text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Pet-Friendly Festival</h4>
                    <p className="text-sm text-gray-600">Dec 16-17, 2023 • Downtown</p>
                    <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Dog Training Workshop</h4>
                    <p className="text-sm text-gray-600">Dec 23, 2023 • Central Park</p>
                    <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/user/community/events')}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  View All Events
                </button>
              </div>
            </div>
            
            {/* Active Members */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-purple-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Active Members</h3>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Emily Wilson" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">Emily Wilson</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDog className="text-pink-500" />
                    <FaCat className="text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://randomuser.me/api/portraits/men/22.jpg" 
                      alt="Michael Brown" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">Michael Brown</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDog className="text-pink-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://randomuser.me/api/portraits/women/28.jpg" 
                      alt="Sarah Johnson" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">Sarah Johnson</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDog className="text-pink-500" />
                    <FaCat className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/user/community/members')}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  View All Members
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserCommunity;