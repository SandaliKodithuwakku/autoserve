import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: `url('${getCloudinaryUrl('v1770898869/home_main_mwucif.avif')}')`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Vehicle Deserves the{' '}
              <span className="text-orange-500">Best Care</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Professional vehicle servicing made easy. Book online, track your service, 
              and keep your vehicle running smoothly with Sri Lanka's most trusted auto service platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                View Our Services
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Learn More About US
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose AutoServe Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AutoServe?
          </h2>
          <p className="text-gray-600 text-lg">
            Discover what sets us apart from traditional booking methods
          </p>
        </div>

        <div className="bg-black py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left Column - 3 Features */}
              <div className="space-y-12">
                {/* Easy Scheduling */}
                <div className="text-white text-left">
                  <h3 className="text-xl font-bold mb-2">Easy Scheduling</h3>
                  <p className="text-gray-300 text-sm">
                    Book your vehicle service in just a few clicks with our intuitive online platform.
                  </p>
                </div>

                {/* Fast Processing */}
                <div className="text-white text-left">
                  <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
                  <p className="text-gray-300 text-sm">
                    Get instant booking confirmations and real-time status updates on your service requests.
                  </p>
                </div>

                {/* Transparent Pricing */}
                <div className="text-white text-left">
                  <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-300 text-sm">
                    Clear, competitive rates with no hidden charges. Know exactly what you'll pay upfront.
                  </p>
                </div>
              </div>

              {/* Center - Car Image */}
              <div className="flex justify-center items-center">
                <img 
                  src={getCloudinaryUrl('v1770899629/home_2_xvaugz.jpg')}
                  alt="Red sports car top view"
                  className="w-full max-w-md md:max-w-xl object-contain"
                />
              </div>

              {/* Right Column - 3 Features */}
              <div className="space-y-12">
                {/* Secure & Reliable */}
                <div className="text-white text-right">
                  <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                  <p className="text-gray-300 text-sm">
                    Your data is protected with enterprise-grade security and encrypted transactions.
                  </p>
                </div>

                {/* Professional Team */}
                <div className="text-white text-right">
                  <h3 className="text-xl font-bold mb-2">Professional Team</h3>
                  <p className="text-gray-300 text-sm">
                    Verified and experienced service professionals ready to handle all your vehicle needs.
                  </p>
                </div>

                {/* Quality Assurance */}
                <div className="text-white text-right">
                  <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                  <p className="text-gray-300 text-sm">
                    Every service is completed to the highest standards with comprehensive quality checks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works ?
            </h2>
            <p className="text-gray-600 text-lg">
              Get your vehicle serviced in just four simple steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Service</h3>
              <p className="text-gray-600 text-sm">
                Browse our services and select what your vehicle needs
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Online</h3>
              <p className="text-gray-600 text-sm">
                Pick your preferred date and time, fill in the details
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Confirmed</h3>
              <p className="text-gray-600 text-sm">
                We'll review and confirm your booking within 24 hours
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Service Done</h3>
              <p className="text-gray-600 text-sm">
                Bring your vehicle on the scheduled day, we'll handle the rest
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to book your service ?
          </h2>
          <p className="text-white text-lg mb-8">
            Join thousands of satisfied customers who trust AutoServe for their vehicle maintenance needs
          </p>
          <Link
            to="/services"
            className="inline-block px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book your first service
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
