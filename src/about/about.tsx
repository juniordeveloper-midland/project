import Header from '../components/Header';
import AboutHero from '../components/abouthero';
import WhoWeAre from '../components/whoweare';
import WhatWeDo from '../components/whatwedo';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function about() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default about;