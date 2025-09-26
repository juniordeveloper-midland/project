import Header from '../components/Header';
import ServiceHero from '../components/servicehero';  
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function service() {
  return (
    <div className="min-h-screen">
      <Header />
      <ServiceHero />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default service;