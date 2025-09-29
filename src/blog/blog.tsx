import Header from '../components/Header';
import BlogDetail from '../components/blogdetail';
import BlogHero from '../components/bloghero';


import Footer from '../components/footer';

function blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogHero />
      <BlogDetail />
  
      <Footer />
    </div>
  );
}

export default blog;