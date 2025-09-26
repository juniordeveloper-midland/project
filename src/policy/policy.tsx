import Header from '../components/Header';
import PolicyHero from '../components/policyhero';
import OurBlogs from '../components/OurBlogs';

import Subscribe from '../components/subscribe';
;
import Footer from '../components/footer';

function policy() {
  return (
    <div className="min-h-screen">
      <Header />
        <PolicyHero />
        <OurBlogs />
      <Subscribe />
     
      <Footer />
    </div>
  );
}

export default policy;