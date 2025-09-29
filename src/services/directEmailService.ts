

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export class DirectEmailService {
  private static instance: DirectEmailService;
  private adminEmail: string;

  private constructor() {
   
    this.adminEmail = 'developer01@midlandmarketing.in'; 
  }

  public static getInstance(): DirectEmailService {
    if (!DirectEmailService.instance) {
      DirectEmailService.instance = new DirectEmailService();
    }
    return DirectEmailService.instance;
  }

  public setAdminEmail(email: string): void {
    this.adminEmail = email;
  }

  public getAdminEmail(): string {
    return this.adminEmail;
  }

 
  public createSubscriptionMailtoUrl(subscriberEmail: string): string {
    const subject = 'New Newsletter Subscription - G20 Security';
    const body = `New Newsletter Subscription

Subscriber Email: ${subscriberEmail}
Subscription Date: ${new Date().toLocaleString()}
Website: G20 Security Newsletter

This is an automated notification from your website newsletter subscription form.

---
Please reply to this email to confirm receipt.`;

    return this.createMailtoUrl({
      to: this.adminEmail,
      subject: subject,
      body: body
    });
  }

  
  public createConfirmationMailtoUrl(subscriberEmail: string): string {
    const subject = 'Welcome to G20 Security Newsletter!';
    const body = `Dear Subscriber,

Thank you for subscribing to our G20 Security Newsletter!

You will now receive the latest security insights, updates, and important information from our team.

What to expect:
- Weekly security briefings
- Industry updates
- Best practices and tips
- Important security alerts

We respect your privacy and will never share your email address with third parties.

Best regards,
G20 Security Team

---
To unsubscribe, simply reply to this email with "UNSUBSCRIBE" in the subject line.`;

    return this.createMailtoUrl({
      to: subscriberEmail,
      subject: subject,
      body: body
    });
  }

 
  private createMailtoUrl(data: EmailData): string {
    const encodedSubject = encodeURIComponent(data.subject);
    const encodedBody = encodeURIComponent(data.body);
    
    return `mailto:${data.to}?subject=${encodedSubject}&body=${encodedBody}`;
  }

  /**
   * Opens the default email client with pre-filled content
   */
  public openEmailClient(mailtoUrl: string): boolean {
    try {
      window.open(mailtoUrl, '_blank');
      return true;
    } catch (error) {
      console.error('Failed to open email client:', error);
      return false;
    }
  }

  /**
   * Handles subscription process - opens email client for admin notification
   */
  public async handleSubscription(subscriberEmail: string): Promise<{
    success: boolean;
    message: string;
    adminMailtoUrl?: string;
  }> {
    try {
      const adminMailtoUrl = this.createSubscriptionMailtoUrl(subscriberEmail);
      const opened = this.openEmailClient(adminMailtoUrl);
      
      if (opened) {
        return {
          success: true,
          message: 'Email client opened. Please send the email to complete your subscription.',
          adminMailtoUrl: adminMailtoUrl
        };
      } else {
        return {
          success: false,
          message: 'Failed to open email client. Please try again or contact us directly.'
        };
      }
    } catch (error) {
      console.error('Subscription error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again or contact us directly.'
      };
    }
  }

  /**
   * Alternative method using form submission (for better compatibility)
   */
  public createSubscriptionForm(subscriberEmail: string): HTMLFormElement {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'mailto:' + this.adminEmail;
    form.style.display = 'none';

    const subjectField = document.createElement('input');
    subjectField.type = 'hidden';
    subjectField.name = 'subject';
    subjectField.value = 'New Newsletter Subscription - G20 Security';

    const bodyField = document.createElement('textarea');
    bodyField.name = 'body';
    bodyField.value = `New Newsletter Subscription

Subscriber Email: ${subscriberEmail}
Subscription Date: ${new Date().toLocaleString()}
Website: G20 Security Newsletter

This is an automated notification from your website newsletter subscription form.`;

    form.appendChild(subjectField);
    form.appendChild(bodyField);
    
    return form;
  }
}

// Export singleton instance
export const directEmailService = DirectEmailService.getInstance();

