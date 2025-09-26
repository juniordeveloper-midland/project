import Header from '../components/Header';
import AboutHero from '../components/abouthero';
import WhoWeAre from '../components/whoweare';
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function about() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default about;