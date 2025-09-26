import Header from '../components/Header';
import OurBlogs from '../components/OurBlogs';
import Subscribe from '../components/subscribe';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function Blogs() {
  return (
    <div className="min-h-screen">
      <Header />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Blogs;


