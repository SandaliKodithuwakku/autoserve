const Service = require('../models/Service');

// Create service (Admin only)
const createService = async (req, res) => {
  try {
    const { name, description, price, duration, icon, features } = req.body;

    // Validate required fields
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Please provide name, description, and price' });
    }

    // Create new service
    const service = await Service.create({
      name,
      description,
      price,
      duration,
      icon,
      features
    });

    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services (Public)
const getAllServices = async (req, res) => {
  try {
    // Fetch all services, sorted by newest first
    const services = await Service.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get service by ID (Public)
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    // Check if service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service (Admin only)
const updateService = async (req, res) => {
  try {
    const { name, description, price, duration, icon, features } = req.body;

    // Find and update service
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, duration, icon, features },
      { new: true, runValidators: true }
    );

    // Check if service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete service (Admin only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    // Check if service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};