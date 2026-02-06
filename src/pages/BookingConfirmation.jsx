import { Link } from 'react-router-dom';

function BookingConfirmation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your service booking has been successfully confirmed (Protected Route)
      </p>
      <div className="space-x-4">
        <Link 
          to="/profile" 
          className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
        >
          View My Bookings
        </Link>
        <Link 
          to="/" 
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmation;
