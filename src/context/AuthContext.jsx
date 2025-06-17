import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

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
    name: 'Sarah Johnson',
    avatar: '/avatar-user.png',
    pets: [
      {
        id: 1,
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever'
      },
      {
        id: 2,
        name: 'Luna',
        type: 'cat',
        breed: 'Siamese'
      }
    ]
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false initially
  const [error, setError] = useState('');

  // Initialize auth state
  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    try {
      const storedUser = localStorage.getItem('pawsiq_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    } catch (err) {
      localStorage.removeItem('pawsiq_user');
    } finally {
      // Hide loading screen after auth check is complete
      const loadingElement = document.getElementById('loading');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }
  }, []);

  const login = (email, password) => {
    setError('');
    setLoading(true);
    
    try {
      // Find user with matching credentials
      const user = USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        // Remove password before storing
        const { password: _unused, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('pawsiq_user', JSON.stringify(userWithoutPassword));
        setLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (error) {
      setError('An error occurred during login');
      setLoading(false);
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