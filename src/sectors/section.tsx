import Header from '../components/Header';
import SectionHero from '../components/sectionhero';
import SectorsDetail from '../components/sectorsdetail';
import Testimonials from '../components/testimonial';
import Footer from '../components/footer';

function section() {
  return (
    <div className="min-h-screen">
      <Header />
      <SectionHero />
      <SectorsDetail />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default section;