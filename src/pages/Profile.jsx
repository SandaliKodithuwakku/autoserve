import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyBookings } from '../api/bookingService';
import { User, Mail, Phone, Calendar, Clock, Car, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(data.bookings || data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingBookings = bookings.filter(
    booking => booking.status === 'Pending' || booking.status === 'Approved'
  );

  const pastBookings = bookings.filter(
    booking => booking.status === 'Completed' || booking.status === 'Cancelled'
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const BookingCard = ({ booking }) => {
    // Handle both populated and non-populated service references
    const service = booking.serviceType || booking.service || {};
    
    return (
    <div className="bg-white rounded-lg border-2 border-orange-400 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
            {service.icon ? (
              service.icon.startsWith('http') ? (
                <img src={service.icon} alt="" className="w-8 h-8" />
              ) : (
                <span className="text-2xl">{service.icon}</span>
              )
            ) : (
              <span className="text-2xl">🔧</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {service.name || 'Service'}
            </h3>
            <p className="text-xs text-gray-500">
              {service.duration || 'Duration varies'}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
          ✓ {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">DATE</p>
            <p className="font-medium">{formatDate(booking.date)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-xs text-gray-500">TIME</p>
            <p className="font-medium">{formatTime(booking.time)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-red-500" />
          <div>
            <p className="text-xs text-gray-500">VEHICLE</p>
            <p className="font-medium">{booking.vehicleNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-lg">💰</span>
          <div>
            <p className="text-xs text-gray-500">AMOUNT</p>
            <p className="font-medium">LKR {service.price?.toLocaleString() || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 justify-start">
        <Link
          to={`/booking-details/${booking._id}`}
          className="flex items-center gap-2 bg-orange-500 text-white py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </Link>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Info Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user?.name || 'User'}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-orange-100">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user?.email || 'user@example.com'}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {user?.contact || 'Contact not available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Bookings
              {upcomingBookings.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-orange-500 text-white rounded-full text-xs">
                  {upcomingBookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'past'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Bookings
              {pastBookings.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-gray-400 text-white rounded-full text-xs">
                  {pastBookings.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchBookings}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {activeTab === 'upcoming' ? 'Upcoming Bookings' : 'Past Bookings'}
              <span className="ml-2 text-gray-500 text-base font-normal">
                ({activeTab === 'upcoming' ? upcomingBookings.length : pastBookings.length})
              </span>
            </h2>

            {activeTab === 'upcoming' ? (
              upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-lg">
                  <p className="text-gray-600 mb-4">No upcoming bookings</p>
                  <Link
                    to="/services"
                    className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                  >
                    Book a Service
                  </Link>
                </div>
              )
            ) : (
              pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-lg">
                  <p className="text-gray-600">No past bookings</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
