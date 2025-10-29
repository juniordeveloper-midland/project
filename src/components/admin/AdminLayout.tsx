import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authClient';

export default function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();

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
        <main className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
          </header>
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


