import Header from '../components/Header';
import BlogDetail from '../components/blogdetail';
import BlogHero from '../components/bloghero';
import OurBlogs from '../components/OurBlogs';

import Footer from '../components/footer';

function blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogHero />
      <BlogDetail />
      <OurBlogs />
      
      <Footer />
    </div>
  );
}

export default blog;