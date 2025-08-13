import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refreshTimeout = useRef(null);
  const API_URL = import.meta?.env?.VITE_API_URL || '/api/v1';

  const clearRefreshTimeout = () => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
      refreshTimeout.current = null;
    }
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const scheduleAccessTokenRefresh = (accessToken) => {
    const payload = decodeJwt(accessToken);
    if (!payload?.exp) return;
    const nowSec = Math.floor(Date.now() / 1000);
    const leadSec = 60; // refresh 60s before expiry
    const delayMs = Math.max(payload.exp - nowSec - leadSec, 0) * 1000;
    clearRefreshTimeout();
    refreshTimeout.current = setTimeout(() => {
      refreshTokens();
    }, delayMs);
  };

  const refreshTokens = async () => {
    try {
      const latestUser = JSON.parse(localStorage.getItem('pawsiq_user'));
      const refreshToken = latestUser?.tokens?.refresh?.token;
      if (!refreshToken) return false;
      const resp = await fetch(`${API_URL}/user/auth/refresh-tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!resp.ok) return false;
      const newTokens = await resp.json();
      const updatedUser = { ...latestUser, tokens: newTokens };
      localStorage.setItem('pawsiq_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      const accessToken = newTokens?.access?.token;
      if (accessToken) scheduleAccessTokenRefresh(accessToken);
      return true;
    } catch (e) {
      console.warn('Silent token refresh failed', e);
      return false;
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('pawsiq_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        const accessToken = parsed?.tokens?.access?.token;
        if (accessToken) {
          // schedule proactive refresh
          scheduleAccessTokenRefresh(accessToken);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('pawsiq_user');
    } finally {
      setLoading(false);
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        // On tab focus, attempt a silent refresh if possible
        const stored = JSON.parse(localStorage.getItem('pawsiq_user') || 'null');
        const token = stored?.tokens?.access?.token;
        const payload = token ? decodeJwt(token) : null;
        const nowSec = Math.floor(Date.now() / 1000);
        if (!payload?.exp || payload.exp <= nowSec + 60) {
          refreshTokens();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearRefreshTimeout();
    };
  }, []);

  const login = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/auth/login`, {
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
      if (tokens?.access?.token) scheduleAccessTokenRefresh(tokens.access.token);
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
      const response = await fetch(`${API_URL}/admin/auth/login`, {
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
      const response = await fetch(`${API_URL}/provider/auth/login`, {
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
      if (tokens?.access?.token) scheduleAccessTokenRefresh(tokens.access.token);
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