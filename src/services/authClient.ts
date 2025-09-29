export type User = { email: string };

const API_BASE = (import.meta as any).env?.DEV ? 'http://localhost:3001' : '';
const API = `${API_BASE}/api/auth`;

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || 'Login failed');
  }
}

export async function googleLogin(idToken: string): Promise<void> {
  const res = await fetch(`/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || 'Google login failed');
  }
}

export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API}/me`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.user || null;
}

export async function logout(): Promise<void> {
  await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
}

export async function changeCredentials(currentPassword: string, newEmail?: string, newPassword?: string): Promise<User> {
  const res = await fetch(`${API}/change-credentials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newEmail, newPassword })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || 'Update failed');
  }
  const data = await res.json();
  return data.user as User;
}


