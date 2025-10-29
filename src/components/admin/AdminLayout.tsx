import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authClient';

export default function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/admin-access-login');
  }

  const navItemBase = 'flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-[#1f3b7a] text-white hidden md:flex flex-col">
          <div className="px-4 py-4 text-lg font-semibold border-b border-white/10">Admin</div>
          <nav className="p-3 space-y-1 text-sm">
            <NavLink to="/admin-dashboard" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Dashboard</NavLink>
            <NavLink to="/admin-blogs" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Manage Blogs</NavLink>
            <NavLink to="/admin-subscribers" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Subscribers</NavLink>
            <NavLink to="/admin-contacts" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Contact Messages</NavLink>
          </nav>
          <div className="mt-auto p-3">
            <button onClick={handleLogout} className="w-full bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-left">Logout</button>
          </div>
        </aside>
        {/* Mobile sidebar overlay */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#1f3b7a] text-white shadow-lg flex flex-col">
              <div className="px-4 py-4 text-lg font-semibold border-b border-white/10 flex items-center justify-between">
                <span>Admin</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">✕</button>
              </div>
              <nav className="p-3 space-y-1 text-sm" onClick={() => setMobileOpen(false)}>
                <NavLink to="/admin-dashboard" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Dashboard</NavLink>
                <NavLink to="/admin-blogs" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Manage Blogs</NavLink>
                <NavLink to="/admin-subscribers" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Subscribers</NavLink>
                <NavLink to="/admin-contacts" className={({ isActive }) => `${navItemBase} ${isActive ? 'bg-white/10' : ''}`}>Contact Messages</NavLink>
              </nav>
              <div className="mt-auto p-3">
                <button onClick={handleLogout} className="w-full bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-left">Logout</button>
              </div>
            </div>
          </div>
        ) : null}
        <main className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="px-3 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded bg-gray-100 text-gray-700">☰</button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{title}</h1>
            </div>
          </header>
          <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


