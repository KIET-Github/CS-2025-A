import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';


import NavigationBar from './components/NavigationBar';
import UserType from './components/UserType';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';

import VehicleOwnerDashboard from './components/Dashboard/VehicleOwnerDashboard';
import ParkingOwnerDashboard from './components/Dashboard/ParkingOwnerDashboard';

import ParkingSpacesList from './components/Parking/ParkingSpacesList';
import BookParking from './components/Parking/BookParking';
import MyBookings from './components/Parking/MyBookings';
import AddParkingSpace from './components/Parking/AddParkingSpace';

import ParkingSpaceDetailsPage from './pages/ParkingSpaceDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ManageSlotsPage from './pages/ManageSlotsPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
// import ParkingOwnerBookingsPage from './pages/ParkingOwnerBookingsPage';
import ProfilePage from './components/Profile/ProfilePage';
import FloatingInfoButton from './components/Shared/FloatingInfoButton';
import AboutUs from './pages/AboutUs';
import ContactForm from './pages/ContactForm';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserType />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/parking-space/:id" element={<ParkingSpaceDetailsPage />} />
        <Route path="/checkout/:id/:slotNumber" element={<CheckoutPage />} />
        <Route path="/manage-spaces" element={<ManageSlotsPage />} />
        <Route path="/confirmation/:id/:slotNumber" element={<BookingConfirmationPage />} />
        {/* <Route path="/bookings" element={<ParkingOwnerBookingsPage/>} /> */}

        

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.user_type === 'parking_owner' ? <ParkingOwnerDashboard /> : <VehicleOwnerDashboard />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-parking/:id"
          element={
            <ProtectedRoute>
              <BookParking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-parking"
          element={
            <ProtectedRoute>
              <AddParkingSpace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <FloatingInfoButton />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
