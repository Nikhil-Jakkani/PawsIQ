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
  },
  {
    email: 'user@pawsiq.in',
    password: 'user1234',
    role: 'user',
    name: 'PawsIQ User',
    avatar: '/avatar-user.png',
    pets: [
      {
        id: 3,
        name: 'Buddy',
        type: 'dog',
        breed: 'Labrador'
      }
    ]
  }
];

// Mock provider data for demonstration
const PROVIDERS = [
  {
    email: 'vet@pawsiq.com',
    password: 'provider123',
    role: 'provider',
    providerType: 'Veterinarian',
    name: 'Dr. James Wilson',
    avatar: '/avatar-vet.png',
    verified: true,
    applicationStatus: 'approved'
  },
  {
    email: 'trainer@pawsiq.com',
    password: 'provider123',
    role: 'provider',
    providerType: 'Trainer',
    name: 'Emma Roberts',
    avatar: '/avatar-trainer.png',
    verified: true,
    applicationStatus: 'approved'
  },
  {
    email: 'groomer@pawsiq.com',
    password: 'provider123',
    role: 'provider',
    providerType: 'Groomer',
    name: 'Michael Chen',
    avatar: '/avatar-groomer.png',
    verified: true,
    applicationStatus: 'approved'
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

  const login = async (email, password) => {
    setError('');
    setLoading(true);

    try {
      // First try API authentication
      const response = await fetch('http://localhost:5173/api/v1/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user, token } = data;
        
        // Combine user data and token for storage
        const userData = { ...user, token };

        setCurrentUser(userData);
        localStorage.setItem('pawsiq_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, userType: user.role };
      }
    } catch (apiError) {
      // API failed, fallback to mock authentication
      console.log('API authentication failed, using mock data');
    }

    // Fallback to mock authentication
    try {
      // Check in USERS array
      const user = USERS.find(u => u.email === email && u.password === password);
      if (user) {
        const userData = { ...user, token: 'mock-token-' + Date.now() };
        setCurrentUser(userData);
        localStorage.setItem('pawsiq_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, userType: user.role };
      }

      // Check in PROVIDERS array
      const provider = PROVIDERS.find(p => p.email === email && p.password === password);
      if (provider) {
        const userData = { ...provider, token: 'mock-token-' + Date.now() };
        setCurrentUser(userData);
        localStorage.setItem('pawsiq_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true, userType: provider.role };
      }

      // No user found
      throw new Error('Invalid email or password');

    } catch (error) {
      setError(error.message || 'An error occurred during login');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pawsiq_user');
  };

  // Check if user is a provider
  const isProvider = () => {
    return currentUser && currentUser.role === 'provider';
  };

  // Check if user is a regular user
  const isUser = () => {
    return currentUser && currentUser.role === 'user';
  };

  // Check if user is an admin
  const isAdmin = () => {
    return currentUser && currentUser.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    logout,
    isProvider,
    isUser,
    isAdmin,
    error,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};