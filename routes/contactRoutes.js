const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sendContactMessage } = require('../controllers/contactController');

// Validation middleware
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('phone').optional().trim()
];

// POST /api/contact - Send contact form email (public route)
router.post('/', contactValidation, sendContactMessage);

module.exports = router;