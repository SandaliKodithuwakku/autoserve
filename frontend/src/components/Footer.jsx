import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#2D3748] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:pr-8">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-10 h-10 text-[#F97316]">
                <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
              </svg>
              <span className="ml-2 text-xl font-bold">AutoServe</span>
            </div>
            <p className="text-[#F97316] text-sm font-medium mb-3">
              Your Trusted Vehicle Service Partner
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience hassle-free vehicle servicing and maintenance. Book appointment online and keep your vehicle in top condition with our expert care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Link</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Oil Change</li>
              <li className="text-gray-300 text-sm">Battery Service</li>
              <li className="text-gray-300 text-sm">Brake Repair</li>
              <li className="text-gray-300 text-sm">Engine Diagnostic</li>
              <li className="text-gray-300 text-sm">Suspension Service</li>
              <li className="text-gray-300 text-sm">General Maintenance</li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-4">
              <li>
                <p className="font-medium text-white mb-1">Call Us:</p>
                <p>+94 (11) 234 5678</p>
              </li>
              <li>
                <p className="font-medium text-white mb-1">Email:</p>
                <p>info@autoserve.lk</p>
              </li>
              <li>
                <p className="font-medium text-white mb-1">Address:</p>
                <p>123 Galle Road,</p>
                <p>Colombo 03, Sri Lanka</p>
              </li>
              <li>
                <p className="font-medium text-white mb-1">Business Hours:</p>
                <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </li>
            </ul>
            
            {/* Email Subscription */}
            <div>
              <p className="font-medium text-white mb-2 text-sm">Stay connected</p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email here"
                  className="flex-1 px-3 py-2 text-sm bg-white text-gray-900 rounded-l-md focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F97316] text-white text-sm font-medium rounded-r-md hover:bg-[#ea580c] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 AutoServe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
