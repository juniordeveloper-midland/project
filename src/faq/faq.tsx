import Header from '../components/Header';
import FaqHero from '../components/faqhero';
import OurBlogs from '../components/OurBlogs';

import Subscribe from '../components/subscribe';
;
import Footer from '../components/footer';

function faq() {
  return (
    <div className="min-h-screen">
      <Header />
        <FaqHero />
        <OurBlogs />
      <Subscribe />
     
      <Footer />
    </div>
  );
}

export default faq;