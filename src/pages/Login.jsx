import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sign in to your account
      </p>
      <div className="space-x-4">
        <Link 
          to="/" 
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link 
          to="/register" 
          className="inline-block bg-[#F97316] text-white px-6 py-3 rounded hover:bg-[#ea580c] transition-colors"
        >
          Register Instead
        </Link>
      </div>
    </div>
  );
}

export default Login;
