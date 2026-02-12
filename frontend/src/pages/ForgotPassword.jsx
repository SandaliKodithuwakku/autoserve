import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/authService';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setEmailSent(true);
    } catch (error) {
      setError(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
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
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-serif text-gray-800 mb-2">
                  Forgot your password ?
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                  Enter your registered email address and we'll send you a link to reset your password
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors"
                  required
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F97316] text-white py-3 rounded-md hover:bg-[#ea580c] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Request password reset'}
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
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-6">
                {/* Email Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-10 h-10 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-serif text-gray-800 mb-2">
                    Check your email
                  </h1>
                  <p className="text-gray-600 text-sm">
                    We've sent a password reset link to
                  </p>
                  <p className="text-[#F97316] font-medium mt-1">
                    {email}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setEmailSent(false)}
                    className="w-full bg-white border-2 border-[#F97316] text-[#F97316] py-3 rounded-md hover:bg-[#F97316] hover:text-white transition-colors font-medium"
                  >
                    Try another email address
                  </button>

                  <div className="text-center pt-4">
                    <Link 
                      to="/login" 
                      className="text-sm text-[#F97316] hover:underline font-medium"
                    >
                      ← Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
