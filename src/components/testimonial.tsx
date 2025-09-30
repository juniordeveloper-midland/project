import React, { useState, useEffect } from 'react';
import { testimonialService, Testimonial } from '../services/testimonialService';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getFeaturedTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <section className="relative bg-blue-900 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Testimonials</h2>
          <div className="mx-auto mt-3 h-1 w-28 bg-white/80 rounded"></div>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-white/90">
            “Our clients trust G20 Security for reliable, professional, and tailored protection. Here's what they have to say
            about their experience with our security services.”
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <article key={i} className="relative rounded-xl bg-white text-[#1f2b4d] p-6 shadow-lg animate-pulse">
                <div className="absolute -top-5 left-6 h-10 w-10 grid place-items-center rounded-full bg-gray-300"></div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <div className="mr-3 text-right space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
              </article>
            ))
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <article key={index} className="relative rounded-xl bg-white text-[#1f2b4d] p-6 shadow-lg">
                <div className="absolute -top-5 left-6 h-10 w-10 grid place-items-center rounded-full bg-[#27457a] text-white text-xl">"</div>
                <p className="text-sm leading-relaxed text-[#3a4a73]">
                  "{testimonial.testimonial_text}"
                </p>
                <div className="mt-6 flex items-center justify-end">
                  <div className="mr-3 text-right">
                    <p className="text-[13px] font-semibold text-[#3a4a73]">{testimonial.customer_name}</p>
                    <p className="text-[12px] text-[#7482a6]">
                      {testimonial.customer_position}
                      {testimonial.customer_company && ` at ${testimonial.customer_company}`}
                    </p>
                  </div>
                  {testimonial.customer_image && (
                    <img
                      src={testimonial.customer_image}
                      alt={testimonial.customer_name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-white">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


