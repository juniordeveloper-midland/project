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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/herocity.jpg')" }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src="/images/G20Logo.jpg" alt="Logo" className="w-24 h-24" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Access</h1>
        
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        
        {googleClientId && (
          <>
            <div id="googleSignInDiv" className="flex justify-center" />
            <div className="text-center text-sm text-gray-500">or sign in with email</div>
          </>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f3b7a]"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1f3b7a]"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            disabled={loading}
            className="w-full bg-[#1f3b7a] text-white rounded-md py-2 text-lg font-semibold hover:bg-opacity-90 transition duration-300 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
