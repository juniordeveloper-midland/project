import Header from '../components/Header';
import PolicyHero from '../components/policyhero';
import PolicyDetails from '../components/policydetails';
import OurBlogs from '../components/OurBlogs';

import Subscribe from '../components/subscribe';
;
import Footer from '../components/footer';

function policy() {
  return (
    <div className="min-h-screen">
      <Header />
        <PolicyHero />
      <PolicyDetails />
        <OurBlogs />
      <Subscribe />
     
      <Footer />
    </div>
  );
}

export default policy;