# Direct Email Subscription Setup

This solution allows users to subscribe to your newsletter without any third-party services. It uses the browser's native `mailto:` functionality to open the user's email client with a pre-filled message.

## How It Works

1. **User enters email** and clicks "Subscribe"
2. **Email client opens** with a pre-filled message to your email
3. **User sends the email** to complete the subscription
4. **You receive the subscription** directly in your inbox

## Setup Instructions

### Step 1: Configure Your Email Address

1. Open `src/config/directEmailConfig.ts`
2. Replace `your-email@example.com` with your actual email address:

```typescript
export const DIRECT_EMAIL_CONFIG = {
  ADMIN_EMAIL: 'your-actual-email@example.com', // Replace this
  // ... rest of config
} as const;
```

### Step 2: Test the Functionality

1. Start your development server: `npm run dev`
2. Navigate to your newsletter subscription form
3. Enter a test email and click "Subscribe"
4. Your default email client should open with a pre-filled message
5. Send the email to complete the test

## Email Template

The system automatically creates a professional email template with:

- **Subject**: "New Newsletter Subscription - G20 Security"
- **Content**: Includes subscriber email, date, and website info
- **Professional formatting** for easy reading

## Advantages

✅ **No third-party dependencies**  
✅ **No API keys or accounts needed**  
✅ **Works with any email client**  
✅ **No monthly limits or costs**  
✅ **Direct email delivery**  
✅ **Simple setup and maintenance**  

## User Experience

- Users see a clear instruction: "Click Subscribe to open your email client"
- Loading state shows "Opening Email..." 
- Success message confirms the email client opened
- Form clears after successful submission

## Browser Compatibility

- ✅ **Chrome/Edge**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Safari**: Full support
- ✅ **Mobile browsers**: Full support

## Troubleshooting

### Email client doesn't open
- Check if user has a default email client configured
- Some browsers may require user permission
- Mobile devices may need email app installed

### Email formatting issues
- The system uses proper URL encoding
- All special characters are handled correctly
- Works with all major email clients

## Customization

You can customize the email templates in `src/services/directEmailService.ts`:

- **Subject lines**: Modify `SUBJECTS` in config
- **Email content**: Update the body text in the service
- **Company branding**: Change company name and details

## Security Notes

- No data is stored or transmitted to external services
- All email handling is done locally in the browser
- Users have full control over their email content
- No privacy concerns or data collection

## Support

This solution is completely self-contained and requires no external services or ongoing maintenance.

