export interface Testimonial {
  customer_name: string;
  customer_position?: string;
  customer_company?: string;
  testimonial_text: string;
  customer_image?: string;
  rating: number;
}

export interface TestimonialResponse {
  success: boolean;
  data: Testimonial[];
  message?: string;
}

export class TestimonialService {
  private static instance: TestimonialService;
  private apiEndpoint: string;

  private constructor() {
    const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || '';
    const isBrowser = typeof window !== 'undefined';
    const isLocalhost = isBrowser && window.location.hostname === 'localhost';
    const baseUrl = envBase
      || (isLocalhost ? 'http://localhost:3001' : (isBrowser ? window.location.origin : ''));

    this.apiEndpoint = `${baseUrl}/api/testimonials`;
  }

  public static getInstance(): TestimonialService {
    if (!TestimonialService.instance) {
      TestimonialService.instance = new TestimonialService();
    }
    return TestimonialService.instance;
  }

  /**
   * Fetch testimonials from the backend
   */
  public async getTestimonials(featured: boolean = false): Promise<TestimonialResponse> {
    try {
      const url = featured ? `${this.apiEndpoint}?featured=true` : this.apiEndpoint;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to fetch testimonials'
      };
    }
  }

  /**
   * Get testimonials with fallback to default testimonials
   */
  public async getTestimonialsWithFallback(featured: boolean = false): Promise<Testimonial[]> {
    try {
      const response = await this.getTestimonials(featured);
      if (response.success && response.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching testimonials, using fallback:', error);
    }

    // Fallback to default testimonials
    return [
      {
        customer_name: 'Sarah Johnson',
        customer_position: 'CEO',
        customer_company: 'Tech Solutions Ltd',
        testimonial_text: 'G20 Security has been our trusted partner for over 3 years. Their professionalism and attention to detail are unmatched.',
        customer_image: '/images/review1.jpg',
        rating: 5
      },
      {
        customer_name: 'Michael Chen',
        customer_position: 'Operations Manager',
        customer_company: 'Retail Group',
        testimonial_text: 'Excellent security services. The team is always responsive and reliable. Highly recommend their services.',
        customer_image: '/images/review2.jpg',
        rating: 5
      },
      {
        customer_name: 'Emma Williams',
        customer_position: 'Facility Manager',
        customer_company: 'Corporate Plaza',
        testimonial_text: 'Outstanding security solutions. G20 Security has helped us maintain a safe environment for our tenants.',
        customer_image: '/images/review3.jpg',
        rating: 5
      }
    ];
  }

  /**
   * Get featured testimonials (shortcut method)
   */
  public async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return this.getTestimonialsWithFallback(true);
  }
}

// Export singleton instance
export const testimonialService = TestimonialService.getInstance();
