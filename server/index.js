import express from 'express';
import multer from 'multer';
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

// serve uploaded files
const UPLOADS_DIR = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

// multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safe = (file.originalname || 'file').replace(/[^a-zA-Z0-9.\-\_]/g, '_');
    cb(null, `${unique}-${safe}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

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

// Social Media Links endpoints
app.get('/api/social-media', async (req, res) => {
  try {
    const links = await databaseService.query(
      'SELECT platform, url, icon_class, display_order FROM social_media_links WHERE is_active = TRUE ORDER BY display_order ASC'
    );
    res.json({ success: true, data: links });
  } catch (error) {
    console.error('Error fetching social media links:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch social media links' });
  }
});

// --- BLOGS API ---
// Public: list published blogs (optional ?limit)
app.get('/api/blogs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '0', 10) || 0;
    let sql = "SELECT id, title, slug, excerpt, featured_image, author, status, created_at, updated_at, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC";
    if (limit > 0) sql += ' LIMIT ' + limit;
    const posts = await databaseService.query(sql);
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

// Public: get single post by id (or slug)
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let post = null;
    if (/^\d+$/.test(id)) {
      post = await databaseService.queryOne('SELECT * FROM blog_posts WHERE id = ? AND status = "published"', [id]);
    } else {
      post = await databaseService.queryOne('SELECT * FROM blog_posts WHERE slug = ? AND status = "published"', [id]);
    }
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog post' });
  }
});

// Admin: manage blog posts
app.get('/api/admin/blogs', authMiddleware, async (req, res) => {
  try {
    const posts = await databaseService.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin blogs' });
  }
});

app.post('/api/admin/blogs', authMiddleware, async (req, res) => {
  try {
    console.log('[admin.blogs.create] user=', req.user && req.user.email, 'ip=', req.ip);
    console.log('[admin.blogs.create] body=', JSON.stringify(req.body || {}));
    const { title, slug, content, excerpt, featured_image, author, status, published_at } = req.body || {};
    if (!title || !slug || !content) return res.status(400).json({ success: false, message: 'title, slug and content are required' });
    // If publishing now and published_at not provided, set to current timestamp (store as UTC MySQL datetime)
    function toMySQLDatetime(d) {
      if (!d) return null;
      const date = new Date(d);
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    const pubAt = status === 'published' ? toMySQLDatetime(published_at ? published_at : new Date()) : null;
    const insertId = await databaseService.insert(
      'INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, content, excerpt || null, featured_image || null, author || 'G20 Security Team', status || 'draft', pubAt]
    );
    res.json({ success: true, message: 'Blog created', id: insertId });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ success: false, message: 'Failed to create blog post' });
  }
});

app.put('/api/admin/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, featured_image, author, status, published_at } = req.body || {};
    // If status is published and no published_at provided, set it to now (store as UTC MySQL datetime)
    function toMySQLDatetime(d) {
      if (!d) return null;
      const date = new Date(d);
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    const pubAt = status === 'published' ? toMySQLDatetime(published_at ? published_at : new Date()) : (published_at ? toMySQLDatetime(published_at) : null);
    const affected = await databaseService.update(
      'UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, author = ?, status = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, slug, content, excerpt || null, featured_image || null, author || 'G20 Security Team', status || 'draft', pubAt, id]
    );
    if (affected === 0) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog updated' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog post' });
  }
});

// Admin: delete blog post (and its uploaded image file if present)
app.delete('/api/admin/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    // fetch post to see if it has a featured_image we should remove
    const post = await databaseService.queryOne('SELECT featured_image FROM blog_posts WHERE id = ?', [id]);
    if (!post) return res.status(404).json({ success: false, message: 'Blog not found' });

    // attempt to delete uploaded file if it lives under /uploads
    try {
      const img = post.featured_image;
      if (img && typeof img === 'string' && img.startsWith('/uploads/')) {
        const filename = img.replace(/^\/uploads\//, '');
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('[admin.blogs.delete] removed file', filePath);
        }
      }
    } catch (e) {
      console.warn('Failed to remove uploaded image for deleted blog:', e?.message || e);
    }

    const affected = await databaseService.update('DELETE FROM blog_posts WHERE id = ?', [id]);
    if (affected === 0) return res.status(404).json({ success: false, message: 'Blog not found' });
    console.log('[admin.blogs.delete] user=', req.user?.email, 'id=', id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog post' });
  }
});


app.get('/api/admin/social-media', authMiddleware, async (req, res) => {
  try {
    const links = await databaseService.query(
      'SELECT id, platform, url, icon_class, is_active, display_order, created_at, updated_at FROM social_media_links ORDER BY display_order ASC'
    );
    res.json({ success: true, data: links });
  } catch (error) {
    console.error('Error fetching social media links:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch social media links' });
  }
});

app.put('/api/admin/social-media/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, is_active, display_order } = req.body;

    const affectedRows = await databaseService.update(
      'UPDATE social_media_links SET url = ?, is_active = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [url, is_active, display_order, id]
    );

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Social media link not found' });
    }

    res.json({ success: true, message: 'Social media link updated successfully' });
  } catch (error) {
    console.error('Error updating social media link:', error);
    res.status(500).json({ success: false, message: 'Failed to update social media link' });
  }
});

// Testimonials endpoints
app.get('/api/testimonials', async (req, res) => {
  try {
    const { featured } = req.query;
    let query = 'SELECT customer_name, customer_position, customer_company, testimonial_text, customer_image, rating FROM testimonials WHERE is_active = TRUE';
    
    if (featured === 'true') {
      query += ' AND is_featured = TRUE';
    }
    
    query += ' ORDER BY display_order ASC';

    const testimonials = await databaseService.query(query);
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

app.get('/api/admin/testimonials', authMiddleware, async (req, res) => {
  try {
    const testimonials = await databaseService.query(
      'SELECT id, customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, is_active, display_order, created_at, updated_at FROM testimonials ORDER BY display_order ASC'
    );
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

app.post('/api/admin/testimonials', authMiddleware, async (req, res) => {
  try {
    const { customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, is_active, display_order } = req.body;

    if (!customer_name || !testimonial_text) {
      return res.status(400).json({ success: false, message: 'Customer name and testimonial text are required' });
    }

    const insertId = await databaseService.insert(
      'INSERT INTO testimonials (customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [customer_name, customer_position || null, customer_company || null, testimonial_text, customer_image || null, rating || 5, is_featured || false, is_active !== false, display_order || 0]
    );

    res.json({ success: true, message: 'Testimonial created successfully', id: insertId });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ success: false, message: 'Failed to create testimonial' });
  }
});

// Image upload endpoint for blog featured images
app.post('/api/admin/blogs/upload-image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    console.log('[admin.blogs.upload] user=', req.user && req.user.email, 'ip=', req.ip, 'file=', req.file && req.file.originalname);
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    // Return a public path for the uploaded file
    const publicPath = `/uploads/${req.file.filename}`;
    res.json({ success: true, path: publicPath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
});

app.put('/api/admin/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, is_active, display_order } = req.body;

    const affectedRows = await databaseService.update(
      'UPDATE testimonials SET customer_name = ?, customer_position = ?, customer_company = ?, testimonial_text = ?, customer_image = ?, rating = ?, is_featured = ?, is_active = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, is_active, display_order, id]
    );

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ success: false, message: 'Failed to update testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await databaseService.update(
      'DELETE FROM testimonials WHERE id = ?',
      [id]
    );

    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
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
