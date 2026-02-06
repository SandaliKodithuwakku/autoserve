import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
      <p className="text-lg text-gray-600 mb-6">
        View your profile and booking history (Protected Route)
      </p>
      <Link 
        to="/" 
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Profile;
