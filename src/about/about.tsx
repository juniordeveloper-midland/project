import Header from '../components/Header';
import AboutHero from '../components/abouthero';
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function about() {
  return (
    <div className="min-h-screen">
      <Header />

      <AboutHero />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default about;