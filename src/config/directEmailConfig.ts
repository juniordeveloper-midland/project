// Direct Email Configuration
// No third-party services required - uses native browser email functionality

export const DIRECT_EMAIL_CONFIG = {
  // Your email address where you want to receive subscription notifications
  ADMIN_EMAIL: 'developer01@midlandmarketing.in', // Replace with your actual email address
  
  // Email settings
  COMPANY_NAME: 'G20 Security',
  WEBSITE_URL: window.location.origin, // Current website URL
  
  // Email templates
  SUBJECTS: {
    SUBSCRIPTION_NOTIFICATION: 'New Newsletter Subscription - G20 Security',
    WELCOME_MESSAGE: 'Welcome to G20 Security Newsletter!'
  },
  
  // Messages
  MESSAGES: {
    SUCCESS: 'Email client opened! Please send the email to complete your subscription.',
    ERROR: 'Failed to open email client. Please try again or contact us directly.',
    LOADING: 'Opening email client...'
  }
} as const;

// Instructions for users
export const EMAIL_INSTRUCTIONS = {
  TITLE: 'How to Subscribe',
  STEPS: [
    'Enter your email address',
    'Click "Subscribe" button',
    'Your email client will open with a pre-filled message',
    'Send the email to complete your subscription',
    'You will receive a confirmation email'
  ]
} as const;

