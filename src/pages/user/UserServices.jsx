import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaStar, FaFilter, FaCalendarAlt, FaPhone, FaGlobe, FaHeart, FaRegHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDistance, setFilterDistance] = useState('any');
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([2, 5]);
  
  // Mock service provider data
  const serviceProviders = [
    {
      id: 1,
      name: 'Happy Paws Veterinary Clinic',
      type: 'vet',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 124,
      distance: 1.2,
      address: '123 Pet Care Lane, Pawsville',
      phone: '(555) 123-4567',
      website: 'www.happypawsvet.com',
      services: ['Checkups', 'Vaccinations', 'Surgery', 'Dental Care'],
      description: 'Full-service veterinary clinic providing comprehensive care for all pets. Our team of experienced veterinarians is dedicated to keeping your pets healthy and happy.'
    },
    {
      id: 2,
      name: 'Fluffy Paws Grooming',
      type: 'grooming',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 98,
      distance: 0.8,
      address: '456 Grooming Street, Pawsville',
      phone: '(555) 234-5678',
      website: 'www.fluffypaws.com',
      services: ['Bath & Brush', 'Full Grooming', 'Nail Trimming', 'De-shedding'],
      description: 'Professional pet grooming services in a calm, stress-free environment. We use premium products and provide personalized care for each pet.'
    },
    {
      id: 3,
      name: 'Obedient Paws Training Center',
      type: 'training',
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 76,
      distance: 2.5,
      address: '789 Training Road, Pawsville',
      phone: '(555) 345-6789',
      website: 'www.obedientpaws.com',
      services: ['Basic Obedience', 'Advanced Training', 'Puppy Classes', 'Behavior Modification'],
      description: 'Expert dog training using positive reinforcement techniques. Our certified trainers work with dogs of all ages and breeds to develop good behavior and strengthen the human-animal bond.'
    },
    {
      id: 4,
      name: 'Pawsome Pet Boarding',
      type: 'boarding',
      image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.6,
      reviewCount: 112,
      distance: 3.1,
      address: '101 Boarding Blvd, Pawsville',
      phone: '(555) 456-7890',
      website: 'www.pawsomeboarding.com',
      services: ['Overnight Boarding', 'Daycare', 'Playtime', 'Walks'],
      description: 'Comfortable and safe boarding facility where your pets will feel at home while you\'re away. We provide 24/7 supervision, regular exercise, and lots of love and attention.'
    },
    {
      id: 5,
      name: 'Feline Friends Veterinary',
      type: 'vet',
      image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 87,
      distance: 1.7,
      address: '321 Cat Avenue, Pawsville',
      phone: '(555) 567-8901',
      website: 'www.felinefriends.com',
      services: ['Cat-Specific Care', 'Preventive Medicine', 'Dental', 'Geriatric Care'],
      description: 'Veterinary practice specializing in feline medicine. Our cat-friendly clinic is designed to minimize stress and provide the best care for your feline companions.'
    },
    {
      id: 6,
      name: 'Woof Walkers',
      type: 'walking',
      image: 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 64,
      distance: 0.5,
      address: '555 Walker Way, Pawsville',
      phone: '(555) 678-9012',
      website: 'www.woofwalkers.com',
      services: ['Dog Walking', 'Pet Sitting', 'Puppy Visits', 'Adventure Hikes'],
      description: 'Professional dog walking service providing exercise and companionship for your canine friends. Our reliable team ensures your dog gets the activity they need when youre busy.'
    },
  ];
  
  // Filter service providers based on search and filters
  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || provider.type === filterType;
    
    const matchesDistance = filterDistance === 'any' || 
                            (filterDistance === '1' && provider.distance <= 1) ||
                            (filterDistance === '3' && provider.distance <= 3) ||
                            (filterDistance === '5' && provider.distance <= 5);
    
    const matchesRating = provider.rating >= filterRating;
    
    return matchesSearch && matchesType && matchesDistance && matchesRating;
  });
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Service type options
  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'vet', label: 'Veterinarians' },
    { value: 'grooming', label: 'Grooming' },
    { value: 'training', label: 'Training' },
    { value: 'boarding', label: 'Boarding' },
    { value: 'walking', label: 'Dog Walking' },
    { value: 'daycare', label: 'Daycare' }
  ];
  
  // Distance options
  const distanceOptions = [
    { value: 'any', label: 'Any Distance' },
    { value: '1', label: 'Within 1 mile' },
    { value: '3', label: 'Within 3 miles' },
    { value: '5', label: 'Within 5 miles' }
  ];
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Find Pet Services</h1>
            </div>
            <p className="text-gray-500 mt-1">Discover and book services for your pets</p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for services, providers, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
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
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance
                </label>
                <select
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {distanceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <div className="flex items-center gap-2">
                  {[0, 3, 3.5, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating)}
                      className={`px-3 py-1 rounded-lg border ${
                        filterRating === rating 
                          ? 'bg-green-100 border-green-500 text-green-700' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {rating === 0 ? 'Any' : rating+'+'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterType('all');
                    setFilterDistance('any');
                    setFilterRating(0);
                  }}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Service Provider Cards */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <div 
                key={provider.id} 
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(provider.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    {favorites.includes(provider.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <div className="flex items-center gap-1 text-white">
                      <FaStar className="text-yellow-400" />
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-sm">({provider.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <FaMapMarkerAlt />
                    <span>{provider.distance} miles away</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {provider.services.slice(0, 3).map((service, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
                      {provider.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium">
                          +{provider.services.length - 3} more
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{provider.description}</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => window.open(`tel:${provider.phone}`)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FaPhone />
                      <span>Call</span>
                    </button>
                    <button 
                      onClick={() => window.open(`https://${provider.website}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FaGlobe />
                      <span>Website</span>
                    </button>
                    <button 
                      onClick={() => navigate('/user/appointments/new')}
                      className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FaCalendarAlt />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== 'all' || filterDistance !== 'any' || filterRating > 0
                ? "No services match your search criteria. Try adjusting your filters."
                : "We couldn't find any pet services in your area. Please try a different location."}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterDistance('any');
                setFilterRating(0);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FaFilter />
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserServices;