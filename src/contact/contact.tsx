import Header from '../components/Header';
import ContactHero from '../components/contacthero'
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContactHero />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default contact;