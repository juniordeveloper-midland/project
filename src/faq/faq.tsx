import Header from '../components/Header';
import FaqHero from '../components/faqhero';
import FaqDetails from '../components/faqdetail';
import OurBlogs from '../components/OurBlogs';

import Subscribe from '../components/subscribe';

import Footer from '../components/footer';

function faq() {
  return (
    <div className="min-h-screen">
      <Header />
        <FaqHero />
      <FaqDetails />
        <OurBlogs />
      <Subscribe />
     
      <Footer />
    </div>
  );
}

export default faq;