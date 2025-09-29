import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, googleLogin } from '../services/authClient';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleClientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId) return;
    // load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      if (window.google?.accounts?.id) {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            try {
              setError(null);
              setLoading(true);
              const idToken = response.credential;
              await googleLogin(idToken);
              onLogin();
              window.location.href = '/admin-dashboard';
            } catch (err: any) {
              setError(err?.message || 'Google sign-in failed');
            } finally {
              setLoading(false);
            }
          }
        });
        // render button
        const btnContainer = document.getElementById('googleSignInDiv');
        if (btnContainer) {
          // @ts-ignore
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: 320
          });
        }
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [googleClientId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      onLogin();
      navigate('/admin-dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">Admin Access</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {googleClientId && (
          <>
            <div id="googleSignInDiv" className="flex justify-center" />
            <div className="text-center text-xs text-gray-500">or sign in with email</div>
          </>
        )}
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" placeholder="admin@example.com" required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" placeholder="••••••••" required />
        </div>
        <button disabled={loading} className="w-full bg-[#1f3b7a] text-white rounded py-2 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}


