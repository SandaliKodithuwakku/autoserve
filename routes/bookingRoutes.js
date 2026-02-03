const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Admin routes (authentication + admin role required)
// GET /api/bookings/all - Get all bookings (MUST come before /:id)
router.get('/all', protect, adminOnly, getAllBookings);

// Customer routes (authentication required)
// GET /api/bookings/my-bookings - Get customer's own bookings (MUST come before /:id)
router.get('/my-bookings', protect, getMyBookings);

// POST /api/bookings - Create booking
router.post('/', protect, createBooking);

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', protect, getBookingById);

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;

