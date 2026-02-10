import { Calendar, Shield, Zap, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';

function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `url('${getCloudinaryUrl('v1770741349/About_umc7yl.png')}')`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* AutoServe Title and Description */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">AutoServe</h1>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          We're transforming vehicle service booking by making it simple, transparent, and accessible to everyone. Our mission is to eliminate the hassle of finding and booking quality vehicle services.
        </p>

        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          {/* Our Mission */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-left">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide a seamless, transparent, and convenient platform for vehicle owners to book professional service appointments. We aim to connect customers with trusted service professionals while maintaining the highest standards of quality and reliability.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-left">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted and user-friendly vehicle service booking platform globally. We envision a future where vehicle maintenance is effortless, transparent, and accessible to everyone, reducing downtime and ensuring vehicle longevity.
            </p>
          </div>
        </div>

        {/* Why Choose AutoServe Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AutoServe?</h2>
          <p className="text-gray-600 text-lg mb-12">
            Discover what sets us apart from traditional booking methods
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Easy Scheduling */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book your vehicle service in just a few clicks using our intuitive online platform.
              </p>
            </div>

            {/* Secure & Reliable */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and encrypted transactions.
              </p>
            </div>

            {/* Fast Processing */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Processing</h3>
              <p className="text-gray-600">
                Get instant booking confirmations and real-time status updates on your service requests.
              </p>
            </div>

            {/* Professional Team */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Team</h3>
              <p className="text-gray-600">
                Verified and experienced service professionals ready to handle all your vehicle needs.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">
                Clear, competitive rates with no hidden charges. Know exactly what you'll pay upfront.
              </p>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every service is completed to the highest standards with comprehensive quality checks.
              </p>
            </div>
          </div>
        </div>

        {/* By The Numbers Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">By The Numbers</h2>
          <p className="text-gray-600 text-lg mb-12">
            Our growing impact in the vehicle service industry
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-700 font-medium">Happy Customers</div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-gray-700 font-medium">Service professionals</div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-gray-700 font-medium">Bookings Completed</div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-700 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
          <p className="text-gray-600 text-lg mb-8">
            Our skilled and dedicated professionals ready to serve you
          </p>

          <div className="max-w-5xl mx-auto">
            <img 
              src={getCloudinaryUrl('v1770742120/staff_jcd2dd.jpg')}
              alt="AutoServe Team"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to book your service?
          </h2>
          <p className="text-white text-lg mb-8">
            Join thousands of satisfied customers who trust AutoServe for their vehicle maintenance needs
          </p>
          <Link 
            to="/services"
            className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book your first service
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
