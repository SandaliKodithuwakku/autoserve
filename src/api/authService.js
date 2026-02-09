import api from './config';

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Register customer
export const registerCustomer = async (username, email, phone, password) => {
  try {
    const response = await api.post('/auth/register-customer', {
      username,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Register admin
export const registerAdmin = async (username, password) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin registration failed' };
  }
};
