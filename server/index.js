import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER || 'developer01@midlandmarketing.in',
    pass: process.env.EMAIL_PASS || 'your-app-password' // Use App Password for Gmail
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter ready');
  }
});

// Admin email configuration
const ADMIN_EMAIL = 'developer01@midlandmarketing.in';
const COMPANY_NAME = 'G20 Security';

// Email templates
const createAdminEmail = (subscriberEmail, clientIP = 'Unknown') => ({
  from: subscriberEmail,
  to: ADMIN_EMAIL,
  subject: `New Newsletter Subscription - ${COMPANY_NAME}`,
  text: `New Newsletter Subscription

Subscriber Email: ${subscriberEmail}
Subscription Date: ${new Date().toLocaleString()}
Website: ${COMPANY_NAME} Newsletter
IP Address: ${clientIP}

This is an automated notification from your website newsletter subscription form.

---
Please reply to this email to confirm receipt.`,
  replyTo: subscriberEmail
});

const createSubscriberEmail = (subscriberEmail) => ({
  from: ADMIN_EMAIL,
  to: subscriberEmail,
  subject: `Welcome to ${COMPANY_NAME} Newsletter!`,
  text: `Dear Subscriber,

Thank you for subscribing to our ${COMPANY_NAME} Newsletter!

You will now receive the latest security insights, updates, and important information from our team.

What to expect:
- Weekly security briefings
- Industry updates
- Best practices and tips
- Important security alerts

We respect your privacy and will never share your email address with third parties.

Best regards,
${COMPANY_NAME} Team

---
To unsubscribe, simply reply to this email with "UNSUBSCRIBE" in the subject line.`,
  replyTo: ADMIN_EMAIL
});

// Routes
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    // Send admin notification
    const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';
    const adminEmail = createAdminEmail(email, clientIP);
    const adminResult = await transporter.sendMail(adminEmail);

    // Send subscriber confirmation
    const subscriberEmail = createSubscriberEmail(email);
    const subscriberResult = await transporter.sendMail(subscriberEmail);

    // Log subscription
    console.log(`New subscription: ${email} at ${new Date().toISOString()}`);
    console.log(`Admin email sent: ${adminResult.messageId}`);
    console.log(`Subscriber email sent: ${subscriberResult.messageId}`);

    res.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      adminEmailSent: !!adminResult.messageId,
      subscriberEmailSent: !!subscriberResult.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send subscription. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'G20 Security Newsletter API'
  });
});

// Serve React app for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Admin email: ${ADMIN_EMAIL}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
