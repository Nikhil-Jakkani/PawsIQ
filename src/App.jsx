import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserLogin from './pages/user/UserLogin.jsx';
import UserDashboard from './pages/user/UserDashboard.jsx';
import UserPets from './pages/user/UserPets.jsx';
import UserAddPet from './pages/user/UserAddPet.jsx';
import UserAppointments from './pages/user/UserAppointments.jsx';
import UserBookAppointment from './pages/user/UserBookAppointment.jsx';
import UserServices from './pages/user/UserServices.jsx';
import UserMarketplace from './pages/user/UserMarketplace.jsx';
import UserOrders from './pages/user/UserOrders.jsx';
import UserSettings from './pages/user/UserSettings.jsx';
import UserNotifications from './pages/user/UserNotifications.jsx';
import UserHelp from './pages/user/UserHelp.jsx';
import UserCommunity from './pages/user/UserCommunity.jsx';
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
import UserMetrics from './pages/analytics/UserMetrics.jsx';
import ServiceMetrics from './pages/analytics/ServiceMetrics.jsx';
import RevenueMetrics from './pages/analytics/RevenueMetrics.jsx';
import PerformanceDashboard from './pages/analytics/PerformanceDashboard.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import Security from './pages/Security.jsx';
import Support from './pages/Support.jsx';
import PetProfiles from './pages/pets/PetProfiles.jsx';
import PetModeration from './pages/pets/PetModeration.jsx';
import PetLostReports from './pages/pets/PetLostReports.jsx';
import BookingOverview from './pages/appointments/BookingOverview.jsx';
import AppointmentScheduler from './pages/appointments/AppointmentScheduler.jsx';
import DisputeResolution from './pages/appointments/DisputeResolution.jsx';
import PaymentManagement from './pages/transactions/PaymentManagement.jsx';
import FinancialReports from './pages/transactions/FinancialReports.jsx';
import ProductManagement from './pages/marketplace/ProductManagement.jsx';
import SellerManagement from './pages/marketplace/SellerManagement.jsx';
// Support pages
import TicketManagement from './pages/support/TicketManagement.jsx';
import LiveChat from './pages/support/LiveChat.jsx';
import KnowledgeBase from './pages/support/KnowledgeBase.jsx';
import SupportDisputeResolution from './pages/support/DisputeResolution.jsx';
import TicketAssignment from './pages/support/TicketAssignment.jsx';
import { useAuth } from './context/AuthContext';
import './App.css'; 

// Protected route component for admin
const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  if (currentUser.role !== 'admin') {
    return <Navigate to="/user/login" replace />;
  }
  
  return children;
};

// Protected route component for users
const UserProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/user/login" replace />;
  }
  
  return children;
};

function App() {
  const { currentUser } = useAuth();
  
  return (
    <div className="app-container w-full h-full">
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={currentUser ? 
            (currentUser.role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/user/dashboard" />) 
            : <Login />} />
          <Route path="/login" element={currentUser ? 
            (currentUser.role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/user/dashboard" />) 
            : <Login />} />
          <Route path="/signin" element={currentUser ? 
            (currentUser.role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/user/dashboard" />) 
            : <Login />} />
          <Route 
            path="/dashboard" 
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } 
          />
          
          {/* User Routes */}
          <Route path="/user/login" element={currentUser ? 
            (currentUser.role === 'user' ? <Navigate to="/user/dashboard" /> : <Navigate to="/dashboard" />) 
            : <UserLogin />} />
          <Route 
            path="/user/dashboard" 
            element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/pets" 
            element={
              <UserProtectedRoute>
                <UserPets />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/pets/add" 
            element={
              <UserProtectedRoute>
                <UserAddPet />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/appointments" 
            element={
              <UserProtectedRoute>
                <UserAppointments />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/appointments/new" 
            element={
              <UserProtectedRoute>
                <UserBookAppointment />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/services" 
            element={
              <UserProtectedRoute>
                <UserServices />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/marketplace" 
            element={
              <UserProtectedRoute>
                <UserMarketplace />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/orders" 
            element={
              <UserProtectedRoute>
                <UserOrders />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/settings" 
            element={
              <UserProtectedRoute>
                <UserSettings />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/notifications" 
            element={
              <UserProtectedRoute>
                <UserNotifications />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/help" 
            element={
              <UserProtectedRoute>
                <UserHelp />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/user/community" 
            element={
              <UserProtectedRoute>
                <UserCommunity />
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <AdminProtectedRoute>
                <Users />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/users/profiles" 
            element={
              <AdminProtectedRoute>
                <UserProfiles />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/users/roles" 
            element={
              <AdminProtectedRoute>
                <UserRoles />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/users/activity" 
            element={
              <AdminProtectedRoute>
                <UserActivity />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers" 
            element={
              <AdminProtectedRoute>
                <Providers />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers/onboarding" 
            element={
              <AdminProtectedRoute>
                <ProviderOnboarding />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers/verification" 
            element={
              <AdminProtectedRoute>
                <ProviderVerification />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers/commission" 
            element={
              <AdminProtectedRoute>
                <ProviderCommission />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers/performance" 
            element={
              <AdminProtectedRoute>
                <ProviderPerformance />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/providers/flags" 
            element={
              <AdminProtectedRoute>
                <ProviderFlags />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/pets" 
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/pets/profiles" 
            element={
              <AdminProtectedRoute>
                <PetProfiles />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/pets/moderation" 
            element={
              <AdminProtectedRoute>
                <PetModeration />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/pets/lost" 
            element={
              <AdminProtectedRoute>
                <PetLostReports />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/appointments" 
            element={
              <AdminProtectedRoute>
                <Appointments />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/appointments/overview" 
            element={
              <AdminProtectedRoute>
                <BookingOverview />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/appointments/scheduler" 
            element={
              <AdminProtectedRoute>
                <AppointmentScheduler />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/appointments/disputes" 
            element={
              <AdminProtectedRoute>
                <DisputeResolution />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace" 
            element={
              <AdminProtectedRoute>
                <Marketplace />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace/products" 
            element={
              <AdminProtectedRoute>
                <ProductManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace/sellers" 
            element={
              <AdminProtectedRoute>
                <SellerManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <AdminProtectedRoute>
                <Transactions />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/payments" 
            element={
              <AdminProtectedRoute>
                <PaymentManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/reports" 
            element={
              <AdminProtectedRoute>
                <FinancialReports />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/content" 
            element={
              <AdminProtectedRoute>
                <ContentModeration />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AdminProtectedRoute>
                <Analytics />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/analytics/users" 
            element={
              <AdminProtectedRoute>
                <UserMetrics />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/analytics/services" 
            element={
              <AdminProtectedRoute>
                <ServiceMetrics />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/analytics/revenue" 
            element={
              <AdminProtectedRoute>
                <RevenueMetrics />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/analytics/performance" 
            element={
              <AdminProtectedRoute>
                <PerformanceDashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <AdminProtectedRoute>
                <Notifications />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <AdminProtectedRoute>
                <Settings />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/security" 
            element={
              <AdminProtectedRoute>
                <Security />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support" 
            element={
              <AdminProtectedRoute>
                <Support />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support/tickets" 
            element={
              <AdminProtectedRoute>
                <TicketManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support/chat" 
            element={
              <AdminProtectedRoute>
                <LiveChat />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support/knowledge" 
            element={
              <AdminProtectedRoute>
                <KnowledgeBase />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support/disputes" 
            element={
              <AdminProtectedRoute>
                <SupportDisputeResolution />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/support/assignment" 
            element={
              <AdminProtectedRoute>
                <TicketAssignment />
              </AdminProtectedRoute>
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
