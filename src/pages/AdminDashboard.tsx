import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeCredentials, getMe, logout, type User } from '../services/authClient';
import AdminLayout from '../components/admin/AdminLayout';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMe().then(setUser).catch(() => setUser(null));
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const updated = await changeCredentials(currentPassword, newEmail || undefined, newPassword || undefined);
      setUser(updated);
      setMessage('Credentials updated');
      setCurrentPassword('');
      setNewEmail('');
      setNewPassword('');
    } catch (err: any) {
      setError(err?.message || 'Failed to update');
    }
  }

  async function handleLogout() {
    await logout();
    onLogout();
    window.location.href = '/admin-access-login';
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Link to="/admin-blogs" className="bg-white rounded shadow p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">Manage</div>
          <div className="text-xl font-semibold text-gray-800">Blogs</div>
        </Link>
        <Link to="/admin-subscribers" className="bg-white rounded shadow p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">View</div>
          <div className="text-xl font-semibold text-gray-800">Subscribers</div>
        </Link>
        <Link to="/admin-contacts" className="bg-white rounded shadow p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500">View</div>
          <div className="text-xl font-semibold text-gray-800">Contact Messages</div>
        </Link>
      </div>

      <div className="bg-white shadow rounded p-6 max-w-3xl">
        <div className="mb-4 text-gray-700">Signed in as: <span className="font-medium">{user?.email || '...'}</span></div>
        {message && <div className="text-green-700 mb-3 text-sm">{message}</div>}
        {error && <div className="text-red-700 mb-3 text-sm">{error}</div>}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current password</label>
            <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">New email (optional)</label>
              <input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" placeholder="newadmin@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New password (optional, min 6)</label>
              <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" placeholder="••••••" minLength={6} />
            </div>
          </div>
          <button className="bg-[#1f3b7a] text-white px-4 py-2 rounded">Save changes</button>
        </form>
      </div>
    </AdminLayout>
  );
}


