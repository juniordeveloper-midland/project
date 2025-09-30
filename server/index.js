import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { databaseService } from './databaseService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const CREDS_PATH = path.join(process.cwd(), 'server', 'admin.creds.json');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '';
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// Middleware
app.use(cors({
  origin: (origin, cb) => cb(null, FRONTEND_ORIGIN || origin || true),
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER || 'developer01@midlandmarketing.in',
    pass: process.env.EMAIL_PASS || 'Liondev@2025!' // Use App Password for Gmail
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

// --- AUTH STORAGE HELPERS ---
function readCreds() {
  try {
    if (!fs.existsSync(CREDS_PATH)) {
      const defaultHash = bcrypt.hashSync('admin123', 10);
      const initial = { email: 'admin@example.com', passwordHash: defaultHash };
      fs.writeFileSync(CREDS_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(CREDS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read creds file:', e);
    const fallback = { email: 'admin@example.com', passwordHash: bcrypt.hashSync('admin123', 10) };
    return fallback;
  }
}

function writeCreds(nextCreds) {
  fs.writeFileSync(CREDS_PATH, JSON.stringify(nextCreds, null, 2));
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}

function authMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  const creds = readCreds();
  const isEmailMatch = email.trim().toLowerCase() === creds.email.trim().toLowerCase();
  const isPasswordMatch = bcrypt.compareSync(password, creds.passwordHash);
  if (!isEmailMatch || !isPasswordMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = signToken({ email: creds.email });
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: FRONTEND_ORIGIN ? 'none' : 'lax',
    secure: FRONTEND_ORIGIN ? true : process.env.NODE_ENV === 'production',
    maxAge: 2 * 60 * 60 * 1000
  });
  return res.json({ success: true, message: 'Logged in' });
});

// Google Sign-In: verify ID token and match email with stored admin email
app.post('/api/auth/google', async (req, res) => {
  try {
    if (!googleClient) return res.status(500).json({ success: false, message: 'Google client not configured' });
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ success: false, message: 'idToken required' });

    const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const googleEmail = payload?.email?.toLowerCase();
    if (!googleEmail) return res.status(401).json({ success: false, message: 'Google email not present' });

    const creds = readCreds();
    const isEmailMatch = googleEmail === creds.email.trim().toLowerCase();
    if (!isEmailMatch) return res.status(401).json({ success: false, message: 'Unauthorized email' });

    const token = signToken({ email: creds.email });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: FRONTEND_ORIGIN ? 'none' : 'lax',
      secure: FRONTEND_ORIGIN ? true : process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.json({ success: true, message: 'Logged in with Google' });
  } catch (e) {
    console.error('Google login error:', e);
    return res.status(401).json({ success: false, message: 'Invalid Google token' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  return res.json({ success: true, user: { email: req.user.email } });
});

app.post('/api/auth/change-credentials', authMiddleware, (req, res) => {
  const { currentPassword, newEmail, newPassword } = req.body || {};
  const creds = readCreds();
  const valid = bcrypt.compareSync(currentPassword || '', creds.passwordHash);
  if (!valid) return res.status(401).json({ success: false, message: 'Current password invalid' });
  const updated = {
    email: newEmail && newEmail.trim() ? newEmail.trim().toLowerCase() : creds.email,
    passwordHash: newPassword && newPassword.length >= 6 ? bcrypt.hashSync(newPassword, 10) : creds.passwordHash
  };
  writeCreds(updated);
  return res.json({ success: true, user: { email: updated.email } });
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

    const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Check if email already exists
    const existingSubscriber = await databaseService.queryOne(
      'SELECT id FROM subscribers WHERE email = ? AND is_active = TRUE',
      [email.toLowerCase()]
    );

    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      });
    }

    // Store subscription in database
    try {
      await databaseService.insert(
        'INSERT INTO subscribers (email, ip_address, user_agent) VALUES (?, ?, ?)',
        [email.toLowerCase(), clientIP, userAgent]
      );
      console.log(`✅ New subscription stored in database: ${email}`);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      // Continue with email sending even if database fails
    }

    // Send admin notification
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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Store contact message in database
    try {
      await databaseService.insert(
        'INSERT INTO contact_messages (name, email, phone, subject, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone || null, subject || null, message, clientIP, userAgent]
      );
      console.log(`✅ New contact message stored: ${email}`);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
    }

    // Send notification email to admin
    const adminEmail = {
      from: email,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${subject || 'No Subject'}`,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'No subject'}
Message: ${message}

Submitted: ${new Date().toLocaleString()}
IP Address: ${clientIP}

---
Please reply directly to this email to respond to the customer.`,
      replyTo: email
    };

    await transporter.sendMail(adminEmail);

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Admin endpoints for viewing data
app.get('/api/admin/subscribers', authMiddleware, async (req, res) => {
  try {
    const subscribers = await databaseService.query(
      'SELECT id, email, subscribed_at, ip_address FROM subscribers WHERE is_active = TRUE ORDER BY subscribed_at DESC'
    );
    res.json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

app.get('/api/admin/contact-messages', authMiddleware, async (req, res) => {
  try {
    const messages = await databaseService.query(
      'SELECT id, name, email, phone, subject, message, created_at FROM contact_messages ORDER BY created_at DESC'
    );
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact messages' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = await databaseService.testConnection();
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'G20 Security Newsletter API',
    database: dbStatus ? 'Connected' : 'Disconnected'
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

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await databaseService.testConnection();
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server will still start but database features will be unavailable.');
    }

    // Initialize database tables
    await databaseService.initializeTables();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📧 Admin email: ${ADMIN_EMAIL}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🗄️ Database: ${dbConnected ? 'Connected' : 'Disconnected'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
