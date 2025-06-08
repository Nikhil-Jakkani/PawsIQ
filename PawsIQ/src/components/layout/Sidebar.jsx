import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, 
  FaUsers, 
  FaHospital, 
  FaCalendarAlt, 
  FaShoppingCart, 
  FaCreditCard, 
  FaComments, 
  FaChartBar, 
  FaBell, 
  FaCog, 
  FaShieldAlt, 
  FaQuestionCircle,
  FaSignOutAlt,
  FaPaw,
  FaDog,
  FaCat,
  FaBone,
  FaFish
} from 'react-icons/fa';
import { GiDogBowl, GiCat, GiSittingDog } from 'react-icons/gi';
import { PetIcon } from './PetIcons';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome className="w-5 h-5" />, petIcon: 'paw' },
    { name: 'Users', path: '/admin/users', icon: <FaUsers className="w-5 h-5" />, petIcon: 'dog' },
    { name: 'Providers', path: '/admin/providers', icon: <FaHospital className="w-5 h-5" />, petIcon: 'cat' },
    { name: 'Appointments', path: '/admin/appointments', icon: <FaCalendarAlt className="w-5 h-5" />, petIcon: 'rabbit' },
    { name: 'Marketplace', path: '/admin/marketplace', icon: <FaShoppingCart className="w-5 h-5" />, petIcon: 'hamster' },
    { name: 'Transactions', path: '/admin/transactions', icon: <FaCreditCard className="w-5 h-5" />, petIcon: 'turtle' },
    { name: 'Content', path: '/admin/content', icon: <FaComments className="w-5 h-5" />, petIcon: 'bird' },
    { name: 'Analytics', path: '/admin/analytics', icon: <FaChartBar className="w-5 h-5" />, petIcon: 'fish' },
    { name: 'Notifications', path: '/admin/notifications', icon: <FaBell className="w-5 h-5" />, petIcon: 'paw' },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog className="w-5 h-5" />, petIcon: 'dog' },
    { name: 'Security', path: '/admin/security', icon: <FaShieldAlt className="w-5 h-5" />, petIcon: 'cat' },
    { name: 'Support', path: '/admin/support', icon: <FaQuestionCircle className="w-5 h-5" />, petIcon: 'paw' },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white h-screen w-72 fixed left-0 top-0 overflow-y-auto shadow-xl">
      <div className="p-5 flex items-center gap-3 border-b border-indigo-700">
        <div className="bg-white p-2 rounded-full">
          <FaPaw className="text-indigo-600 text-3xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold">PawsIQ Admin</h1>
          <p className="text-xs text-indigo-200">Pet Care Platform</p>
        </div>
      </div>
      
      <div className="p-5 border-b border-indigo-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-md">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="font-medium">{currentUser?.name || 'Admin User'}</p>
            <p className="text-xs text-indigo-300">{currentUser?.role || 'admin'}</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-indigo-700 shadow-md font-medium' 
                      : 'text-white hover:bg-indigo-700/50'
                  }`
                }
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-indigo-100' : 'bg-indigo-700/50'
                }`}>
                  <PetIcon type={item.petIcon} className={isActive ? 'text-indigo-600' : 'text-indigo-300'} />
                </div>
                <span>{item.name}</span>
                
                {/* Cute paw print for active item */}
                {isActive && (
                  <FaPaw className="ml-auto text-indigo-400 animate-pulse" />
                )}
              </NavLink>
            </li>
          ))}
          <li className="pt-4 mt-4 border-t border-indigo-700/50">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-700/50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-700/50 flex items-center justify-center">
                <FaSignOutAlt className="text-indigo-300" />
              </div>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-5 mt-auto">
        <div className="bg-indigo-700/30 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <FaDog className="text-yellow-300" />
            <FaCat className="text-purple-300" />
            <FaBone className="text-blue-300" />
            <FaFish className="text-green-300" />
          </div>
          <p className="text-xs text-indigo-200">
            Helping pets and their owners connect with the best care services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;