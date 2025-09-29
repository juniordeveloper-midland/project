import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="relative bg-[#2a4ad8] text-white py-16 md:py-24">
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
          {/* Card 1 */}
          <article className="relative rounded-xl bg-white text-[#1f2b4d] p-6 shadow-lg">
            <div className="absolute -top-5 left-6 h-10 w-10 grid place-items-center rounded-full bg-[#27457a] text-white text-xl">“</div>
            <p className="text-sm leading-relaxed text-[#3a4a73]">
              “The professionalism of G20 Security is unmatched. From static guarding to mobile patrols, their services are
              reliable and flexible to our needs. We truly value the peace of mind they bring to our business operations.”
            </p>
            <div className="mt-6 flex items-center justify-end">
              <div className="mr-3 text-right">
                <p className="text-[13px] font-semibold text-[#3a4a73]">Sarah Thompson,</p>
                <p className="text-[12px] text-[#7482a6]">Operations Manager.</p>
              </div>
              <img
                src="/images/review1.jpg"
                alt="Sarah Thompson"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
          </article>

          {/* Card 2 */}
          <article className="relative rounded-xl bg-white text-[#1f2b4d] p-6 shadow-lg">
            <div className="absolute -top-5 left-6 h-10 w-10 grid place-items-center rounded-full bg-[#27457a] text-white text-xl">“</div>
            <p className="text-sm leading-relaxed text-[#3a4a73]">
              “We’ve been using G20 Security for over a year, and their service has been exceptional. The guards are highly
              professional, punctual, and well-trained, always going above and beyond to ensure our premises remain safe.
              Their guard tracking system also gives us full confidence and peace of mind.”
            </p>
            <div className="mt-6 flex items-center justify-end">
              <div className="mr-3 text-right">
                <p className="text-[13px] font-semibold text-[#3a4a73]">Daniel K.,</p>
                <p className="text-[12px] text-[#7482a6]">Warehouse Manager.</p>
              </div>
              <img
                src="/images/review2.jpg"
                alt="Daniel K"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
          </article>

          {/* Card 3 */}
          <article className="relative rounded-xl bg-white text-[#1f2b4d] p-6 shadow-lg">
            <div className="absolute -top-5 left-6 h-10 w-10 grid place-items-center rounded-full bg-[#27457a] text-white text-xl">“</div>
            <p className="text-sm leading-relaxed text-[#3a4a73]">
              “Choosing G20 Security was the right decision for our business. Their guards are professional, approachable, and
              always proactive. We feel confident knowing our site is protected at all times.”
            </p>
            <div className="mt-6 flex items-center justify-end">
              <div className="mr-3 text-right">
                <p className="text-[13px] font-semibold text-[#3a4a73]">Aisha K.,</p>
                <p className="text-[12px] text-[#7482a6]">Facilities Manager.</p>
              </div>
              <img
                src="/images/review3.jpg"
                alt="Aisha K"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


