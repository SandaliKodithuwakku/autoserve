import api from './config';

// Get all services (public)
export const getAllServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch services' };
  }
};

// Get service by ID (public)
export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch service' };
  }
};

// Create service (admin only)
export const createService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create service' };
  }
};

// Update service (admin only)
export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update service' };
  }
};

// Delete service (admin only)
export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete service' };
  }
};
