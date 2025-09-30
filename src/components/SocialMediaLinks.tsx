import React, { useState, useEffect } from 'react';
import { socialMediaService, SocialMediaLink } from '../services/socialMediaService';

interface SocialMediaLinksProps {
  className?: string;
  showLabels?: boolean;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  className = '', 
  showLabels = false 
}) => {
  const [links, setLinks] = useState<SocialMediaLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const socialLinks = await socialMediaService.getSocialMediaLinksWithFallback();
        setLinks(socialLinks);
      } catch (error) {
        console.error('Error loading social media links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const getIconComponent = (platform: string) => {
    const iconClass = `h-5 w-5`;
    
    switch (platform) {
      case 'facebook':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12Z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 5.94c-.73.32-1.5.53-2.3.62a4.03 4.03 0 0 0 1.76-2.22 8 8 0 0 1-2.55.98 4 4 0 0 0-6.92 2.73c0 .32.04.65.1.95A11.37 11.37 0 0 1 3.15 4.6a4.02 4.02 0 0 0 1.24 5.36c-.6-.02-1.18-.19-1.68-.47v.05a4 4 0 0 0 3.2 3.93c-.53.15-1.1.18-1.65.07a4.02 4.02 0 0 0 3.74 2.78A8.05 8.05 0 0 1 2 19.54 11.36 11.36 0 0 0 8.16 21c7.36 0 11.4-6.1 11.4-11.4l-.01-.52A8.1 8.1 0 0 0 22 5.94Z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 7.5s-.23-1.64-.95-2.36c-.9-.95-1.9-.95-2.36-1C16.9 4 12 4 12 4h0s-4.9 0-8.19.14c-.46.05-1.46.05-2.36 1C.73 5.86.5 7.5.5 7.5S.36 9.36.36 11.23v1.54C.36 14.64.5 16.5.5 16.5s.23 1.64.95 2.36c.9.95 2.08.92 2.61 1.02C5.5 20.06 12 20.1 12 20.1s4.9 0 8.19-.14c.46-.05 1.46-.05 2.36-1 .72-.72.95-2.36.95-2.36s.14-1.86.14-3.73v-1.54C23.64 9.36 23.5 7.5 23.5 7.5ZM9.75 14.75v-5.5l5.5 2.75-5.5 2.75Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-5 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {links.map((link) => (
        <a
          key={link.platform}
          aria-label={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition-colors"
        >
          {getIconComponent(link.platform)}
          {showLabels && (
            <span className="ml-2 text-sm capitalize">{link.platform}</span>
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
