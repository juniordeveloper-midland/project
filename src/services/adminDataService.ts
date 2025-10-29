const API_BASE = (import.meta.env.VITE_API_BASE as string) || '';
function buildUrl(path: string) {
  if (API_BASE) return API_BASE.replace(/\/$/, '') + path;
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const devBase = `${window.location.protocol}//${window.location.hostname}:3001`;
    return devBase.replace(/\/$/, '') + path;
  }
  return path;
}

async function safeFetch(input: RequestInfo, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    throw new Error(err?.message ? `Network error: ${err.message}` : 'Network error');
  }
}

async function parseJsonSafe(res: Response) {
  try {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { __raw: text } as any;
    }
  } catch {
    return null;
  }
}

export async function getAdminSubscribers() {
  const url = buildUrl('/api/admin/subscribers');
  const res = await safeFetch(url, { credentials: 'include' });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to fetch subscribers (status ${res.status})`);
  return body?.data || [];
}

export async function getAdminContactMessages() {
  const url = buildUrl('/api/admin/contact-messages');
  const res = await safeFetch(url, { credentials: 'include' });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to fetch contact messages (status ${res.status})`);
  return body?.data || [];
}


