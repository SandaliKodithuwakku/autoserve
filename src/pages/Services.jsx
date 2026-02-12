import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices } from '../api/serviceService';
import { getCloudinaryUrl } from '../utils/cloudinary';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getAllServices();
        setServices(data.services || data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div 
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `url('${getCloudinaryUrl('v1770886807/services_hero_qd4vww.jpg')}')`,
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Title and Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
          Professional Vehicle Services
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Expert care for your vehicle with quality service guaranteed
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Link 
              to="/" 
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">No services available at the moment.</p>
            <Link 
              to="/" 
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service._id} 
                className="bg-white rounded-lg border-2 border-orange-500 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Service Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                    {service.icon && (service.icon.startsWith('http') || service.icon.startsWith('https')) ? (
                      <img 
                        src={service.icon} 
                        alt={service.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Service'; }}
                      />
                    ) : (
                      <span className="text-4xl">{service.icon || '🔧'}</span>
                    )}
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Duration */}
                  <div className="mb-2">
                    <span className="text-gray-700 text-sm">
                      <span className="font-semibold">Duration : </span>
                      <span className="ml-16">{service.duration || 'Varies'}</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-gray-700 text-sm">
                      <span className="font-semibold">Price : </span>
                      <span className="ml-20 text-orange-500 font-semibold">
                        Starting from LKR {service.price?.toLocaleString() || 'N/A'}
                      </span>
                    </span>
                  </div>

                  {/* Divider */}
                  <hr className="border-orange-500 mb-4" />

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-700 text-sm">
                          <span className="mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Book Service Button */}
                  <Link
                    to={`/booking/${service._id}`}
                    className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
