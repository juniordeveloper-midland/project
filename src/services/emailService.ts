// Email Service with Node.js Backend
// This service sends emails through a Node.js Express server for reliable delivery

export interface EmailResponse {
  success: boolean;
  message: string;
  adminEmailSent?: boolean;
  subscriberEmailSent?: boolean;
}

export class EmailService {
  private static instance: EmailService;
  private apiEndpoint: string;

  private constructor() {
    // Set the API endpoint for email sending
    this.apiEndpoint = 'http://localhost:3001/api/subscribe';
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Sends subscription notification via Node.js backend
   */
  public async sendSubscription(subscriberEmail: string): Promise<EmailResponse> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscriberEmail
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Failed to send subscription. Please make sure the server is running.',
        adminEmailSent: false,
        subscriberEmailSent: false
      };
    }
  }

  /**
   * Test email service connectivity
   */
  public async testConnection(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3001/api/health');
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();
