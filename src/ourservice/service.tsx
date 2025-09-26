import Header from '../components/Header';
import ServiceHero from '../components/servicehero';  
import ServiceDetail from '../components/servicedetails';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function service() {
  return (
    <div className="min-h-screen">
      <Header />
      <ServiceHero />
      <ServiceDetail />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default service;