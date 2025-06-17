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
  FaHorse,
  FaUserCircle,
  FaCalendarAlt,
  FaVenus,
  FaMars,
  FaNeuter,
  FaBirthdayCake,
  FaWeight,
  FaRuler,
  FaTag,
  FaSyringe,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaCamera,
  FaRobot,
  FaSpinner
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

// Add CSS for the pulse animation
const pulseKeyframes = `
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(124, 58, 237, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
  }
}
`;

// Add the keyframes to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = pulseKeyframes;
  document.head.appendChild(style);
}

const PetProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showPetModal, setShowPetModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  // Sample data for pet profiles
  const petsData = [
    { 
      id: 1, 
      name: 'Max', 
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      weight: '65 lbs',
      height: '24 inches',
      color: 'Golden',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'John Smith',
      ownerEmail: 'john.smith@example.com',
      ownerPhone: '(555) 123-4567',
      profileImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-01-15',
      lastUpdated: '2023-11-20',
      status: 'active',
      medicalConditions: ['Allergies', 'Hip dysplasia'],
      medications: ['Apoquel', 'Joint supplement'],
      dietaryRestrictions: ['No chicken'],
      emergencyContact: 'Sarah Smith, (555) 987-6543',
      vetInfo: 'Dr. Johnson, Happy Paws Veterinary, (555) 234-5678',
      notes: 'Friendly with other dogs and children. Loves swimming and playing fetch.'
    },
    { 
      id: 2, 
      name: 'Luna', 
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      gender: 'Female',
      weight: '9 lbs',
      height: '10 inches',
      color: 'Seal Point',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'Sarah Johnson',
      ownerEmail: 'sarah.j@example.com',
      ownerPhone: '(555) 234-5678',
      profileImage: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-02-20',
      lastUpdated: '2023-10-15',
      status: 'active',
      medicalConditions: ['None'],
      medications: [],
      dietaryRestrictions: ['Grain-free diet'],
      emergencyContact: 'Michael Johnson, (555) 876-5432',
      vetInfo: 'Dr. Wilson, Feline Friends Clinic, (555) 345-6789',
      notes: 'Shy with strangers but very affectionate with family. Loves to play with string toys.'
    },
    { 
      id: 3, 
      name: 'Charlie', 
      species: 'Dog',
      breed: 'Beagle',
      age: 5,
      gender: 'Male',
      weight: '28 lbs',
      height: '15 inches',
      color: 'Tricolor',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'Michael Brown',
      ownerEmail: 'michael.b@example.com',
      ownerPhone: '(555) 345-6789',
      profileImage: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2022-11-10',
      lastUpdated: '2023-09-05',
      status: 'active',
      medicalConditions: ['Ear infection (recurring)'],
      medications: ['Ear drops as needed'],
      dietaryRestrictions: ['Low-fat diet'],
      emergencyContact: 'Emily Brown, (555) 765-4321',
      vetInfo: 'Dr. Martinez, Pet Care Center, (555) 456-7890',
      notes: 'Very energetic and loves to follow scents. Needs regular exercise and mental stimulation.'
    },
    { 
      id: 4, 
      name: 'Oliver', 
      species: 'Cat',
      breed: 'Maine Coon',
      age: 4,
      gender: 'Male',
      weight: '18 lbs',
      height: '12 inches',
      color: 'Brown Tabby',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'Emily Davis',
      ownerEmail: 'emily.d@example.com',
      ownerPhone: '(555) 456-7890',
      profileImage: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpbmUlMjBjb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2022-12-05',
      lastUpdated: '2023-08-20',
      status: 'active',
      medicalConditions: ['Heart murmur (mild)'],
      medications: [],
      dietaryRestrictions: [],
      emergencyContact: 'David Davis, (555) 654-3210',
      vetInfo: 'Dr. Thompson, Cat Specialists, (555) 567-8901',
      notes: 'Gentle giant who loves to be brushed. Gets along well with other cats.'
    },
    { 
      id: 5, 
      name: 'Bella', 
      species: 'Dog',
      breed: 'Labrador Retriever',
      age: 1,
      gender: 'Female',
      weight: '55 lbs',
      height: '22 inches',
      color: 'Chocolate',
      microchipped: true,
      neutered: false,
      vaccinated: true,
      ownerName: 'David Wilson',
      ownerEmail: 'david.w@example.com',
      ownerPhone: '(555) 567-8901',
      profileImage: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwbGFicmFkb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-03-10',
      lastUpdated: '2023-11-01',
      status: 'active',
      medicalConditions: ['None'],
      medications: [],
      dietaryRestrictions: [],
      emergencyContact: 'Jessica Wilson, (555) 543-2109',
      vetInfo: 'Dr. Garcia, Animal Hospital, (555) 678-9012',
      notes: 'Energetic puppy still in training. Loves water and retrieving games.'
    },
    { 
      id: 6, 
      name: 'Coco', 
      species: 'Bird',
      breed: 'Cockatiel',
      age: 3,
      gender: 'Female',
      weight: '90 g',
      height: '12 inches',
      color: 'Grey/Yellow',
      microchipped: false,
      neutered: false,
      vaccinated: false,
      ownerName: 'Jessica Taylor',
      ownerEmail: 'jessica.t@example.com',
      ownerPhone: '(555) 678-9012',
      profileImage: 'https://images.unsplash.com/photo-1591198936750-16d8e15edc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja2F0aWVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-04-15',
      lastUpdated: '2023-10-10',
      status: 'active',
      medicalConditions: ['None'],
      medications: [],
      dietaryRestrictions: ['No avocado, chocolate, or caffeine'],
      emergencyContact: 'Robert Taylor, (555) 432-1098',
      vetInfo: 'Dr. Patel, Exotic Pet Clinic, (555) 789-0123',
      notes: 'Talkative and social bird. Can whistle several tunes and says a few words.'
    },
    { 
      id: 7, 
      name: 'Rocky', 
      species: 'Dog',
      breed: 'Boxer',
      age: 6,
      gender: 'Male',
      weight: '70 lbs',
      height: '23 inches',
      color: 'Fawn',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'Robert Martinez',
      ownerEmail: 'robert.m@example.com',
      ownerPhone: '(555) 789-0123',
      profileImage: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym94ZXIlMjBkb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2022-09-20',
      lastUpdated: '2023-07-15',
      status: 'inactive',
      medicalConditions: ['Arthritis'],
      medications: ['Joint supplement', 'Pain medication as needed'],
      dietaryRestrictions: ['Senior diet'],
      emergencyContact: 'Maria Martinez, (555) 321-0987',
      vetInfo: 'Dr. Lee, City Veterinary Clinic, (555) 890-1234',
      notes: 'Senior dog who prefers calm environments. Needs moderate exercise but tires quickly.'
    },
    { 
      id: 8, 
      name: 'Nemo', 
      species: 'Fish',
      breed: 'Betta',
      age: 1,
      gender: 'Male',
      weight: 'N/A',
      height: '3 inches',
      color: 'Blue/Red',
      microchipped: false,
      neutered: false,
      vaccinated: false,
      ownerName: 'Lisa Anderson',
      ownerEmail: 'lisa.a@example.com',
      ownerPhone: '(555) 890-1234',
      profileImage: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmV0dGElMjBmaXNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-05-05',
      lastUpdated: '2023-09-25',
      status: 'active',
      medicalConditions: ['None'],
      medications: [],
      dietaryRestrictions: ['Betta-specific food only'],
      emergencyContact: 'Mark Anderson, (555) 210-9876',
      vetInfo: 'Dr. Wong, Aquatic Pet Specialists, (555) 901-2345',
      notes: 'Lives in a 5-gallon tank with heater and filter. Water changes performed weekly.'
    },
    { 
      id: 9, 
      name: 'Daisy', 
      species: 'Rabbit',
      breed: 'Holland Lop',
      age: 2,
      gender: 'Female',
      weight: '4 lbs',
      height: '8 inches',
      color: 'Brown/White',
      microchipped: false,
      neutered: true,
      vaccinated: true,
      ownerName: 'Kevin Thomas',
      ownerEmail: 'kevin.t@example.com',
      ownerPhone: '(555) 901-2345',
      profileImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9sbGFuZCUyMGxvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2023-01-30',
      lastUpdated: '2023-08-10',
      status: 'active',
      medicalConditions: ['Dental issues'],
      medications: [],
      dietaryRestrictions: ['High-fiber diet', 'Limited treats'],
      emergencyContact: 'Laura Thomas, (555) 109-8765',
      vetInfo: 'Dr. Chen, Small Pet Clinic, (555) 012-3456',
      notes: 'Free-roam house rabbit. Litter box trained and enjoys cardboard toys.'
    },
    { 
      id: 10, 
      name: 'Shadow', 
      species: 'Cat',
      breed: 'Bombay',
      age: 7,
      gender: 'Male',
      weight: '12 lbs',
      height: '10 inches',
      color: 'Black',
      microchipped: true,
      neutered: true,
      vaccinated: true,
      ownerName: 'Amanda White',
      ownerEmail: 'amanda.w@example.com',
      ownerPhone: '(555) 012-3456',
      profileImage: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBjYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      dateAdded: '2022-08-15',
      lastUpdated: '2023-07-01',
      status: 'active',
      medicalConditions: ['Diabetes'],
      medications: ['Insulin twice daily'],
      dietaryRestrictions: ['Prescription diabetic diet'],
      emergencyContact: 'Daniel White, (555) 098-7654',
      vetInfo: 'Dr. Robinson, Feline Medical Center, (555) 123-4567',
      notes: 'Indoor cat who requires consistent feeding schedule for insulin management. Very calm and affectionate.'
    }
  ];

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
        return <FaPaw className="text-brown-500" />;
      case 'horse':
        return <FaHorse className="text-brown-700" />;
      default:
        return <FaPaw className="text-gray-500" />;
    }
  };

  // Get gender icon
  const getGenderIcon = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return <FaMars className="text-blue-500" />;
      case 'female':
        return <FaVenus className="text-pink-500" />;
      default:
        return <FaNeuter className="text-gray-500" />;
    }
  };
  
  // Generate AI health recommendations
  const generateAiRecommendation = async (pet) => {
    setIsLoadingRecommendation(true);
    setShowRecommendation(true);
    
    try {
      // API key for Gemini Flash 1.5
      const apiKey = 'AIzaSyB7bGypVW2cDNx7ajFnmoOFAmiOlZ0f-7Q';
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
      
      // Construct the prompt based on pet details
      const prompt = `Generate a concise health recommendation for a ${pet.age}-year-old ${pet.gender.toLowerCase()} ${pet.species.toLowerCase()} of breed ${pet.breed}. 
      Include species-specific and breed-specific health considerations, age-appropriate care tips, and gender-specific health advice.
      Format the response in a structured way with exactly these 4 categories:
      1. Preventive Care
      2. Nutrition
      3. Exercise
      4. Health Monitoring
      
      For each category, provide a single clear recommendation.
      
      Current medical conditions: ${pet.medicalConditions.join(', ')}
      Current medications: ${pet.medications.join(', ')}
      Dietary restrictions: ${pet.dietaryRestrictions.join(', ')}`;
      
      // Make API request to Gemini
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      // Extract the recommendation text from the response
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        // Process the response to ensure it's in the correct format
        const rawText = data.candidates[0].content.parts[0].text;
        
        // Parse the text to extract the categories and recommendations
        const categories = ['Preventive Care', 'Nutrition', 'Exercise', 'Health Monitoring'];
        let formattedRecommendations = [];
        
        // Simple parsing to extract recommendations for each category
        categories.forEach(category => {
          const regex = new RegExp(`${category}[:\\s]+(.*?)(?=\\n\\d+\\.|$)`, 's');
          const match = rawText.match(regex);
          const recommendation = match ? match[1].trim() : 'No specific recommendation available';
          formattedRecommendations.push({ category, recommendation });
        });
        
        // Store the structured data
        setAiRecommendation(JSON.stringify(formattedRecommendations));
      } else {
        setAiRecommendation(JSON.stringify([
          { category: 'Error', recommendation: "Sorry, we couldn't generate recommendations at this time. Please try again later." }
        ]));
      }
    } catch (error) {
      console.error("Error generating AI recommendation:", error);
      setAiRecommendation(JSON.stringify([
        { category: 'Error', recommendation: "An error occurred while generating recommendations. Please try again later." }
      ]));
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  // Filter and sort pets
  const filteredAndSortedPets = petsData
    .filter(pet => {
      const matchesSearch = 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecies = filterSpecies === 'all' || pet.species.toLowerCase() === filterSpecies.toLowerCase();
      const matchesStatus = filterStatus === 'all' || pet.status === filterStatus;
      
      return matchesSearch && matchesSpecies && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'species') {
        comparison = a.species.localeCompare(b.species);
      } else if (sortField === 'breed') {
        comparison = a.breed.localeCompare(b.breed);
      } else if (sortField === 'age') {
        comparison = a.age - b.age;
      } else if (sortField === 'ownerName') {
        comparison = a.ownerName.localeCompare(b.ownerName);
      } else if (sortField === 'lastUpdated') {
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
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

  // Handle view pet details
  const handleViewPet = (pet) => {
    setCurrentPet(pet);
    setShowPetModal(true);
    // Reset AI recommendation when opening a new pet profile
    setAiRecommendation('');
    setShowRecommendation(false);
    setIsLoadingRecommendation(false);
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
              <h1 className="text-2xl font-bold text-gray-800">Pet Profiles</h1>
              <p className="text-gray-500">View and manage pet profiles on the platform</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Create a CSV string from the filtered pets
                const headers = ['ID', 'Name', 'Species', 'Breed', 'Age', 'Gender', 'Owner Name', 'Owner Email', 'Status', 'Microchipped', 'Neutered', 'Vaccinated'];
                const csvRows = [headers];
                
                filteredAndSortedPets.forEach(pet => {
                  csvRows.push([
                    pet.id,
                    pet.name,
                    pet.species,
                    pet.breed,
                    pet.age,
                    pet.gender,
                    pet.ownerName,
                    pet.ownerEmail,
                    pet.status,
                    pet.microchipped ? 'Yes' : 'No',
                    pet.neutered ? 'Yes' : 'No',
                    pet.vaccinated ? 'Yes' : 'No'
                  ]);
                });
                
                const csvString = csvRows.map(row => row.join(',')).join('\n');
                
                // Create a Blob and download link
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `pet-profiles-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FaDownload /> Export Profiles
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
                placeholder="Search pets by name, breed, owner..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Species Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
            >
              <option value="all">All Species</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="fish">Fish</option>
              <option value="rabbit">Rabbits</option>
              <option value="other">Other</option>
            </select>
            
            {/* Status Filter */}
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedPets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pet.profileImage} 
                  alt={pet.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${pet.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {pet.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                  <div className="flex items-center gap-1">
                    {getSpeciesIcon(pet.species)}
                    {getGenderIcon(pet.gender)}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <p>{pet.breed}</p>
                  <p>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</p>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Owner: {pet.ownerName}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pet.microchipped && (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Microchipped</span>
                  )}
                  {pet.neutered && (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Neutered/Spayed</span>
                  )}
                  {pet.vaccinated && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Vaccinated</span>
                  )}
                </div>
                <button
                  onClick={() => handleViewPet(pet)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEye /> View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pet Details Modal */}
        {showPetModal && currentPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Pet Profile: {currentPet.name}</h2>
                  <button 
                    onClick={() => setShowPetModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6">
                {showRecommendation && (
                  <div className={`mb-6 p-4 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 ${isLoadingRecommendation ? 'animate-pulse' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <FaRobot className="text-purple-600" />
                      <h3 className="text-lg font-medium text-purple-800">AI Health Recommendations</h3>
                    </div>
                    {isLoadingRecommendation ? (
                      <div className="flex items-center justify-center py-6">
                        <FaSpinner className="animate-spin text-purple-600 text-2xl" />
                        <span className="ml-3 text-purple-800">Generating personalized health recommendations...</span>
                      </div>
                    ) : (
                      <div className="max-w-none">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="bg-purple-100 text-purple-800 text-left py-2 px-3 font-semibold border border-purple-200 rounded-tl-lg">Category</th>
                              <th className="bg-purple-100 text-purple-800 text-left py-2 px-3 font-semibold border border-purple-200 rounded-tr-lg">Recommendation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {aiRecommendation && JSON.parse(aiRecommendation).map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                                <td className="py-2 px-3 border border-purple-200 font-medium text-purple-700">{item.category}</td>
                                <td className="py-2 px-3 border border-purple-200 text-gray-700">{item.recommendation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                      <FaRobot className="text-purple-400" size={12} />
                      <span>Powered by Gemini 1.5 Flash</span>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Pet Image */}
                  <div className="md:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img 
                        src={currentPet.profileImage} 
                        alt={currentPet.name} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span className="text-sm text-gray-600">Added: {currentPet.dateAdded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span className="text-sm text-gray-600">Last Updated: {currentPet.lastUpdated}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${currentPet.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {currentPet.status === 'active' ? 'Active Profile' : 'Inactive Profile'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pet Details */}
                  <div className="md:w-2/3 space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <FaPaw className="text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-500">Species</p>
                            <p className="text-base text-gray-900">{currentPet.species}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaTag className="text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-500">Breed</p>
                            <p className="text-base text-gray-900">{currentPet.breed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaBirthdayCake className="text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="text-base text-gray-900">{currentPet.age} {currentPet.age === 1 ? 'year' : 'years'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getGenderIcon(currentPet.gender)}
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="text-base text-gray-900">{currentPet.gender}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaWeight className="text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-500">Weight</p>
                            <p className="text-base text-gray-900">{currentPet.weight}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaRuler className="text-indigo-600" />
                          <div>
                            <p className="text-sm text-gray-500">Height</p>
                            <p className="text-base text-gray-900">{currentPet.height}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Health Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Health Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${currentPet.microchipped ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {currentPet.microchipped ? <FaCheck className="text-green-600 text-xs" /> : <FaTimes className="text-gray-400 text-xs" />}
                          </div>
                          <span className="text-sm text-gray-700">Microchipped</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${currentPet.neutered ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {currentPet.neutered ? <FaCheck className="text-green-600 text-xs" /> : <FaTimes className="text-gray-400 text-xs" />}
                          </div>
                          <span className="text-sm text-gray-700">Neutered/Spayed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${currentPet.vaccinated ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {currentPet.vaccinated ? <FaCheck className="text-green-600 text-xs" /> : <FaTimes className="text-gray-400 text-xs" />}
                          </div>
                          <span className="text-sm text-gray-700">Vaccinated</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Medical Conditions</p>
                          <div className="flex flex-wrap gap-2">
                            {currentPet.medicalConditions.map((condition, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                {condition}
                              </span>
                            ))}
                            {currentPet.medicalConditions.length === 0 || (currentPet.medicalConditions.length === 1 && currentPet.medicalConditions[0] === 'None') ? (
                              <span className="text-sm text-gray-500">No known medical conditions</span>
                            ) : null}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Medications</p>
                          <div className="flex flex-wrap gap-2">
                            {currentPet.medications.map((medication, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {medication}
                              </span>
                            ))}
                            {currentPet.medications.length === 0 ? (
                              <span className="text-sm text-gray-500">No medications</span>
                            ) : null}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Dietary Restrictions</p>
                          <div className="flex flex-wrap gap-2">
                            {currentPet.dietaryRestrictions.map((restriction, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                                {restriction}
                              </span>
                            ))}
                            {currentPet.dietaryRestrictions.length === 0 ? (
                              <span className="text-sm text-gray-500">No dietary restrictions</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Owner Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Owner Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUserCircle className="text-indigo-600" size={20} />
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900">{currentPet.ownerName}</p>
                            <p className="text-sm text-gray-500">{currentPet.ownerEmail}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          <p>Phone: {currentPet.ownerPhone}</p>
                          <p className="mt-1">Emergency Contact: {currentPet.emergencyContact}</p>
                          <p className="mt-1">Veterinarian: {currentPet.vetInfo}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Notes</h3>
                      <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{currentPet.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => generateAiRecommendation(currentPet)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center gap-2 relative group"
                  style={{
                    animation: isLoadingRecommendation ? 'none' : 'pulse 2s infinite'
                  }}
                >
                  {isLoadingRecommendation ? (
                    <>
                      <FaSpinner className="animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <FaRobot /> AI Health Suggestions
                      <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></span>
                    </>
                  )}
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowPetModal(false);
                      setShowRecommendation(false);
                      setAiRecommendation('');
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // In a real app, this would open a form with the pet's current data
                      // For this demo, we'll use simple prompts to simulate editing
                      
                      const newName = prompt("Edit pet name:", currentPet.name);
                      if (!newName) return;
                      
                      const newAge = prompt("Edit pet age:", currentPet.age);
                      if (!newAge) return;
                      
                      const newWeight = prompt("Edit pet weight:", currentPet.weight);
                      if (!newWeight) return;
                      
                      // Update the pet data (in a real app, this would be an API call)
                      const updatedPet = {
                        ...currentPet,
                        name: newName,
                        age: parseInt(newAge),
                        weight: newWeight,
                        lastUpdated: new Date().toISOString().split('T')[0]
                      };
                      
                      console.log("Updated pet data:", updatedPet);
                      alert(`${newName}'s profile has been updated successfully!`);
                      
                      // Close the modal and reset AI recommendation state
                      setShowPetModal(false);
                      setShowRecommendation(false);
                      setAiRecommendation('');
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PetProfiles;