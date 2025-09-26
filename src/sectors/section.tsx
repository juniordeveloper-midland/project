import Header from '../components/Header';
import SectionHero from '../components/sectionhero';
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function section() {
  return (
    <div className="min-h-screen">
      <Header />
      <SectionHero />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default section;