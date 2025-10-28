const API_BASE = (import.meta.env.VITE_API_BASE as string) || '';
function buildUrl(path: string) {
  // If API_BASE provided via env, use it
  if (API_BASE) return API_BASE.replace(/\/$/, '') + path;

  // During local development, auto-target the backend on port 3001 if available
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const devBase = `${window.location.protocol}//${window.location.hostname}:3001`;
    return devBase.replace(/\/$/, '') + path;
  }

  // Fallback: return relative path (will hit same origin)
  return path;
}

async function safeFetch(input: RequestInfo, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    // Normalize network errors
    throw new Error(err?.message ? `Network error: ${err.message}` : 'Network error');
  }
}

export async function getPublicPosts(limit?: number) {
  const url = limit && limit > 0 ? buildUrl(`/api/blogs?limit=${limit}`) : buildUrl('/api/blogs');
  const res = await safeFetch(url);
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to fetch posts (status ${res.status})`);
  return body.data || [];
}

export async function getPostById(id: string | number) {
  const url = buildUrl(`/api/blogs/${id}`);
  const res = await safeFetch(url);
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to fetch post (status ${res.status})`);
  return body.data;
}

// Admin routes (send cookies)
export async function getAdminPosts() {
  const url = buildUrl('/api/admin/blogs');
  const res = await safeFetch(url, { credentials: 'include' });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to fetch admin posts (status ${res.status})`);
  return body.data || [];
}

export async function createPost(payload: any) {
  const url = buildUrl('/api/admin/blogs');
  const res = await safeFetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to create post (status ${res.status})`);
  return body;
}

export async function updatePost(id: number | string, payload: any) {
  const url = buildUrl(`/api/admin/blogs/${id}`);
  const res = await safeFetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to update post (status ${res.status})`);
  return body;
}

export async function deletePost(id: number | string) {
  const url = buildUrl(`/api/admin/blogs/${id}`);
  const res = await safeFetch(url, {
    method: 'DELETE',
    credentials: 'include'
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to delete post (status ${res.status})`);
  return body;
}

export async function uploadImage(file: File) {
  const fd = new FormData();
  fd.append('image', file);
  const url = buildUrl('/api/admin/blogs/upload-image');
  const res = await safeFetch(url, { method: 'POST', credentials: 'include', body: fd });
  const body = await parseJsonSafe(res);
  if (!res.ok) throw new Error(body?.message || `Failed to upload image (status ${res.status})`);
  return body.path;
}

async function parseJsonSafe(res: Response) {
  try {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      // return raw text wrapped so callers can inspect
      return { __raw: text };
    }
  } catch {
    return null;
  }
}
