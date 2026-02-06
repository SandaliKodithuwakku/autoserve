import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">
        Admin overview and statistics (Admin Only Route)
      </p>
      <div className="space-x-4">
        <Link 
          to="/admin/bookings" 
          className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
        >
          View Bookings
        </Link>
        <Link 
          to="/admin/services" 
          className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
        >
          Manage Services
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
