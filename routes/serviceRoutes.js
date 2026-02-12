const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// GET /api/services - Get all services (public)
router.get('/', getAllServices);

// GET /api/services/:id - Get service by ID (public)
router.get('/:id', getServiceById);

// POST /api/services - Create service (admin only)
router.post('/', protect, adminOnly, createService);

// PUT /api/services/:id - Update service (admin only)
router.put('/:id', protect, adminOnly, updateService);

// DELETE /api/services/:id - Delete service (admin only)
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;

