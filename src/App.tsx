import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './about/about';
import Services from './ourservice/service';
import Blogs from './blog/blog';
import Sectors from './sectors/section';
import Contact from './contact/contact';
import Faq from './faq/faq';
import Policy from './policy/policy';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import { useEffect, useState } from 'react';
import { getMe } from './services/authClient';

function App() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    getMe().then((u) => setIsAuthed(!!u)).catch(() => setIsAuthed(false));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/admin-access-login" element={<AdminLogin onLogin={() => setIsAuthed(true)} />} />
        <Route path="/admin-dashboard" element={isAuthed ? <AdminDashboard onLogout={() => setIsAuthed(false)} /> : <Navigate to="/admin-access-login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;