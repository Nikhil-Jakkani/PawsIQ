import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import AdminLayout from './components/layout/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Providers from './pages/Providers';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="providers" element={<Providers />} />
            
            {/* Placeholder routes for other sections */}
            <Route path="appointments" element={<div className="p-4">Appointments & Bookings Module (Coming Soon)</div>} />
            <Route path="marketplace" element={<div className="p-4">Marketplace Module (Coming Soon)</div>} />
            <Route path="transactions" element={<div className="p-4">Transactions & Payments Module (Coming Soon)</div>} />
            <Route path="content" element={<div className="p-4">Content Moderation Module (Coming Soon)</div>} />
            <Route path="analytics" element={<div className="p-4">Analytics Module (Coming Soon)</div>} />
            <Route path="notifications" element={<div className="p-4">Notifications Module (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-4">Settings Module (Coming Soon)</div>} />
            <Route path="security" element={<div className="p-4">Security & Logs Module (Coming Soon)</div>} />
            <Route path="support" element={<div className="p-4">Support & Tickets Module (Coming Soon)</div>} />
          </Route>
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
