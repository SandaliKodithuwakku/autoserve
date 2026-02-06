import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-[#F97316] mb-4">AutoServe</h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for professional vehicle servicing and maintenance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#F97316] transition-colors text-sm">
                  About Us
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

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>info@autoserve.com</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Service Street, Auto City, AC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#F97316] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#F97316] rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xl">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#F97316] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#F97316] rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xl">in</span>
              </a>
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
