import Header from '../components/Header';
import Footer from '../components/footer';

function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-[#1f3b7a] mb-6">Contact Us</h1>
        <p className="text-gray-600">You can place your contact content here.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;


