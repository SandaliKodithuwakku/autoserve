import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../api/serviceService';
import { createBooking } from '../api/bookingService';
import { User, Phone, Mail, Car, Calendar, Clock } from 'lucide-react';

function BookingForm() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    vehicleNumber: '',
    vehicleModel: '',
    preferredDate: '',
    preferredTime: ''
  });

  // Check completion status for each step
  const isStep1Complete = formData.fullName && formData.phoneNumber && formData.email;
  const isStep2Complete = formData.vehicleNumber && formData.vehicleModel;
  const isStep3Complete = formData.preferredDate && formData.preferredTime;
  const isStep4Complete = isStep1Complete && isStep2Complete && isStep3Complete;

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(serviceId);
        setService(data.service || data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load service');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const bookingData = {
        customerName: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        vehicleNumber: formData.vehicleNumber,
        vehicleModel: formData.vehicleModel,
        serviceType: serviceId,
        date: formData.preferredDate,
        time: formData.preferredTime
      };

      const response = await createBooking(bookingData);
      
      // Navigate to confirmation page on success
      navigate('/booking-confirmation', { 
        state: { 
          booking: response.booking || response,
          service: service 
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
      alert('❌ ' + (err.message || 'Failed to create booking. Please try again.'));
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Service not found'}</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Book your service</h1>
          <p className="text-orange-100 text-center text-sm md:text-base">
            Fill in the form below and we'll send you a confirmation email along with your appointment details
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                isStep1Complete ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:inline transition-colors ${
                isStep1Complete ? 'text-gray-900' : 'text-gray-500'
              }`}>Personal Info</span>
              <div className={`flex-1 h-1 mx-2 transition-colors ${
                isStep1Complete ? 'bg-orange-500' : 'bg-gray-200'
              }`}></div>
            </div>
            
            <div className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                isStep2Complete ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:inline transition-colors ${
                isStep2Complete ? 'text-gray-900' : 'text-gray-500'
              }`}>Vehicle Info</span>
              <div className={`flex-1 h-1 mx-2 transition-colors ${
                isStep2Complete ? 'bg-orange-500' : 'bg-gray-200'
              }`}></div>
            </div>
            
            <div className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                isStep3Complete ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:inline transition-colors ${
                isStep3Complete ? 'text-gray-900' : 'text-gray-500'
              }`}>Schedule</span>
              <div className={`flex-1 h-1 mx-2 transition-colors ${
                isStep3Complete ? 'bg-orange-500' : 'bg-gray-200'
              }`}></div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                isStep4Complete ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                4
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:inline transition-colors ${
                isStep4Complete ? 'text-gray-900' : 'text-gray-500'
              }`}>Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-orange-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Ex: John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="+94 XX XXX XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Ex: johndoe@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Car className="w-5 h-5 text-orange-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Vehicle Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      required
                      placeholder="Ex: CAR-1234"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Toyota Prius"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Selected Service */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Selected Service</h2>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="text-orange-500 text-sm hover:text-orange-600"
                  >
                    Change Service
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center">
                    {service.icon && (
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                        {service.icon.startsWith('http') ? (
                          <img src={service.icon} alt={service.name} className="w-8 h-8" />
                        ) : (
                          <span className="text-2xl">{service.icon}</span>
                        )}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.duration || 'Duration varies'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      LKR {service.price?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule Appointment */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Schedule Appointment</h2>
                </div>
                <p className="text-sm text-blue-600 mb-4">
                  📌 We're open Monday to Saturday, 8:00 AM - 6:00 PM. Please select your preferred date and time slot.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

          {/* Booking Summary */}
          <div className="bg-orange-50 rounded-lg border-2 border-orange-400 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600">Service :</p>
                <p className="font-medium text-gray-900">{service.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Estimated Duration :</p>
                <p className="font-medium text-gray-900">{service.duration || 'Varies'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Starting Price :</p>
                <p className="font-medium text-gray-900">LKR {service.price?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">LKR {service.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-orange-600">
                <span>Total</span>
                <span>LKR {service.price?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate('/services')}
              disabled={submitting}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
