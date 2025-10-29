import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './about/about';
import Services from './ourservice/service';
import Blogs from './blog/blog';
import BlogPost from './pages/BlogPost';
import Sectors from './sectors/section';
import Contact from './contact/contact';
import Faq from './faq/faq';
import Policy from './policy/policy';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import AdminBlogs from './pages/AdminBlogs';
import AdminSubscribers from './pages/AdminSubscribers';
import AdminContacts from './pages/AdminContacts';
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
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/admin-access-login" element={<AdminLogin onLogin={() => setIsAuthed(true)} />} />
        <Route path="/admin-dashboard" element={isAuthed ? <AdminDashboard onLogout={() => setIsAuthed(false)} /> : <Navigate to="/admin-access-login" replace />} />
        <Route path="/admin-blogs" element={isAuthed ? <AdminBlogs /> : <Navigate to="/admin-access-login" replace />} />
        <Route path="/admin-subscribers" element={isAuthed ? <AdminSubscribers /> : <Navigate to="/admin-access-login" replace />} />
        <Route path="/admin-contacts" element={isAuthed ? <AdminContacts /> : <Navigate to="/admin-access-login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;