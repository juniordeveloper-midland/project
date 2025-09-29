# Node.js Email Setup Guide

This solution uses a Node.js Express server with Nodemailer for reliable email delivery.

## ✅ **What's New:**

- **Node.js backend** with Express server
- **Nodemailer** for reliable email delivery
- **No PHP required** - pure JavaScript solution
- **Real email delivery** to your inbox
- **Automatic confirmation emails** to subscribers

## 🚀 **Quick Setup:**

### Step 1: Create Environment File
Create a `.env` file in your project root with:

```env
# Email Configuration
EMAIL_USER=developer01@midlandmarketing.in
EMAIL_PASS=Liondev@2025!

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Step 2: Configure Email Password

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

**For Other Email Providers:**
- Use your regular email password

### Step 3: Start the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev:full
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

## 📧 **How It Works:**

1. **User enters email** → Clicks "Subscribe"
2. **Frontend sends request** → Node.js backend
3. **Nodemailer sends emails** → Your inbox + subscriber
4. **Success response** → User sees confirmation

## 🔧 **API Endpoints:**

- `POST /api/subscribe` - Handle newsletter subscriptions
- `GET /api/health` - Health check endpoint

## 📋 **Email Templates:**

### Admin Notification (to developer01@midlandmarketing.in):
- **Subject**: "New Newsletter Subscription - G20 Security"
- **From**: Subscriber's email
- **Content**: Subscriber details, date, IP address

### Subscriber Confirmation:
- **Subject**: "Welcome to G20 Security Newsletter!"
- **From**: developer01@midlandmarketing.in
- **Content**: Welcome message and newsletter info

## 🛠️ **Troubleshooting:**

### Server won't start:
1. Check if port 3001 is available
2. Verify Node.js is installed
3. Check `.env` file exists

### Emails not sending:
1. Verify email credentials in `.env`
2. Check Gmail App Password (if using Gmail)
3. Check server logs for errors

### Frontend can't connect:
1. Ensure backend is running on port 3001
2. Check CORS settings
3. Verify API endpoint URLs

## 📊 **Monitoring:**

- Server logs show subscription attempts
- Email delivery status in responses
- Health check endpoint for monitoring

## 🚀 **Production Deployment:**

1. Set `NODE_ENV=production` in `.env`
2. Use environment variables for credentials
3. Deploy both frontend and backend
4. Configure email provider settings

## 📁 **File Structure:**

```
project/
├── server/
│   └── index.js          # Node.js backend
├── src/
│   └── services/
│       └── emailService.ts # Frontend email service
├── .env                   # Environment variables
└── package.json          # Updated with new scripts
```

This solution provides reliable email delivery using Node.js and Nodemailer!

