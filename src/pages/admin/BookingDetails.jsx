import { Link, useParams } from 'react-router-dom';

function BookingDetails() {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Details</h1>
      <p className="text-lg text-gray-600 mb-6">
        Viewing booking ID: {id} (Admin Only Route)
      </p>
      <Link 
        to="/admin/bookings" 
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
      >
        Back to Bookings
      </Link>
    </div>
  );
}

export default BookingDetails;
