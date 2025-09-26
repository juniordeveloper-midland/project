import Header from '../components/Header';
import AboutHero from '../components/abouthero';
import WhoWeAre from '../components/whoweare';
import OurStory from '../components/ourstory';
import WhatWeDo from '../components/whatwedo';
import WhyChooseUs from '../components/whychooseus';
import Count from '../components/count'
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function about() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <OurStory />
      <WhatWeDo />
      <WhyChooseUs />
      <Count />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default about;