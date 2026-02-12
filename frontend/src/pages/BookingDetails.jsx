import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookingById } from '../api/bookingService';
import { Calendar, Clock, Car, User, Mail, Phone, MapPin, ArrowLeft, FileText } from 'lucide-react';

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const data = await getBookingById(id);
      setBooking(data.booking || data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch booking details');
      console.error('Error fetching booking:', err);
    } finally {
      setLoading(false);
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
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'Unable to load booking details'}</p>
          <Link
            to="/profile"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  const service = booking.serviceType || booking.service || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">
                Booking ID: <span className="font-mono text-sm">{booking._id}</span>
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            Service Details
          </h2>
          <div className="flex items-start gap-4">
            {service.icon && (
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                {service.icon.startsWith('http') ? (
                  <img src={service.icon} alt="" className="w-10 h-10" />
                ) : (
                  <span className="text-3xl">{service.icon}</span>
                )}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {service.name || 'Service'}
              </h3>
              <p className="text-gray-600 mb-3">
                {service.description || 'No description available'}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">{service.duration || 'Duration varies'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-xl">💰</span>
                  <span className="text-lg font-bold text-orange-500">
                    LKR {service.price?.toLocaleString() || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-orange-500" />
            Appointment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Date</p>
              <p className="text-lg font-bold text-gray-900">{formatDate(booking.date)}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <p className="text-lg font-bold text-gray-900">{formatTime(booking.time)}</p>
            </div>
          </div>
        </div>

        {/* Vehicle & Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Vehicle Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="w-6 h-6 text-orange-500" />
              Vehicle Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Vehicle Number</p>
                <p className="text-lg font-semibold text-gray-900">{booking.vehicleNumber}</p>
              </div>
              {booking.vehicleModel && (
                <div>
                  <p className="text-sm text-gray-600">Vehicle Model</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.vehicleModel}</p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-orange-500" />
              Customer Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{booking.phone}</span>
              </div>
              {booking.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{booking.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {booking.additionalNotes && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-500" />
              Additional Notes
            </h2>
            <p className="text-gray-700">{booking.additionalNotes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap gap-3">
            {booking.status === 'Completed' && (
              <Link
                to="/services"
                className="flex-1 min-w-[200px] bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-center"
              >
                Book Again
              </Link>
            )}
            <Link
              to="/contact"
              className="flex-1 min-w-[200px] border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors font-semibold text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
