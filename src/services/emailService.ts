

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
    // Prefer explicit env, fall back to localhost in dev, and same-origin in prod
    const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || '';
    const isBrowser = typeof window !== 'undefined';
    const isLocalhost = isBrowser && window.location.hostname === 'localhost';
    const baseUrl = envBase
      || (isLocalhost ? 'http://localhost:3001' : (isBrowser ? window.location.origin : ''));

    this.apiEndpoint = `${baseUrl}/api/subscribe`;
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
      // Derive health endpoint from the same base as apiEndpoint
      const healthEndpoint = this.apiEndpoint.replace('/api/subscribe', '/api/health');
      const response = await fetch(healthEndpoint);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();
