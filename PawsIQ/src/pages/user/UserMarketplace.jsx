import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaFilter, FaStar, FaHeart, FaRegHeart, FaChevronDown, FaChevronUp, FaTags, FaShippingFast, FaStore } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserMarketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([2, 5]);
  const [cartCount, setCartCount] = useState(0);
  
  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Premium Dog Food',
      category: 'food',
      petType: 'dog',
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 49.99,
      rating: 4.8,
      reviewCount: 124,
      seller: 'PetNutrition Co.',
      description: 'High-quality dog food made with real chicken and vegetables. Grain-free formula suitable for all breeds and life stages.',
      inStock: true,
      freeShipping: true,
    },
    {
      id: 2,
      name: 'Interactive Cat Toy',
      category: 'toys',
      petType: 'cat',
      image: 'https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 19.99,
      rating: 4.7,
      reviewCount: 98,
      seller: 'FunPets',
      description: 'Electronic interactive toy that keeps your cat engaged and active. Features unpredictable movements and light patterns.',
      inStock: true,
      freeShipping: false,
    },
    {
      id: 3,
      name: 'Orthopedic Pet Bed',
      category: 'beds',
      petType: 'all',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 79.99,
      rating: 4.9,
      reviewCount: 76,
      seller: 'ComfortPets',
      description: 'Memory foam pet bed that provides joint support and comfort. Removable, machine-washable cover with water-resistant liner.',
      inStock: true,
      freeShipping: true,
    },
    {
      id: 4,
      name: 'Adjustable Dog Collar',
      category: 'accessories',
      petType: 'dog',
      image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 15.99,
      rating: 4.6,
      reviewCount: 112,
      seller: 'PetStyle',
      description: 'Durable nylon collar with quick-release buckle. Reflective stitching for nighttime visibility and adjustable for perfect fit.',
      inStock: true,
      freeShipping: false,
    },
    {
      id: 5,
      name: 'Natural Cat Litter',
      category: 'supplies',
      petType: 'cat',
      image: 'https://images.unsplash.com/photo-1563398216289-4e5e877a816d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 24.99,
      rating: 4.5,
      reviewCount: 87,
      seller: 'EcoPets',
      description: 'Biodegradable, dust-free cat litter made from natural plant fibers. Superior odor control and clumping ability.',
      inStock: false,
      freeShipping: true
    },
    {
      id: 6,
      name: 'Dog Training Treats',
      category: 'food',
      petType: 'dog',
      image: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 12.99,
      rating: 4.7,
      reviewCount: 64,
      seller: 'TrainingBuddies',
      description: 'Small, soft treats perfect for training sessions. Made with real meat and limited ingredients for sensitive stomachs.',
      inStock: true,
      freeShipping: false,
    },
    {
      id: 7,
      name: 'Pet Grooming Kit',
      category: 'grooming',
      petType: 'all',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 34.99,
      rating: 4.4,
      reviewCount: 53,
      seller: 'GroomPro',
      description: 'Complete grooming set including clippers, scissors, nail trimmer, and brushes. Suitable for all pet types and coat lengths.',
      inStock: true,
      freeShipping: true
    },
    {
      id: 8,
      name: 'Automatic Pet Feeder',
      category: 'supplies',
      petType: 'all',
      image: 'https://images.unsplash.com/photo-1585090163844-8398079e540a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 89.99,
      rating: 4.8,
      reviewCount: 92,
      seller: 'SmartPet',
      description: 'Programmable feeder with portion control and scheduling. Keeps your pet on a regular feeding schedule even when youre not home.',
      inStock: true,
      freeShipping: false,
    },
    {
      id: 9,
      name: 'Calming Dog Jacket',
      category: 'accessories',
      petType: 'dog',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 39.99,
      rating: 4.6,
      reviewCount: 78,
      seller: 'PetComfort',
      description: 'Therapeutic pressure wrap that helps reduce anxiety in dogs during thunderstorms, fireworks, or separation.',
      inStock: true,
      freeShipping: false
    }
  ];
  
  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    const matchesPrice = filterPrice === 'all' || 
                         (filterPrice === 'under25' && product.price < 25) ||
                         (filterPrice === '25to50' && product.price >= 25 && product.price <= 50) ||
                         (filterPrice === '50to100' && product.price > 50 && product.price <= 100) ||
                         (filterPrice === 'over100' && product.price > 100);
    
    const matchesRating = product.rating >= filterRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Add to cart
  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    // In a real app, you would add the product to the cart state or context
  };
  
  // Category options
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Pet Food' },
    { value: 'toys', label: 'Toys' },
    { value: 'beds', label: 'Beds & Furniture' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'grooming', label: 'Grooming' }
  ];
  
  // Price range options
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under25', label: 'Under $25' },
    { value: '25to50', label: '$25 to $50' },
    { value: '50to100', label: '$50 to $100' },
    { value: 'over100', label: 'Over $100' }
  ];
  
  // Featured categories for the top section
  const featuredCategories = [
    { name: 'Dog Food', icon: '🐕', link: '?category=food&pet=dog' },
    { name: 'Cat Toys', icon: '🐈', link: '?category=toys&pet=cat' },
    { name: 'Beds', icon: '🛏️', link: '?category=beds' },
    { name: 'Grooming', icon: '✂️', link: '?category=grooming' },
    { name: 'Accessories', icon: '🧶', link: '?category=accessories' }
  ];
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaShoppingCart className="text-blue-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Pet Marketplace</h1>
            </div>
            <p className="text-gray-500 mt-1">Shop for your pet's favorite products</p>
          </div>
          <button 
            onClick={() => navigate('/user/cart')}
            className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Featured Categories */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {featuredCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setFilterCategory(category.link.split('=')[1].split('&')[0])}
                className="bg-white rounded-lg p-4 text-center border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </button>
            ))}
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, brands, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
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
                          ? 'bg-blue-100 border-blue-500 text-blue-700' 
                          : 'border-gray-300 hover:border-blue-300'
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
                    setFilterCategory('all');
                    setFilterPrice('all');
                    setFilterRating(0);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    {favorites.includes(product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                  
                  {!product.inStock && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                  
                  {product.freeShipping && (
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <FaShippingFast size={10} />
                      Free Shipping
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                    <FaStore className="text-gray-400" size={12} />
                    <span>{product.seller}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                          size={14} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => navigate(`/user/marketplace/product/${product.id}`)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${product.inStock 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      <FaShoppingCart size={14} />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaShoppingCart className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory !== 'all' || filterPrice !== 'all' || filterRating > 0
                ? "No products match your search criteria. Try adjusting your filters."
                : "We couldn't find any products. Please try a different search."}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterPrice('all');
                setFilterRating(0);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FaFilter />
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Deals Section */}
        {filteredProducts.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <FaTags className="text-yellow-600" />
              <h2 className="text-lg font-semibold text-yellow-900">Special Deals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter(product => product.freeShipping)
                .slice(0, 3)
                .map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg p-3 border border-yellow-100 flex gap-3 items-center"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserMarketplace;