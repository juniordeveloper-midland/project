export interface SocialMediaLink {
  platform: string;
  url: string;
  icon_class: string;
  display_order: number;
}

export interface SocialMediaResponse {
  success: boolean;
  data: SocialMediaLink[];
  message?: string;
}

export class SocialMediaService {
  private static instance: SocialMediaService;
  private apiEndpoint: string;

  private constructor() {
    const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || '';
    const isBrowser = typeof window !== 'undefined';
    const isLocalhost = isBrowser && window.location.hostname === 'localhost';
    const baseUrl = envBase
      || (isLocalhost ? 'http://localhost:3001' : (isBrowser ? window.location.origin : ''));

    this.apiEndpoint = `${baseUrl}/api/social-media`;
  }

  public static getInstance(): SocialMediaService {
    if (!SocialMediaService.instance) {
      SocialMediaService.instance = new SocialMediaService();
    }
    return SocialMediaService.instance;
  }

  /**
   * Fetch social media links from the backend
   */
  public async getSocialMediaLinks(): Promise<SocialMediaResponse> {
    try {
      const response = await fetch(this.apiEndpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching social media links:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to fetch social media links'
      };
    }
  }

  /**
   * Get social media links with fallback to default links
   */
  public async getSocialMediaLinksWithFallback(): Promise<SocialMediaLink[]> {
    try {
      const response = await this.getSocialMediaLinks();
      if (response.success && response.data.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching social media links, using fallback:', error);
    }

    // Fallback to default links
    return [
      { platform: 'facebook', url: '#', icon_class: 'facebook', display_order: 1 },
      { platform: 'twitter', url: '#', icon_class: 'twitter', display_order: 2 },
      { platform: 'instagram', url: '#', icon_class: 'instagram', display_order: 3 },
      { platform: 'youtube', url: '#', icon_class: 'youtube', display_order: 4 }
    ];
  }
}

// Export singleton instance
export const socialMediaService = SocialMediaService.getInstance();
