import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('pawsiq_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('pawsiq_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/v1/user/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      const { user, tokens } = data;
      const userData = { ...user, tokens, role: 'user' };
      setCurrentUser(userData);
      localStorage.setItem('pawsiq_user', JSON.stringify(userData));
      return { success: true, userType: user.role };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/v1/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login as admin');
      }
      const { user, token } = data;
      const adminData = { ...user, tokens: { access: { token } }, role: 'admin' };
      setCurrentUser(adminData);
      localStorage.setItem('pawsiq_user', JSON.stringify(adminData));
      return { success: true, userType: 'admin' };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const providerLogin = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/v1/provider/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider_email: email, provider_password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login as provider');
      }
      const { provider, tokens } = data;
      const providerData = { ...provider, tokens, role: 'provider' };
      setCurrentUser(providerData);
      localStorage.setItem('pawsiq_user', JSON.stringify(providerData));
      return { success: true, userType: 'provider' };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const providerRegister = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/provider/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }
      return await response.json();
    } catch (error) {
      console.error('Provider registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pawsiq_user');
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    providerLogin,
    adminLogin,
    providerRegister,
    logout,
    isProvider: () => currentUser?.role === 'provider',
    isUser: () => currentUser?.role === 'user',
    isAdmin: () => currentUser?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};