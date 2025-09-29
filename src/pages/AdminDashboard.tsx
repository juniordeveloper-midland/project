import { useEffect, useState } from 'react';
import { changeCredentials, getMe, logout, type User } from '../services/authClient';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-gray-800 text-white px-3 py-2 rounded">Logout</button>
        </div>

        <div className="bg-white shadow rounded p-6">
          <div className="mb-4 text-gray-700">Signed in as: <span className="font-medium">{user?.email || '...'}</span></div>
          {message && <div className="text-green-700 mb-3 text-sm">{message}</div>}
          {error && <div className="text-red-700 mb-3 text-sm">{error}</div>}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current password</label>
              <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New email (optional)</label>
              <input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" placeholder="newadmin@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New password (optional, min 6)</label>
              <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" placeholder="••••••" minLength={6} />
            </div>
            <button className="bg-[#1f3b7a] text-white px-4 py-2 rounded">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}


