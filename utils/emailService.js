const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = createTransporter();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"AutoServe Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your AutoServe Password',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 30px;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 20px -30px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 AutoServe Password Reset</h1>
          </div>
          
          <p>Hello,</p>
          
          <p>You recently requested to reset your password for your AutoServe account. Click the button below to reset it:</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all;">
            ${resetUrl}
          </p>
          
          <p><strong>⏰ This link will expire in 1 hour.</strong></p>
          
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          
          <div class="footer">
            <p>Thank you,<br>The AutoServe Team</p>
            <p style="color: #999; font-size: 11px;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send contact form email to AutoServe
const sendContactEmail = async ({ name, email, phone, subject, message }) => {
  const transporter = createTransporter();

  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          color: #f97316;
          border-bottom: 2px solid #f97316;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .info-box {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .info-item {
          margin: 10px 0;
        }
        .message-box {
          background-color: #f9fafb;
          padding: 15px;
          border-left: 4px solid #f97316;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="header">📧 New Contact Form Submission</h2>
        
        <div class="info-box">
          <div class="info-item"><strong>Name:</strong> ${name}</div>
          <div class="info-item"><strong>Email:</strong> ${email}</div>
          <div class="info-item"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
          <div class="info-item"><strong>Subject:</strong> ${subject}</div>
        </div>
        
        <h3 style="color: #374151;">Message:</h3>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <div class="footer">
          <p>This email was sent from the AutoServe contact form on ${new Date().toLocaleString()}</p>
          <p><strong>Reply directly to this email to respond to ${name}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"AutoServe Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.AUTOSERVE_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact Form: ${subject}`,
    html: emailContent,
    replyTo: email
  };

  await transporter.sendMail(mailOptions);
};

// Send auto-reply to customer
const sendContactAutoReply = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();

  const autoReplyContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 30px;
        }
        .header {
          background-color: #f97316;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
          margin: -30px -30px 20px -30px;
        }
        .message-box {
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
          border: 1px solid #e5e7eb;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 Thank you for contacting AutoServe!</h1>
        </div>
        
        <p>Dear ${name},</p>
        
        <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible, typically within 2 hours during business hours.</p>
        
        <div class="message-box">
          <h3 style="margin-top: 0; color: #f97316;">Your Message Details:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <p>If you need immediate assistance, please call us at: <strong>+94 XX XXX XXXX</strong></p>
        
        <p>Best regards,<br>
        <strong>The AutoServe Team</strong></p>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>If you have additional questions, please submit a new contact form or call us directly.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"AutoServe Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank you for contacting AutoServe',
    html: autoReplyContent
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { 
  sendPasswordResetEmail,
  sendContactEmail,
  sendContactAutoReply 
};
