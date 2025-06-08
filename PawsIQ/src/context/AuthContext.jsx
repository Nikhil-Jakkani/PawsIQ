import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock user data for demonstration
const USERS = [
  {
    email: 'admin@pawsiq.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: '/avatar-admin.png'
  },
  {
    email: 'user@pawsiq.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User',
    avatar: '/avatar-user.png'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('pawsiq_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setError('');
    
    // Find user with matching credentials
    const user = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Remove password before storing
      const { password: _unused, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('pawsiq_user', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pawsiq_user');
  };

  const value = {
    currentUser,
    login,
    logout,
    error,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};