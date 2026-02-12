import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../api/authService';

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, formData.password);
      alert('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (60% width) */}
      <div 
        className="hidden lg:block lg:w-3/5"
        style={{ 
          backgroundImage: `url(https://res.cloudinary.com/ds8hmsirb/image/upload/v1770565642/Login_ozqr0w.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'white',
          minHeight: '100vh'
        }}
      >
      </div>

      {/* Right Side - Form (40% width) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif text-gray-800 mb-2">
              Reset your password
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Please enter your new password
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors"
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors"
              required
            />

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97316] text-white py-3 rounded-md hover:bg-[#ea580c] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center mt-6">
              <Link 
                to="/login" 
                className="text-sm text-[#F97316] hover:underline font-medium"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
