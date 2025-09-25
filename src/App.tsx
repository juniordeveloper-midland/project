import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import OurSectors from './components/OurSectors';
import OurBlogs from './components/OurBlogs';
import Subscribe from './components/subscribe';
import Testimonials from './components/testimonial';
import Footer from './components/footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutUs />
      <OurServices />
      <OurSectors />
      <OurBlogs />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;