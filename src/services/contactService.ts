export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export class ContactService {
  private static instance: ContactService;
  private apiEndpoint: string;

  private constructor() {
    // Set the API endpoint for contact form submission
    const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || '';
    const isBrowser = typeof window !== 'undefined';
    const isLocalhost = isBrowser && window.location.hostname === 'localhost';
    const baseUrl = envBase
      || (isLocalhost ? 'http://localhost:3001' : (isBrowser ? window.location.origin : ''));

    this.apiEndpoint = `${baseUrl}/api/contact`;
  }

  public static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  /**
   * Submit contact form data to the backend
   */
  public async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    try {
      // Combine first name and last name into a single name field
      const contactData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'Failed to send message. Please make sure the server is running and try again.',
      };
    }
  }

  /**
   * Test contact service connectivity
   */
  public async testConnection(): Promise<boolean> {
    try {
      const healthEndpoint = this.apiEndpoint.replace('/api/contact', '/api/health');
      const response = await fetch(healthEndpoint);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const contactService = ContactService.getInstance();
