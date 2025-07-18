import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const DebugInfo = () => {
  const { currentUser, loading, error } = useAuth();
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <div><strong>Debug Info:</strong></div>
      <div>Current Path: {location.pathname}</div>
      <div>Auth Loading: {loading ? 'true' : 'false'}</div>
      <div>Current User: {currentUser ? currentUser.email : 'null'}</div>
      <div>Auth Error: {error || 'none'}</div>
      <div>Loading Element: {document.getElementById('loading') ? 'exists' : 'missing'}</div>
      <div>Loading Display: {document.getElementById('loading')?.style.display || 'unknown'}</div>
    </div>
  );
};

export default DebugInfo;