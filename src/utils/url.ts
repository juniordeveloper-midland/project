export function resolveAssetUrl(path?: string) {
  if (!path) return '';
  // If it's already absolute (http/https), return as-is
  if (/^https?:\/\//i.test(path)) return path;

  const API_BASE = (import.meta.env.VITE_API_BASE as string) || '';

  // runtime fallback: if no VITE_API_BASE was provided, assume backend runs on same host at port 3001
  const runtimeFallback = (() => {
    try {
      if (typeof window === 'undefined') return '';
      const loc = window.location;
      // If the frontend is served by Vite (default port 5173) or other, assume API at port 3001
      const host = loc.hostname;
      const proto = loc.protocol;
      const port = '3001';
      return `${proto}//${host}:${port}`;
    } catch {
      return '';
    }
  })();

  // If path starts with a slash, treat as absolute on the backend
  if (path.startsWith('/')) {
    const base = API_BASE || runtimeFallback;
    if (!base) return path; // give relative path as last resort
    return base.replace(/\/$/, '') + path;
  }

  // Otherwise, join with API_BASE or fallback
  const base = API_BASE || runtimeFallback;
  if (base) return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  return path;
}
