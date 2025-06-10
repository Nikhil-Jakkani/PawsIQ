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
  FaUserCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaFlag,
  FaShieldAlt,
  FaCamera,
  FaCommentAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaEllipsisH,
  FaPhoneAlt,
  FaEnvelope,
  FaShareAlt,
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle
} from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PetLostReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  
  // Sample data for lost pet reports
  const lostPetReportsData = [
    { 
      id: 1, 
      petName: 'Max', 
      petSpecies: 'Dog',
      petBreed: 'Golden Retriever',
      petAge: 3,
      petGender: 'Male',
      petColor: 'Golden',
      petDescription: 'Friendly golden retriever with a blue collar. Has a small scar on his right ear.',
      ownerName: 'John Smith',
      ownerEmail: 'john.smith@example.com',
      ownerPhone: '(555) 123-4567',
      reportType: 'lost',
      dateReported: '2023-12-05',
      dateLostFound: '2023-12-04',
      location: 'Central Park, New York, NY',
      locationDetails: 'Last seen near the boathouse around 3 PM',
      status: 'active',
      microchipped: true,
      chipId: 'MC123456789',
      reward: '$500',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'phone',
      notes: 'Very friendly and responds to his name. May approach strangers for treats.',
      updates: [
        { date: '2023-12-05', content: 'Report created and verified', type: 'system' },
        { date: '2023-12-06', content: 'Alert sent to users within 5 miles of last seen location', type: 'system' }
      ]
    },
    { 
      id: 2, 
      petName: 'Luna', 
      petSpecies: 'Cat',
      petBreed: 'Siamese',
      petAge: 2,
      petGender: 'Female',
      petColor: 'Seal Point',
      petDescription: 'Siamese cat with blue eyes and dark points. Very vocal and shy with strangers.',
      ownerName: 'Sarah Johnson',
      ownerEmail: 'sarah.j@example.com',
      ownerPhone: '(555) 234-5678',
      reportType: 'lost',
      dateReported: '2023-12-03',
      dateLostFound: '2023-12-02',
      location: 'Maple Street, Boston, MA',
      locationDetails: 'Escaped through an open window on the second floor',
      status: 'resolved',
      microchipped: true,
      chipId: 'MC987654321',
      reward: '$300',
      petImage: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lhbWVzZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'email',
      notes: 'Very skittish and may hide. Please do not chase if spotted.',
      updates: [
        { date: '2023-12-03', content: 'Report created and verified', type: 'system' },
        { date: '2023-12-04', content: 'Alert sent to users within 3 miles of last seen location', type: 'system' },
        { date: '2023-12-07', content: 'Luna has been found and returned home safely!', type: 'owner' }
      ],
      resolutionDate: '2023-12-07',
      resolutionDetails: 'Found hiding in a neighbor\'s garage two blocks away.'
    },
    { 
      id: 3, 
      petName: 'Unknown', 
      petSpecies: 'Dog',
      petBreed: 'Beagle Mix',
      petAge: null,
      petGender: 'Male',
      petColor: 'Tricolor',
      petDescription: 'Medium-sized beagle mix, tricolor (black, brown, white). Wearing a red collar with no tags.',
      ownerName: 'Michael Brown',
      ownerEmail: 'michael.b@example.com',
      ownerPhone: '(555) 345-6789',
      reportType: 'found',
      dateReported: '2023-12-01',
      dateLostFound: '2023-12-01',
      location: 'Washington Park, Chicago, IL',
      locationDetails: 'Found wandering near the playground area',
      status: 'active',
      microchipped: 'unknown',
      chipId: '',
      reward: '',
      petImage: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'phone',
      notes: 'Very friendly and well-behaved. Currently being fostered temporarily.',
      updates: [
        { date: '2023-12-01', content: 'Report created and verified', type: 'system' },
        { date: '2023-12-02', content: 'Alert sent to users within 5 miles of found location', type: 'system' },
        { date: '2023-12-03', content: 'Took to vet to scan for microchip, but none found', type: 'finder' }
      ]
    },
    { 
      id: 4, 
      petName: 'Oliver', 
      petSpecies: 'Cat',
      petBreed: 'Maine Coon',
      petAge: 4,
      petGender: 'Male',
      petColor: 'Brown Tabby',
      petDescription: 'Large Maine Coon with long brown tabby fur and green eyes. Has a distinctive white patch on chest.',
      ownerName: 'Emily Davis',
      ownerEmail: 'emily.d@example.com',
      ownerPhone: '(555) 456-7890',
      reportType: 'lost',
      dateReported: '2023-11-28',
      dateLostFound: '2023-11-27',
      location: 'Oak Avenue, Seattle, WA',
      locationDetails: 'Last seen in the backyard around dusk',
      status: 'resolved',
      microchipped: true,
      chipId: 'MC456789123',
      reward: '$250',
      petImage: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpbmUlMjBjb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'any',
      notes: 'Indoor cat not used to being outside. May be hiding and scared.',
      updates: [
        { date: '2023-11-28', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-29', content: 'Alert sent to users within 2 miles of last seen location', type: 'system' },
        { date: '2023-12-02', content: 'Possible sighting at Pine Street', type: 'user' },
        { date: '2023-12-05', content: 'Oliver has been found and returned home!', type: 'owner' }
      ],
      resolutionDate: '2023-12-05',
      resolutionDetails: 'Found by a neighbor three blocks away and recognized from the alert.'
    },
    { 
      id: 5, 
      petName: 'Bella', 
      petSpecies: 'Dog',
      petBreed: 'Labrador Retriever',
      petAge: 1,
      petGender: 'Female',
      petColor: 'Chocolate',
      petDescription: 'Young chocolate lab puppy with a pink collar and heart-shaped tag.',
      ownerName: 'David Wilson',
      ownerEmail: 'david.w@example.com',
      ownerPhone: '(555) 567-8901',
      reportType: 'lost',
      dateReported: '2023-11-25',
      dateLostFound: '2023-11-25',
      location: 'Riverside Park, Austin, TX',
      locationDetails: 'Ran off during a walk when scared by fireworks',
      status: 'active',
      microchipped: true,
      chipId: 'MC789123456',
      reward: '$400',
      petImage: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwbGFicmFkb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'phone',
      notes: 'Still a puppy and very energetic. Loves people and other dogs.',
      updates: [
        { date: '2023-11-25', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-26', content: 'Alert sent to users within 5 miles of last seen location', type: 'system' },
        { date: '2023-11-30', content: 'Possible sighting near the creek area', type: 'user' }
      ]
    },
    { 
      id: 6, 
      petName: 'Unknown', 
      petSpecies: 'Bird',
      petBreed: 'Cockatiel',
      petAge: null,
      petGender: 'Unknown',
      petColor: 'Grey/Yellow',
      petDescription: 'Grey cockatiel with yellow crest and orange cheek patches. Very tame and whistles tunes.',
      ownerName: 'Jessica Taylor',
      ownerEmail: 'jessica.t@example.com',
      ownerPhone: '(555) 678-9012',
      reportType: 'found',
      dateReported: '2023-11-22',
      dateLostFound: '2023-11-21',
      location: 'Cedar Street, Portland, OR',
      locationDetails: 'Found perched on a porch railing',
      status: 'resolved',
      microchipped: false,
      chipId: '',
      reward: '',
      petImage: 'https://images.unsplash.com/photo-1591198936750-16d8e15edc9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja2F0aWVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'email',
      notes: 'Very tame and friendly. Whistles the first few notes of "If You\'re Happy and You Know It".',
      updates: [
        { date: '2023-11-22', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-23', content: 'Alert sent to users within 3 miles of found location', type: 'system' },
        { date: '2023-11-25', content: 'Owner identified and contacted', type: 'system' },
        { date: '2023-11-26', content: 'Bird reunited with owner', type: 'finder' }
      ],
      resolutionDate: '2023-11-26',
      resolutionDetails: 'Owner identified through social media sharing of the alert.'
    },
    { 
      id: 7, 
      petName: 'Rocky', 
      petSpecies: 'Dog',
      petBreed: 'Boxer',
      petAge: 6,
      petGender: 'Male',
      petColor: 'Fawn',
      petDescription: 'Fawn boxer with white chest and paws. Wearing a blue collar with tags.',
      ownerName: 'Robert Martinez',
      ownerEmail: 'robert.m@example.com',
      ownerPhone: '(555) 789-0123',
      reportType: 'lost',
      dateReported: '2023-11-20',
      dateLostFound: '2023-11-19',
      location: 'Highland Park, Denver, CO',
      locationDetails: 'Last seen near the dog park entrance',
      status: 'expired',
      microchipped: true,
      chipId: 'MC321654987',
      reward: '$350',
      petImage: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym94ZXIlMjBkb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'phone',
      notes: 'Senior dog with arthritis. Needs daily medication.',
      updates: [
        { date: '2023-11-20', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-21', content: 'Alert sent to users within 5 miles of last seen location', type: 'system' }
      ]
    },
    { 
      id: 8, 
      petName: 'Unknown', 
      petSpecies: 'Rabbit',
      petBreed: 'Holland Lop',
      petAge: null,
      petGender: 'Female',
      petColor: 'Brown/White',
      petDescription: 'Small brown and white Holland Lop rabbit. Very tame and used to being handled.',
      ownerName: 'Lisa Anderson',
      ownerEmail: 'lisa.a@example.com',
      ownerPhone: '(555) 890-1234',
      reportType: 'found',
      dateReported: '2023-11-18',
      dateLostFound: '2023-11-18',
      location: 'Meadow Lane, Minneapolis, MN',
      locationDetails: 'Found in a backyard garden',
      status: 'active',
      microchipped: 'unknown',
      chipId: '',
      reward: '',
      petImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9sbGFuZCUyMGxvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'email',
      notes: 'Definitely a pet rabbit, not wild. Very comfortable with humans.',
      updates: [
        { date: '2023-11-18', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-19', content: 'Alert sent to users within 2 miles of found location', type: 'system' },
        { date: '2023-11-22', content: 'Took to vet to check for microchip, none found', type: 'finder' }
      ]
    },
    { 
      id: 9, 
      petName: 'Shadow', 
      petSpecies: 'Cat',
      petBreed: 'Bombay',
      petAge: 7,
      petGender: 'Male',
      petColor: 'Black',
      petDescription: 'All black cat with yellow eyes. No collar but has a small white spot on chest.',
      ownerName: 'Kevin Thomas',
      ownerEmail: 'kevin.t@example.com',
      ownerPhone: '(555) 901-2345',
      reportType: 'lost',
      dateReported: '2023-11-15',
      dateLostFound: '2023-11-14',
      location: 'Pine Street, San Francisco, CA',
      locationDetails: 'Last seen in the front yard around midnight',
      status: 'resolved',
      microchipped: true,
      chipId: 'MC654987321',
      reward: '$200',
      petImage: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBjYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'any',
      notes: 'Indoor cat that got out. Has diabetes and needs medication.',
      updates: [
        { date: '2023-11-15', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-16', content: 'Alert sent to users within 3 miles of last seen location', type: 'system' },
        { date: '2023-11-20', content: 'Shadow has been found and returned home!', type: 'owner' }
      ],
      resolutionDate: '2023-11-20',
      resolutionDetails: 'Found by animal control and identified via microchip.'
    },
    { 
      id: 10, 
      petName: 'Daisy', 
      petSpecies: 'Dog',
      petBreed: 'Shih Tzu',
      petAge: 5,
      petGender: 'Female',
      petColor: 'White/Tan',
      petDescription: 'Small white and tan Shih Tzu with a pink bow in her hair. Recently groomed.',
      ownerName: 'Amanda White',
      ownerEmail: 'amanda.w@example.com',
      ownerPhone: '(555) 012-3456',
      reportType: 'lost',
      dateReported: '2023-11-12',
      dateLostFound: '2023-11-12',
      location: 'Elm Street, Miami, FL',
      locationDetails: 'Ran out when the door was left open by a visitor',
      status: 'expired',
      microchipped: false,
      chipId: '',
      reward: '$300',
      petImage: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpaCUyMHR6dXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      additionalImages: [],
      contactPreference: 'phone',
      notes: 'Very friendly but may be scared of loud noises. Responds to her name and "treat".',
      updates: [
        { date: '2023-11-12', content: 'Report created and verified', type: 'system' },
        { date: '2023-11-13', content: 'Alert sent to users within 3 miles of last seen location', type: 'system' }
      ]
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
      default:
        return <FaPaw className="text-gray-500" />;
    }
  };

  // Get report type badge
  const getReportTypeBadge = (type) => {
    switch (type.toLowerCase()) {
      case 'lost':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1"><FaExclamationTriangle size={10} /> Lost Pet</span>;
      case 'found':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center gap-1"><FaFlag size={10} /> Found Pet</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{type}</span>;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1"><FaCheck size={10} /> Active</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1"><FaCheckCircle size={10} /> Resolved</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center gap-1"><FaTimesCircle size={10} /> Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Filter and sort reports
  const filteredAndSortedReports = lostPetReportsData
    .filter(report => {
      const matchesSearch = 
        report.petName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.petBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecies = filterSpecies === 'all' || report.petSpecies.toLowerCase() === filterSpecies.toLowerCase();
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
      
      return matchesSearch && matchesSpecies && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'date') {
        comparison = new Date(a.dateReported) - new Date(b.dateReported);
      } else if (sortField === 'petName') {
        comparison = a.petName.localeCompare(b.petName);
      } else if (sortField === 'ownerName') {
        comparison = a.ownerName.localeCompare(b.ownerName);
      } else if (sortField === 'location') {
        comparison = a.location.localeCompare(b.location);
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

  // Handle view report details
  const handleViewReport = (report) => {
    setCurrentReport(report);
    setShowReportModal(true);
  };

  // Handle report status change
  const handleStatusChange = (reportId, newStatus) => {
    // In a real app, you would call an API to update the report status
    console.log(`Changing report ${reportId} status to ${newStatus}`);
    alert(`Report status changed to ${newStatus}`);
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
              <h1 className="text-2xl font-bold text-gray-800">Lost & Found Pets</h1>
              <p className="text-gray-500">Manage lost and found pet reports</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              <FaDownload /> Export Reports
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
                placeholder="Search by pet, breed, location..."
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
              <option value="resolved">Resolved</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('ownerName')}
                  >
                    <div className="flex items-center">
                      Reporter {getSortIcon('ownerName')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center">
                      Location {getSortIcon('location')}
                    </div>
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                          <img src={report.petImage} alt={report.petName} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{report.petName}</span>
                            {getSpeciesIcon(report.petSpecies)}
                          </div>
                          <div className="text-xs text-gray-500">{report.petBreed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReportTypeBadge(report.reportType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.ownerName}</div>
                      <div className="text-xs text-gray-500">{report.ownerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate max-w-xs">{report.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.dateReported}</div>
                      <div className="text-xs text-gray-500">Reported</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewReport(report)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {report.status === 'active' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(report.id, 'resolved')}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Resolved"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusChange(report.id, 'expired')}
                              className="text-red-600 hover:text-red-900"
                              title="Mark as Expired"
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

        {/* Report Details Modal */}
        {showReportModal && currentReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {currentReport.reportType === 'lost' ? 'Lost Pet Report' : 'Found Pet Report'}
                    </h2>
                    {getStatusBadge(currentReport.status)}
                  </div>
                  <button 
                    onClick={() => setShowReportModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Pet Image & Basic Info */}
                  <div className="md:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img 
                        src={currentReport.petImage} 
                        alt={currentReport.petName} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-800">
                          {currentReport.petName !== 'Unknown' ? currentReport.petName : 'Unknown Pet'}
                        </h3>
                        <div className="flex items-center gap-1">
                          {getSpeciesIcon(currentReport.petSpecies)}
                          <span className="text-sm text-gray-600">{currentReport.petSpecies}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Breed:</span> {currentReport.petBreed}</p>
                        {currentReport.petAge && (
                          <p><span className="text-gray-500">Age:</span> {currentReport.petAge} {currentReport.petAge === 1 ? 'year' : 'years'}</p>
                        )}
                        <p><span className="text-gray-500">Gender:</span> {currentReport.petGender}</p>
                        <p><span className="text-gray-500">Color:</span> {currentReport.petColor}</p>
                        <p><span className="text-gray-500">Microchipped:</span> {
                          currentReport.microchipped === true ? 'Yes' : 
                          currentReport.microchipped === false ? 'No' : 'Unknown'
                        }</p>
                        {currentReport.chipId && (
                          <p><span className="text-gray-500">Chip ID:</span> {currentReport.chipId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Report Details */}
                  <div className="md:w-2/3 space-y-6">
                    {/* Report Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Report Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Report Date</p>
                            <p className="text-base text-gray-900">{currentReport.dateReported}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{currentReport.reportType === 'lost' ? 'Date Lost' : 'Date Found'}</p>
                            <p className="text-base text-gray-900">{currentReport.dateLostFound}</p>
                          </div>
                          {currentReport.status === 'resolved' && (
                            <>
                              <div>
                                <p className="text-sm text-gray-500">Resolution Date</p>
                                <p className="text-base text-gray-900">{currentReport.resolutionDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Resolution Details</p>
                                <p className="text-base text-gray-900">{currentReport.resolutionDetails}</p>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Location</p>
                          <div className="flex items-center gap-2 mt-1">
                            <FaMapMarkerAlt className="text-red-500" />
                            <p className="text-base text-gray-900">{currentReport.location}</p>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{currentReport.locationDetails}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Description</p>
                          <p className="text-base text-gray-900 mt-1">{currentReport.petDescription}</p>
                        </div>
                        
                        {currentReport.reward && (
                          <div className="mt-4 p-2 bg-amber-50 border border-amber-200 rounded-md">
                            <p className="text-sm font-medium text-amber-800">Reward: {currentReport.reward}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUserCircle className="text-indigo-600" size={20} />
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900">{currentReport.ownerName}</p>
                            <p className="text-sm text-gray-500">{currentReport.reportType === 'lost' ? 'Pet Owner' : 'Found By'}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-gray-500" />
                            <p className="text-sm text-gray-900">{currentReport.ownerEmail}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-gray-500" />
                            <p className="text-sm text-gray-900">{currentReport.ownerPhone}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCommentAlt className="text-gray-500" />
                            <p className="text-sm text-gray-900">Preferred contact: {currentReport.contactPreference === 'any' ? 'Any method' : currentReport.contactPreference}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {currentReport.notes && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Notes</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">{currentReport.notes}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Activity Timeline */}
                    {currentReport.updates && currentReport.updates.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Activity Timeline</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-4">
                            {currentReport.updates.map((update, index) => (
                              <div key={index} className="relative pl-6 pb-4 border-l border-gray-300 last:border-0 last:pb-0">
                                <div className="absolute left-0 top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500"></div>
                                <div className="flex justify-between mb-1">
                                  <p className="text-sm font-medium text-gray-900">{update.date}</p>
                                  <span className="text-xs text-gray-500 capitalize">{update.type}</span>
                                </div>
                                <p className="text-sm text-gray-700">{update.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex flex-wrap justify-between">
                <div className="flex flex-wrap gap-3">
                  {currentReport.status === 'active' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(currentReport.id, 'resolved');
                          setShowReportModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <FaCheckCircle /> Mark as Resolved
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(currentReport.id, 'expired');
                          setShowReportModal(false);
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
                      >
                        <FaTimesCircle /> Mark as Expired
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => alert('This would send a notification to nearby users')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <FaBell /> Send Alert
                  </button>
                  <button
                    onClick={() => alert('This would share the report on social media')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaShareAlt /> Share Report
                  </button>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
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

export default PetLostReports;