import Header from '../components/Header';
import BlogHero from '../components/bloghero';
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogHero />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default blog;