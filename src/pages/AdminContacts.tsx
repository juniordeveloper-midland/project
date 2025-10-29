import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { getAdminContactMessages } from '../services/adminDataService';

export default function AdminContacts() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAdminContactMessages()
      .then((data) => { if (mounted) setRows(data || []); })
      .catch((e: any) => { if (mounted) setError(e?.message || 'Failed to load'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Contact Messages</h2>
        {error ? <div className="text-red-600 mb-3">{error}</div> : null}
        <div className="bg-white rounded shadow overflow-x-auto">
          {loading ? (
            <div className="p-4">Loading...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Phone</th>
                  <th className="text-left px-4 py-2">Subject</th>
                  <th className="text-left px-4 py-2">Message</th>
                  <th className="text-left px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t align-top">
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{r.email}</td>
                    <td className="px-4 py-2">{r.phone || '-'}</td>
                    <td className="px-4 py-2">{r.subject || '-'}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap max-w-md">{r.message}</td>
                    <td className="px-4 py-2">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}


