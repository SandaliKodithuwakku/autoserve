import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist
      </p>
      <Link 
        to="/" 
        className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
