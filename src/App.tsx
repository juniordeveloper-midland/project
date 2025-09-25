import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import OurSectors from './components/OurSectors';
import OurBlogs from './components/OurBlogs';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutUs />
      <OurServices />
      <OurSectors />
      <OurBlogs />
    </div>
  );
}

export default App;