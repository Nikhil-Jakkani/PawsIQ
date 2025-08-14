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
  FaRegLightbulb,
  FaPlus
} from 'react-icons/fa';

// Cute pet-themed logo
const logoImage = "/1.svg";

const Home = () => {
  // State for UI interactions
  const [isHovering, setIsHovering] = useState(false);
  
  // State for pet selector
  const [selectedPet, setSelectedPet] = useState('dog');
  
  // State for testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    petType: 'dog'
  });
  
  // State for newsletter
  const [newsletter, setNewsletter] = useState('');
  
  // State for location
  const [location, setLocation] = useState('');
  
  // State for service type
  const [serviceType, setServiceType] = useState('all');
  
  // AI demo state
  const [aiQuery, setAiQuery] = useState('itchy skin');
  const [aiResponse, setAiResponse] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const handleAIDemo = () => {
    if (!aiQuery?.trim()) return;
    setAiThinking(true);
    setAiResponse('');
    setTimeout(() => {
      const sample = `Suggested next steps for ${selectedPet}:\n• Likely sensitivity or minor irritation\n• Clean the area with pet-safe wipes\n• Monitor for redness or swelling\n• If persists 24-48h, book a vet`;
      setAiResponse(sample);
      setAiThinking(false);
    }, 800);
  };
  
  // State for FAQ
  const [openFaq, setOpenFaq] = useState(null);
  
  // State for active section (for scroll highlighting)
  const [activeSection, setActiveSection] = useState('hero');
  
  // State for back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // State for scroll-triggered animations
  const [animatedSections, setAnimatedSections] = useState({
    features: false,
    testimonials: false,
    stats: false,
    app: false,
    faq: false,
    contact: false,
    newsletter: false
  });
  
  // Refs for scroll sections
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const appRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const newsletterRef = useRef(null);
  
  // Handle scroll to section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Check if element is in viewport
  const isInViewport = (element, offset = 100) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.bottom >= offset
    );
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY ; // Offset for better UX
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress percentage
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      // Show/hide back to top button
      if (scrollPosition > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Check each section's position and update active section
      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection('hero');
      } else if (featuresRef.current && scrollPosition < featuresRef.current.offsetTop + featuresRef.current.offsetHeight) {
        setActiveSection('features');
      } else if (testimonialsRef.current && scrollPosition < testimonialsRef.current.offsetTop + testimonialsRef.current.offsetHeight) {
        setActiveSection('testimonials');
      } else if (statsRef.current && scrollPosition < statsRef.current.offsetTop + statsRef.current.offsetHeight) {
        setActiveSection('stats');
      } else if (appRef.current && scrollPosition < appRef.current.offsetTop + appRef.current.offsetHeight) {
        setActiveSection('app');
      } else if (faqRef.current && scrollPosition < faqRef.current.offsetTop + faqRef.current.offsetHeight) {
        setActiveSection('faq');
      } else if (contactRef.current && scrollPosition < contactRef.current.offsetTop + contactRef.current.offsetHeight) {
        setActiveSection('contact');
      } else if (newsletterRef.current) {
        setActiveSection('newsletter');
      }
      
      // Check if sections are in viewport to trigger animations
      setAnimatedSections(prev => ({
        ...prev,
        features: prev.features || isInViewport(featuresRef.current),
        testimonials: prev.testimonials || isInViewport(testimonialsRef.current),
        stats: prev.stats || isInViewport(statsRef.current),
        app: prev.app || isInViewport(appRef.current),
        faq: prev.faq || isInViewport(faqRef.current),
        contact: prev.contact || isInViewport(contactRef.current),
        newsletter: prev.newsletter || isInViewport(newsletterRef.current)
      }));
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
  
  // Ref for logo animation
  const logoRef = useRef();
  
  // Form submission handlers
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing to our newsletter with email: ${newsletter}`);
    setNewsletter('');
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${contactForm.name}! We'll get back to you soon.`);
    setContactForm({
      name: '',
      email: '',
      message: '',
      petType: 'dog'
    });
  };
  
  const handleSearch = () => {
    alert(`Searching for ${serviceType} services near ${location || 'your location'}`);
  };
  
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
    <>
      {/* Coming Soon Button */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="group relative bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-pulse hover:animate-none"
          onClick={() => alert('🐾 PawsIQ is coming soon! Get ready for the ultimate pet care experience! 🐾')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated paw prints on hover */}
          <div className={`absolute inset-0 overflow-hidden rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-1 left-2 text-white text-opacity-30 text-xs animate-bounce">
              <FaPaw />
            </div>
            <div className="absolute bottom-1 right-2 text-white text-opacity-30 text-xs animate-bounce" style={{animationDelay: '0.5s'}}>
              <FaPaw />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex items-center space-x-3 relative z-30">
            <div className="text-white text-lg animate-bounce">
              <FaDog />
            </div>
            <span className="text-white font-bold text-base whitespace-nowrap">
              🐾 Coming Soon
            </span>
            <div className="text-white text-lg animate-bounce" style={{animationDelay: '0.3s'}}>
              <FaCat />
            </div>
          </div>
         
          {/* Hover tooltip */}
          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 ${
            isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
              Click for more info! 🐾
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
            </div>
          </div>
          
          {/* Floating heart on hover */}
          <div className={`absolute -top-2 -right-2 text-pink-300 text-xs transition-all duration-300 ${
            isHovering ? 'opacity-100 animate-ping' : 'opacity-0'
          }`}>
            <FaRegHeart />
          </div>
        </div>
      </div>

      <div className="bg-white relative overflow-y-auto scrollbar-pet h-full w-full">
      
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      {/* Section indicator */}
      <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-500 ${
        activeSection !== 'hero' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <span className="text-sm font-medium capitalize">
          {activeSection === 'features' && 'Key Features'}
          {activeSection === 'testimonials' && 'What Our Users Say'}
          {activeSection === 'stats' && 'Our Impact'}
          {activeSection === 'app' && 'Mobile App'}
          {activeSection === 'faq' && 'Frequently Asked Questions'}
          {activeSection === 'contact' && 'Get In Touch'}
          {activeSection === 'newsletter' && 'Stay Updated'}
        </span>
      </div>
      
      {/* Scroll indicator - only visible at the top */}
            
      {/* Back to top button */}
      <button
        onClick={() => scrollToSection(heroRef)}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-600 text-white shadow-lg transform transition-all duration-300 hover:bg-indigo-700 hover:scale-110 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Header */}
      
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
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
              <Link 
                to="/user/login" 
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FaPaw className="text-pink-500" />
                Pet Owner Login
              </Link>
              <Link 
                to="/provider/login" 
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FaUserMd className="text-blue-500" />
                Provider Login
              </Link>
              <Link 
                to="/login" 
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FaShieldAlt className="text-green-500" />
                Admin Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <main>
        <div ref={heroRef} className="relative">
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
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-900 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white animate-fadeInUp">Reimagining Pet Wellness with Technology</span>
                  {/* <span className="block text-indigo-200 animate-fadeInUp animation-delay-300">care for your pets</span> */}
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl animate-fadeInUp animation-delay-500 md:text-left">
                  Empowering pet parents with intelligent tools to ensure their companions live longer, healthier, and happier lives.
                </p>
                
                {/* Interactive pet selector */}
                <div className="mt-8 flex justify-center space-x-4 animate-fadeInUp animation-delay-700">
                  <button 
                      onClick={() => setSelectedPet('dog')}
                      className={`p-3 rounded-full transition-all duration-300 `}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label="Select dog"
                    >
                      <FaDog className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={() => setSelectedPet('cat')}
                      className={`p-3 rounded-full transition-all duration-300 `}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label="Select cat"
                    >
                      <FaCat className="h-6 w-6" />
                    </button>
                  </div>
                
                {/* Search bar */}
                <div className="mt-10 max-w-xl mx-auto animate-fadeInUp animation-delay-900">
                  <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-4 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="h-5 w-5 text-indigo-500" />
                        </div>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter your city (e.g., Mumbai, Delhi)"
                          onFocus={() => setIsHovering(true)}
                          onBlur={() => setIsHovering(false)}
                        />
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {getPetIcon(selectedPet)}
                        </div>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onFocus={() => setIsHovering(true)}
                          onBlur={() => setIsHovering(false)}
                        >
                          <option value="all">All Services</option>
                          <option value="vet">Veterinary Care</option>
                          <option value="grooming">Grooming</option>
                          <option value="training">Training</option>
                          <option value="sitting">Pet Sitting</option>
                          <option value="walking">Dog Walking</option>
                          <option value="boarding">Boarding</option>
                        </select>
                      </div>
                      <button
                        onClick={handleSearch}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <FaSearch className="mr-2" />
                        Search
                      </button>
                    </div>
                    
                    {/* Quick links */}
                    <div className="mt-3 flex flex-wrap gap-2 justify-center">
                      <span className="text-xs text-gray-500">Popular:</span>
                      <button 
                        onClick={() => {setSelectedPet('dog'); setServiceType('vet');}}
                        className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Dog Veterinarians
                      </button>
                      <span className="text-gray-300">•</span>
                      <button 
                        onClick={() => {setSelectedPet('cat'); setServiceType('grooming');}}
                        className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Cat Grooming
                      </button>
                      <span className="text-gray-300">•</span>
                      <button 
                        onClick={() => {setSelectedPet('dog'); setServiceType('training');}}
                        className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Dog Training
                      </button>
                      <span className="text-gray-300">•</span>
                      {/* <button 
                        onClick={() => {setSelectedPet('bird'); setServiceType('vet');}}
                        className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Bird Specialists
                      </button> */}
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fadeInUp animation-delay-1000">
                  <Link
                    to="/user/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <FaPaw className="mr-2" />
                    Pet Owner Dashboard
                  </Link>
                  <Link
                    to="/provider/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <FaUserMd className="mr-2" />
                    Provider Portal
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <FaShieldAlt className="mr-2" />
                    Admin Access
                  </Link>
                </div>
                
                {/* Quick Demo Access */}
                <div className="mt-4 text-center animate-fadeInUp animation-delay-1200">
                  <p className="text-indigo-200 text-sm mb-2">🚀 Try the demo with these credentials:</p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs">
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                      <span className="text-pink-200 font-semibold">Pet Owner:</span>
                      <br />
                      <span className="text-white">user@pawsiq.com / user123</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                      <span className="text-blue-200 font-semibold">Provider:</span>
                      <br />
                      <span className="text-white">vet@pawsiq.com / provider123</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                      <span className="text-green-200 font-semibold">Admin:</span>
                      <br />
                      <span className="text-white">admin@pawsiq.com / admin123</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact info */}
                <div className="mt-4 text-center text-indigo-200 text-sm animate-fadeInUp animation-delay-1100">
                  <p>Customer Support: <a href="tel: +91 6363047838" className="font-medium hover:text-white transition-colors duration-300">+91 6363047838</a> • <a href="mailto:support@pawsiq.in" className="font-medium hover:text-white transition-colors duration-300">support@pawsiq.in</a></p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Features section (moved after hero) */}
        <section id="ai" className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">AI-powered features for pet parents</h2>
              <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-500">Smart tools that help you care for your pet with confidence — fast, friendly, and always learning.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* AI Symptom Checker */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl transition-all duration-500 [perspective:1200px]">
                <div className="relative h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white [transform:translateZ(30px)]">
                      <FaRegLifeRing className="text-xl" />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">AI Symptom Checker</h3>
                  </div>
                  <p className="mt-4 text-gray-600">Describe symptoms and get instant triage guidance and next-step recommendations.</p>
                </div>
              </div>

              {/* AI Nutrition Planner */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl transition-all duration-500 [perspective:1200px]">
                <div className="relative h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(-6deg)_rotateY(6deg)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white [transform:translateZ(30px)]">
                      <FaRegHeart className="text-xl" />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">AI Diet & Nutrition</h3>
                  </div>
                  <p className="mt-4 text-gray-600">Personalized meal plans based on age, breed, allergies, and activity levels.</p>
                </div>
              </div>

              {/* AI Training Coach */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl transition-all duration-500 [perspective:1200px]">
                <div className="relative h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(5deg)_rotateY(3deg)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-bl from-indigo-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white [transform:translateZ(30px)]">
                      <FaRegThumbsUp className="text-xl" />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">AI Training Coach</h3>
                  </div>
                  <p className="mt-4 text-gray-600">Step-by-step behavior tips and routines tailored to your pet’s temperament.</p>
                </div>
              </div>

              {/* AI Chat Assistant */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl transition-all duration-500 [perspective:1200px]">
                <div className="relative h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(-4deg)_rotateY(-4deg)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-indigo-500/5 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white [transform:translateZ(30px)]">
                      <FaRegComments className="text-xl" />
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">AI Pet Assistant</h3>
                  </div>
                  <p className="mt-4 text-gray-600">Chat for quick answers about care, health, training, and appointments.</p>
                </div>
              </div>
            </div>

            {/* Interactive AI demo */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Demo card */}
              <div className="group relative bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm [perspective:1200px]">
                <div className="relative [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
                  <h3 className="text-xl font-bold text-gray-900">Try the AI Symptom Helper</h3>
                  <p className="mt-2 text-gray-600">Type a quick symptom and see suggested next steps. Uses your selected pet above.</p>
                  {/* Mobile image above input */}
                  <div className="mt-4 sm:hidden">
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
                      alt="AI pet care illustration"
                      className="w-full h-32 object-cover rounded-xl shadow-md [transform:translateZ(20px)]"
                    />
                  </div>
                  {/* Desktop layout: input + button with side image */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          value={aiQuery}
                          onChange={(e) => setAiQuery(e.target.value)}
                          placeholder="e.g., itchy skin, vomiting"
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={handleAIDemo}
                          className="inline-flex items-center justify-center px-5 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                          {aiThinking ? (
                            <>
                              <span className="mr-2 inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin"></span>
                              Analyzing...
                            </>
                          ) : 'Get suggestion'}
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:block sm:flex-none">
                      <img
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
                        alt="AI pet care illustration"
                        className="w-28 h-28 object-cover rounded-xl shadow-md [transform:translateZ(20px)]"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="rounded-xl bg-white/70 backdrop-blur p-4 border border-indigo-100 min-h-[88px] whitespace-pre-line text-gray-700 [transform:translateZ(20px)]">
                      {aiResponse ? aiResponse : 'Your guidance will appear here.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[220px]">
                <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="AI care" />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 via-indigo-700/30 to-transparent"></div>
                <div className="relative p-6 text-white flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 text-indigo-100">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
                      <FaRegLightbulb />
                    </span>
                    <span className="uppercase tracking-wide text-xs">AI Insights</span>
                  </div>
                  <h4 className="mt-2 text-2xl font-bold text-white">Smarter care, personalized</h4>
                  <p className="mt-1 text-indigo-100">Real-time tips powered by your pet profile and behavior.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Pet Showcase */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Be a part of our Pet Community</h2>
              {/* <p className="mt-3 text-lg text-gray-500">Hover or tap the cards to flip. Smooth transitions, pet vibes.</p> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dog card */}
              <div className="group relative h-80 [perspective:1200px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80" alt="Happy dog" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-indigo-700/40 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-2xl"><FaDog /></span> */}
                        <h3 className="text-xl font-bold text-white">Dogs</h3>
                      </div>
                      <p className="text-indigo-100 mt-2">Vets, trainers, walkers & more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <FaDog className="text-5xl text-indigo-600 animate-float" />
                    <p className="mt-4 text-gray-600 text-center">Book checkups, grooming and training for your dog with trusted pros.</p>
                    <Link to="/user/login" className="mt-5 inline-flex items-center px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Explore</Link>
                  </div>
                </div>
              </div>
              {/* Cat card */}
              <div className="group relative h-80 [perspective:1200px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=80" alt="Cute cat" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-indigo-700/40 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-2xl"><FaCat /></span> */}
                        <h3 className="text-xl font-bold text-white">Cats</h3>
                      </div>
                      <p className="text-indigo-100 mt-2">Gentle vets, grooming & more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <FaCat className="text-5xl text-indigo-600 animate-float" />
                    <p className="mt-4 text-gray-600 text-center">Find calm, cat-friendly services that your feline will love.</p>
                    <Link to="/user/login" className="mt-5 inline-flex items-center px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Explore</Link>
                  </div>
                </div>
              </div>
              {/* Bird card */}
              <div className="group relative h-80 [perspective:1200px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(0deg)] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=1400&q=80" alt="Colorful bird" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-indigo-700/40 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-2xl"><FaKiwiBird /></span> */}
                        <h3 className="text-xl font-bold text-white">and more</h3>
                      </div>
                      <p className="text-indigo-100 mt-2">Exotic-friendly specialists</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <FaKiwiBird className="text-5xl text-indigo-600 animate-float" />
                    <p className="mt-4 text-gray-600 text-center">Access experienced avian vets and tailored care services.</p>
                    <Link to="/user/login" className="mt-5 inline-flex items-center px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Explore</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div ref={featuresRef} className="bg-gray-100 relative overflow-hidden">
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
            <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${animatedSections.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-extrabold text-gray-900">All-in-one pet care platform</h2>
              <p className="mt-4 text-lg text-gray-500">
                Everything you need to ensure your pet's health and happiness in one place.
              </p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* Feature 1 */}
  <div className={`pt-6 transition-all duration-1000 transform group [perspective:1200px]`} style={{ transitionDelay: '200ms' }}>
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
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
  {/* Feature 2 */}
  <div className="pt-6 animate-fadeInUp animation-delay-400 group [perspective:1200px]">
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(-6deg)_rotateY(6deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
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
  {/* Feature 3 */}
  <div className={`pt-6 transition-all duration-1000 transform group [perspective:1200px]`} style={{ transitionDelay: '400ms' }}>
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
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
  {/* Feature 4 */}
  <div className={`pt-6 transition-all duration-1000 transform group [perspective:1200px]`} style={{ transitionDelay: '600ms' }}>
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(-5deg)_rotateY(2deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tl from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
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
  {/* Feature 5 */}
  <div className="pt-6 animate-fadeInUp animation-delay-700 group [perspective:1200px]">
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(8deg)_rotateY(4deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
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
  {/* Feature 6 */}
  <div className="pt-6 animate-fadeInUp animation-delay-800 group [perspective:1200px]">
    <div className="relative flow-root bg-white rounded-2xl px-6 pb-8 h-full transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1 [transform-style:preserve-3d] group-hover:[transform:rotateX(-8deg)_rotateY(-2deg)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-indigo-500/10 via-transparent to-indigo-500/10"></div>
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 [transform:translateZ(30px)]">
            <FaHeadset className="h-6 w-6 text-white" />
          </span>
        </div>
        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">24/7 Support</h3>
        <p className="mt-5 text-base text-gray-500">
          Our friendly support team is available around the clock to help with any questions or issues.
        </p>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
        
        {/* Testimonials section */}
        <div ref={testimonialsRef} className="bg-white py-16 sm:py-24">
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
        <div ref={statsRef} className="bg-indigo-50 py-16 sm:py-24">
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

        {/* App features section */}
        <div ref={appRef} className="bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-24 lg:py-32 overflow-hidden">
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

            <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-8">
              {/* App mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative animate-float">
                  {/* Phone frame */}
                  <div className="w-64 h-[530px] bg-gray-900 rounded-[40px] p-2 shadow-2xl transform rotate-3 relative z-10">
                    <div className="bg-white h-full w-full rounded-[32px] overflow-hidden relative">
                      {/* App screen */}
                      <div className="absolute inset-0 bg-indigo-50">
                        {/* App header */}
                        <div className="bg-indigo-600 h-16 flex items-center px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <FaPaw className="h-5 w-5 text-indigo-600" />
                            </div>
                            <span className="text-white font-bold">PawsIQ</span>
                          </div>
                        </div>
                        
                        {/* App content */}
                        <div className="p-4">
                          {/* User profile */}
                          <div className="bg-white rounded-lg shadow-sm p-3 mb-4 flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <FaRegSmile className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium">Welcome back, Alex</div>
                              <div className="text-xs text-gray-500">2 upcoming appointments</div>
                            </div>
                          </div>
                          
                          {/* Pet selector */}
                          <div className="flex space-x-2 mb-4 overflow-x-auto py-2">
                            <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-full flex flex-col items-center justify-center border-2 border-indigo-600">
                              <FaDog className="h-6 w-6 text-indigo-600" />
                              <span className="text-xs mt-1">Buddy</span>
                            </div>
                            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center border border-gray-200">
                              <FaCat className="h-6 w-6 text-gray-400" />
                              <span className="text-xs mt-1">Luna</span>
                            </div>
                            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center border border-gray-200">
                              <FaKiwiBird className="h-6 w-6 text-gray-400" />
                              <span className="text-xs mt-1">Polly</span>
                            </div>
                            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center border border-gray-200">
                              <FaPlus className="h-5 w-5 text-gray-400" />
                              <span className="text-xs mt-1">Add</span>
                            </div>
                          </div>
                          
                          {/* Upcoming appointment */}
                          <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-sm font-medium">Vet Checkup</div>
                                <div className="text-xs text-gray-500 mt-1">Tomorrow, 2:00 PM</div>
                                <div className="flex items-center mt-2">
                                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <FaUserMd className="h-3 w-3 text-indigo-600" />
                                  </div>
                                  <span className="text-xs ml-1">Dr. Sarah Johnson</span>
                                </div>
                              </div>
                              <div className="bg-indigo-100 rounded-md px-2 py-1">
                                <span className="text-xs font-medium text-indigo-800">Confirmed</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick actions */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col items-center justify-center">
                              <FaSearch className="h-5 w-5 text-indigo-600 mb-1" />
                              <span className="text-xs">Find Vet</span>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col items-center justify-center">
                              <FaCalendarAlt className="h-5 w-5 text-indigo-600 mb-1" />
                              <span className="text-xs">Book</span>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col items-center justify-center">
                              <FaRegHeart className="h-5 w-5 text-indigo-600 mb-1" />
                              <span className="text-xs">Records</span>
                            </div>
                          </div>
                          
                          {/* Health reminder */}
                          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                            <div className="flex items-start">
                              <FaRegBell className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 animate-wiggle" />
                              <div>
                                <div className="text-sm font-medium text-indigo-800">Vaccination Reminder</div>
                                <div className="text-xs text-indigo-600 mt-1">Buddy's rabies shot is due in 2 weeks</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Phone notch */}
                    <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                      <div className="w-40 h-6 bg-gray-900 rounded-b-xl"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
                </div>
              </div>
              
              {/* Features list */}
              <div className="mt-12 lg:mt-0 lg:col-span-7">
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
                
                {/* App store buttons */}
                
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
                  <FaRegHeart className="h-6 w-6 text-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div ref={faqRef} className="bg-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
              <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fadeInUp">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                <div className="pt-6 animate-fadeInUp animation-delay-200">
                  <dt className="text-lg">
                    <button 
                      className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="font-medium text-gray-900">How do I know providers are qualified?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className={`h-5 w-5 text-indigo-500 ${openFaq === 0 ? 'animate-spin' : 'animate-pulse'}`} />
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 pr-12 overflow-hidden transition-all duration-300 ${openFaq === 0 ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-base text-gray-500">
                      All providers on PawsIQ undergo a thorough verification process including background checks, credential verification, and reference checks. We also collect and display verified reviews from other pet owners.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-300">
                  <dt className="text-lg">
                    <button 
                      className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="font-medium text-gray-900">What types of pet care services are available?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className={`h-5 w-5 text-indigo-500 ${openFaq === 1 ? 'animate-spin' : 'animate-pulse animation-delay-200'}`} />
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 pr-12 overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-base text-gray-500">
                      PawsIQ offers a wide range of services including veterinary care, grooming, training, pet sitting, dog walking, and specialized care for exotic pets. You can filter providers by service type to find exactly what your pet needs.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-400">
                  <dt className="text-lg">
                    <button 
                      className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="font-medium text-gray-900">How does payment work?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className={`h-5 w-5 text-indigo-500 ${openFaq === 2 ? 'animate-spin' : 'animate-pulse animation-delay-400'}`} />
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 pr-12 overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-base text-gray-500">
                      Payments are processed securely through our platform. You can pay using credit/debit cards or other supported payment methods. Funds are only released to providers after services are completed, providing protection for both parties.
                    </p>
                  </dd>
                </div>

                <div className="pt-6 animate-fadeInUp animation-delay-500">
                  <dt className="text-lg">
                    <button 
                      className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="font-medium text-gray-900">What if I need to cancel an appointment?</span>
                      <span className="ml-6 h-7 flex items-center">
                        <FaRegLightbulb className={`h-5 w-5 text-indigo-500 ${openFaq === 3 ? 'animate-spin' : 'animate-pulse animation-delay-600'}`} />
                      </span>
                    </button>
                  </dt>
                  <dd className={`mt-2 pr-12 overflow-hidden transition-all duration-300 ${openFaq === 3 ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-base text-gray-500">
                      Our cancellation policy varies by provider, but most allow free cancellation with 24-48 hours notice. You can view each provider's specific cancellation policy before booking. Emergency situations are handled on a case-by-case basis.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
              
              <div ref={contactRef} className="mt-12 col-span-full flex justify-center items-center animate-fadeInUp">
                <div className="relative w-full max-w-xl">
                  {/* Decorative floating paw */}
                  <div className="absolute -top-6 -right-6 text-indigo-100 text-6xl pointer-events-none select-none">
                    <FaPaw className="animate-float" />
                  </div>

                  {/* Centered contact card */}
                  <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-10 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 w-full mx-auto animate-fadeInUp">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Send us a message</h3>
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Your name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegSmile className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            placeholder="John Doe"
                            onFocus={() => setIsHovering(true)}
                            onBlur={() => setIsHovering(false)}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            placeholder="you@example.com"
                            onFocus={() => setIsHovering(true)}
                            onBlur={() => setIsHovering(false)}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pet-type" className="block text-sm font-medium text-gray-700">
                          Pet type
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {getPetIcon(contactForm.petType)}
                          </div>
                          <select
                            id="pet-type"
                            name="pet-type"
                            value={contactForm.petType}
                            onChange={(e) => setContactForm({...contactForm, petType: e.target.value})}
                            className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            onFocus={() => setIsHovering(true)}
                            onBlur={() => setIsHovering(false)}
                          >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="fish">Fish</option>
                            <option value="horse">Horse</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="How can we help you?"
                            onFocus={() => setIsHovering(true)}
                            onBlur={() => setIsHovering(false)}
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 group"
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          <FaRegEnvelope className="mr-2 group-hover:animate-bounce" />
                          Send Message
                        </button>
                      </div>
                      
                      {/* Form status indicator */}
                      <div className="text-center text-sm">
                        <div className="flex items-center justify-center text-indigo-600">
                          <FaShieldAlt className="h-4 w-4 mr-1" />
                          <span>Your information is secure and encrypted</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            
      </main>

      {/* Newsletter section */}
      <div ref={newsletterRef} className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="relative bg-indigo-50 rounded-3xl shadow-xl overflow-hidden animate-gradientFlow">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 mix-blend-multiply" />
              <div className="absolute bottom-0 right-0 -mb-12 -mr-12 text-indigo-200 opacity-20 text-[200px]">
                <FaPaw className="animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <div className="absolute top-0 left-0 -mt-12 -ml-12 text-indigo-200 opacity-10 text-[150px]">
                <FaDog className="animate-float" />
              </div>
              <div className="absolute top-1/2 right-1/4 text-indigo-200 opacity-10 text-[100px]">
                <FaCat className="animate-float animation-delay-500" />
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
                <form className="sm:flex" onSubmit={handleNewsletterSubmit}>
                  <div className="min-w-0 flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRegEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        id="newsletter-email" 
                        type="email" 
                        required
                        value={newsletter}
                        onChange={(e) => setNewsletter(e.target.value)}
                        placeholder="Enter your email" 
                        className="block w-full pl-10 pr-3 py-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onFocus={() => setIsHovering(true)}
                        onBlur={() => setIsHovering(false)}
                      />
                      {newsletter && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <FaCheckCircle className={`h-5 w-5 ${newsletter.includes('@') ? 'text-indigo-500' : 'text-gray-300'}`} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button 
                      type="submit" 
                      className="block w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transform transition-all duration-300 hover:scale-105 group"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span className="flex items-center justify-center">
                        <span>Subscribe</span>
                        <FaPaw className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </form>
                
                {/* Newsletter benefits */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Weekly pet care tips</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Exclusive discounts</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>New provider alerts</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Seasonal pet advice</span>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-500 text-center">
                  We care about your data. Read our{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    Privacy Policy
                  </a>
                  .
                </p>
                
                {/* Frequency selector */}
                <div className="mt-4 flex justify-center space-x-4 text-sm">
                  <span className="text-gray-500">Frequency:</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" name="frequency" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" defaultChecked />
                    <span className="ml-2 text-gray-700">Weekly</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" name="frequency" className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                    <span className="ml-2 text-gray-700">Monthly</span>
                  </label>
                </div>
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
                &copy; 2025 PawsIQ, Inc. All rights reserved.
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
    </>
  );
}

export default Home;