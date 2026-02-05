import api from './config';

// Create booking (customer auth required)
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create booking' };
  }
};

// Get my bookings (customer auth required)
export const getMyBookings = async () => {
  try {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch your bookings' };
  }
};

// Get all bookings (admin only)
export const getAllBookings = async () => {
  try {
    const response = await api.get('/bookings/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch all bookings' };
  }
};

// Get booking by ID (auth required)
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch booking' };
  }
};

// Update booking status (admin only)
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update booking status' };
  }
};

// Delete booking (admin only)
export const deleteBooking = async (id) => {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete booking' };
  }
};
