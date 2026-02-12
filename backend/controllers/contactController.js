const { sendContactEmail, sendContactAutoReply } = require('../utils/emailService');
const { validationResult } = require('express-validator');

// Send contact form email
const sendContactMessage = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Send email to AutoServe
    await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message
    });

    // Send auto-reply to customer
    await sendContactAutoReply({
      name,
      email,
      subject,
      message
    });

    res.status(200).json({ 
      success: true,
      message: 'Message sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again later.' 
    });
  }
};

module.exports = { sendContactMessage };