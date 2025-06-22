import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPaw, 
  FaUserMd, 
  FaSearch, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaDog, 
  FaCat, 
  FaKiwiBird, 
  FaFish, 
  FaHorse, 
  FaStar,
  FaQuoteLeft,
  FaChartLine,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaClock,
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaHeadset,
  FaMapMarkerAlt,
  FaRegCreditCard,
  FaRegLifeRing,
  FaRegSmile,
  FaRegThumbsUp,
  FaRegHeart,
  FaRegBell,
  FaRegEnvelope,
  FaRegComments,
  FaRegLightbulb
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234f46e5'/%3E%3Cpath d='M35 40Q40 20 50 40Q60 20 65 40Q80 40 65 60Q70 80 50 70Q30 80 35 60Q20 40 35 40Z' fill='white'/%3E%3C/svg%3E";

const Home = () => {
  // State for cursor follower
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  // State for pet selector
  const [selectedPet, setSelectedPet] = useState('dog');
  
  // State for testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Dog Owner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      text: "PawsIQ has been a lifesaver! Finding a reliable vet for my Labrador has never been easier.",
      pet: "dog"
    },
    {
      name: "Rahul Patel",
      role: "Cat Parent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      text: "My cat gets anxious at vet clinics, but with PawsIQ I found a vet who does home visits. Amazing!",
      pet: "cat"
    },
    {
      name: "Ananya Desai",
      role: "Bird Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      text: "Finding specialized care for exotic birds was impossible until I discovered PawsIQ. Highly recommend!",
      pet: "bird"
    }
  ];
  
  // Ref for animation
  const requestRef = useRef();
  const logoRef = useRef();
  
  // Handle mouse movement for pet follower
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation frame update for paw cursor
  useEffect(() => {
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      if (frameCount % 15 === 0) { // Change animation every 15 frames for a slower effect
        setAnimationFrame(prevFrame => prevFrame + 1);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  
  // Animate logo on load
  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.classList.remove('animate-bounce');
        }
      }, 1500);
    }
  }, []);
  
  // Cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Get pet icon based on selected pet
  const getPetIcon = (pet) => {
    switch(pet) {
      case 'dog':
        return <FaDog />;
      case 'cat':
        return <FaCat />;
      case 'bird':
        return <FaKiwiBird />;
      case 'fish':
        return <FaFish />;
      case 'horse':
        return <FaHorse />;
      default:
        return <FaPaw />;
    }
  };
  
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-100 ease-out flex items-center justify-center text-indigo-600"
        style={{ 
          left: `${mousePosition.x - 16}px`, 
          top: `${mousePosition.y - 16}px`,
          opacity: isHovering ? 1 : 0.5,
          transform: `scale(${isHovering ? 1.2 : 1})`,
        }}
      >
        <FaPaw className={`animate-pulse ${animationFrame % 2 === 0 ? 'rotate-12' : '-rotate-12'}`} />
      </div>
      
      {/* Header */}
      <header className="relative">
        <div className="bg-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1 left-1/4 text-white text-opacity-10 text-9xl">
              <FaPaw />
            </div>
            <div className="absolute bottom-1 right-1/4 text-white text-opacity-10 text-9xl">
              <FaPaw />
            </div>
          </div>
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 relative">
            <div className="text-center sm:px-16">
              <p className="font-medium text-white">
                <span className="md:hidden">New providers get 0% commission for 3 months!</span>
                <span className="hidden md:inline">Special offer! New providers get 0% commission for the first 3 months.</span>
                <span className="block sm:ml-2 sm:inline-block">
                  <Link 
                    to="/provider/signup" 
                    className="text-white font-bold underline hover:text-indigo-200 transition-colors duration-300"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Join now <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/" className="flex items-center group">
                <span className="sr-only">PawsIQ</span>
                <div 
                  ref={logoRef} 
                  className="transform transition-transform duration-300 group-hover:scale-110"
                >
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={logoImage}
                    alt="PawsIQ"
                  />
                </div>
                <span className="ml-2 text-xl font-bold text-indigo-600 group-hover:text-indigo-500 transition-colors duration-300">PawsIQ</span>
              </a>
            </div>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link 
                to="/login" 
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                {selectedPet === 'dog' && (
                  <img
                    className="h-full w-full object-cover animate-fadeIn"
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
                    alt="Happy dogs and their owner"
                  />
                )}
                {selectedPet === 'cat' && (
                  <img
                    className="h-full w-full object-cover animate-fadeIn"
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
                    alt="Cat with owner"
                  />
                )}
                {selectedPet === 'bird' && (
                  <img
                    className="h-full w-full object-cover animate-fadeIn"
                    src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
                    alt="Bird with owner"
                  />
                )}
                {selectedPet === 'fish' && (
                  <img
                    className="h-full w-full object-cover animate-fadeIn"
                    src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
                    alt="Aquarium with fish"
                  />
                )}
                {selectedPet === 'horse' && (
                  <img
                    className="h-full w-full object-cover animate-fadeIn"
                    src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
                    alt="Horse with owner"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-900 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white animate-fadeInUp">The smart way to</span>
                  <span className="block text-indigo-200 animate-fadeInUp animation-delay-300">care for your pets</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl animate-fadeInUp animation-delay-500">
                  Connect with trusted pet care professionals for veterinary services, training, grooming, and pet sitting.
                </p>
                
                {/* Interactive pet selector */}
                <div className="mt-8 flex justify-center space-x-4 animate-fadeInUp animation-delay-700">
                  <button 
                    onClick={() => setSelectedPet('dog')}
                    className={`p-3 rounded-full transition-all duration-300 ${selectedPet === 'dog' 
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-110' 
                      : 'bg-indigo-700 text-white hover:bg-indigo-600'}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Select dog"
                  >
                    <FaDog className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedPet('cat')}
                    className={`p-3 rounded-full transition-all duration-300 ${selectedPet === 'cat' 
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-110' 
                      : 'bg-indigo-700 text-white hover:bg-indigo-600'}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Select cat"
                  >
                    <FaCat className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedPet('bird')}
                    className={`p-3 rounded-full transition-all duration-300 ${selectedPet === 'bird' 
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-110' 
                      : 'bg-indigo-700 text-white hover:bg-indigo-600'}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Select bird"
                  >
                    <FaKiwiBird className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedPet('fish')}
                    className={`p-3 rounded-full transition-all duration-300 ${selectedPet === 'fish' 
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-110' 
                      : 'bg-indigo-700 text-white hover:bg-indigo-600'}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Select fish"
                  >
                    <FaFish className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedPet('horse')}
                    className={`p-3 rounded-full transition-all duration-300 ${selectedPet === 'horse' 
                      ? 'bg-white text-indigo-600 shadow-lg transform scale-110' 
                      : 'bg-indigo-700 text-white hover:bg-indigo-600'}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Select horse"
                  >
                    <FaHorse className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center animate-fadeInUp animation-delay-1000">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-8"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      Find Services
                    </Link>
                    <Link
                      to="/provider/signup"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 transform transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-8"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      Become a Provider
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-gray-100 relative overflow-hidden">
          {/* Decorative paw prints */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-10 left-10 text-indigo-200 opacity-10 text-9xl transform rotate-12">
              <FaPaw />
            </div>
            <div className="absolute top-40 right-10 text-indigo-200 opacity-10 text-7xl transform -rotate-12">
              <FaPaw />
            </div>
            <div className="absolute bottom-20 left-1/4 text-indigo-200 opacity-10 text-8xl transform rotate-45">
              <FaPaw />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 animate-fadeInUp">All-in-one pet care platform</h2>
              <p className="mt-4 text-lg text-gray-500 animate-fadeInUp animation-delay-300">
                Everything you need to ensure your pet's health and happiness in one place.
              </p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6 animate-fadeInUp animation-delay-300">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <FaUserMd className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Verified Professionals</h3>
                      <p className="mt-5 text-base text-gray-500">
                        All our providers undergo thorough background checks and credential verification to ensure the highest quality of care.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-400">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <FaSearch className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Easy Booking</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Find and book the perfect pet care service in minutes with our intuitive search and booking system.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-500">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <FaCalendarAlt className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Seamless Scheduling</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Manage all your pet care appointments in one place with automatic reminders and easy rescheduling.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-600">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <FaPaw className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Comprehensive Services</h3>
                      <p className="mt-5 text-base text-gray-500">
                        From veterinary care to grooming, training, and pet sitting - all your pet care needs in one platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-700">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <FaShieldAlt className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Secure Payments</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Pay securely through our platform with protection for both pet owners and service providers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-800">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">Community & Support</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Join our pet-loving community and get 24/7 support for all your pet care questions and concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What pet parents are saying
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Hear from our happy community of pet owners
              </p>
            </div>
            
            <div className="mt-12 max-w-lg mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500">
                <div className="relative h-full">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 flex flex-col p-6 ${
                        currentTestimonial === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center">
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                              <div className="ml-2 flex text-yellow-400">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto text-indigo-600 text-3xl">
                            {getPetIcon(testimonial.pet)}
                          </div>
                        </div>
                        <div className="mt-6 text-gray-700">
                          <FaQuoteLeft className="h-8 w-8 text-indigo-200 mb-2" />
                          <p className="text-lg italic">{testimonial.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Fixed height to prevent layout shift */}
                <div className="h-64"></div>
                
                {/* Testimonial navigation dots */}
                <div className="flex justify-center pb-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index 
                          ? 'bg-indigo-600 w-6' 
                          : 'bg-indigo-300 hover:bg-indigo-400'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-indigo-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fadeInUp">
                Trusted by pet owners across the country
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4 animate-fadeInUp animation-delay-200">
                PawsIQ is revolutionizing how pet owners connect with quality care providers
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col animate-fadeInUp animation-delay-300 transform transition-all duration-500 hover:scale-110">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Happy Pet Owners</dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600 flex justify-center items-center">
                  <span className="animate-heartbeat">50K+</span>
                  <FaRegSmile className="ml-2 text-3xl text-yellow-400" />
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0 animate-fadeInUp animation-delay-500 transform transition-all duration-500 hover:scale-110">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Verified Providers</dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600 flex justify-center items-center">
                  <span className="animate-heartbeat animation-delay-200">5K+</span>
                  <FaUserMd className="ml-2 text-3xl text-indigo-400" />
                </dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0 animate-fadeInUp animation-delay-700 transform transition-all duration-500 hover:scale-110">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Cities Covered</dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600 flex justify-center items-center">
                  <span className="animate-heartbeat animation-delay-400">200+</span>
                  <FaMapMarkerAlt className="ml-2 text-3xl text-red-400" />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* How it works section */}
        <div className="bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-fadeInUp">
                How PawsIQ Works
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 animate-fadeInUp animation-delay-200">
                Finding and booking quality pet care has never been easier
              </p>
            </div>

            {/* Step 1 */}
            <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative animate-fadeInRight animation-delay-300">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  1. Create your pet's profile
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Add your pet's details, medical history, and care preferences to help providers understand their unique needs.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse">
                        <FaDog className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multiple pets? No problem</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Add all your furry, feathered, or scaly friends to your account and manage their care in one place.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-300">
                        <FaRegLightbulb className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Smart recommendations</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Our system learns your pet's needs and recommends the most suitable care providers for them.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0 animate-fadeInLeft animation-delay-500" aria-hidden="true">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img
                      className="w-full transform transition-all duration-500 hover:scale-105"
                      src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt="Pet profile creation"
                    />
                    <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-80 rounded-lg p-4 animate-float">
                        <div className="flex items-center space-x-2">
                          <FaPaw className="h-6 w-6 text-indigo-600 animate-wiggle" />
                          <span className="text-lg font-bold text-indigo-900">Pet Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mt-12 sm:mt-16 lg:mt-24">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2 animate-fadeInLeft animation-delay-700">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                    2. Find the perfect care provider
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Browse our network of verified pet care professionals and filter by service type, location, availability, and ratings.
                  </p>

                  <dl className="mt-10 space-y-10">
                    <div className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-500">
                          <FaSearch className="h-6 w-6" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Advanced search filters</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        Find providers who specialize in your pet's species, breed, or specific health conditions.
                      </dd>
                    </div>
                    <div className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-700">
                          <FaRegThumbsUp className="h-6 w-6" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Verified reviews</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        Read authentic reviews from other pet owners to make informed decisions about your pet's care.
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1 animate-fadeInRight animation-delay-900">
                  <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                      <img
                        className="w-full transform transition-all duration-500 hover:scale-105"
                        src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                        alt="Finding a provider"
                      />
                      <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply opacity-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white bg-opacity-80 rounded-lg p-4 animate-float animation-delay-500">
                          <div className="flex items-center space-x-2">
                            <FaUserMd className="h-6 w-6 text-indigo-600 animate-wiggle animation-delay-300" />
                            <span className="text-lg font-bold text-indigo-900">Provider Search</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative animate-fadeInRight animation-delay-1000">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  3. Book and manage appointments
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Schedule appointments, make secure payments, and communicate with providers all through our platform.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-900">
                        <FaCalendarAlt className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Seamless scheduling</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      View provider availability in real-time and book appointments with just a few clicks.
                    </dd>
                  </div>
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-1100">
                        <FaRegCreditCard className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure payments</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Pay securely through our platform with protection for both pet owners and service providers.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0 animate-fadeInLeft animation-delay-1200" aria-hidden="true">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img
                      className="w-full transform transition-all duration-500 hover:scale-105"
                      src="https://images.unsplash.com/photo-1576765608866-5b51f8509665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                      alt="Booking appointments"
                    />
                    <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-80 rounded-lg p-4 animate-float animation-delay-1000">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="h-6 w-6 text-indigo-600 animate-wiggle animation-delay-600" />
                          <span className="text-lg font-bold text-indigo-900">Appointment Booking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App features section */}
        <div className="bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase animate-fadeInUp">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-fadeInUp animation-delay-200">
                Everything you need for your pet's care
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto animate-fadeInUp animation-delay-400">
                PawsIQ combines powerful features with an intuitive interface to make pet care management simple and effective.
              </p>
            </div>

            <div className="mt-16">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative animate-fadeInRight animation-delay-300">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse">
                    <FaMobileAlt className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Mobile App</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Manage your pet's care on the go with our intuitive mobile app for iOS and Android.
                  </p>
                </div>

                <div className="relative animate-fadeInLeft animation-delay-400">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-200">
                    <FaRegBell className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Appointment Reminders</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Never miss an appointment with automated reminders via email, SMS, or push notifications.
                  </p>
                </div>

                <div className="relative animate-fadeInRight animation-delay-500">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-400">
                    <FaRegComments className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">In-app Messaging</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Communicate directly with your pet care providers through our secure messaging system.
                  </p>
                </div>

                <div className="relative animate-fadeInLeft animation-delay-600">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-600">
                    <FaRegHeart className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Health Records</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Store and share your pet's medical history, vaccinations, and health documents with providers.
                  </p>
                </div>

                <div className="relative animate-fadeInRight animation-delay-700">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-800">
                    <FaRegLifeRing className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Get help whenever you need it with our dedicated customer support team and knowledge base.
                  </p>
                </div>

                <div className="relative animate-fadeInLeft animation-delay-800">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white animate-pulse animation-delay-1000">
                    <FaShieldAlt className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure & Private</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Your data is protected with enterprise-grade security and strict privacy controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 text-indigo-100 opacity-20 text-[200px]">
            <FaPaw />
          </div>
          
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
            <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 transform transition-all duration-500 hover:shadow-2xl animate-gradientFlow">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl animate-fadeInUp">
                    <span className="block">Ready to provide pet care services?</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-indigo-200 animate-fadeInUp animation-delay-300">
                    Join our network of trusted pet care professionals and grow your business. We provide the tools, clients, and support you need to succeed.
                  </p>
                  
                  {/* Interactive service selection */}
                  <div className="mt-6 flex flex-wrap gap-2 animate-fadeInUp animation-delay-500">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-800 text-indigo-100 transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900">
                      {getPetIcon('dog')} <span className="ml-1">Veterinarians</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-800 text-indigo-100 transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900">
                      {getPetIcon('cat')} <span className="ml-1">Groomers</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-800 text-indigo-100 transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900">
                      {getPetIcon('bird')} <span className="ml-1">Trainers</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-800 text-indigo-100 transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900">
                      {getPetIcon('fish')} <span className="ml-1">Pet Sitters</span>
                    </span>
                  </div>
                  
                  <Link
                    to="/provider/signup"
                    className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fadeInUp animation-delay-700 group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span>Sign up as a Provider</span>
                    <FaPaw className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 relative overflow-hidden">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 transition-transform duration-700 hover:scale-105"
                  src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Veterinarian with a dog"
                />
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 bg-white rounded-full p-2 shadow-lg animate-float">
                  <FaPaw className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 bg-white rounded-full p-2 shadow-lg animate-float animation-delay-1000">
                  <FaUserMd className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="absolute top-1/3 right-1/4 bg-white rounded-full p-2 shadow-lg animate-float animation-delay-500">
                  <FaRegHeart className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
              <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fadeInUp">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                <div className="pt-6 animate-fadeInUp animation-delay-200">
                  <dt className="text-lg">
                    <button className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none">
                      <span className="font-medium text-gray-900">How do I know providers are qualified?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className="h-5 w-5 text-indigo-500 animate-pulse" />
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">
                      All providers on PawsIQ undergo a thorough verification process including background checks, credential verification, and reference checks. We also collect and display verified reviews from other pet owners.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-300">
                  <dt className="text-lg">
                    <button className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none">
                      <span className="font-medium text-gray-900">What types of pet care services are available?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className="h-5 w-5 text-indigo-500 animate-pulse animation-delay-200" />
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">
                      PawsIQ offers a wide range of services including veterinary care, grooming, training, pet sitting, dog walking, and specialized care for exotic pets. You can filter providers by service type to find exactly what your pet needs.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-400">
                  <dt className="text-lg">
                    <button className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none">
                      <span className="font-medium text-gray-900">How does payment work?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className="h-5 w-5 text-indigo-500 animate-pulse animation-delay-400" />
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">
                      Payments are processed securely through our platform. You can pay using credit/debit cards or other supported payment methods. Funds are only released to providers after services are completed, providing protection for both parties.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-500">
                  <dt className="text-lg">
                    <button className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none">
                      <span className="font-medium text-gray-900">What if I need to cancel an appointment?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className="h-5 w-5 text-indigo-500 animate-pulse animation-delay-600" />
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-500">
                      Our cancellation policy varies by provider, but most allow free cancellation with 24-48 hours notice. You can view each provider's specific cancellation policy before booking. Emergency situations are handled on a case-by-case basis.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="relative bg-indigo-50 rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 mix-blend-multiply" />
              <div className="absolute bottom-0 right-0 -mb-12 -mr-12 text-indigo-200 opacity-20 text-[200px]">
                <FaPaw className="animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-fadeInUp">
                  Get pet care tips and updates
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 animate-fadeInUp animation-delay-200">
                  Join our newsletter for expert advice, special offers, and the latest in pet care innovations.
                </p>
              </div>
              <div className="mt-12 max-w-lg mx-auto animate-fadeInUp animation-delay-400">
                <form className="sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onFocus={() => setIsHovering(true)}
                      onBlur={() => setIsHovering(false)}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button 
                      type="submit" 
                      className="block w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transform transition-all duration-300 hover:scale-105"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  We care about your data. Read our{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center group">
                <img
                  className="h-10 w-auto transform transition-all duration-300 group-hover:scale-110"
                  src={logoImage}
                  alt="PawsIQ"
                />
                <span className="ml-2 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">PawsIQ</span>
              </div>
              <p className="text-gray-300 text-base">
                Making pet care accessible, reliable, and convenient for everyone. Our platform connects pet owners with trusted professionals for all their pet care needs.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Veterinary Care
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Pet Training
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Grooming
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Pet Sitting
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Dog Walking
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Exotic Pet Care
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Community
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Pet Care Guides
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Emergency Resources
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Press
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Partners
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Investors
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Terms
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Licensing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        Accessibility
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        GDPR
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-base text-gray-400">
                &copy; 2023 PawsIQ, Inc. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  Sitemap
                </a>
                <span className="text-gray-500">•</span>
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  Do Not Sell My Info
                </a>
                <span className="text-gray-500">•</span>
                <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors duration-300 text-sm" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  Preferences
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;