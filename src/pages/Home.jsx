import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Page</h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to AutoServe - Your trusted vehicle service platform
      </p>
      <Link 
        to="/services" 
        className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
      >
        View Services
      </Link>
    </div>
  );
}

export default Home;
