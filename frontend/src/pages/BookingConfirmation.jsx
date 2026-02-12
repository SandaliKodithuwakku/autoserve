import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, User, Phone, Car, Calendar, Clock, FileText, MessageCircle, Home } from 'lucide-react';

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { booking, service } = location.state || {};

  // Redirect if no booking data
  if (!booking || !service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">No booking information found.</p>
        <Link 
          to="/services" 
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Booking Submitted Successfully!
          </h1>
          <p className="text-gray-600">
            Your service request has been received. We'll review it and get back to you shortly.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
              Pending Confirmation
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              ⏳ PENDING APPROVAL
            </span>
          </div>

          {/* Service Details */}
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                  {service.icon && (service.icon.startsWith('http') || service.icon.startsWith('https')) ? (
                    <img src={service.icon} alt={service.name} className="w-8 h-8" />
                  ) : (
                    <span className="text-2xl">{service.icon || '🔧'}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">⏱️ {service.duration || 'Duration varies'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">💰 Starting from</p>
                <p className="font-bold text-orange-600">LKR {service.price?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Customer and Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">CUSTOMER NAME</p>
                <p className="font-medium text-gray-900">{booking.customerName}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">PHONE NUMBER</p>
                <p className="font-medium text-gray-900">{booking.phone}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Car className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">VEHICLE NUMBER</p>
                <p className="font-medium text-gray-900">{booking.vehicleNumber}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Car className="w-5 h-5 text-purple-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">VEHICLE MODEL</p>
                <p className="font-medium text-gray-900">{booking.vehicleModel}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-orange-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">SERVICE DATE</p>
                <p className="font-medium text-gray-900">{formatDate(booking.date)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-xs text-gray-500">TIME SLOT</p>
                <p className="font-medium text-gray-900">{formatTime(booking.time)}</p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-3">✓ What Happens Next ?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Our team will review your booking within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>We'll send a confirmation call/email upon approval</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>If approved, we may contact you for additional information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Track your booking status in My Bookings</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Save your booking ID for future reference</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Download Receipt
          </button>
          
          <Link
            to="/contact"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-lg font-medium hover:bg-orange-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Service Center
          </Link>
          
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
