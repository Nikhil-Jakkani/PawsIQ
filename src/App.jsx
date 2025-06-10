import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import UserProfiles from './pages/users/UserProfiles.jsx';
import UserRoles from './pages/users/UserRoles.jsx';
import UserActivity from './pages/users/UserActivity.jsx';
import Providers from './pages/Providers.jsx';
import ProviderOnboarding from './pages/providers/ProviderOnboarding.jsx';
import ProviderVerification from './pages/providers/ProviderVerification.jsx';
import ProviderCommission from './pages/providers/ProviderCommission.jsx';
import ProviderPerformance from './pages/providers/ProviderPerformance.jsx';
import ProviderFlags from './pages/providers/ProviderFlags.jsx';
import Appointments from './pages/Appointments.jsx';
import Marketplace from './pages/Marketplace.jsx';
import Transactions from './pages/Transactions.jsx';
import ContentModeration from './pages/ContentModeration.jsx';
import Analytics from './pages/Analytics.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import Security from './pages/Security.jsx';
import Support from './pages/Support.jsx';
import PetProfiles from './pages/pets/PetProfiles.jsx';
import PetModeration from './pages/pets/PetModeration.jsx';
import PetLostReports from './pages/pets/PetLostReports.jsx';
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
    <div className="app-container w-full h-full">
      <Router>
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
            path="/users" 
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/profiles" 
            element={
              <ProtectedRoute>
                <UserProfiles />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/roles" 
            element={
              <ProtectedRoute>
                <UserRoles />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/activity" 
            element={
              <ProtectedRoute>
                <UserActivity />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers" 
            element={
              <ProtectedRoute>
                <Providers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers/onboarding" 
            element={
              <ProtectedRoute>
                <ProviderOnboarding />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers/verification" 
            element={
              <ProtectedRoute>
                <ProviderVerification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers/commission" 
            element={
              <ProtectedRoute>
                <ProviderCommission />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers/performance" 
            element={
              <ProtectedRoute>
                <ProviderPerformance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/providers/flags" 
            element={
              <ProtectedRoute>
                <ProviderFlags />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets/profiles" 
            element={
              <ProtectedRoute>
                <PetProfiles />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets/moderation" 
            element={
              <ProtectedRoute>
                <PetModeration />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets/lost" 
            element={
              <ProtectedRoute>
                <PetLostReports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/appointments" 
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace" 
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/content" 
            element={
              <ProtectedRoute>
                <ContentModeration />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/security" 
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <Support />
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
