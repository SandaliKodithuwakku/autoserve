import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, updateBookingStatus } from '../../api/bookingService';
import { Calendar, Clock, Car, User, Phone, Eye, RefreshCw } from 'lucide-react';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data.bookings || data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdatingStatus(bookingId);
      await updateBookingStatus(bookingId, newStatus);
      
      // Update local state
      setBookings(bookings.map(booking =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      alert(`✅ Booking status updated to ${newStatus}`);
    } catch (err) {
      alert('❌ Failed to update status: ' + (err.message || 'Please try again'));
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(null);
    }
  };

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

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
            {booking.serviceType?.icon ? (
              booking.serviceType.icon.startsWith('http') ? (
                <img src={booking.serviceType.icon} alt="" className="w-8 h-8" />
              ) : (
                <span className="text-2xl">{booking.serviceType.icon}</span>
              )
            ) : (
              <span className="text-2xl">🔧</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {booking.serviceType?.name || 'Service'}
            </h3>
            <p className="text-xs text-gray-500">
              {booking.serviceType?.duration || 'Duration varies'}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">CUSTOMER</p>
            <p className="font-medium">{booking.customerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-xs text-gray-500">PHONE</p>
            <p className="font-medium">{booking.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-red-500" />
          <div>
            <p className="text-xs text-gray-500">VEHICLE</p>
            <p className="font-medium">{booking.vehicleNumber} - {booking.vehicleModel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-500" />
          <div>
            <p className="text-xs text-gray-500">DATE</p>
            <p className="font-medium">{formatDate(booking.date)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-500" />
          <div>
            <p className="text-xs text-gray-500">TIME</p>
            <p className="font-medium">{formatTime(booking.time)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-lg">💰</span>
          <div>
            <p className="text-xs text-gray-500">AMOUNT</p>
            <p className="font-medium">LKR {booking.serviceType?.price?.toLocaleString() || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Link
          to={`/admin/bookings/${booking._id}`}
          className="flex items-center gap-1 bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>

        {booking.status === 'Pending' && (
          <>
            <button
              onClick={() => handleStatusUpdate(booking._id, 'Approved')}
              disabled={updatingStatus === booking._id}
              className="flex items-center gap-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updatingStatus === booking._id ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                '✓'
              )}
              Approve
            </button>
            <button
              onClick={() => handleStatusUpdate(booking._id, 'Cancelled')}
              disabled={updatingStatus === booking._id}
              className="flex items-center gap-1 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updatingStatus === booking._id ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                '✕'
              )}
              Cancel
            </button>
          </>
        )}

        {booking.status === 'Approved' && (
          <button
            onClick={() => handleStatusUpdate(booking._id, 'Completed')}
            disabled={updatingStatus === booking._id}
            className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updatingStatus === booking._id ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              '✓'
            )}
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    approved: bookings.filter(b => b.status === 'Approved').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
            <p className="text-gray-600 mt-1">View and manage all customer bookings</p>
          </div>
          <Link
            to="/admin/dashboard"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <p className="text-yellow-700 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{statusCounts.pending}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="text-green-700 text-sm">Approved</p>
            <p className="text-2xl font-bold text-green-700">{statusCounts.approved}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="text-blue-700 text-sm">Completed</p>
            <p className="text-2xl font-bold text-blue-700">{statusCounts.completed}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <p className="text-red-700 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-red-700">{statusCounts.cancelled}</p>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchBookings}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                All Bookings ({bookings.length})
              </h2>
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-gray-600">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
