import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useAuth } from './context/AuthContext';
import './App.css'; 

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Loading PawsIQ Admin Dashboard...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  console.log("App.jsx: rendering App with routes");
  const { currentUser, logout } = useAuth();
  
  return (
    <div className="app-container">
      <Router>
        <nav style={{ padding: '10px', background: '#eee' }}>
          {!currentUser ? (
            <Link to="/">Login</Link>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link> |{' '}
              <button 
                onClick={logout}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signin" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-indigo-100">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-2xl font-bold text-indigo-700 mb-4">
                    Page Not Found
                  </h1>
                  <p className="text-gray-600">
                    The page you're looking for doesn't exist.
                  </p>
                  <a href="/" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded">
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
