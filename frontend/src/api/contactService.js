import api from './config';

export const contactService = {
  // Send contact form message
  sendMessage: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
