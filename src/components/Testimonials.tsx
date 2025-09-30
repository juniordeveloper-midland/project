import React, { useState, useEffect } from 'react';
import { testimonialService, Testimonial } from '../services/testimonialService';

interface TestimonialsProps {
  featured?: boolean;
  limit?: number;
  className?: string;
  showRatings?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  featured = false, 
  limit, 
  className = '',
  showRatings = true
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = featured 
          ? await testimonialService.getFeaturedTestimonials()
          : await testimonialService.getTestimonialsWithFallback();
        
        const limitedData = limit ? data.slice(0, limit) : data;
        setTestimonials(limitedData);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [featured, limit]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No testimonials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {/* Customer Info */}
          <div className="flex items-center mb-4">
            {testimonial.customer_image && (
              <img
                src={testimonial.customer_image}
                alt={testimonial.customer_name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h4 className="font-semibold text-gray-800">
                {testimonial.customer_name}
              </h4>
              {testimonial.customer_position && (
                <p className="text-sm text-gray-600">
                  {testimonial.customer_position}
                  {testimonial.customer_company && ` at ${testimonial.customer_company}`}
                </p>
              )}
            </div>
          </div>

          {/* Rating */}
          {showRatings && (
            <div className="flex items-center mb-3">
              {renderStars(testimonial.rating)}
            </div>
          )}

          {/* Testimonial Text */}
          <blockquote className="text-gray-700 italic">
            "{testimonial.testimonial_text}"
          </blockquote>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
