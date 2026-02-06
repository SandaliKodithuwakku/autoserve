import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

// Protected pages
import Profile from './pages/Profile';
import BookingForm from './pages/BookingForm';
import BookingConfirmation from './pages/BookingConfirmation';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminServices from './pages/admin/Services';
import AdminBookingDetails from './pages/admin/BookingDetails';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Protected routes - authentication required */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:serviceId"
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-confirmation"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />

            {/* Admin-only routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminBookingDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminServices />
                </ProtectedRoute>
              }
            />

            {/* 404 - Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
    </div>
  );
}

export default App
