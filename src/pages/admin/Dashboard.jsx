import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllBookings, updateBookingStatus, deleteBooking } from '../../api/bookingService';
import { getAllServices, createService, updateService, deleteService } from '../../api/serviceService';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    icon: '',
    features: []
  });
  const [featureInput, setFeatureInput] = useState('');

  // Statistics
  const stats = {
    totalBookings: bookings.length,
    pendingApprovals: bookings.filter(b => b.status === 'Pending').length,
    completedServices: bookings.filter(b => b.status === 'Completed').length,
    rejected: bookings.filter(b => b.status === 'Cancelled').length
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsData, servicesData] = await Promise.all([
        getAllBookings(),
        getAllServices()
      ]);
      
      console.log('Bookings API Response:', bookingsData);
      console.log('Services API Response:', servicesData);
      
      setBookings(bookingsData.bookings || bookingsData);
      setServices(servicesData.services || servicesData);
      
      console.log('Bookings State:', bookingsData.bookings || bookingsData);
      console.log('Services State:', servicesData.services || servicesData);
      
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error fetching data:', err);
      console.error('Error details:', err.response);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      alert(err.message || 'Failed to update booking status');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      alert(err.message || 'Failed to delete booking');
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await updateService(editingService._id, serviceFormData);
        setServices(services.map(service => 
          service._id === editingService._id ? { ...service, ...serviceFormData } : service
        ));
      } else {
        const newService = await createService(serviceFormData);
        setServices([...services, newService.service || newService]);
      }
      
      setShowServiceModal(false);
      setEditingService(null);
      setServiceFormData({ name: '', description: '', price: '', duration: '', icon: '', features: [] });
      setFeatureInput('');
    } catch (err) {
      alert(err.message || 'Failed to save service');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      icon: service.icon || '',
      features: service.features || []
    });
    setFeatureInput('');
    setShowServiceModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await deleteService(serviceId);
      setServices(services.filter(service => service._id !== serviceId));
    } catch (err) {
      alert(err.message || 'Failed to delete service');
    }
  };

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': 
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/ds8hmsirb/image/upload/v1770658286/logo_3_aazr6c.png" 
                alt="AutoServe Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">AutoServe Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border-2 border-[#F97316] text-[#F97316] rounded-lg hover:bg-[#F97316] hover:text-white transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-[#F97316] text-white py-6 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-orange-100 text-sm mt-1">Manage bookings and services efficiently</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Bookings</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Pending Approvals</div>
            <div className="text-3xl font-bold text-gray-900">{stats.pendingApprovals}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Completed Services</div>
            <div className="text-3xl font-bold text-gray-900">{stats.completedServices}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Cancelled</div>
            <div className="text-3xl font-bold text-gray-900">{stats.rejected}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'bookings'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'services'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Services
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-4 py-2 rounded ${filterStatus === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus('pending')}
                      className={`px-4 py-2 rounded ${filterStatus === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setFilterStatus('approved')}
                      className={`px-4 py-2 rounded ${filterStatus === 'approved' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => setFilterStatus('completed')}
                      className={`px-4 py-2 rounded ${filterStatus === 'completed' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setFilterStatus('cancelled')}
                      className={`px-4 py-2 rounded ${filterStatus === 'cancelled' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle No</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Service Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                            No bookings found
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((booking) => (
                          <tr key={booking._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.customerName || booking.customer?.fullName || booking.customer?.username || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{booking.vehicleNumber || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{booking.vehicleModel || booking.vehicleType || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.serviceType?.name || booking.service?.name || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.date ? new Date(booking.date).toLocaleDateString() : booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString() : 'N/A'}
                              {' '}
                              {booking.time || booking.preferredTime || ''}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1 mr-2"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Service Categories</h2>
                  <button
                    onClick={() => {
                      setEditingService(null);
                      setServiceFormData({ name: '', description: '', price: '', duration: '', icon: '', features: [] });
                      setFeatureInput('');
                      setShowServiceModal(true);
                    }}
                    className="bg-[#F97316] text-white px-6 py-2 rounded-lg hover:bg-[#ea580c] transition-colors font-semibold"
                  >
                    Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services && services.length > 0 ? services.map((service) => (
                    <div key={service._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex items-center justify-between mb-4 pb-4 border-b">
                        <span className="text-sm text-gray-600">{service.duration}</span>
                        <span className="text-lg font-bold text-orange-500">Rs. {service.price?.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      No services available. Click "Add Service" to create one.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleServiceSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  required
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rs.)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={serviceFormData.price}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 30-45 mins, 1 hour"
                  value={serviceFormData.duration}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Image URL or Emoji)</label>
                <input
                  type="text"
                  required
                  placeholder="https://example.com/icon.png or 🚗"
                  value={serviceFormData.icon}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">Enter an image URL or emoji to represent this service</p>
                {serviceFormData.icon && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-600">Preview:</span>
                    {serviceFormData.icon.startsWith('http') ? (
                      <img src={serviceFormData.icon} alt="Icon preview" className="w-12 h-12 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Invalid'; }} />
                    ) : (
                      <span className="text-4xl">{serviceFormData.icon}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a feature (e.g., Premium oil options)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (featureInput.trim()) {
                          setServiceFormData({ 
                            ...serviceFormData, 
                            features: [...serviceFormData.features, featureInput.trim()] 
                          });
                          setFeatureInput('');
                        }
                      }
                    }}
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (featureInput.trim()) {
                        setServiceFormData({ 
                          ...serviceFormData, 
                          features: [...serviceFormData.features, featureInput.trim()] 
                        });
                        setFeatureInput('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1">
                  {serviceFormData.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm">• {feature}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setServiceFormData({
                            ...serviceFormData,
                            features: serviceFormData.features.filter((_, i) => i !== index)
                          });
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                {serviceFormData.features.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No features added yet. Press Enter or click Add to add features.</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowServiceModal(false);
                    setEditingService(null);
                    setServiceFormData({ name: '', description: '', price: '', duration: '', icon: '', features: [] });
                    setFeatureInput('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#F97316] text-white px-4 py-2 rounded hover:bg-[#ea580c] transition-colors"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
